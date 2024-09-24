import { useState } from 'react';
import { Spinner } from './components/ui.spinner';
import { Modal } from './components/ui.modal';
import { useQuery } from '@tanstack/react-query';
import { getServerUrl } from './config';

const serverUrl = getServerUrl();

export const Example = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const serverOkQuery = useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      return fetch(serverUrl)
        .then(async (res) => {
          if (!res.ok) {
            throw res;
          }
          return res.text();
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <h1>Hello from React SPA!</h1>
      <div>
        <p>Server connection: {serverOkQuery.data ? '✅' : '❌'}</p>
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
