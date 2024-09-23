import classNames from 'classnames';
import type { ReactNode } from 'react';

interface SpinnerProps {
  isSpinning: boolean;
  children: ReactNode;
}

export const Spinner = ({ isSpinning, children }: SpinnerProps) => {
  return (
    <span className="inline-flex items-center justify-center">
      {isSpinning && (
        <span className="block absolute">
          <span className="block animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent" />
        </span>
      )}
      <span
        className={classNames(
          'transition-opacity duration-300',
          isSpinning ? 'opacity-0' : 'opacity-100',
        )}
      >
        {children}
      </span>
    </span>
  );
};
