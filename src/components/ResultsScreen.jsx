import React from 'react';
import ReactMarkdown from 'react-markdown';
import PDFViewer from './PDFViewer';

const ResultsScreen = ({ answerPaperFile, answerSheetPreview, modelAnswerPreview, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 glass border-b border-white/10 sticky top-0 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-1">Evaluation Results</h1>
            <p className="text-gray-400 text-sm">AI-Powered Analysis Complete</p>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload New Files
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-6 md:gap-8 h-full">
          {/* Left Panel - Answer Paper PDF */}
          <div className="glass rounded-2xl shadow-2xl p-4 md:p-6 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 flex flex-col">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10 flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-200">Answer Paper PDF</h2>
            </div>
            <div className="w-full flex-1" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column' }}>
              <PDFViewer file={answerPaperFile} />
            </div>
          </div>

          {/* Right Panel - API Output */}
          <div className="glass rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-200">Evaluation Results</h2>
            </div>
            <div className="prose prose-invert prose-headings:text-gray-200 prose-p:text-gray-300 prose-strong:text-purple-400 prose-code:text-cyan-400 prose-pre:bg-gray-800 max-w-none overflow-auto max-h-[calc(100vh-250px)] custom-scrollbar">
              {modelAnswerPreview ? (
                <ReactMarkdown>{modelAnswerPreview}</ReactMarkdown>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mb-4 opacity-50 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-center">Waiting for API response...</p>
                  <p className="text-sm text-gray-400 mt-2">API will be integrated tomorrow</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
