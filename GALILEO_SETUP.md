# Galileo Tracing Setup Guide

## Overview
This guide will help you set up Galileo tracing for the EvalMate pipeline.

## Prerequisites
1. A Galileo account (sign up at https://app.galileo.ai/sign-up)
2. Python environment with pip installed

## Step 1: Install Dependencies

Run the following command to install all required packages:

```bash
pip install -r requirements.txt
```

This will install:
- `requests` - For HTTP requests
- `agents` - For the AI agent framework
- `python-dotenv` - For environment variable management
- `galileo[openai]` - Galileo SDK with OpenAI support

## Step 2: Get Your Galileo API Key

1. Go to https://app.galileo.ai/settings/api-keys
2. Create a new API key
3. Copy the API key

## Step 3: Update Your .env File

Create or update your `.env` file in the project root with the following variables:

```ini
# OpenAI API Key (required)
OPENAI_API_KEY=your-openai-api-key-here

# Galileo API Key (required for tracing)
GALILEO_API_KEY=your-galileo-api-key-here

# Optional: Custom Galileo Console URL (only if not using app.galileo.ai)
# GALILEO_CONSOLE_URL=your-galileo-console-url

# Optional: Override project and log stream names
# GALILEO_PROJECT=EvalMate
# GALILEO_LOG_STREAM=StudentEvaluation
```

## Step 4: Run Your Application

Once configured, run your application:

```bash
python main.py
```

## What Gets Traced

The Galileo integration will trace:

1. **Complete Evaluation Pipeline** - The entire workflow from PDF to final evaluation
2. **Marker OCR API** - PDF extraction with metadata (file size, extraction time, character count)
3. **Agent LLM Calls** - All GPT model calls with input/output, tokens, and duration
4. **Tool Executions** - Each tool call from the agent workflow

## Viewing Your Traces

After running the application, you'll see output like:

```
🚀 GALILEO TRACING INFORMATION:
🔗 Project   : https://app.galileo.ai/project/...
📝 Log Stream: https://app.galileo.ai/project/.../log-streams/...
```

Click on these links to:
- View the complete trace timeline
- Analyze LLM performance and costs
- Debug errors and latency issues
- Evaluate response quality

## Traced Components

### 1. PDF Extraction (Marker API)
- **Span Type**: Tool Span
- **Metadata**:
  - API URL
  - Output format
  - File size (KB)
  - Extracted text length
  - Duration

### 2. Agent Evaluation
- **Span Type**: LLM Span
- **Data Captured**:
  - System prompt (agent instructions)
  - User input (student text)
  - Model output (evaluation results)
  - Model name (gpt-5.1)
  - Duration in nanoseconds

### 3. Complete Pipeline
- **Span Type**: Trace
- **Captures**: End-to-end workflow timing and success/failure status

## Troubleshooting

### Error: "GALILEO_API_KEY not found"
- Make sure your `.env` file is in the project root
- Verify the API key is correctly set in the `.env` file

### Error: "Failed to connect to Galileo"
- Check your internet connection
- Verify your Galileo API key is valid
- Check if GALILEO_CONSOLE_URL is set correctly (if using self-hosted)

### Traces not showing up
- Make sure `logger.flush()` is called at the end
- Check the console output for the Galileo project/log stream URLs
- Verify your Galileo account has access to the project

## Advanced Configuration

### Custom Project/Log Stream Names

You can customize the project and log stream names by:

1. **In code** (main.py):
```python
galileo_context.init(
    project="MyCustomProject",
    log_stream="MyCustomStream"
)
```

2. **In .env file**:
```ini
GALILEO_PROJECT=MyCustomProject
GALILEO_LOG_STREAM=MyCustomStream
```

### Adding Custom Metadata

You can add custom metadata to any span:

```python
logger.add_tool_span(
    name="Custom Tool",
    input="...",
    output="...",
    metadata={
        "custom_field_1": "value1",
        "custom_field_2": "value2"
    }
)
```

## Support

For more information:
- Galileo Documentation: https://docs.galileo.ai
- EvalMate Repository: Check the README.md

