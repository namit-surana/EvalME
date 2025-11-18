import React, { useState, useEffect } from 'react';

const PDFViewer = ({ file }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (file) {
      // Create a blob URL from the file
      const url = URL.createObjectURL(file);
      setPdfUrl(url);

      // Cleanup: revoke the URL when component unmounts or file changes
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPdfUrl(null);
    }
  }, [file]);

  if (!file) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[600px] text-gray-500">
        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>No PDF file available</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[600px] text-red-400">
        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-center">Error loading PDF: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-gray-900 border border-white/10" style={{ minHeight: '70vh', height: '100%' }}>
      {pdfUrl && (
        <iframe
          src={`${pdfUrl}#toolbar=1&zoom=page-width&view=FitH`}
          className="w-full h-full border-0"
          title="PDF Viewer"
          style={{ minHeight: '70vh', height: '100%', width: '100%' }}
          onError={() => setError('Failed to load PDF')}
        />
      )}
    </div>
  );
};

export default PDFViewer;

