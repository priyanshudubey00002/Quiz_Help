import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";

const TestPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/test/${id}`
        );
        // console.log("Fetched question:", response.data);
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  if (!question) return <p>Loading question...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz</h1>
          <p className="text-gray-600">Choose the correct answer</p>
        </div>
        <ul>
          {question.questions &&
            question.questions.map((q, index) => {
              const options = [q.optionA, q.optionB, q.optionC, q.optionD];

              return (
                <li key={index}>
                  <QuestionCard
                    question={q.questionText}
                    options={options}
                    questionNumber={index + 1}
                    onAnswerSelect={(answer) => {
                      console.log("Selected:", answer);
                      console.log("Correct:", q.correctOption); // ✅ Use `q`, not `question`
                    }}
                  />
                </li>
              );
            })}
        </ul>

       
      </div>
    </div>
  );
};

export default TestPage;
