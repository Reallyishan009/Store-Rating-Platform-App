import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../../redux/slices/authSlice';
import useFormValidation from '../../hooks/useFormValidation';
import { validateEmail, validateRequired } from '../../utils/validators';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const validationRules = {
    email: validateEmail,
    password: (value) => validateRequired(value, 'Password')
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll
  } = useFormValidation({ email: '', password: '' }, validationRules);

  useEffect(() => {
    if (isError) {
      setTimeout(() => dispatch(reset()), 3000);
    }

    if (isSuccess && user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateAll()) {
      dispatch(login(values));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
            <span className="material-icons text-white text-2xl">store</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Google Sans, Roboto, sans-serif' }}>
            Welcome back
          </h1>
          <p className="text-gray-600 text-base">
            Sign in to Store Rating Platform
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-icons text-gray-400 text-xl">email</span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`block w-full pl-12 pr-4 py-4 text-base border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                    errors.email && touched.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter your email address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
              {errors.email && touched.email && (
                <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                  <span className="material-icons text-base">error</span>
                  <span>{errors.email}</span>
                </div>
              )}
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-icons text-gray-400 text-xl">lock</span>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`block w-full pl-12 pr-4 py-4 text-base border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                    errors.password && touched.password
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
              {errors.password && touched.password && (
                <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                  <span className="material-icons text-base">error</span>
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Error Message */}
            {isError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center">
                  <span className="material-icons text-red-500 mr-3">error</span>
                  <p className="text-red-700 font-medium">{message}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-base hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              style={{ fontFamily: 'Google Sans, Roboto, sans-serif' }}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="small" text="" color="white" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-icons">arrow_forward</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link
              to="/signup"
              className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold text-base hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-200 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md"
              style={{ fontFamily: 'Google Sans, Roboto, sans-serif' }}
            >
              <span className="material-icons">person_add</span>
              <span>Create Account</span>
            </Link>

            {/* Demo Login Buttons */}
            <div className="space-y-3">
              <p className="text-center text-sm text-gray-600 font-medium">Try Demo Mode (No Registration Required)</p>
              
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const demoUser = {
                      id: 'demo-user-123',
                      name: 'Demo User',
                      email: 'demo.user@example.com',
                      role: 'user',
                      address: 'Demo User Address'
                    };
                    localStorage.setItem('user', JSON.stringify(demoUser));
                    localStorage.setItem('token', 'demo-token-user');
                    navigate('/dashboard');
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <span className="material-icons text-lg">person</span>
                  <span>Demo as Regular User</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const demoAdmin = {
                      id: 'demo-admin-123',
                      name: 'Demo Admin',
                      email: 'demo.admin@example.com',
                      role: 'admin',
                      address: 'Demo Admin Address'
                    };
                    localStorage.setItem('user', JSON.stringify(demoAdmin));
                    localStorage.setItem('token', 'demo-token-admin');
                    navigate('/dashboard');
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-xl font-medium text-sm hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <span className="material-icons text-lg">admin_panel_settings</span>
                  <span>Demo as Admin</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const demoStoreOwner = {
                      id: 'demo-store-owner-123',
                      name: 'Demo Store Owner',
                      email: 'demo.owner@example.com',
                      role: 'store_owner',
                      address: 'Demo Store Owner Address',
                      ownedStoreId: 'demo-store-123'
                    };
                    localStorage.setItem('user', JSON.stringify(demoStoreOwner));
                    localStorage.setItem('token', 'demo-token-store-owner');
                    navigate('/dashboard');
                  }}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl font-medium text-sm hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <span className="material-icons text-lg">store</span>
                  <span>Demo as Store Owner</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Secure login • Protected by encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;