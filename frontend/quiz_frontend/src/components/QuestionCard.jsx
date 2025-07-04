import React, { useState } from 'react';

export default function QuestionCard({ 
  id,
  question,
  options,
  questionNumber,
  onAnswerSelect,
  selectedAnswer = null,
  showSelectedAnswer = true,
  disabled = false,
  correctAnswer = null,
  showCorrectAnswer = false
}) {
  const [internalSelectedAnswer, setInternalSelectedAnswer] = useState('');
  
  // Use external selectedAnswer if provided, otherwise use internal state
  const currentAnswer = selectedAnswer !== null ? selectedAnswer : internalSelectedAnswer;

  const handleAnswerSelect = (option, value) => {
    if (disabled) return;
    
    if (selectedAnswer === null) {
      setInternalSelectedAnswer(option);
    }
    onAnswerSelect && onAnswerSelect(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
      {/* Question Header */}
      <div className="mb-8">
        {questionNumber && (
          <div className="flex items-center mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Question {questionNumber}
            </span>
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {Object.entries(options).map(([key, value]) => {
          const isSelected = currentAnswer === key;
          const isCorrect = correctAnswer === key;
          const isWrong = showCorrectAnswer && currentAnswer === key && correctAnswer !== key;
          
          let borderColor = 'border-gray-200 bg-white';
          let textColor = 'text-gray-700';
          
          if (showCorrectAnswer) {
            if (isCorrect) {
              borderColor = 'border-green-500 bg-green-50';
              textColor = 'text-green-700';
            } else if (isWrong) {
              borderColor = 'border-red-500 bg-red-50';
              textColor = 'text-red-700';
            }
          } else if (isSelected) {
            borderColor = 'border-blue-500 bg-blue-50';
            textColor = 'text-blue-700';
          }
          const newKey = parseInt(key);

          return (
            <div
              key={key}
              className={`border-2 rounded-lg p-4 transition-all duration-200 ${
                !disabled && !showCorrectAnswer ? 'cursor-pointer hover:border-blue-300 hover:bg-blue-50' : ''
              } ${borderColor}`}
              onClick={() => handleAnswerSelect(key, value)}
            >
              <label className={`flex items-center ${!disabled && !showCorrectAnswer ? 'cursor-pointer' : 'cursor-default'}`}>
                <input
                  type="radio"
                  name={`question-${questionNumber}`}
                  value={key}
                  checked={isSelected}
                  onChange={() => handleAnswerSelect(key, value)}
                  disabled={disabled}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${
                  showCorrectAnswer && isCorrect
                    ? 'border-green-500 bg-green-500'
                    : showCorrectAnswer && isWrong
                    ? 'border-red-500 bg-red-500'
                    : isSelected
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 bg-white'
                }`}>
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                  {showCorrectAnswer && isCorrect && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {showCorrectAnswer && isWrong && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex items-center">
                  <span className={`font-medium mr-3 ${textColor}`}>
                    {newKey+1}.
                  </span>
                  <span className={`text-gray-900 ${
                    isSelected ? 'font-medium' : 'font-normal'
                  }`}>
                    {value}
                  </span>
                </div>
              </label>
            </div>
          );
        })}
      </div>

      {/* Selected Answer Display */}
      {showSelectedAnswer && currentAnswer && !showCorrectAnswer && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm font-medium text-green-800">
              Your answer: Option {parseInt(currentAnswer)+1}
            </span>
          </div>
        </div>
      )}

      {/* Correct Answer Display */}
      {showCorrectAnswer && correctAnswer && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-sm font-medium text-blue-800">
              Correct answer: Option {correctAnswer}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// // Example usage component to demonstrate the QuestionCard
// function QuestionCardDemo() {
//   const [userAnswer1, setUserAnswer1] = useState('');
//   const [userAnswer2, setUserAnswer2] = useState('');

//   const sampleQuestions = [
//     {
//       question: "Which of the following is a JavaScript framework?",
//       options: {
//         A: "HTML",
//         B: "React",
//         C: "CSS",
//         D: "Python"
//       },
//       correctAnswer: "B"
//     },
//     {
//       question: "What does CSS stand for?",
//       options: {
//         A: "Computer Style Sheets",
//         B: "Creative Style Sheets",
//         C: "Cascading Style Sheets",
//         D: "Colorful Style Sheets"
//       },
//       correctAnswer: "C"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto space-y-8">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Questions</h1>
//           <p className="text-gray-600">Select the correct answer from the options below</p>
//         </div>

//         {/* Basic Question Card */}
//         <QuestionCard
//           question={sampleQuestions[0].question}
//           options={sampleQuestions[0].options}
//           questionNumber={1}
//           onAnswerSelect={(answer) => {
//             setUserAnswer1(answer);
//             console.log('Question 1 answer:', answer);
//           }}
//         />

//         {/* Question Card with controlled selection */}
//         <QuestionCard
//           question={sampleQuestions[1].question}
//           options={sampleQuestions[1].options}
//           questionNumber={2}
//           selectedAnswer={userAnswer2}
//           onAnswerSelect={(answer) => {
//             setUserAnswer2(answer);
//             console.log('Question 2 answer:', answer);
//           }}
//           showSelectedAnswer={true}
//         />

//         {/* Disabled Question Card with correct answer shown */}
//         <QuestionCard
//           question="Which HTML tag is used for creating links?"
//           options={{
//             A: "<link>",
//             B: "<a>",
//             C: "<href>",
//             D: "<url>"
//           }}
//           questionNumber={3}
//           selectedAnswer="A"
//           correctAnswer="B"
//           disabled={true}
//           showCorrectAnswer={true}
//           showSelectedAnswer={false}
//         />

//         {/* Question Card without question number */}
//         <QuestionCard
//           question="What is the correct way to declare a variable in JavaScript?"
//           options={{
//             A: "var myVar;",
//             B: "variable myVar;",
//             C: "declare myVar;",
//             D: "v myVar;"
//           }}
//           onAnswerSelect={(answer) => console.log('Bonus question answer:', answer)}
//         />

//         {/* Usage Examples */}
//         <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
//           <h3 className="text-lg font-semibold mb-4">Usage Examples:</h3>
//           <div className="space-y-4 text-sm">
//             <div>
//               <strong>Basic Usage:</strong>
//               <pre className="bg-gray-100 p-2 rounded mt-1 text-xs overflow-x-auto">
// {`<QuestionCard
//   question="Your question text"
//   options={{ A: "Option 1", B: "Option 2", C: "Option 3", D: "Option 4" }}
//   onAnswerSelect={(answer) => console.log(answer)}
// />`}
//               </pre>
//             </div>
//             <div>
//               <strong>With Question Number:</strong>
//               <pre className="bg-gray-100 p-2 rounded mt-1 text-xs overflow-x-auto">
// {`<QuestionCard
//   question="Your question text"
//   options={{ A: "Option 1", B: "Option 2", C: "Option 3", D: "Option 4" }}
//   questionNumber={1}
//   onAnswerSelect={(answer) => console.log(answer)}
// />`}
//               </pre>
//             </div>
//             <div>
//               <strong>Controlled Selection:</strong>
//               <pre className="bg-gray-100 p-2 rounded mt-1 text-xs overflow-x-auto">
// {`<QuestionCard
//   question="Your question text"
//   options={{ A: "Option 1", B: "Option 2", C: "Option 3", D: "Option 4" }}
//   selectedAnswer={currentAnswer}
//   onAnswerSelect={setCurrentAnswer}
// />`}
//               </pre>
//             </div>
//             <div>
//               <strong>Show Correct Answer:</strong>
//               <pre className="bg-gray-100 p-2 rounded mt-1 text-xs overflow-x-auto">
// {`<QuestionCard
//   question="Your question text"
//   options={{ A: "Option 1", B: "Option 2", C: "Option 3", D: "Option 4" }}
//   selectedAnswer="A"
//   correctAnswer="B"
//   showCorrectAnswer={true}
//   disabled={true}
// />`}
//               </pre>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }