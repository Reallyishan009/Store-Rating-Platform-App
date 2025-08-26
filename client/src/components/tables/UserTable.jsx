import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, updateUser, deleteUser } from '../../redux/slices/userSlice';
import useSort from '../../hooks/useSort';
import useFilter from '../../hooks/useFilter';
import UserForm from '../forms/UserForm';
import LoadingSpinner from '../LoadingSpinner';

const UserTable = ({ users, isLoading }) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const { sortedData, handleSort, getSortIcon } = useSort(users, 'name', 'ASC');
  const { filteredData, filters, setFilter } = useFilter(sortedData, ['name', 'email', 'address', 'role']);

  const handleCreate = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    await dispatch(deleteUser(userId));
    setShowDeleteConfirm(null);
  };

  const handleFormSubmit = async (userData) => {
    if (editingUser) {
      await dispatch(updateUser({ id: editingUser.id, userData }));
    } else {
      await dispatch(createUser(userData));
    }
    setShowForm(false);
    setEditingUser(null);
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading users..." />;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Users Management</h3>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add New User
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by name..."
          value={filters.name || ''}
          onChange={(e) => setFilter('name', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <input
          type="text"
          placeholder="Filter by email..."
          value={filters.email || ''}
          onChange={(e) => setFilter('email', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <input
          type="text"
          placeholder="Filter by address..."
          value={filters.address || ''}
          onChange={(e) => setFilter('address', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <select
          value={filters.role || ''}
          onChange={(e) => setFilter('role', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="store_owner">Store Owner</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Name {getSortIcon('name')}
              </th>
              <th
                onClick={() => handleSort('email')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Email {getSortIcon('email')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th
                onClick={() => handleSort('role')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Role {getSortIcon('role')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store Rating
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {user.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'store_owner' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.ownedStore ? (
                      <span>⭐ {user.ownedStore.averageRating || 0}</span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Form Modal */}
      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;