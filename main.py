from pathlib import Path
from datetime import datetime
import json

import requests
from agents import Agent, Runner, function_tool
from dotenv import load_dotenv
from galileo import galileo_context
from galileo.config import GalileoPythonConfig

# Import tool functions
import sys
sys.path.insert(0, str(Path(__file__).parent))
from evalmate.tools import load_question_paper, load_model_answers, evaluate_answers

MARKER_URL = "https://mangroveai--datalab-marker-modal-demo-markermodaldemoser-e06965.modal.run/convert"
HARDCODED_FILEPATH = Path(__file__).parent / "answer_handwritten.pdf"


# Define tool functions that the agent will call
@function_tool
def parse_question_paper() -> str:
    """
    Loads questions from modelquestionpaper.json file.
    Returns the questions as a JSON string.
    """
    questions = load_question_paper()
    return json.dumps({"questions": questions}, indent=2)


@function_tool
def parse_model_answer() -> str:
    """
    Loads model answer key points from modelanswerpaper.json file.
    Returns the model answers as a JSON string.
    """
    model_keys = load_model_answers()
    return json.dumps({"model_keys": model_keys}, indent=2)


@function_tool
def evaluate_student_answers(questions_json: str, model_keys_json: str, student_text: str) -> str:
    """
    Evaluates student answers against model key points.
    
    Args:
        questions_json: JSON string containing questions
        model_keys_json: JSON string containing model answer key points
        student_text: The student's answer text to evaluate
        
    Returns:
        JSON string with evaluation results
    """
    questions = json.loads(questions_json).get("questions", [])
    model_keys = json.loads(model_keys_json).get("model_keys", {})
    
    evaluations = evaluate_answers(questions, model_keys, student_text)
    return json.dumps({"evaluations": evaluations}, indent=2)


def main() -> None:
    """
    EvalMate with Galileo tracing integration.
    """
    load_dotenv()

    # Initialize Galileo context
    galileo_context.init(
        project="EvalMate",
        log_stream="StudentEvaluation"
    )
    
    # Get the Galileo logger instance
    logger = galileo_context.get_logger_instance()
    
    # Start a Galileo session
    logger.start_session()
    
    try:
        # Start main trace for the entire evaluation workflow
        logger.start_trace(name="Complete Evaluation Pipeline", input="PDF Evaluation Started")
        
        # Step 1: Extract handwriting with tracing
        student_text = extract_handwriting(logger)
        
        # Step 2: Load agent instructions
        agent_prompt = Path("evalmate/agent_prompt.md").read_text(encoding="utf-8")
        
        # Step 3: Create agent with registered tools
        agent = Agent(
            name="EvalMate",
            instructions=agent_prompt,
            model="gpt-5.1",
            tools=[parse_question_paper, parse_model_answer, evaluate_student_answers],
        )
        
        # Log the agent evaluation step
        agent_start_time = datetime.now().timestamp() * 1_000_000_000
        
        result = Runner.run_sync(
            agent,
            f"Use the registered tools to evaluate this student submission:\n{student_text}",
        )
        
        # Log the agent span
        logger.add_llm_span(
            input=[
                {"role": "system", "content": agent_prompt},
                {"role": "user", "content": f"Use the registered tools to evaluate this student submission:\n{student_text[:500]}..."}
            ],
            output=str(result.final_output),
            model="gpt-5.1",
            duration_ns=(datetime.now().timestamp() * 1_000_000_000) - agent_start_time,
        )
        
        # Conclude the trace
        logger.conclude(output=str(result.final_output))
        
        # Print the result
        print("\n" + "="*80)
        print("EVALUATION RESULT:")
        print("="*80)
        print(result.final_output)
        print("="*80 + "\n")
        
        # Show Galileo information
        config = GalileoPythonConfig.get()
        project_url = f"{config.console_url}project/{logger.project_id}"
        log_stream_url = f"{project_url}/log-streams/{logger.log_stream_id}"
        
        print("🚀 GALILEO TRACING INFORMATION:")
        print(f"🔗 Project   : {project_url}")
        print(f"📝 Log Stream: {log_stream_url}")
        print()
        
    finally:
        # Flush logs before exiting
        logger.flush()


def extract_handwriting(logger) -> str:
    """
    Extract handwriting from PDF using Marker API with Galileo tracing.
    """
    # Log the Marker API call as a custom span
    start_time_ns = datetime.now().timestamp() * 1_000_000_000
    
    print("📄 Extracting handwriting from PDF...")
    
    # Open and send file as multipart/form-data
    with open(HARDCODED_FILEPATH, 'rb') as file:
        files = {'file': file}
        data = {'output_format': 'json'}
        response = requests.post(MARKER_URL, files=files, data=data, timeout=120)
    
    response.raise_for_status()
    
    # Parse JSON response and extract markdown content
    json_response = response.json()
    extracted_text = ""
    
    if isinstance(json_response, dict):
        extracted_text = json_response.get('markdown', json_response.get('text', str(json_response)))
    else:
        extracted_text = str(json_response)
    
    # Log the Marker API call as a tool span
    duration_ns = (datetime.now().timestamp() * 1_000_000_000) - start_time_ns
    
    logger.add_tool_span(
        name="Marker OCR API",
        input=f"PDF file: {HARDCODED_FILEPATH.name}",
        output=f"Extracted {len(extracted_text)} characters",
        duration_ns=duration_ns,
        metadata={
            "api_url": MARKER_URL,
            "output_format": "json",
            "file_size_kb": HARDCODED_FILEPATH.stat().st_size / 1024,
            "extracted_length": len(extracted_text)
        }
    )
    
    print(f"✅ Extracted {len(extracted_text)} characters from PDF\n")
    
    return extracted_text


if __name__ == "__main__":
    main()

