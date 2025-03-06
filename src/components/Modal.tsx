// components/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-100">
      <div className="bg-zinc-300 p-5 rounded-lg shadow-lg w-96">
        {children}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 hover:cursor-pointer rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
