import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onCancel, onConfirm }) => {
    
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-8 rounded-md shadow-lg transform scale-105 opacity-100 transition-transform duration-300 ease-in-out">
            <p className="text-lg font-semibold text-gray-800 mb-4">Tem certeza que deseja encerrar?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
                onClick={onCancel}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={onConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
