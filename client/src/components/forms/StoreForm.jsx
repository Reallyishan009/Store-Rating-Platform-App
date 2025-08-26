import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFormValidation from '../../hooks/useFormValidation';
import { validateName, validateEmail, validateAddress } from '../../utils/validators';
import userService from '../../services/userService';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

const StoreForm = ({ store, onSubmit, onClose, isLoading, error }) => {
  const isEditing = !!store;
  const { token } = useSelector((state) => state.auth);
  const [availableOwners, setAvailableOwners] = useState([]);
  const [loadingOwners, setLoadingOwners] = useState(false);

  const validationRules = {
    name: validateName,
    email: validateEmail,
    address: validateAddress
  };

  const initialValues = {
    name: store?.name || '',
    email: store?.email || '',
    address: store?.address || '',
    ownerId: store?.ownerId || ''
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll
  } = useFormValidation(initialValues, validationRules);

  useEffect(() => {
    const fetchAvailableOwners = async () => {
      try {
        setLoadingOwners(true);
        // Fetch users who can be store owners (users without stores or current owner)
        const response = await userService.getUsers({ 
          role: 'user',
          limit: 100 
        }, token);
        
        // Filter users who don't own stores yet, plus current owner if editing
        const availableUsers = response.data.filter(user => 
          !user.ownedStore || (isEditing && user.id === store?.ownerId)
        );
        
        setAvailableOwners(availableUsers);
      } catch (err) {
        console.error('Failed to fetch available owners:', err);
      } finally {
        setLoadingOwners(false);
      }
    };

    fetchAvailableOwners();
  }, [token, isEditing, store?.ownerId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateAll()) {
      const submitData = { ...values };
      // Convert empty ownerId to null
      if (!submitData.ownerId) {
        submitData.ownerId = null;
      }
      onSubmit(submitData);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-screen overflow-y-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {isEditing ? 'Edit Store' : 'Add New Store'}
        </h3>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Store Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.name && touched.name ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter store name (20-60 characters)"
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
              Store Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email && touched.email ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter store email address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Store Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.address && touched.address ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter store address (max 400 characters)"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.address && touched.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          <div>
            <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700">
              Store Owner (Optional)
            </label>
            {loadingOwners ? (
              <div className="mt-1 p-2">
                <LoadingSpinner size="small" text="Loading available owners..." />
              </div>
            ) : (
              <select
                id="ownerId"
                name="ownerId"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={values.ownerId}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select a store owner (optional)</option>
                {availableOwners.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Assigning an owner will automatically change their role to "Store Owner"
            </p>
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
              {isLoading ? <LoadingSpinner size="small" text="" /> : (isEditing ? 'Update Store' : 'Create Store')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreForm;