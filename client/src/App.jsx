import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardAdmin from './pages/dashboard/DashboardAdmin';
import DashboardUser from './pages/dashboard/DashboardUser';
import DashboardStoreOwner from './pages/dashboard/DashboardStoreOwner';
import StoreDetailsPage from './pages/StoreDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            } />
            
            <Route path="/stores/:id" element={
              <ProtectedRoute>
                <StoreDetailsPage />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

// Component to route to appropriate dashboard based on user role
const DashboardRouter = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  switch (user.role) {
    case 'admin':
      return <DashboardAdmin />;
    case 'store_owner':
      return <DashboardStoreOwner />;
    case 'user':
    default:
      return <DashboardUser />;
  }
};

export default App;