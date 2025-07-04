import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import UserStorageService from './utils/userServiceStorage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import { Navigate } from "react-router-dom";
import AddQuestionForm from './pages/AddQuestionForm';
import TestPage from './pages/TestPage';
import UserTestPage from './pages/UserTestPage';

const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/admin-dashboard" element={ UserStorageService.isAdminLoggedIn() ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/user-dashboard" element={ UserStorageService.isUserLoggedIn() ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path='/test/add-question' element={ <AddQuestionForm />} />
        <Route path='/test/:id' element={<TestPage />} />
        <Route path='/user-test/:id' element={<UserTestPage />} />
       
      </Routes>
    </Router>
    </div>
  )
}

export default App