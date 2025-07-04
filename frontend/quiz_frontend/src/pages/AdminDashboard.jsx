import React, { useState, useEffect } from "react";
import { Home, FileText, BarChart3, LogOut, Menu, X } from "lucide-react";
import CreateTest from "../components/CreateTest"; // Assuming CreateTest is a component for creating tests
import { useNavigate } from "react-router-dom";
import UserStorageService from "../utils/userServiceStorage"; // Assuming this is a utility for user
import TestCard from "../components/TestCard";
import axios from "axios"; // Importing axios for API calls
import TestResultsTable from "../components/TestResultsTable"; // Assuming this is a component for displaying test results

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tests, setTests] = useState([]);
  const [testResults, setTestResults] = useState([]); // State to hold test results
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "create-test", label: "Create Test", icon: FileText },
    { id: "view-results", label: "View Results", icon: BarChart3 },


  ];


  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 80) return 'text-blue-600 bg-blue-50';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };




  const navigate = useNavigate();
  const handleLogout = () => {
    UserStorageService.signOut();
    navigate("/login");
  };


  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/test"); 
        setTests(response.data);
      } catch (err) {
        console.error("Error fetching tests:", err);
      }
    };

    fetchTests(); // call the inner async function
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/test/test-results"); 
        setTestResults(response.data);
        // console.log("Test Results:", response.data); 
      } catch (err) {
        console.error("Error fetching tests:", err);
      }
    };

    fetchResults(); 
  }, []);

  const uniqueByUserId = Array.from(
  new Map(testResults.map(obj => [obj.userName, obj])).values()
);


  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Dashboard Overview
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Total Tests
                </h3>
                <p className="text-3xl font-bold text-blue-600">{testResults.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Number of Students Submitted Tests
                </h3>
                <p className="text-3xl font-bold text-green-600">{uniqueByUserId.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Completed Tests
                </h3>
                <p className="text-3xl font-bold text-purple-600">3</p>
              </div>
            </div>

            <h2>All Tests</h2>
            <ul>
              {tests.map((test, index) => (
                <li key={index} className="mb-4">
                  <TestCard
                    title={test.title}
                    description={test.description}
                    timeLimit={test.time}
                    onAddQuestion={() =>
                      navigate(`/test/add-question?testId=${test.id}`)
                    }
                    onViewTest={() => navigate(`/test/${test.id}`)}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      case "create-test":
        return (<CreateTest />);
      case "view-results":
        return (
         <div className="space-y-6">
             <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-800 mb-2">Test Results</h1>
          <p className="text-gray-600">Overview of student performance across different assessments</p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Test Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    User Name
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Total Questions
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Correct Answers
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-100">
                {testResults.map((test, index) => (
                  <tr 
                    key={test.id} 
                    className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{test.testName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {test.userName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{test.userName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900 font-medium">{test.totalQuestions}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900 font-medium">{test.correctAnswers}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPercentageColor(test.percentage)}`}>
                        {test.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Total Tests</div>
            <div className="text-2xl font-light text-gray-900">{testResults.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Average Score</div>
            <div className="text-2xl font-light text-gray-900">
              {Math.round(testResults.reduce((sum, test) => sum + test.percentage, 0) / testResults.length)}%
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600">High Performers (90%+)</div>
            <div className="text-2xl font-light text-gray-900">
              {testResults.filter(test => test.percentage >= 90).length}
            </div>
          </div>
        </div>
      </div>
    </div>
         </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Welcome */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
              </div>
              <div className="hidden md:block">
                <span className="text-lg font-medium text-gray-700">
                  Welcome Admin
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeTab === item.id
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-100 mb-2">
                Welcome Admin
              </div>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeTab === item.id
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
