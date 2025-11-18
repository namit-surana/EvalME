import React, { useState } from 'react';

const UploadScreen = ({ onSubmit }) => {
  const [answerPaper, setAnswerPaper] = useState(null);
  const [modelAnswerPaper, setModelAnswerPaper] = useState(null);
  const [questionPaper, setQuestionPaper] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (type, file) => {
    if (file && file.type === 'application/pdf') {
      switch (type) {
        case 'answer':
          setAnswerPaper(file);
          break;
        case 'model':
          setModelAnswerPaper(file);
          break;
        case 'question':
          setQuestionPaper(file);
          break;
        default:
          break;
      }
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleRemoveFile = (type) => {
      switch (type) {
        case 'answer':
          setAnswerPaper(null);
          break;
        case 'model':
          setModelAnswerPaper(null);
          break;
        case 'question':
          setQuestionPaper(null);
          break;
        default:
          break;
      }
  };

  const handleSubmit = async () => {
    if (!answerPaper) {
      alert('Please upload the Answer Paper PDF file');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        answerPaper,
        modelAnswerPaper,
        questionPaper,
      });
    } catch (error) {
      console.error('Error submitting files:', error);
      alert('Error submitting files. Please check the console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUploadButton = ({ label, type, file, onChange, onRemove, gradient }) => (
    <div className="flex flex-col items-center space-y-3 group max-w-md mx-auto">
      <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 glass hover:border-cyan-400/50 hover:glow-cyan overflow-hidden">
        {/* Animated background gradient */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${gradient}`}></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center pt-3 pb-4 px-4">
          {!file ? (
            <>
              <div className="mb-2 animate-float">
                <svg
                  className="w-10 h-10 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <p className="mb-1 text-xs text-gray-300">
                <span className="font-semibold text-cyan-400">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">PDF only</p>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center animate-pulse-slow">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-xs font-medium text-green-400">File Uploaded</p>
            </div>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={(e) => {
            onChange(type, e.target.files[0]);
            e.target.value = '';
          }}
        />
      </label>
      
      <div className="text-center">
        <span className="text-xs font-semibold text-gray-300 block mb-2">{label}</span>
        {file && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-green-500/30">
            <span className="text-xs text-green-400 font-medium max-w-[180px] truncate flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {file.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(type);
              }}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded p-1 transition-all duration-200 flex-shrink-0"
              title="Remove file"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const allFilesUploaded = answerPaper; // Answer paper is required, others are optional

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient animate-float">
            EvalAgent
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">
            AI-Powered Answer Sheet Evaluation System
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
            <div className="h-1 w-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="glass rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-xl">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FileUploadButton
                label="Answer Paper PDF"
                type="answer"
                file={answerPaper}
                onChange={handleFileChange}
                onRemove={handleRemoveFile}
                gradient="from-cyan-500 to-blue-500"
              />
              <FileUploadButton
                label="Model Answer PDF"
                type="model"
                file={modelAnswerPaper}
                onChange={handleFileChange}
                onRemove={handleRemoveFile}
                gradient="from-purple-500 to-pink-500"
              />
              <FileUploadButton
                label="Question Paper PDF"
                type="question"
                file={questionPaper}
                onChange={handleFileChange}
                onRemove={handleRemoveFile}
                gradient="from-blue-500 to-cyan-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !allFilesUploaded}
                className={`relative px-8 py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-300 transform ${
                  isSubmitting || !allFilesUploaded
                    ? 'bg-gray-700 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Evaluate Now
                  </span>
                )}
                {allFilesUploaded && !isSubmitting && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 opacity-0 hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Upload the Answer Paper PDF (required) and optionally Model Answer & Question Paper PDFs</p>
        </div>
      </div>
    </div>
  );
};

export default UploadScreen;
