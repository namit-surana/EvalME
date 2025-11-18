/**
 * API service for handling file uploads and fetching evaluation results
 * 
 * @param {string} apiUrl - The API endpoint URL (default: http://localhost:8000/api/evaluate)
 * @param {File} answerPaper - The answer paper PDF file
 * @param {File} modelAnswerPaper - The model answer paper PDF file (optional)
 * @param {File} questionPaper - The question paper PDF file (optional)
 * @returns {Promise<Object>} - Returns the API response with evaluation results
 */
export const submitEvaluation = async (apiUrl, answerPaper, modelAnswerPaper = null, questionPaper = null) => {
  const formData = new FormData();
  formData.append('answerPaper', answerPaper);
  
  // Only append if files are provided
  if (modelAnswerPaper) {
    formData.append('modelAnswerPaper', modelAnswerPaper);
  }
  if (questionPaper) {
    formData.append('questionPaper', questionPaper);
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

/**
 * Mock API function for testing without a backend
 * Replace this with actual API call when backend is ready
 * 
 * The real API should return:
 * {
 *   modelAnswerPreview: <JSON object with quiz_number, course, term, title, metadata, inventory_table, answers>
 * }
 */
export const mockSubmitEvaluation = async (answerPaper, modelAnswerPaper, questionPaper) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Return empty/null - the real API will return the JSON after evaluating the handwritten PDF
  return {
    answerSheetPreview: `# Answer Sheet Preview\n\n## Student Answers\n\nThe uploaded answer paper is displayed on the left side for review.`,
    modelAnswerPreview: null // Real API will return the JSON object after evaluation
  };
};

