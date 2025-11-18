"""
Minimal tool definitions and reference implementations for EvalMate.

Only `evaluate_answers` contains executable logic here (it is deliberately
deterministic). The remaining tools are described so they can be implemented
against real services (Marker OCR, an LLM, or ElevenLabs) without additional
ceremony.
"""

from __future__ import annotations

import json
from pathlib import Path
from dataclasses import dataclass, asdict
from typing import Dict, List, TypedDict, Any


@dataclass(frozen=True)
class ToolSchema:
    name: str
    description: str
    purpose: str
    input_schema: Dict[str, Any]
    output_schema: Dict[str, Any]
    developer_notes: List[str]


TOOL_DEFINITIONS: List[ToolSchema] = [
    ToolSchema(
        name="parse_question_paper",
        description="Parses the entire question paper and extracts all questions.",
        purpose="Convert a question paper into structured {id, question, marks} entries.",
        input_schema={"text": "string"},
        output_schema={
            "questions": [
                {"id": "Q1", "question": "string", "marks": 5},
            ]
        },
        developer_notes=[
            "LLM-driven: return whatever the agent generates.",
        ],
    ),
    ToolSchema(
        name="parse_model_answer",
        description="Extracts key points for each question from the model answer document.",
        purpose="Turn model answers into bullet points for comparison.",
        input_schema={"text": "string"},
        output_schema={
            "model_keys": {
                "Q1": ["point1", "point2"],
            }
        },
        developer_notes=[
            "LLM handles the extraction.",
            "No additional computation required.",
        ],
    ),
    ToolSchema(
        name="evaluate_answers",
        description="Compares student answers with model key points and assigns scoring plus missing points.",
        purpose="Deterministic scoring logic.",
        input_schema={
            "questions": [],
            "model_keys": {},
            "student_text": "string",
        },
        output_schema={
            "evaluations": {
                "Q1": {
                    "score": 0,
                    "out_of": 0,
                    "matched": [],
                    "missing": [],
                }
            }
        },
        developer_notes=[
            "Match key phrases by simple substring search.",
            "Score = (matched keys / total keys) × marks.",
            "Do not use an LLM here.",
        ],
    ),
    ToolSchema(
        name="generate_feedback",
        description="Produces teacher-style feedback for each question based on the evaluation results.",
        purpose="Improve student learning with natural-language feedback.",
        input_schema={"evaluations": {}},
        output_schema={"feedback": {"Q1": "string"}},
        developer_notes=[
            "LLM generates the feedback.",
            "Always return one entry per question.",
        ],
    ),
    ToolSchema(
        name="generate_audio_feedback",
        description="Converts feedback text into spoken audio using the ElevenLabs API.",
        purpose="Provide optional audio teacher feedback.",
        input_schema={"text": "string", "voice": "string"},
        output_schema={"audio_url": "string"},
        developer_notes=[
            'Use ElevenLabs TTS. Default voice is "default" when unspecified.',
            "Return a URL where the audio file is hosted.",
        ],
    ),
]


class Question(TypedDict):
    id: str
    question: str
    marks: int


class Evaluation(TypedDict):
    score: float
    out_of: int
    matched: List[str]
    missing: List[str]


def evaluate_answers(
    questions: List[Question],
    model_keys: Dict[str, List[str]],
    student_text: str,
) -> Dict[str, Evaluation]:
    """
    Deterministically evaluate student answers by string matching.
    """

    normalized_text = student_text.lower()
    evaluations: Dict[str, Evaluation] = {}

    for question in questions:
        keys = model_keys.get(question["id"], [])
        if not keys:
            evaluations[question["id"]] = Evaluation(
                score=0.0,
                out_of=question["marks"],
                matched=[],
                missing=[],
            )
            continue

        matched = [
            key
            for key in keys
            if key and key.lower() in normalized_text
        ]
        missing = [key for key in keys if key not in matched]

        coverage = len(matched) / len(keys) if keys else 0
        score = round(question["marks"] * coverage, 2)

        evaluations[question["id"]] = Evaluation(
            score=score,
            out_of=question["marks"],
            matched=matched,
            missing=missing,
        )

    return evaluations


