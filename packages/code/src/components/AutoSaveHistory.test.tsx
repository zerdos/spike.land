import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AutoSaveHistory } from './AutoSaveHistory';
import * as monaco from 'monaco-editor';

// Mock the monaco editor
jest.mock('monaco-editor', () => ({
  editor: {
    createDiffEditor: jest.fn().mockReturnValue({
      setModel: jest.fn(),
      dispose: jest.fn(),
    }),
    createModel: jest.fn(),
  },
}));

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { timestamp: 1625097600000, code: 'console.log("Version 1");' },
      { timestamp: 1625184000000, code: 'console.log("Version 2");' },
    ]),
  })
) as jest.Mock;

// Mock the useVirtualizer hook
jest.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: jest.fn().mockReturnValue({
    getVirtualItems: () => [
      { index: 0, key: '0', size: 150, start: 0 },
      { index: 1, key: '1', size: 150, start: 150 },
    ],
    getTotalSize: () => 300,
  }),
}));

describe('AutoSaveHistory', () => {
  const mockOnRestore = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    render(<AutoSaveHistory codeSpace="test" onRestore={mockOnRestore} onClose={mockOnClose} />);
    expect(await screen.findByText('Loading versions...')).toBeInTheDocument();
  });

  it('fetches and displays versions', async () => {
    render(<AutoSaveHistory codeSpace="test" onRestore={mockOnRestore} onClose={mockOnClose} />);
    await waitFor(() => {
      expect(screen.getByText('Jul 1, 2021, 12:00 AM')).toBeInTheDocument();
      expect(screen.getByText('Jul 2, 2021, 12:00 AM')).toBeInTheDocument();
    });
  });

  it('calls onRestore when restore button is clicked', async () => {
    render(<AutoSaveHistory codeSpace="test" onRestore={mockOnRestore} onClose={mockOnClose} />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('Jul 1, 2021, 12:00 AM'));
    });
    await waitFor(() => {
      fireEvent.click(screen.getByText('Restore Selected Version'));
    });
    expect(mockOnRestore).toHaveBeenCalledWith('console.log("Version 1");');
  });

  it('calls onClose when close button is clicked', async () => {
    render(<AutoSaveHistory codeSpace="test" onRestore={mockOnRestore} onClose={mockOnClose} />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('Close'));
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('updates diff editor when a version is selected', async () => {
    render(<AutoSaveHistory codeSpace="test" onRestore={mockOnRestore} onClose={mockOnClose} />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('Jul 1, 2021, 12:00 AM'));
    });
    await waitFor(() => {
      expect(monaco.editor.createModel).toHaveBeenCalledTimes(2);
      expect(monaco.editor.createDiffEditor).toHaveBeenCalled();
    });
  });
});
