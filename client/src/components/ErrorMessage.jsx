import React, { useEffect, useState } from 'react';

const ErrorMessage = ({ message, onClose, autoClose = false, duration = 7000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (!message) return;

    // Shake animation on mount
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          if (onClose) onClose();
        }, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, autoClose, duration, onClose]);

  if (!message || !isVisible) return null;

  return (
    <div className={`toast toast-error animate-slide-up ${isShaking ? 'animate-pulse' : ''} ${!isVisible ? 'animate-fade-out' : ''}`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => {
                    if (onClose) onClose();
                  }, 300);
                }}
                className="ml-4 text-red-400 hover:text-red-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mt-1 text-sm text-red-700">{message}</p>
            <div className="mt-2">
              <button
                onClick={() => window.location.reload()}
                className="text-xs text-red-600 hover:text-red-800 underline"
              >
                Try refreshing the page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;