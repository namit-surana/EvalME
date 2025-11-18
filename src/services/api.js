/**
 * API service for handling file uploads and fetching evaluation results
 * 
 * @param {string} apiUrl - The API endpoint URL
 * @param {File} answerPaper - The answer paper PDF file
 * @param {File} modelAnswerPaper - The model answer paper PDF file
 * @param {File} questionPaper - The question paper PDF file
 * @returns {Promise<Object>} - Returns the API response in markdown JSON format
 */
export const submitEvaluation = async (apiUrl, answerPaper, modelAnswerPaper, questionPaper) => {
  const formData = new FormData();
  formData.append('answerPaper', answerPaper);
  formData.append('modelAnswerPaper', modelAnswerPaper);
  formData.append('questionPaper', questionPaper);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

/**
 * Mock API function for testing without a backend
 * Replace this with actual API call when backend is ready
 */
export const mockSubmitEvaluation = async (answerPaper, modelAnswerPaper, questionPaper) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Return mock markdown JSON format
  return {
    answerSheetPreview: `# Answer Sheet Preview\n\n## Student Answers\n\n**Question 1:**\nThe student provided a comprehensive answer covering the main points.\n\n**Question 2:**\nThe answer demonstrates good understanding of the concepts.\n\n**Question 3:**\nSome areas need improvement in clarity and detail.`,
    modelAnswerPreview: `# Model Answer Preview\n\n## Expected Answers\n\n**Question 1:**\nThe model answer should include:\n- Point A\n- Point B\n- Point C\n\n**Question 2:**\nKey concepts to cover:\n1. Concept 1\n2. Concept 2\n3. Concept 3\n\n**Question 3:**\nDetailed explanation with examples and references.`
  };
};

