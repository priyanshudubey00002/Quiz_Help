import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CreateTest = () => {

const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
const navigate = useNavigate();
 const handleSubmit = async (e) => {
    e.preventDefault();

    const testData = {
      title,
      time: parseInt(time),
      description,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/test', testData);
      console.log('Test created successfully:', response.data);

      // Reset form
      setTitle('');
      setTime('');
      setDescription('');
      alert('Test created successfully!');
      navigate('/admin-dashboard'); 
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  return (
    <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">Create New Test</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Title</label>
                  <input
                    type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter test title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Time</label>
                  <input
                     type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter test time in seconds"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea

                   value={description}
              onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    placeholder="Enter test description"
                  ></textarea>
                </div>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"

                  onClick={handleSubmit}
                >
                  Create Test
                </button>
              </div>
            </div>
          </div>
  )
}

export default CreateTest