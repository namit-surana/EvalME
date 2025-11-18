# EvalME Backend - Python Agent System

This is the Python backend for EvalME, an AI-powered answer sheet evaluation system using OpenAI Agents SDK with complete observability through Galileo tracing.

## Features

- **OpenAI Agents SDK**: Multi-agent workflow for answer evaluation
- **Galileo Tracing**: Complete observability of all agent operations
- **Marker API Integration**: OCR for handwritten answer extraction
- **JSON-Based Configuration**: Easy question and model answer management
- **Deterministic Evaluation**: Keyword-based scoring system
- **Financial Accounting Quiz**: Pre-configured with FIFO/LIFO inventory questions

## Architecture

```
┌─────────────────────────┐
│ Student PDF             │
│ (Handwritten answers)   │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Marker OCR API          │
│ (Extract text)          │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ OpenAI Agent            │
│ Tools:                  │
│ - parse_question_paper  │
│ - parse_model_answer    │
│ - evaluate_answers      │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Evaluation Results      │
│ + Galileo Traces        │
└─────────────────────────┘
```

## Setup

### Prerequisites

- Python 3.9 or higher
- OpenAI API key
- Galileo API key (optional, for tracing)

### Installation

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Create `.env` file:

```ini
OPENAI_API_KEY=your-openai-api-key-here
GALILEO_API_KEY=your-galileo-api-key-here
```

3. Run the application:

```bash
python main.py
```

## Configuration

### Question Paper (`modelquestionpaper.json`)

Define your exam questions:

```json
{
  "required": [
    {
      "id": 1,
      "question": "Your question text here?",
      "marks": 10
    }
  ]
}
```

### Model Answer (`modelanswerpaper.json`)

Define expected answers with key points:

```json
{
  "answers": [
    {
      "id": 1,
      "solution": {
        "method": "Method name",
        "workings": {
          "step1": "value1"
        },
        "final_answer": "The answer"
      }
    }
  ]
}
```

## Project Structure

```
.
├── main.py                      # Main application with Galileo tracing
├── requirements.txt             # Python dependencies
├── modelquestionpaper.json      # Question definitions
├── modelanswerpaper.json        # Model answer key points
├── evalmate/
│   ├── agent_prompt.md          # Agent instructions
│   └── tools.py                 # Tool implementations
├── GALILEO_SETUP.md            # Galileo setup guide
├── HOW_IT_WORKS.md             # Detailed workflow explanation
└── SETUP_INSTRUCTIONS.md       # Installation instructions
```

## How It Works

1. **PDF Extraction**: Marker API converts handwritten PDFs to text
2. **Load Questions**: Agent calls `parse_question_paper()` → loads from JSON
3. **Load Model Answers**: Agent calls `parse_model_answer()` → loads from JSON
4. **Evaluate**: Agent calls `evaluate_student_answers()` → matches keywords
5. **Generate Feedback**: AI generates teacher-style feedback
6. **Trace Everything**: Galileo logs all operations

## Evaluation Logic

The system uses deterministic keyword matching:

- Score = (matched_keywords / total_keywords) × question_marks
- Records matched and missing keywords
- Provides detailed feedback

## Galileo Tracing

Every operation is traced:

- Marker API calls (timing, file size, character count)
- Agent LLM calls (input/output, tokens, cost)
- Tool executions (questions loaded, answers loaded)
- Complete pipeline metrics

View traces at: `https://app.galileo.ai`

## API Integration

This backend is designed to integrate with the [EvalME frontend](https://github.com/namit-surana/EvalME) (React.js).

Expected API endpoint format:

```
POST /api/evaluate
Content-Type: multipart/form-data

Files:
- answerPaper: PDF file
- modelAnswerPaper: JSON file (optional if using pre-configured)
- questionPaper: JSON file (optional if using pre-configured)

Response:
{
  "results": {
    "Q1": {
      "score": 8.5,
      "out_of": 10,
      "matched": ["keyword1", "keyword2"],
      "missing": ["keyword3"],
      "feedback": "Good understanding of..."
    }
  }
}
```

## Technologies

- **OpenAI Agents SDK** (0.5.1): Agent orchestration
- **Galileo SDK**: Observability and tracing  
- **Marker API**: OCR for handwriting extraction
- **Python 3.11**: Runtime

## Current Configuration

**Course**: ACCT GB 1306 - Financial Accounting  
**Quiz**: #3  
**Company**: Othmer Company  
**Topics**: FIFO, LIFO, Inventory Valuation, Lower of Cost or NRV

## Documentation

- [Galileo Setup Guide](GALILEO_SETUP.md)
- [How It Works](HOW_IT_WORKS.md)
- [Setup Instructions](SETUP_INSTRUCTIONS.md)

## Contributing

This is the backend branch (`namit`) of the EvalME project. The frontend (React.js) is on the `main` branch.

## License

MIT License

## Author

Namit Surana

## Support

For questions or issues, please open an issue on GitHub.

