# Setup Instructions - Fix Agents Package Issue

## Problem

You have the wrong `agents` package installed (a reinforcement learning package with TensorFlow), but you need the `openai-agents` package for AI/LLM agents.

## Solution

Run these commands in PowerShell:

### Step 1: Uninstall the wrong agents package

```powershell
pip uninstall -y agents
```

### Step 2: Make sure openai-agents is installed

```powershell
pip install openai-agents
```

### Step 3: Verify installation

```powershell
python -c "from agents import Agent, Runner, function_tool; print('Success! Agents SDK is working')"
```

If you see "Success! Agents SDK is working", you're good to go!

### Step 4: Run your application

```powershell
python main.py
```

## All-in-One Command

Or run this single command to do everything:

```powershell
pip uninstall -y agents; pip install openai-agents; python -c "from agents import Agent, Runner, function_tool; print('Setup complete!')"
```

## What Changed

Updated `requirements.txt` to specify `openai-agents` instead of just `agents` to avoid this confusion in the future.

## How OpenAI Agents SDK Works

Based on the official documentation, the SDK uses:

```python
from agents import Agent, Runner, function_tool

# Create an agent
agent = Agent(
    name="EvalMate",
    instructions="Your instructions here",
    tools=[your_functions]  # List of @function_tool decorated functions
)

# Run the agent
result = Runner.run_sync(agent, "Your prompt here")
print(result.final_output)
```

This is exactly how your `main.py` is structured! ✅

## Your Code Structure

Your code already follows the correct pattern:

1. **Tools are registered with `@function_tool` decorator**:
   ```python
   @function_tool
   def parse_question_paper() -> str:
       questions = load_question_paper()
       return json.dumps({"questions": questions})
   ```

2. **Agent is created with tools**:
   ```python
   agent = Agent(
       name="EvalMate",
       instructions=agent_prompt,
       model="gpt-5.1",
       tools=[parse_question_paper, parse_model_answer, evaluate_student_answers]
   )
   ```

3. **Runner executes the agent**:
   ```python
   result = Runner.run_sync(agent, f"Use the registered tools to evaluate...")
   ```

Everything is correct! You just need the right package installed.

## Need Help?

If you still see errors after running the setup commands, check:

1. **Environment**: Make sure you're in the right Python environment (venv/conda)
2. **Python version**: OpenAI Agents SDK requires Python 3.9 or newer
3. **API Keys**: Ensure `OPENAI_API_KEY` and `GALILEO_API_KEY` are set in your `.env` file

## Quick Test

Test if everything works:

```powershell
# Test 1: Check imports
python -c "from agents import Agent, Runner, function_tool; print('✅ Imports work')"

# Test 2: Check JSON files load
python evalmate/tools.py

# Test 3: Run full pipeline
python main.py
```

You're all set! 🚀

