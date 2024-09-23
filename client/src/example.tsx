import { useState } from 'react';
import { Spinner } from './components/ui.spinner';
import { Modal } from './components/ui.modal';

export const Example = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <h1>Hello from React SPA!</h1>
      <Spinner isSpinning={true}>spinner example</Spinner>
      <button onClick={() => setIsModalOpen(true)}>show modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>I am a modal!</h2>
      </Modal>
    </div>
  );
};
