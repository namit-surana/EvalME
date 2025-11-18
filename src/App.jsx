import React, { useState } from 'react';
import UploadScreen from './components/UploadScreen';
import ResultsScreen from './components/ResultsScreen';
import { submitEvaluation } from './services/api';

function App() {
  const [currentScreen, setCurrentScreen] = useState('upload'); // 'upload' or 'results'
  const [answerSheetPreview, setAnswerSheetPreview] = useState(null);
  const [modelAnswerPreview, setModelAnswerPreview] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState(null); // Store uploaded files

  const handleSubmit = async (files) => {
    try {
      // Store uploaded files for display
      setUploadedFiles(files);

      // API URL - can be set via environment variable or defaults to localhost
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/evaluate';
      
      // Call the actual API
      const response = await submitEvaluation(
        API_URL,
        files.answerPaper,
        files.modelAnswerPaper || null,
        files.questionPaper || null
      );

      // The API returns evaluation results directly
      // Store the full response for the evaluation viewer
      setModelAnswerPreview(response);
      
      // For backward compatibility, also set answerSheetPreview
      setAnswerSheetPreview(response.student_file || '');
      
      setCurrentScreen('results');
    } catch (error) {
      console.error('Error processing files:', error);
      alert(`Failed to process files: ${error.message}\n\nPlease check:\n1. The API server is running at ${import.meta.env.VITE_API_URL || 'http://localhost:8000'}\n2. The endpoint is accessible\n3. Check the console for more details.`);
    }
  };

  const handleBack = () => {
    setCurrentScreen('upload');
    setAnswerSheetPreview(null);
    setModelAnswerPreview(null);
    setUploadedFiles(null);
  };

  return (
    <div className="App">
      {currentScreen === 'upload' ? (
        <UploadScreen onSubmit={handleSubmit} />
      ) : (
        <ResultsScreen
          answerPaperFile={uploadedFiles?.answerPaper}
          answerSheetPreview={answerSheetPreview}
          modelAnswerPreview={modelAnswerPreview}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;

