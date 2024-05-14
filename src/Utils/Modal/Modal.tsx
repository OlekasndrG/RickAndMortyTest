// import { nanoid } from 'nanoid';
import React, { useEffect, FC, MouseEvent } from 'react';

import styles from './Modal.module.css';

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
    // window.addEventListener('click', handleDocumentClick);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // window.removeEventListener('click', handleDocumentClick);
    };
  }, [onClose]);

  return createPortal(
    <div onClick={handleBackdropCLick} className={styles.Overlay}>
      <div className={styles.InnerContainer}>{children}</div>
    </div>,
    ModalRoot
  );
};
