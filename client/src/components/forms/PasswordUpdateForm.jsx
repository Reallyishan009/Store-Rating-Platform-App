import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, reset } from '../../redux/slices/authSlice';
import useFormValidation from '../../hooks/useFormValidation';
import { validatePassword, validateRequired } from '../../utils/validators';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';

const PasswordUpdateForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const validationRules = {
    currentPassword: (value) => validateRequired(value, 'Current Password'),
    newPassword: validatePassword
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset: resetForm
  } = useFormValidation({ 
    currentPassword: '', 
    newPassword: '' 
  }, validationRules);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        dispatch(reset());
        resetForm();
        if (onClose) onClose();
      }, 2000);
    }

    if (isError) {
      setTimeout(() => dispatch(reset()), 3000);
    }
  }, [isError, isSuccess, dispatch, resetForm, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateAll()) {
      dispatch(updatePassword(values));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Update Password</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            required
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.currentPassword && touched.currentPassword ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="Enter current password"
            value={values.currentPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.currentPassword && touched.currentPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
          )}
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.newPassword && touched.newPassword ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="8-16 chars, 1 uppercase, 1 special character"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.newPassword && touched.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
          )}
        </div>

        {isError && <ErrorMessage message={message} />}
        {isSuccess && <SuccessMessage message={message} />}

        <div className="flex justify-end space-x-3">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? <LoadingSpinner size="small" text="" /> : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordUpdateForm;