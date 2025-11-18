import React from 'react';

const HandwrittenRecognitionViewer = ({ recognitionData }) => {
  if (!recognitionData) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        {/* Animated AI Processing Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center animate-pulse-slow">
            <svg className="w-12 h-12 text-purple-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Status Text */}
        <h3 className="text-2xl font-bold text-gray-300 mb-2 text-gradient">AI Agent Processing...</h3>
        <p className="text-center text-gray-400 mb-6 max-w-md">
          Extracting and recognizing handwritten text from your answer sheet
        </p>

        {/* Processing Steps */}
        <div className="w-full max-w-lg bg-gray-800/50 rounded-lg p-6 border border-purple-500/20 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-cyan-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-300">Extracting text from PDF</p>
                <p className="text-xs text-gray-500">OCR processing in progress...</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-300">Recognizing handwriting</p>
                <p className="text-xs text-gray-500">AI model analyzing handwritten text...</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-300">Structuring recognized text</p>
                <p className="text-xs text-gray-500">Organizing questions and answers...</p>
              </div>
            </div>
          </div>
        </div>

        {/* What to Expect */}
        <div className="w-full max-w-lg bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20 backdrop-blur-sm mt-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-semibold text-cyan-400">Recognized text will be displayed here</span>
          </div>
          
          {/* Sample Preview */}
          <div className="bg-gray-900/50 rounded-lg p-4 border border-cyan-500/20">
            <div className="space-y-2 text-xs text-gray-400 font-mono">
              <div className="text-cyan-400">Sample recognition output:</div>
              <div className="text-gray-300 pl-2">Question 1: [Recognized text]</div>
              <div className="text-gray-300 pl-2">Answer: [Recognized calculations]</div>
              <div className="text-gray-500 italic">...</div>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>OCR text extraction from handwritten PDF</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Handwriting recognition and transcription</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Structured question and answer extraction</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Formatted display of recognized content</span>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span>Processing your handwritten answer sheet...</span>
        </div>
      </div>
    );
  }

  // If recognitionData is a string, display it as formatted text
  if (typeof recognitionData === 'string') {
    return (
      <div className="space-y-4 text-gray-300">
        <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
          <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Recognized Text
          </h3>
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono bg-gray-900/50 p-4 rounded-lg border border-cyan-500/20">
              {recognitionData}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If recognitionData is an object with structured data
  if (typeof recognitionData === 'object') {
    return (
      <div className="space-y-4 text-gray-300">
        {/* Header Info */}
        {recognitionData.course && (
          <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-semibold">
                {recognitionData.quiz_number ? `Quiz #${recognitionData.quiz_number}` : 'Document'}
              </span>
              {recognitionData.term && (
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-semibold">
                  {recognitionData.term}
                </span>
              )}
            </div>
            {recognitionData.course && (
              <p className="text-purple-400 font-medium">{recognitionData.course}</p>
            )}
          </div>
        )}

        {/* Recognized Text Content */}
        {recognitionData.text && (
          <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Handwritten Text Recognition
            </h3>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed bg-gray-900/50 p-4 rounded-lg border border-cyan-500/20 font-sans">
                {recognitionData.text}
              </div>
            </div>
          </div>
        )}

        {/* Questions/Answers if structured */}
        {recognitionData.questions && recognitionData.questions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Recognized Questions & Answers
            </h3>
            {recognitionData.questions.map((q, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-lg p-5 border border-purple-500/20">
                {q.question && (
                  <div className="mb-3">
                    <span className="inline-block w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs mr-2">
                      {idx + 1}
                    </span>
                    <span className="text-gray-200 font-medium">{q.question}</span>
                  </div>
                )}
                {q.answer && (
                  <div className="ml-8 mt-2 p-3 bg-gray-900/50 rounded border border-cyan-500/20">
                    <p className="text-sm text-gray-300 whitespace-pre-wrap">{q.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Raw recognized text as fallback */}
        {!recognitionData.text && !recognitionData.questions && (
          <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">Recognized Content</h3>
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed bg-gray-900/50 p-4 rounded-lg border border-cyan-500/20 font-mono text-gray-300">
                {JSON.stringify(recognitionData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default HandwrittenRecognitionViewer;

