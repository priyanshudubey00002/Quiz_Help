
import React from 'react';
import { Clock, Plus, Eye } from 'lucide-react';
const UserTestCard = ({ 
  title = "Test Title", 
  description = "Test description goes here...", 
  timeLimit =0, 
  onAddQuestion = () => {}, 
  onStartTest = () => {},
  className = ""
}) => {

    const formatTimeLimit = (sec) => {
    if (sec < 60) {
      return `${sec} sec`;
    } else {
      const mins = Math.floor(sec / 60);
      const remainingSeconds = sec % 60;
      return remainingSeconds > 0 ? `${mins}min ${remainingSeconds}sec` : `${mins}min`;
    }
  };
  return (
     <div className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 ${className}`}>
      {/* Card Header */}
      <div className="p-6 pb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Time Limit */}
        <div className="flex items-center text-gray-500 mb-4">
          <Clock size={16} className="mr-2" />
          <span className="text-sm font-medium">
            Time Limit: {formatTimeLimit(timeLimit)}
          </span>
        </div>
      </div>

      {/* Card Footer with Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-lg">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* <button
            onClick={onAddQuestion}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <Plus size={16} />
            <span>Add Question</span>
          </button> */}
          
          <button
            onClick={onStartTest}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"

            
          >
            <Eye size={16} />
            <span>Start Test</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserTestCard