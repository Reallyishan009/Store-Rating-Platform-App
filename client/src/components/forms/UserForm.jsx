import React, { useEffect } from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import { validateName, validateEmail, validatePassword, validateAddress } from '../../utils/validators';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

const UserForm = ({ user, onSubmit, onClose, isLoading, error }) => {
  const isEditing = !!user;

  const validationRules = {
    name: validateName,
    email: validateEmail,
    address: validateAddress,
    role: (value) => !value ? 'Role is required' : ''
  };

  // Only validate password for new users
  if (!isEditing) {
    validationRules.password = validatePassword;
  }

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    address: user?.address || '',
    role: user?.role || 'user'
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll
  } = useFormValidation(initialValues, validationRules);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateAll()) {
      const submitData = { ...values };
      // Don't send empty password for editing
      if (isEditing && !submitData.password) {
        delete submitData.password;
      }
      onSubmit(submitData);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-screen overflow-y-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {isEditing ? 'Edit User' : 'Add New User'}
        </h3>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.name && touched.name ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter full name (20-60 characters)"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email && touched.email ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter email address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password {isEditing && <span className="text-gray-500">(leave blank to keep current)</span>}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required={!isEditing}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password && touched.password ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="8-16 chars, 1 uppercase, 1 special character"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.address && touched.address ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter address (max 400 characters)"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.address && touched.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.role && touched.role ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select a role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="store_owner">Store Owner</option>
            </select>
            {errors.role && touched.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? <LoadingSpinner size="small" text="" /> : (isEditing ? 'Update User' : 'Create User')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;