def load_question_paper(filepath: str = "modelquestionpaper.json") -> List[Question]:
    """
    Load questions from JSON file.
    
    Args:
        filepath: Path to the model question paper JSON file
        
    Returns:
        List of Question dictionaries with id, question, and marks
    """
    file_path = Path(filepath)
    if not file_path.exists():
        # Try in project root
        file_path = Path(__file__).parent.parent / filepath
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Handle both formats: simple "questions" array or "required" array
    questions_raw = data.get("questions", data.get("required", []))
    
    # Convert to standard format with id, question, marks
    questions = []
    for q in questions_raw:
        questions.append({
            "id": f"Q{q.get('id', q.get('question_id', len(questions)+1))}",
            "question": q.get("question", ""),
            "marks": q.get("marks", 10)  # Default 10 marks if not specified
        })
    
    return questions


def load_model_answers(filepath: str = "modelanswerpaper.json") -> Dict[str, List[str]]:
    """
    Load model answer key points from JSON file.
    
    Args:
        filepath: Path to the model answer paper JSON file
        
    Returns:
        Dictionary mapping question IDs to lists of key points
    """
    file_path = Path(filepath)
    if not file_path.exists():
        # Try in project root
        file_path = Path(__file__).parent.parent / filepath
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Handle simple format
    if "model_keys" in data:
        return data["model_keys"]
    
    # Handle detailed format with "answers" array
    model_keys = {}
    for answer in data.get("answers", []):
        question_id = f"Q{answer.get('id', answer.get('question_id', ''))}"
        
        # Extract key points from solution
        key_points = []
        solution = answer.get("solution", {})
        
        # Add final answer as a key point
        final_answer = solution.get("final_answer")
        if final_answer is not None:
            if isinstance(final_answer, dict):
                # For complex answers, extract all values
                for value in final_answer.values():
                    if value:
                        key_points.append(str(value).lower())
            else:
                key_points.append(str(final_answer).lower())
        
        # Extract from workings
        workings = solution.get("workings", {})
        for key, value in workings.items():
            if value is not None and not isinstance(value, (list, dict)):
                key_points.append(f"{key}: {value}".lower())
        
        # Add method as key point
        method = solution.get("method")
        if method:
            key_points.append(method.lower())
        
        model_keys[question_id] = key_points
    
    return model_keys


def list_tool_schemas() -> List[Dict[str, Any]]:
    """
    Convenience helper so callers can expose the tool catalog over an API.
    """

    return [asdict(schema) for schema in TOOL_DEFINITIONS]


if __name__ == "__main__":
    # Test loading from JSON files
    print("Loading questions from JSON...")
    questions = load_question_paper()
    print(f"Loaded {len(questions)} questions:")
    for q in questions:
        print(f"  - {q['id']}: {q['question'][:50]}... ({q['marks']} marks)")
    
    print("\nLoading model answers from JSON...")
    model_keys = load_model_answers()
    print(f"Loaded model keys for {len(model_keys)} questions:")
    for qid, keys in model_keys.items():
        print(f"  - {qid}: {len(keys)} key points")
    
    # Test evaluation with loaded data
    student_answer = """
    Photosynthesis is a process where plants use chlorophyll to capture sunlight energy.
    They take in carbon dioxide and water to produce glucose and oxygen.
    This happens in chloroplasts.
    
    Newton's first law is about inertia - an object at rest stays at rest.
    The second law states that F=ma, force equals mass times acceleration.
    The third law says every action has an equal and opposite reaction.
    """
    
    print("\nEvaluating student answer...")
    evaluations = evaluate_answers(questions, model_keys, student_answer)
    
    print("\nEvaluation Results:")
    for qid, eval_result in evaluations.items():
        print(f"\n{qid}:")
        print(f"  Score: {eval_result['score']}/{eval_result['out_of']}")
        print(f"  Matched: {eval_result['matched']}")
        print(f"  Missing: {eval_result['missing']}")

