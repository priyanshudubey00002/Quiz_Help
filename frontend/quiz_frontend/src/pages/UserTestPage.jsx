import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";
import UserStorageService from "../utils/userServiceStorage";
import { useNavigate } from "react-router-dom";

const UserTestPage = () => {
  const { id } = useParams();
  const user_id = UserStorageService.getUserId();
  const [question, setQuestion] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [testData, setTestData] = useState({
    testId: id,
    userId: user_id,
    responses: [],
  });
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/test/${id}`
        );
        const fetchedQuestions = response.data.questions || [];

        setQuestion(response.data);
        const InitialSelectedAnswers = fetchedQuestions.map((q) => ({
          questionId: q.id,
          selectedOption: "",
        }));
        setTimeRemaining(response.data.testDTO.time || 0);
        setSelectedAnswers(InitialSelectedAnswers);

        //   console.log(response.testDTO?.time || 0);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  const getFormattedTime = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const startTimer = () => {
    const timerId = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);
    setIntervalId(timerId);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  const handleAnswerSelect = (questionId, answer, options) => {
    //  const tempOption = options.filter((option) => option === answer);
    const tempSelectedAnswerrs = selectedAnswers.map((item) => {
      if (item.questionId === questionId) {
        return { ...item, selectedOption: answer };
      }
      return item;
    });
    setSelectedAnswers(tempSelectedAnswerrs);
    //      const responses = selectedAnswers.map((answer) => ({
    //   questionId: answer.questionId,
    //   selectedOption: answer.selectedOption,
    // }));

    setTestData((prevData) => ({
      ...prevData,
      responses: selectedAnswers,
    }));
  };

  if (!question) return <p>Loading question...</p>;

  const handleSubmitTest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/test/submit-test",
        testData
      );
      // console.log("Test submitted successfully:", testData);
      // console.log("Response from server:", selectedAnswers);
      alert("Test submitted successfully!");
      navigate("/user-dashboard");
      clearInterval(intervalId); // Stop the timer
    } catch (error) {
      console.error("Error submitting test:", error);
      console.log("Test submitted successfully:", testData);
      alert("Failed to submit test. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quiz Started
          </h1>
          <p className="text-gray-600">Choose the correct Options</p>
          <p className="m-4 text-blue-400">
            Time Remaining: {getFormattedTime()}
          </p>
        </div>
        <ul>
          {question.questions &&
            question.questions.map((q, index) => {
              const options = [q.optionA, q.optionB, q.optionC, q.optionD];
              {
                /* setSelectedAnswers([
                ...selectedAnswers,
                { questionId: q.id, selectedOption: "" } 
              ]); */
              }

              return (
                <li key={index} className="m-4">
                  <QuestionCard
                    id={q.id}
                    question={q.questionText}
                    options={options}
                    questionNumber={index + 1}
                    onAnswerSelect={(answer) => {
                      handleAnswerSelect(q.id, answer, options);
                      console.log("Selected:", answer);
                    }}
                  />
                </li>
              );
            })}
        </ul>
        <div className="flex justify-center">
          <button
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
            onClick={handleSubmitTest}
          >
            <span>Submit Test</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTestPage;
