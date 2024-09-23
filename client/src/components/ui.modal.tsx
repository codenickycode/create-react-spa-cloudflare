import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  closeOnEsc?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  closeOnEsc = true,
  className,
}: ModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Closes modal on 'esc'. This needs to be smarter if you will have more than
  // one modal open at a time. We do not currently have that requirement.
  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [closeOnEsc, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  if (!isOpen && !isAnimating) {
    return null;
  }

  return (
    <div
      className={classNames(
        'fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50',
        isOpen ? 'animate-fadeIn' : 'animate-fadeOut',
      )}
      onClick={onClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className={classNames(
          'rounded-lg p-6 m-4 bg-gradient-to-b from-slate-700 to-sky-950',
          isOpen ? 'animate-scaleIn' : 'animate-scaleOut',
          className ?? '',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 text-3xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
