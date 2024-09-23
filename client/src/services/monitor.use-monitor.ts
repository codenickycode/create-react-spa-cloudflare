import { createContext, useContext } from 'react';

export const MonitorContext = createContext<{
  captureException: (exception: unknown) => string;
} | null>(null);

export const useMonitor = () => {
  const ctx = useContext(MonitorContext);
  if (!ctx) {
    return {
      captureException: () => {
        console.warn(
          'tried to capture exception before monitor was initialized',
        );
      },
    };
  }
  return ctx;
};
