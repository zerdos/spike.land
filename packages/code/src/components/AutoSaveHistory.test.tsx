import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import AutoSaveHistory from './AutoSaveHistory';
import * as monaco from 'monaco-editor';

/// <reference types="@testing-library/jest-dom" />

/// <reference types="@testing-library/jest-dom" />

/// <reference types="@testing-library/jest-dom" />

/// <reference types="@testing-library/jest-dom" />

/// <reference types="@testing-library/jest-dom" />

/// <reference types="@testing-library/jest-dom" />

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
    await screen.findByText('Loading versions...');
  });

  it('fetches and displays versions', async () => {
    render(<AutoSaveHistory codeSpace="test" onRestore={mockOnRestore} onClose={mockOnClose} />);
    await screen.findByText('Jul 1, 2021, 12:00 AM');
    expect(screen.getByText('Jul 2, 2021, 12:00 AM')).toBeTruthy();
  });

  it('calls onRestore when restore button is clicked', async () => {
    render(<AutoSaveHistory codeSpace="test" onRestore={mockOnRestore} onClose={mockOnClose} />);
    const versionButton = await screen.findByText('Jul 1, 2021, 12:00 AM');
    fireEvent.click(versionButton);
    const restoreButton = await screen.findByText('Restore Selected Version');
    fireEvent.click(restoreButton);
    await waitFor(() => {
      expect(mockOnRestore).toHaveBeenCalledWith('console.log("Version 1");');
    });
  });

  it('calls onClose when close button is clicked', async () => {
    render(<AutoSaveHistory codeSpace="test" onRestore={mockOnRestore} onClose={mockOnClose} />);
    const closeButton = await screen.findByText('Close');
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('updates diff editor when a version is selected', async () => {
    render(<AutoSaveHistory codeSpace="test" onRestore={mockOnRestore} onClose={mockOnClose} />);
    const versionButton = await screen.findByText('Jul 1, 2021, 12:00 AM');
    fireEvent.click(versionButton);
    await waitFor(() => {
      expect(monaco.editor.createModel).toHaveBeenCalledTimes(2);
      expect(monaco.editor.createDiffEditor).toHaveBeenCalled();
    });
  });
});
/// <reference types="@testing-library/jest-dom" />
