'use client';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    // Main modal overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* Modal content */}
      <div
        className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 px-2 py-1 text-lg text-gray-600 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;