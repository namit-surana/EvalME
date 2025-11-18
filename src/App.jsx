import React, { useState } from 'react';
import UploadScreen from './components/UploadScreen';
import ResultsScreen from './components/ResultsScreen';
import { submitEvaluation, mockSubmitEvaluation } from './services/api';

function App() {
  const [currentScreen, setCurrentScreen] = useState('upload'); // 'upload' or 'results'
  const [answerSheetPreview, setAnswerSheetPreview] = useState(null);
  const [modelAnswerPreview, setModelAnswerPreview] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState(null); // Store uploaded files

  const handleSubmit = async (files) => {
    try {
      // Store uploaded files for display
      setUploadedFiles(files);

      // TODO: Replace with your actual API URL
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/evaluate';
      
      // Use mock API for now - replace with actual API call when ready
      // const response = await submitEvaluation(API_URL, files.answerPaper, files.modelAnswerPaper, files.questionPaper);
      const response = await mockSubmitEvaluation(files.answerPaper, files.modelAnswerPaper, files.questionPaper);

      // Parse the markdown JSON response
      // Assuming the API returns: { answerSheetPreview: "...", modelAnswerPreview: "..." }
      setAnswerSheetPreview(response.answerSheetPreview || response.answerSheet || '');
      setModelAnswerPreview(response.modelAnswerPreview || response.modelAnswer || '');
      
      setCurrentScreen('results');
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Failed to process files. Please check the console for details.');
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

