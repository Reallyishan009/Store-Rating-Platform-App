import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../../redux/slices/authSlice';
import useFormValidation from '../../hooks/useFormValidation';
import { validateName, validateEmail, validatePassword, validateAddress } from '../../utils/validators';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [focusedField, setFocusedField] = useState('');

  const validationRules = {
    name: validateName,
    email: validateEmail,
    password: validatePassword,
    address: validateAddress
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll
  } = useFormValidation({ 
    name: '', 
    email: '', 
    password: '', 
    address: '' 
  }, validationRules);

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
      dispatch(register(values));
    }
  };

  const getPasswordStrength = () => {
    const password = values.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
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
            Create your account
          </h1>
          <p className="text-gray-600 text-base">
            Join Store Rating Platform today
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-icons text-gray-400 text-xl">person</span>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={`block w-full pl-12 pr-4 py-4 text-base border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                    errors.name && touched.name
                      ? 'border-red-500 focus:border-red-500'
                      : focusedField === 'name'
                      ? 'border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setFocusedField('');
                  }}
                  onFocus={() => setFocusedField('name')}
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
              {errors.name && touched.name && (
                <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                  <span className="material-icons text-base">error</span>
                  <span>{errors.name}</span>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Minimum 10 characters required</p>
            </div>

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
                      : focusedField === 'email'
                      ? 'border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setFocusedField('');
                  }}
                  onFocus={() => setFocusedField('email')}
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
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className={`block w-full pl-12 pr-12 py-4 text-base border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                    errors.password && touched.password
                      ? 'border-red-500 focus:border-red-500'
                      : focusedField === 'password'
                      ? 'border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Create a strong password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setFocusedField('');
                  }}
                  onFocus={() => setFocusedField('password')}
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-icons text-gray-400 text-xl hover:text-gray-600 transition-colors">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {values.password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">Password strength</span>
                    <span className={`text-xs font-medium ${
                      getPasswordStrength() <= 2 ? 'text-red-600' :
                      getPasswordStrength() <= 3 ? 'text-yellow-600' :
                      getPasswordStrength() <= 4 ? 'text-blue-600' : 'text-green-600'
                    }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                      style={{ width: `${(getPasswordStrength() / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              
              {errors.password && touched.password && (
                <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                  <span className="material-icons text-base">error</span>
                  <span>{errors.password}</span>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">8-16 characters with uppercase, lowercase, and special character</p>
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <div className="absolute top-4 left-0 pl-3 flex items-start pointer-events-none">
                  <span className="material-icons text-gray-400 text-xl">location_on</span>
                </div>
                <textarea
                  id="address"
                  name="address"
                  rows={4}
                  required
                  className={`block w-full pl-12 pr-4 py-4 text-base border-2 rounded-xl resize-none transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                    errors.address && touched.address
                      ? 'border-red-500 focus:border-red-500'
                      : focusedField === 'address'
                      ? 'border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Enter your complete address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setFocusedField('');
                  }}
                  onFocus={() => setFocusedField('address')}
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
              {errors.address && touched.address && (
                <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                  <span className="material-icons text-base">error</span>
                  <span>{errors.address}</span>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Maximum 400 characters</p>
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
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
                <span className="px-4 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <Link
              to="/login"
              className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold text-base hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-200 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md"
              style={{ fontFamily: 'Google Sans, Roboto, sans-serif' }}
            >
              <span className="material-icons">login</span>
              <span>Sign In Instead</span>
            </Link>

            {/* Demo Login Button */}
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
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-base hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              style={{ fontFamily: 'Google Sans, Roboto, sans-serif' }}
            >
              <span className="material-icons">play_arrow</span>
              <span>Try Demo (No Registration)</span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;