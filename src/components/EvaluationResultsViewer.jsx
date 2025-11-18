import React from 'react';

const EvaluationResultsViewer = ({ evaluationData }) => {
  if (!evaluationData || !evaluationData.evaluation) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <div className="text-center">
          <p className="text-gray-500">No evaluation data available</p>
        </div>
      </div>
    );
  }

  const { evaluation, metadata, galileo, success, timestamp, student_file } = evaluationData;
  const results = evaluation?.results || {};
  const questions = Object.keys(results).sort();

  // Calculate total score
  const totalScore = questions.reduce((sum, q) => sum + (results[q]?.score || 0), 0);
  const totalOutOf = questions.reduce((sum, q) => sum + (results[q]?.out_of || 0), 0);
  const percentage = totalOutOf > 0 ? ((totalScore / totalOutOf) * 100).toFixed(1) : 0;

  // Get color based on percentage
  const getScoreColor = (score, outOf) => {
    const percent = outOf > 0 ? (score / outOf) * 100 : 0;
    if (percent >= 80) return 'text-green-400';
    if (percent >= 60) return 'text-yellow-400';
    if (percent >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score, outOf) => {
    const percent = outOf > 0 ? (score / outOf) * 100 : 0;
    if (percent >= 80) return 'bg-green-500/20 border-green-500/40';
    if (percent >= 60) return 'bg-yellow-500/20 border-yellow-500/40';
    if (percent >= 40) return 'bg-orange-500/20 border-orange-500/40';
    return 'bg-red-500/20 border-red-500/40';
  };

  return (
    <div className="space-y-6 text-gray-300">
      {/* Overall Summary */}
      <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-2">Evaluation Summary</h3>
            <p className="text-sm text-gray-400">
              {student_file && `File: ${student_file}`}
              {timestamp && ` • Processed: ${timestamp}`}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getScoreColor(totalScore, totalOutOf)}`}>
              {totalScore.toFixed(2)}/{totalOutOf}
            </div>
            <div className="text-lg text-gray-400 mt-1">{percentage}%</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              percentage >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
              percentage >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
              percentage >= 40 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
              'bg-gradient-to-r from-red-500 to-pink-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Metadata */}
      {metadata && (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/20">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-cyan-400">Processing Info</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
            {metadata.model && <div>Model: <span className="text-gray-300">{metadata.model}</span></div>}
            {metadata.project && <div>Project: <span className="text-gray-300">{metadata.project}</span></div>}
            {metadata.extracted_text_length && (
              <div className="col-span-2">
                Extracted Text: <span className="text-gray-300">{metadata.extracted_text_length} characters</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-200 flex items-center gap-2">
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Question Analysis
        </h3>

        {questions.map((questionKey) => {
          const q = results[questionKey];
          const questionPercent = q.out_of > 0 ? ((q.score / q.out_of) * 100).toFixed(1) : 0;

          return (
            <div
              key={questionKey}
              className={`bg-gray-800/50 rounded-xl p-5 border backdrop-blur-sm ${getScoreBgColor(q.score, q.out_of)}`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
                    questionPercent >= 80 ? 'bg-green-500' :
                    questionPercent >= 60 ? 'bg-yellow-500' :
                    questionPercent >= 40 ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}>
                    {questionKey}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-200">{questionKey}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-2xl font-bold ${getScoreColor(q.score, q.out_of)}`}>
                        {q.score.toFixed(2)}
                      </span>
                      <span className="text-gray-500">/</span>
                      <span className="text-gray-400">{q.out_of}</span>
                      <span className="text-sm text-gray-500">({questionPercent}%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Matched Items */}
              {q.matched && q.matched.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-semibold text-green-400">Matched Elements</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {q.matched.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs border border-green-500/30"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Items */}
              {q.missing && q.missing.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm font-semibold text-red-400">Missing Elements</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {q.missing.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-xs border border-red-500/30"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback */}
              {q.feedback && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-cyan-400 mb-1">Feedback</p>
                      <p className="text-sm text-gray-300 leading-relaxed">{q.feedback}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Audio URL (if available) */}
              {q.audio_url && (
                <div className="mt-3">
                  <audio controls className="w-full">
                    <source src={q.audio_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Galileo Links */}
      {galileo && (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span className="text-sm font-semibold text-purple-400">Galileo AI Links</span>
          </div>
          <div className="space-y-2 text-xs">
            {galileo.project_url && (
              <a
                href={galileo.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1"
              >
                View Project
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {galileo.log_stream_url && (
              <a
                href={galileo.log_stream_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1"
              >
                View Log Stream
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationResultsViewer;

