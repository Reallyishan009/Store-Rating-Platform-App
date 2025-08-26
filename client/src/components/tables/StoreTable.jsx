import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createStore, updateStore, deleteStore } from '../../redux/slices/storeSlice';
import useSort from '../../hooks/useSort';
import useFilter from '../../hooks/useFilter';
import StoreForm from '../forms/StoreForm';
import RatingStars from '../rating/RatingStars';
import LoadingSpinner from '../LoadingSpinner';

const StoreTable = ({ stores, isLoading }) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const { sortedData, handleSort, getSortIcon } = useSort(stores, 'name', 'ASC');
  const { filteredData, filters, setFilter } = useFilter(sortedData, ['name', 'email', 'address']);

  const handleCreate = () => {
    setEditingStore(null);
    setShowForm(true);
  };

  const handleEdit = (store) => {
    setEditingStore(store);
    setShowForm(true);
  };

  const handleDelete = async (storeId) => {
    await dispatch(deleteStore(storeId));
    setShowDeleteConfirm(null);
  };

  const handleFormSubmit = async (storeData) => {
    if (editingStore) {
      await dispatch(updateStore({ id: editingStore.id, storeData }));
    } else {
      await dispatch(createStore(storeData));
    }
    setShowForm(false);
    setEditingStore(null);
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading stores..." />;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Stores Management</h3>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add New Store
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                onClick={() => handleSort('averageRating')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Rating {getSortIcon('averageRating')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {store.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {store.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {store.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <RatingStars rating={store.averageRating || 0} readonly size="small" />
                      <span className="text-sm text-gray-500">
                        ({store.totalRatings || 0})
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {store.owner ? (
                      <div>
                        <div className="font-medium">{store.owner.name}</div>
                        <div className="text-xs text-gray-400">{store.owner.email}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">No owner assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(store)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(store.id)}
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
                  No stores found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Store Form Modal */}
      {showForm && (
        <StoreForm
          store={editingStore}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingStore(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this store? This action cannot be undone and will also delete all associated ratings.
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

export default StoreTable;