import { useState } from 'react';
import { Spinner } from './components/ui.spinner';
import { Modal } from './components/ui.modal';
import { useQuery } from '@tanstack/react-query';
import { getServerUrl } from './config';
import { hc } from 'hono/client';
import type { ServerApi } from '../../server/src/types';
import { useMonitor } from './services/monitor.use-monitor';

const serverUrl = getServerUrl();

const { $get } = hc<ServerApi>(serverUrl)['index'];

const useServerOkQuery = () => {
  const { captureException } = useMonitor();
  return useQuery({
    queryKey: ['hello-from-server'],
    queryFn: async () => {
      return $get()
        .then(async (res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .catch((error) => {
          captureException(error);
          return null;
        });
    },
  });
};

export const Example = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const serverOkQuery = useServerOkQuery();
  return (
    <div className="flex flex-col gap-4">
      <h1>Hello from React!</h1>
      <div>
        <p>Server connection: {serverOkQuery.isSuccess ? '✅' : '❌'}</p>
      </div>
      <div>
        <p>
          Spinner: <Spinner isSpinning={true}>spinner example</Spinner>
        </p>
      </div>
      <div>
        <button
          className="text-white bg-blue-700 p-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          show modal
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="bg-black text-white p-4">I am a modal!</h2>
        </Modal>
      </div>
    </div>
  );
};
