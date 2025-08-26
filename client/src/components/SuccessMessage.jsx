import React, { useEffect, useState } from 'react';

const SuccessMessage = ({ message, onClose, autoClose = true, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!message) return;

    if (autoClose) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / (duration / 100));
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 100);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          if (onClose) onClose();
        }, 300);
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [message, autoClose, duration, onClose]);

  if (!message || !isVisible) return null;

  return (
    <div className={`toast toast-success animate-slide-up ${!isVisible ? 'animate-fade-out' : ''}`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-green-800">Success!</h3>
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => {
                    if (onClose) onClose();
                  }, 300);
                }}
                className="ml-4 text-green-400 hover:text-green-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mt-1 text-sm text-green-700">{message}</p>
          </div>
        </div>
        
        {autoClose && (
          <div className="mt-3">
            <div className="w-full bg-green-200 rounded-full h-1">
              <div 
                className="bg-green-500 h-1 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessMessage;