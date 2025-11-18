# How the Agent Tools Work with Your JSON Files

## ✅ Successfully Configured!

Your EvalMate system is now set up to load questions and answers from your JSON files automatically when the agent calls the tools.

## 🔄 How It Works

### When the Agent Calls `parse_question_paper`:

1. The agent calls the tool: `parse_question_paper()`
2. The tool reads `modelquestionpaper.json` from your project folder
3. It extracts questions from the `"required"` array
4. It converts them to standard format:
   ```json
   {
     "id": "Q1",
     "question": "Suppose Othmer Company uses FIFO...",
     "marks": 10
   }
   ```
5. Returns the questions to the agent

### When the Agent Calls `parse_model_answer`:

1. The agent calls the tool: `parse_model_answer()`
2. The tool reads `modelanswerpaper.json` from your project folder
3. It extracts key points from the `"answers"` array
4. It automatically extracts:
   - Final answers (e.g., `125`, `-65`, `-255`)
   - Methods (e.g., `FIFO`, `LIFO`)
   - Working details (e.g., `units_sold: 10`, `COGS: 165`)
   - Effects (e.g., `No Effect`)
5. Returns all key points to the agent

### When the Agent Evaluates:

1. Agent calls: `evaluate_student_answers(questions, model_keys, student_text)`
2. The tool compares student text against key points
3. Scoring is automatic: `(matched_keys / total_keys) × marks`
4. Returns: scores, matched points, missing points

## 📊 Your Current Setup

**From modelquestionpaper.json:**
- ✅ Q1: FIFO inventory valuation (10 marks)
- ✅ Q2: LIFO gross profit (10 marks)  
- ✅ Q3: LIFO pretax income (10 marks)
- ✅ Q4: Lower of cost or NRV (10 marks)

**From modelanswerpaper.json:**
- ✅ Q1: 6 key points extracted (125, FIFO, ending_units, etc.)
- ✅ Q2: 6 key points extracted (-65, LIFO, COGS, etc.)
- ✅ Q3: 5 key points extracted (-255, LIFO, operating_expenses, etc.)
- ✅ Q4: 9 key points extracted (No adjustment, No effect, etc.)

## 🎯 Complete Workflow

```
1. Student PDF uploaded
         ↓
2. Marker API extracts handwriting
         ↓
3. Agent calls parse_question_paper()
   → Loads from modelquestionpaper.json
   → Returns 4 questions
         ↓
4. Agent calls parse_model_answer()
   → Loads from modelanswerpaper.json
   → Returns key points for all questions
         ↓
5. Agent calls evaluate_student_answers()
   → Matches student text against key points
   → Calculates scores
   → Returns evaluation results
         ↓
6. Agent generates feedback
         ↓
7. All steps traced in Galileo
```

## 🔧 How to Update Questions

### To Change Questions:

Edit `modelquestionpaper.json`:

```json
{
  "required": [
    {
      "id": 5,
      "question": "Your new question here?",
      "marks": 15
    }
  ]
}
```

### To Change Model Answers:

Edit `modelanswerpaper.json`:

```json
{
  "answers": [
    {
      "id": 5,
      "question": "Your new question here?",
      "solution": {
        "method": "Method Name",
        "workings": {
          "step1": "value1",
          "step2": "value2"
        },
        "final_answer": "The answer"
      }
    }
  ]
}
```

**Important:** The tool automatically extracts:
- All values from `workings`
- The `final_answer`
- The `method`

These become the key points for evaluation!

## 🚀 Running the System

```bash
python main.py
```

The agent will:
1. ✅ Call `parse_question_paper()` → Load your questions
2. ✅ Call `parse_model_answer()` → Load your model answers
3. ✅ Call `evaluate_student_answers()` → Score the student
4. ✅ Generate feedback
5. ✅ Log everything to Galileo

## 📝 What Gets Traced in Galileo

Every tool call is logged:
- **parse_question_paper**: Shows which questions were loaded
- **parse_model_answer**: Shows which key points were extracted  
- **evaluate_student_answers**: Shows scores and matched/missing points
- **Full pipeline**: End-to-end timing and results

## ✨ Key Features

### 1. Automatic Key Point Extraction
You don't need to manually specify key points! The system automatically extracts them from your detailed solution format.

### 2. Flexible JSON Format
The system handles your detailed JSON format with:
- Metadata (course, quiz number, etc.)
- Inventory tables
- Detailed workings
- Final answers

### 3. No Code Changes Needed
Update questions/answers → Just edit JSON files → Run again!

### 4. Complete Traceability
Every step logged to Galileo for debugging and analysis

## 🎓 Example Evaluation

**Student writes:** "Using FIFO, the ending inventory is 125. Under LIFO, gross profit is -65 and pretax income is -255."

**System evaluates:**
- Q1 (FIFO): Matched "125" and "FIFO" → 2/6 points matched → Score: 3.33/10
- Q2 (LIFO): Matched "-65", "LIFO" → 2/6 points matched → Score: 3.33/10
- Q3 (LIFO): Matched "-255", "LIFO" → 2/5 points matched → Score: 4.0/10
- Q4: No matches → Score: 0/10

**Agent generates feedback:**
"Good job identifying the FIFO ending inventory value and key profit figures. However, you missed showing the detailed workings..."

## 🔍 Testing

Test the tools directly:

```bash
python evalmate/tools.py
```

This will:
- Load your questions
- Load your model answers
- Show what key points were extracted
- Run a sample evaluation

## 📚 Your Financial Accounting Quiz

**Currently Loaded:**
- **Course**: ACCT GB 1306 - Financial Accounting
- **Term**: Fall 2025
- **Quiz**: #3
- **Company**: Othmer Company
- **System**: Periodic Inventory System

**Questions:**
1. FIFO inventory balance on Dec 31, 20X5
2. LIFO gross profit for 20X5
3. LIFO pretax income
4. Lower of cost or NRV adjustment and net income effect

All questions and answers are loaded automatically from your JSON files! 🎉

## ⚙️ Technical Details

**Files Modified:**
- `main.py`: Registered tools with agent using `@function_tool` decorator
- `evalmate/tools.py`: Added `load_question_paper()` and `load_model_answers()` functions

**Tool Registration:**
```python
@function_tool
def parse_question_paper() -> str:
    """Loads from modelquestionpaper.json"""
    questions = load_question_paper()
    return json.dumps({"questions": questions})

@function_tool  
def parse_model_answer() -> str:
    """Loads from modelanswerpaper.json"""
    model_keys = load_model_answers()
    return json.dumps({"model_keys": model_keys})
```

**Agent Configuration:**
```python
agent = Agent(
    name="EvalMate",
    instructions=agent_prompt,
    model="gpt-5.1",
    tools=[parse_question_paper, parse_model_answer, evaluate_student_answers]
)
```

The agent now has access to these three tools and will call them automatically based on the instructions in `evalmate/agent_prompt.md`!

## 🎉 Summary

✅ Agent tools now load from your JSON files  
✅ Questions loaded from `modelquestionpaper.json`  
✅ Model answers loaded from `modelanswerpaper.json`  
✅ Key points automatically extracted from solutions  
✅ Evaluation works with your Financial Accounting quiz  
✅ All steps traced in Galileo  
✅ No code changes needed to update questions  

**Your system is ready to use!** 🚀

