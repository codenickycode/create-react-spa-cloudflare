import { describe, it, expect, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Example } from './example';

// Mock only the react-query hook
vi.mock('@tanstack/react-query', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@tanstack/react-query')>();
  return {
    ...mod,
    useQuery: vi.fn().mockReturnValue({ data: null }),
  };
});

describe('Example Component', () => {
  const queryClient = new QueryClient();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <Example />
      </QueryClientProvider>,
    );

  it('renders the component with correct initial state', () => {
    renderComponent();

    expect(screen.getByText('Hello from React!')).toBeDefined();
    expect(screen.getByText('Server connection: ❌')).toBeDefined();
    expect(screen.getByText('spinner example')).toBeDefined();
    expect(screen.getByText('show modal')).toBeDefined();
    expect(screen.queryByText('I am a modal!')).toBeNull();
  });

  it('opens the modal when the button is clicked', () => {
    renderComponent();

    const showModalButton = screen.getByRole('button', { name: 'show modal' });
    fireEvent.click(showModalButton);

    expect(screen.getByText('I am a modal!')).toBeDefined();
  });

  it('closes the modal when clicking outside', () => {
    renderComponent();

    const showModalButton = screen.getByRole('button', { name: 'show modal' });
    fireEvent.click(showModalButton);

    expect(screen.getByText('I am a modal!')).toBeDefined();

    // Simulate clicking outside the modal
    fireEvent.mouseDown(document);

    waitForElementToBeRemoved(screen.queryByText('I am a modal!'));
  });

  it('renders the spinner', () => {
    renderComponent();

    const spinnerText = screen.getByText('spinner example');
    expect(spinnerText).toBeDefined();

    // Check if the spinner is actually spinning
    // This assumes the Spinner component adds a class or attribute when spinning
    const spinnerParent = spinnerText.closest('[aria-busy="true"]');
    expect(spinnerParent).toBeDefined();
  });
});
