import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import UserStorageService from '../utils/userServiceStorage';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", formData);
      // console.log("Login successful:", response.data);
      setFormData({ email: '', password: '' }); // Clear form after successful login
      setFocusedField('');
      alert("Login successful!"); // Show success message
      
      const user = {
      id: response.data.id,
      role: response.data.role
    };
    // console.log("User data:", user);
     UserStorageService.saveUser(user);
     if (user.role === "ADMIN") {
      navigate("/admin-dashboard");
    } else if (user.role === "USER") {
      navigate("/user-dashboard");
    } else {
      navigate("/login"); // fallback if role is unrecognized
    }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FAF9F5' }}>
      {/* Logo at top left */}
      <div className="absolute top-6 left-6">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" 
            style={{ backgroundColor: '#6E72EB' }}
          >
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-800">
            Quiz Help
          </span>
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your learning journey</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail 
                    className="h-5 w-5 transition-colors duration-200" 
                    style={{ color: focusedField === 'email' ? '#6E72EB' : '#9CA3AF' }}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none transition-all duration-200 bg-gray-50"
                  style={{ 
                    borderColor: focusedField === 'email' ? '#6E72EB' : '#D1D5DB',
                    backgroundColor: focusedField === 'email' ? 'white' : '#F9FAFB',
                    boxShadow: focusedField === 'email' ? `0 0 0 2px rgba(110, 114, 235, 0.2)` : 'none'
                  }}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock 
                    className="h-5 w-5 transition-colors duration-200" 
                    style={{ color: focusedField === 'password' ? '#6E72EB' : '#9CA3AF' }}
                  />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className="w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none transition-all duration-200 bg-gray-50"
                  style={{ 
                    borderColor: focusedField === 'password' ? '#6E72EB' : '#D1D5DB',
                    backgroundColor: focusedField === 'password' ? 'white' : '#F9FAFB',
                    boxShadow: focusedField === 'password' ? `0 0 0 2px rgba(110, 114, 235, 0.2)` : 'none'
                  }}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button 
                className="text-sm font-medium transition-colors duration-200 hover:underline"
                style={{ color: '#6E72EB' }}
                onMouseEnter={(e) => e.target.style.color = '#5A5ED9'}
                onMouseLeave={(e) => e.target.style.color = '#6E72EB'}
                onClick={() => console.log('Navigate to forgot password')}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 px-4 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#6E72EB' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5A5ED9'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6E72EB'}
            >
              Sign In
            </button>
          </div>

          {/* Divider */}
          <div className="mt-8 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button 
                className="font-semibold transition-colors duration-200 hover:underline"
                style={{ color: '#6E72EB' }}
                onMouseEnter={(e) => e.target.style.color = '#5A5ED9'}
                onMouseLeave={(e) => e.target.style.color = '#6E72EB'}
                onClick={() => navigate('/sign-up')}
              >
                Register Now
              </button>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="underline hover:text-gray-700">Terms of Service</a> and{' '}
          <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>
        </p>
      </div>

      {/* Decorative Elements */}
      <div 
        className="absolute top-20 right-20 w-24 h-24 rounded-full opacity-20 animate-pulse hidden lg:block"
        style={{ backgroundColor: '#8BB9F1' }}
      ></div>
      <div 
        className="absolute bottom-32 left-20 w-16 h-16 rounded-full opacity-20 animate-pulse hidden lg:block"
        style={{ backgroundColor: '#9CB1EE', animationDelay: '1s' }}
      ></div>
      <div 
        className="absolute top-1/2 right-10 w-12 h-12 rounded-full opacity-20 animate-pulse hidden lg:block"
        style={{ backgroundColor: '#C88DEB', animationDelay: '0.5s' }}
      ></div>
    </div>
  );
}