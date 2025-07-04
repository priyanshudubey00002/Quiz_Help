import React from 'react';
import { BookOpen, CheckCircle, Users, TrendingUp, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    const handleSignupClick = () => {
    navigate('/sign-up');
  };

  const handleLearnClick = () => {
    navigate('/sign-up');
  }
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF9F5' }}>
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#6E72EB' }}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                Quiz Help
              </span>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 cursor-pointer" onClick={() => navigate('/login')}>
                Sign In
              </button>
              <button 
                className="px-6 py-2 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
                style={{ backgroundColor: '#6E72EB' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5A5ED9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6E72EB'}

                onClick={handleSignupClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master Any Subject with
              <span className="block mt-2" style={{ color: '#6E72EB' }}>
                Smart Quizzes
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your learning experience with AI-powered quizzes, personalized study paths, 
              and comprehensive progress tracking. Join thousands of learners achieving their goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center group"
                style={{ backgroundColor: '#6E72EB' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5A5ED9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6E72EB'}

                onClick={handleLearnClick}
              >
                Start Learning Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                className="px-8 py-4 border-2 font-semibold rounded-xl transition-all duration-200"
                style={{ borderColor: '#9CB1EE', color: '#6E72EB' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#9CB1EE';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#6E72EB';
                }}
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-30 animate-pulse" style={{ backgroundColor: '#8BB9F1' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full opacity-30 animate-pulse" style={{ backgroundColor: '#C88DEB', animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full opacity-30 animate-pulse" style={{ backgroundColor: '#9CB1EE', animationDelay: '0.5s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Quiz Help?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with proven learning methodologies 
              to deliver an unmatched educational experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#8BB9F1' }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Assessment</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered questions that adapt to your learning pace and identify knowledge gaps 
                for targeted improvement.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#C88DEB' }}
              >
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Collaborative Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Join study groups, compete with friends, and learn together in an engaging 
                social environment.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#9CB1EE' }}
              >
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Detailed analytics and insights to monitor your improvement and celebrate 
                your achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" style={{ backgroundColor: '#6E72EB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-white/80">Active Learners</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-white/80">Quizzes Completed</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-white/80">Success Rate</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">4.9★</div>
              <div className="text-white/80">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20" style={{ backgroundColor: '#FAF9F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-current" style={{ color: '#C88DEB' }} />
            ))}
          </div>
          <blockquote className="text-2xl font-medium text-gray-900 mb-6 italic">
            "Quiz Help transformed my study routine. The adaptive quizzes helped me identify 
            weak areas and improve systematically. I've never felt more confident in my learning."
          </blockquote>
          <div className="flex items-center justify-center">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
              style={{ backgroundColor: '#9CB1EE' }}
            >
              <span className="text-white font-bold">SJ</span>
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Anaya Singh</div>
              <div className="text-gray-600">Engineering Student</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of successful learners and start your journey today.
          </p>
          <button 
            className="px-12 py-4 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
            style={{ backgroundColor: '#6E72EB' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5A5ED9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6E72EB'}
            onClick={handleLearnClick}
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#6E72EB' }}
              >
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Quiz Help</span>
            </div>
            <div className="text-gray-400">
              © 2025 Quiz Help. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}