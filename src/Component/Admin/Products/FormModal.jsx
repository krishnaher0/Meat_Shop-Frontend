import React from 'react';

const FormModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg relative transform transition-all">
        <button 
          onClick={onClose} 
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-800 transition duration-150 ease-in-out"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormModal;
