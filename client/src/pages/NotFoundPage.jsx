import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;