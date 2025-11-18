# EvalME - Answer Sheet Evaluator

A React.js application with Tailwind CSS for evaluating answer sheets by comparing them with model answers.

> **Note:** CodeRabbit is configured for automated code reviews.

## Features

- **Upload Screen**: Upload three PDF files (Answer Paper, Model Answer Paper, and Question Paper)
- **Results Screen**: View side-by-side preview of the answer sheet and model answer in markdown format
- **API Integration**: Ready to integrate with your evaluation API endpoint

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. (Optional) Create a `.env` file in the root directory with your API URL:
```
VITE_API_URL=http://your-api-url/api/evaluate
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
EvalME/
├── src/
│   ├── components/
│   │   ├── UploadScreen.jsx    # First screen with PDF upload buttons
│   │   └── ResultsScreen.jsx   # Second screen with preview panels
│   ├── services/
│   │   └── api.js              # API integration service
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind CSS imports
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## API Integration

The app expects your API to:
- Accept POST requests with multipart/form-data
- Receive three files: `answerPaper`, `modelAnswerPaper`, and `questionPaper`
- Return a JSON response with the following structure:
```json
{
  "answerSheetPreview": "# Markdown content for answer sheet",
  "modelAnswerPreview": "# Markdown content for model answer"
}
```

To use the actual API instead of the mock:
1. Update `src/App.jsx` and uncomment the real API call
2. Comment out or remove the mock API call
3. Set the `VITE_API_URL` environment variable

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- React Markdown
