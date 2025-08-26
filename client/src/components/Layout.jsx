import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const Layout = ({ children, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'store_owner': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getNavItems = () => {
    const items = [
      { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    ];
    
    if (user?.role === 'admin') {
      items.push(
        { path: '/stores', label: 'Stores', icon: '🏪' },
        { path: '/users', label: 'Users', icon: '👥' },
        { path: '/ratings', label: 'Ratings', icon: '⭐' }
      );
    } else if (user?.role === 'store_owner') {
      items.push(
        { path: '/my-store', label: 'My Store', icon: '🏪' },
        { path: '/store-ratings', label: 'Ratings', icon: '⭐' }
      );
    } else {
      items.push(
        { path: '/stores', label: 'Browse Stores', icon: '🏪' },
        { path: '/my-ratings', label: 'My Ratings', icon: '⭐' }
      );
    }
    
    return items;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <header className="navbar sticky top-0 z-[1000] backdrop-blur-xl bg-white/90 border-b border-white/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Title */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">SR</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Store Rating Platform
                  </h1>
                  <p className="text-xs text-gray-500 hidden sm:block">Discover & Rate Amazing Stores</p>
                </div>
              </div>
              {title && (
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-700 font-semibold">{title}</span>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {getNavItems().map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`nav-link flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'nav-link-active bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : 'nav-link-inactive text-gray-600 hover:text-gray-900 hover:bg-white/60 hover:shadow-md'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="relative z-[1001]">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/60 transition-all duration-200 border border-transparent hover:border-white/40 hover:shadow-md"
                  style={{ minWidth: '200px' }}
                >
                  <div className="text-right flex-1 hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border shadow-sm ${getRoleColor(user?.role)}`}>
                      {user?.role?.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="material-icons text-gray-400 text-lg">
                      {showUserMenu ? 'expand_less' : 'expand_more'}
                    </span>
                  </div>
                </button>

                {/* Enhanced Dropdown Menu */}
                {showUserMenu && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-[9998]" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    
                    {/* Dropdown */}
                    <div className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 py-2 z-[9999] user-dropdown animate-slide-down">
                      {/* User Info Header */}
                      <div className="px-6 py-4 border-b border-gray-100/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold">
                              {user?.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full mt-1 ${getRoleColor(user?.role)}`}>
                              {user?.role?.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <button
                          onClick={() => {
                            navigate('/profile');
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center space-x-3 transition-all duration-200"
                        >
                          <span className="material-icons text-lg">person</span>
                          <div>
                            <p className="font-medium">Profile</p>
                            <p className="text-xs text-gray-500">Manage your account</p>
                          </div>
                        </button>
                        
                        <button
                          onClick={() => {
                            navigate('/settings');
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center space-x-3 transition-all duration-200"
                        >
                          <span className="material-icons text-lg">settings</span>
                          <div>
                            <p className="font-medium">Settings</p>
                            <p className="text-xs text-gray-500">Preferences & privacy</p>
                          </div>
                        </button>

                        <button
                          onClick={() => {
                            navigate('/help');
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center space-x-3 transition-all duration-200"
                        >
                          <span className="material-icons text-lg">help</span>
                          <div>
                            <p className="font-medium">Help & Support</p>
                            <p className="text-xs text-gray-500">Get assistance</p>
                          </div>
                        </button>
                      </div>

                      {/* Logout Section */}
                      <div className="border-t border-gray-100/50 pt-2">
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-6 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center space-x-3 transition-all duration-200"
                        >
                          <span className="material-icons text-lg">logout</span>
                          <div>
                            <p className="font-medium">Sign Out</p>
                            <p className="text-xs text-red-400">End your session</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="dashboard-container p-8 rounded-3xl shadow-xl border border-white/20 min-h-[calc(100vh-12rem)]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;