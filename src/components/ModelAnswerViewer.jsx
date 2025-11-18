import React from 'react';

const ModelAnswerViewer = ({ modelAnswerData }) => {
  if (!modelAnswerData) {
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
          Analyzing the handwritten answer sheet and generating evaluation results
        </p>

        {/* JSON Format Preview */}
        <div className="w-full max-w-lg bg-gray-800/50 rounded-lg p-6 border border-purple-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-sm font-semibold text-cyan-400">Results will be in JSON format</span>
          </div>
          
          {/* Sample JSON Structure Preview */}
          <div className="bg-gray-900/50 rounded-lg p-4 border border-cyan-500/20 font-mono text-xs overflow-x-auto">
            <div className="space-y-1 text-gray-400">
              <div><span className="text-purple-400">{'{'}</span></div>
              <div className="pl-4"><span className="text-cyan-400">"quiz_number"</span>: <span className="text-green-400">3</span>,</div>
              <div className="pl-4"><span className="text-cyan-400">"course"</span>: <span className="text-yellow-400">"..."</span>,</div>
              <div className="pl-4"><span className="text-cyan-400">"metadata"</span>: <span className="text-purple-400">{'{'}</span> <span className="text-gray-500">...</span> <span className="text-purple-400">{'}'}</span>,</div>
              <div className="pl-4"><span className="text-cyan-400">"inventory_table"</span>: <span className="text-purple-400">{'{'}</span> <span className="text-gray-500">...</span> <span className="text-purple-400">{'}'}</span>,</div>
              <div className="pl-4"><span className="text-cyan-400">"answers"</span>: <span className="text-purple-400">[</span> <span className="text-gray-500">...</span> <span className="text-purple-400">]</span></div>
              <div><span className="text-purple-400">{'}'}</span></div>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Structured question analysis</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Detailed solution workings</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Formatted tables and calculations</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Final answers with explanations</span>
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
          <span>Processing your answer sheet...</span>
        </div>
      </div>
    );
  }

  const { quiz_number, course, term, title, metadata, inventory_table, answers } = modelAnswerData;

  return (
    <div className="space-y-6 text-gray-300">
      {/* Header Section */}
      <div className="border-b border-purple-500/30 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-semibold">
            Quiz #{quiz_number}
          </span>
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-semibold">
            {term}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-200 mb-1">{title}</h2>
        <p className="text-purple-400 font-medium">{course}</p>
      </div>

      {/* Metadata Section */}
      {metadata && (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
          <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Context Information
          </h3>
          <div className="space-y-2 text-sm">
            {metadata.company && (
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-medium w-32">Company:</span>
                <span className="text-gray-300">{metadata.company}</span>
              </div>
            )}
            {metadata.inventory_system && (
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-medium w-32">System:</span>
                <span className="text-gray-300">{metadata.inventory_system}</span>
              </div>
            )}
            {metadata.accounting_period_end && (
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-medium w-32">Period End:</span>
                <span className="text-gray-300">{metadata.accounting_period_end}</span>
              </div>
            )}
            {metadata.context && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-gray-400 italic">{metadata.context}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inventory Table */}
      {inventory_table && (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
          <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Inventory Data
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-500/30">
                  {inventory_table.columns.map((col, idx) => (
                    <th key={idx} className="text-left py-2 px-3 text-purple-400 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inventory_table.rows.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <td className="py-2 px-3 text-gray-300">{row.item}</td>
                    <td className="py-2 px-3 text-gray-300 text-center">
                      {row.units !== null ? row.units : '-'}
                    </td>
                    <td className="py-2 px-3 text-gray-300 text-right">
                      {row.unit_cost !== null ? `$${row.unit_cost}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Answers Section */}
      {answers && answers.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Model Answers
          </h3>
          
          {answers.map((answer) => (
            <div key={answer.id} className="bg-gray-800/50 rounded-lg p-5 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              {/* Question */}
              <div className="mb-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                    {answer.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-200 font-medium leading-relaxed">{answer.question}</p>
                  </div>
                </div>
              </div>

              {/* Solution */}
              {answer.solution && (
                <div className="ml-11 space-y-4">
                  {/* Method Badge */}
                  {answer.solution.method && (
                    <div className="inline-block">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-semibold">
                        {answer.solution.method}
                      </span>
                    </div>
                  )}

                  {/* Workings */}
                  {answer.solution.workings && (
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-cyan-500/20">
                      <h4 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Workings
                      </h4>
                      <div className="space-y-2 text-sm">
                        {Object.entries(answer.solution.workings).map(([key, value]) => {
                          // Skip complex nested objects for now
                          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                            return null;
                          }
                          
                          if (Array.isArray(value)) {
                            return (
                              <div key={key} className="flex items-start gap-2">
                                <span className="text-cyan-400 font-medium capitalize min-w-[140px]">
                                  {key.replace(/_/g, ' ')}:
                                </span>
                                <div className="flex-1 space-y-1">
                                  {value.map((item, idx) => (
                                    <div key={idx} className="text-gray-300 pl-4">
                                      {typeof item === 'object' ? (
                                        <div className="space-y-1">
                                          {Object.entries(item).map(([k, v]) => (
                                            <div key={k} className="text-xs">
                                              <span className="text-purple-400">{k}:</span> {String(v)}
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        String(item)
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          
                          return (
                            <div key={key} className="flex items-center gap-2">
                              <span className="text-cyan-400 font-medium capitalize min-w-[140px]">
                                {key.replace(/_/g, ' ')}:
                              </span>
                              <span className="text-gray-300">
                                {typeof value === 'number' && key.toLowerCase().includes('cost') || key.toLowerCase().includes('value') || key.toLowerCase().includes('revenue') || key.toLowerCase().includes('profit') || key.toLowerCase().includes('income') || key.toLowerCase().includes('expense')
                                  ? `$${value}`
                                  : String(value)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Final Answer */}
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/40">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="text-sm font-bold text-green-400">Final Answer</h4>
                    </div>
                    {typeof answer.solution.final_answer === 'object' ? (
                      <div className="space-y-1 text-sm">
                        {Object.entries(answer.solution.final_answer).map(([key, value]) => (
                          <div key={key} className="text-gray-200">
                            <span className="text-purple-400 font-medium capitalize">{key.replace(/_/g, ' ')}:</span> {String(value)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-lg font-bold text-gray-200">
                        {typeof answer.solution.final_answer === 'number' && answer.solution.final_answer < 0
                          ? `$${answer.solution.final_answer}`
                          : typeof answer.solution.final_answer === 'number'
                          ? `$${answer.solution.final_answer}`
                          : answer.solution.final_answer}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelAnswerViewer;

