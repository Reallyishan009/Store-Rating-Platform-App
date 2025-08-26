import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../redux/slices/userSlice';
import { getUsers } from '../../redux/slices/userSlice';
import { getStores } from '../../redux/slices/storeSlice';
import Layout from '../../components/Layout';
import UserTable from '../../components/tables/UserTable';
import StoreTable from '../../components/tables/StoreTable';
import PasswordUpdateForm from '../../components/forms/PasswordUpdateForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const { dashboardStats, users, isLoading: usersLoading } = useSelector((state) => state.users);
  const { stores, isLoading: storesLoading } = useSelector((state) => state.stores);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getUsers({ page: 1, limit: 10 }));
    dispatch(getStores({ page: 1, limit: 10 }));
  }, [dispatch]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'stores', name: 'Stores', icon: '🏪' },
  ];

  return (
    <Layout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="text-center py-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Admin Dashboard
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Manage users, stores, and monitor platform activity with comprehensive controls
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="btn btn-outline flex items-center space-x-2"
              >
                <span className="material-icons text-lg">admin_panel_settings</span>
                <span>Update Password</span>
              </button>
            </div>
          </div>
        </div>

        {/* Password Update Form */}
        {showPasswordForm && (
          <PasswordUpdateForm onClose={() => setShowPasswordForm(false)} />
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            {dashboardStats ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">👥</div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {dashboardStats.stats.totalUsers}
                      </div>
                      <div className="text-sm text-gray-600">Total Users</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">🏪</div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {dashboardStats.stats.totalStores}
                      </div>
                      <div className="text-sm text-gray-600">Total Stores</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">⭐</div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {dashboardStats.stats.totalRatings}
                      </div>
                      <div className="text-sm text-gray-600">Total Ratings</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <LoadingSpinner text="Loading dashboard stats..." />
            )}

            {/* Recent Activity */}
            {dashboardStats && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Users</h3>
                  <div className="space-y-3">
                    {dashboardStats.recent.users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {user.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Stores */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Stores</h3>
                  <div className="space-y-3">
                    {dashboardStats.recent.stores.slice(0, 5).map((store) => (
                      <div key={store.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{store.name}</p>
                          <p className="text-sm text-gray-500">{store.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">⭐ {store.averageRating || 0}</p>
                          <p className="text-xs text-gray-500">{store.totalRatings} ratings</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            {usersLoading ? (
              <LoadingSpinner text="Loading users..." />
            ) : (
              <UserTable users={users} />
            )}
          </div>
        )}

        {activeTab === 'stores' && (
          <div>
            {storesLoading ? (
              <LoadingSpinner text="Loading stores..." />
            ) : (
              <StoreTable stores={stores} />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardAdmin;