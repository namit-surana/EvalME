# EvalMate with Galileo Tracing - Quick Start

## 🚀 What's Been Added

Your EvalMate pipeline now has **complete observability** with Galileo tracing! Every step of your evaluation workflow is now tracked and visible in the Galileo dashboard.

## 📦 Installation

Install all dependencies:

```bash
pip install -r requirements.txt
```

This installs:
- `galileo[openai]` - Galileo SDK for tracing
- `requests`, `agents`, `python-dotenv` - Existing dependencies

## 🔑 Configuration

Add these to your `.env` file:

```ini
# Existing
OPENAI_API_KEY=your-openai-api-key

# New - Get from https://app.galileo.ai/settings/api-keys
GALILEO_API_KEY=your-galileo-api-key
```

## 🎯 What Gets Traced

### 1. **Complete Evaluation Pipeline**
   - Full end-to-end workflow timing
   - Success/failure status
   - Input/output tracking

### 2. **Marker OCR API Call**
   - PDF extraction timing
   - File size and character count
   - API response metadata

### 3. **Agent LLM Execution**
   - All GPT-5.1 calls
   - Prompt and completion
   - Token usage and costs
   - Duration metrics

### 4. **Tool Executions** (via Agent)
   - `parse_question_paper`
   - `parse_model_answer`
   - `evaluate_answers`
   - `generate_feedback`
   - `generate_audio_feedback`

## 📊 Trace Structure

```
Complete Evaluation Pipeline (Main Trace)
├── Marker OCR API (Tool Span)
│   ├── Input: PDF file name
│   ├── Output: Character count
│   └── Metadata: File size, duration, API URL
│
└── Agent Evaluation (LLM Span)
    ├── Input: System prompt + Student text
    ├── Output: Evaluation results
    ├── Model: gpt-5.1
    └── Duration: Execution time
```

## 🏃 Running the Application

```bash
python main.py
```

**Output will include:**

```
📄 Extracting handwriting from PDF...
✅ Extracted 45,678 characters from PDF

================================================================================
EVALUATION RESULT:
================================================================================
{... evaluation results ...}
================================================================================

🚀 GALILEO TRACING INFORMATION:
🔗 Project   : https://app.galileo.ai/project/abc123
📝 Log Stream: https://app.galileo.ai/project/abc123/log-streams/xyz789
```

## 🔍 Viewing Traces in Galileo

1. Click the **Log Stream** URL from the console output
2. You'll see your trace in the Galileo dashboard
3. Click on the trace to expand and see:
   - Timeline view of all operations
   - Input/output for each step
   - Performance metrics
   - Token usage and costs
   - Error details (if any)

## 📈 Benefits

### Performance Monitoring
- Track evaluation pipeline latency
- Identify bottlenecks (PDF extraction vs LLM calls)
- Monitor API response times

### Cost Tracking
- Token usage per evaluation
- Cost per student assessment
- Model performance analysis

### Quality Assurance
- Review LLM inputs/outputs
- Debug evaluation errors
- Ensure prompt consistency

### Debugging
- See exact failure points
- Inspect intermediate results
- Replay traces for testing

## 🎨 Customization

### Change Project/Stream Names

**In code:**
```python
galileo_context.init(
    project="MyProject",
    log_stream="MyStream"
)
```

**Or in .env:**
```ini
GALILEO_PROJECT=MyProject
GALILEO_LOG_STREAM=MyStream
```

### Add Custom Metadata

```python
logger.add_tool_span(
    name="Custom Step",
    input="...",
    output="...",
    metadata={
        "student_id": "12345",
        "exam_type": "midterm",
        "custom_field": "value"
    }
)
```

## 🔧 Code Changes Summary

### New Files
- `requirements.txt` - Dependencies with Galileo SDK
- `GALILEO_SETUP.md` - Detailed setup guide
- `README_GALILEO.md` - This quick start guide

### Modified Files
- `main.py` - Added Galileo tracing integration
  - Import Galileo SDK
  - Initialize Galileo context
  - Start session and trace
  - Log Marker API calls
  - Log LLM spans
  - Flush logs on exit

## 📚 Documentation

- **Full Setup Guide**: See `GALILEO_SETUP.md`
- **Galileo Docs**: https://docs.galileo.ai
- **API Reference**: https://docs.galileo.ai/sdk-api/python/sdk-reference

## 🆘 Troubleshooting

### No traces appearing
✅ Check your GALILEO_API_KEY in .env
✅ Verify internet connection
✅ Ensure logger.flush() is called

### Rate limit errors
✅ Consider using gpt-4o-mini instead of gpt-5.1
✅ Check OpenAI rate limits

### Import errors
✅ Run: `pip install -r requirements.txt`
✅ Activate your virtual environment

## 🎉 Next Steps

1. **Sign up for Galileo**: https://app.galileo.ai/sign-up
2. **Get your API key**: https://app.galileo.ai/settings/api-keys
3. **Add it to .env**
4. **Run your pipeline**: `python main.py`
5. **View traces**: Click the URL in the output

Enjoy full observability of your EvalMate pipeline! 🚀

