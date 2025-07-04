import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddQuestionForm() {
  // Individual state variables for each field
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState('');

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
const id = new URLSearchParams(window.location.search).get('testId');
  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!question.trim()) {
      newErrors.question = 'Question is required';
    }
    
    if (!optionA.trim()) {
      newErrors.optionA = 'Option A is required';
    }
    
    if (!optionB.trim()) {
      newErrors.optionB = 'Option B is required';
    }
    
    if (!optionC.trim()) {
      newErrors.optionC = 'Option C is required';
    }
    
    if (!optionD.trim()) {
      newErrors.optionD = 'Option D is required';
    }
    
    if (!correctOption) {
      newErrors.correctOption = 'Correct option is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (validateForm()) {
      const formData = {
        id,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctOption
      };

      try {
        const response = await axios.post("http://localhost:8080/api/test/question", formData);
        console.log('Question added successfully:', response.data);
        
        // Reset all fields
        setQuestion('');
        setOptionA('');
        setOptionB('');
        setOptionC('');
        setOptionD('');
        setCorrectOption('');
        setErrors({});
        
        alert('Question added successfully!');
        navigate('/admin-dashboard');
      } catch (error) {
        console.error('Error adding question:', error);
        alert("Failed to add question.");
      }
    }
  };

  const handleClear = () => {
    setQuestion('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectOption('');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Question</h1>
            <p className="text-gray-600">Create a multiple choice question with four options</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <textarea
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  clearError('question');
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                  errors.question ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={3}
                placeholder="Enter question"
              />
              {errors.question && (
                <p className="mt-1 text-sm text-red-500">{errors.question}</p>
              )}
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option A */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Option A
                </label>
                <input
                  type="text"
                  value={optionA}
                  onChange={(e) => {
                    setOptionA(e.target.value);
                    clearError('optionA');
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.optionA ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter option a"
                />
                {errors.optionA && (
                  <p className="mt-1 text-sm text-red-500">{errors.optionA}</p>
                )}
              </div>

              {/* Option B */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Option B
                </label>
                <input
                  type="text"
                  value={optionB}
                  onChange={(e) => {
                    setOptionB(e.target.value);
                    clearError('optionB');
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.optionB ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter option b"
                />
                {errors.optionB && (
                  <p className="mt-1 text-sm text-red-500">{errors.optionB}</p>
                )}
              </div>

              {/* Option C */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Option C
                </label>
                <input
                  type="text"
                  value={optionC}
                  onChange={(e) => {
                    setOptionC(e.target.value);
                    clearError('optionC');
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.optionC ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter option c"
                />
                {errors.optionC && (
                  <p className="mt-1 text-sm text-red-500">{errors.optionC}</p>
                )}
              </div>

              {/* Option D */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Option D
                </label>
                <input
                  type="text"
                  value={optionD}
                  onChange={(e) => {
                    setOptionD(e.target.value);
                    clearError('optionD');
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.optionD ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter option d"
                />
                {errors.optionD && (
                  <p className="mt-1 text-sm text-red-500">{errors.optionD}</p>
                )}
              </div>
            </div>

            {/* Correct Option Select */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Option
              </label>
              <select
                value={correctOption}
                onChange={(e) => {
                  setCorrectOption(e.target.value);
                  clearError('correctOption');
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.correctOption ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select correct option</option>
                <option value={optionA}>Option A</option>
                <option value={optionB}>Option B</option>
                <option value={optionC}>Option C</option>
                <option value={optionD}>Option D</option>
              </select>
              {errors.correctOption && (
                <p className="mt-1 text-sm text-red-500">{errors.correctOption}</p>
              )}
            </div>

            {/* Submit and Clear Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Add Question
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}