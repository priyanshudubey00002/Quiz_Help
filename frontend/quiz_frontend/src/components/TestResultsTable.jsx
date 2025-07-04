import React from 'react';

const TestResultsTable = () => {
  // Sample data for the table
  const testData = [
    {
      id: 1,
      testName: "Mathematics Quiz",
      userName: "Alice Johnson",
      totalQuestions: 20,
      correctAnswers: 18,
      percentage: 90
    },
    {
      id: 2,
      testName: "Science Assessment",
      userName: "Bob Smith",
      totalQuestions: 15,
      correctAnswers: 12,
      percentage: 80
    },
    {
      id: 3,
      testName: "History Test",
      userName: "Carol Davis",
      totalQuestions: 25,
      correctAnswers: 22,
      percentage: 88
    },
    {
      id: 4,
      testName: "English Literature",
      userName: "David Wilson",
      totalQuestions: 30,
      correctAnswers: 24,
      percentage: 80
    },
    {
      id: 5,
      testName: "Chemistry Lab",
      userName: "Emma Brown",
      totalQuestions: 18,
      correctAnswers: 16,
      percentage: 89
    },
    {
      id: 6,
      testName: "Physics Concepts",
      userName: "Frank Miller",
      totalQuestions: 22,
      correctAnswers: 19,
      percentage: 86
    }
  ];

  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 80) return 'text-blue-600 bg-blue-50';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
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
                {testData.map((test, index) => (
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
            <div className="text-2xl font-light text-gray-900">{testData.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Average Score</div>
            <div className="text-2xl font-light text-gray-900">
              {Math.round(testData.reduce((sum, test) => sum + test.percentage, 0) / testData.length)}%
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600">High Performers (90%+)</div>
            <div className="text-2xl font-light text-gray-900">
              {testData.filter(test => test.percentage >= 90).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResultsTable;