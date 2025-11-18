# EvalMate Tool Suite

This folder contains a minimal, build-ready description and reference implementation for the EvalMate grading agent. Everything is intentionally lightweight so it can be dropped into a new backend or wired directly into Cursor tool definitions without extra ceremony.

## Tools Overview

| Tool | Purpose | Notes |
| --- | --- | --- |
| `parse_question_paper` | Convert the question paper into structured `{id, question, marks}` entries. | LLM-authored output is accepted verbatim. |
| `parse_model_answer` | Summarise each model answer into key bullet points. | LLM-authored output is accepted verbatim. |
| `evaluate_answers` | Deterministically score each answer by matching key phrases. | Pure Python logic, no LLM calls. |
| `generate_feedback` | Produce teacher-style written feedback per question. | LLM-authored output is accepted verbatim. |
| `generate_audio_feedback` | Turn textual feedback into speech via ElevenLabs. | Voice defaults to `"default"` if omitted. |

All tool payloads conform to the schemas described in `tools.py`.

## Agent Workflow

1. Call `extract_handwriting` with the student sheet URL.
2. Call `parse_question_paper` with the question paper text.
3. Call `parse_model_answer` with the model answer text.
4. Call `evaluate_answers` with the parsed questions, model keys, and student text.
5. Call `generate_feedback` using the evaluation block.
6. Optionally call `generate_audio_feedback` for spoken feedback.

Always process every question together, always return clean JSON, and never fabricate tool outputs. The final response structure should match:

```
{
  "results": {
    "Q1": {
      "score": 0,
      "out_of": 0,
      "matched": [],
      "missing": [],
      "feedback": "",
      "audio_url": ""
    }
  }
}
```

For a ready-to-use system prompt, see `agent_prompt.md`. For a drop-in backend stub, see `tools.py`.

