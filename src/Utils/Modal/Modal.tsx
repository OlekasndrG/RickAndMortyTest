import React, { useEffect, FC, MouseEvent } from 'react';

import { createPortal } from 'react-dom';
const ModalRoot = document.getElementById('modal-root') as HTMLElement;

export type DefaultModalType = {
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: FC<DefaultModalType> = ({ onClose, children }) => {
  const handleBackdropCLick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={handleBackdropCLick}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10 flex justify-center items-center"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
        {children}
      </div>
    </div>,
    ModalRoot
  );
};
