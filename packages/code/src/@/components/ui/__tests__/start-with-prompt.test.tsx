import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StartWithPrompt } from '../start-with-prompt';
import { useDarkMode } from '@/hooks/use-dark-mode';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useDarkMode hook
vi.mock('@/hooks/use-dark-mode', () => ({
  useDarkMode: vi.fn(),
}));

// Mock the md5 function
vi.mock('@/lib/md5', () => ({
  md5: vi.fn((input) => `mocked-md5-${input}`),
}));

// Mock fetch function
global.fetch = vi.fn(() => Promise.resolve({ ok: true }));

describe('StartWithPrompt', () => {
  beforeEach(() => {
    // Mock the useDarkMode hook to return a default value
    (useDarkMode as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ isDarkMode: false });
  });

  it('renders without crashing', () => {
    render(<StartWithPrompt />);
    expect(screen.getByText('Generate a new app or website')).toBeTruthy();
  });

  it('updates prompt when user types', async () => {
    render(<StartWithPrompt />);
    const textarea = screen.getByPlaceholderText('Enter your prompt here or paste an image...');
    await userEvent.type(textarea, 'Test prompt');
    expect(textarea).toHaveValue('Test prompt');
  });

  it('shows upload image button', () => {
    render(<StartWithPrompt />);
    expect(screen.getByText('Upload Image')).toBeTruthy();
  });

  it('shows generate button', () => {
    render(<StartWithPrompt />);
    expect(screen.getByText('Generate')).toBeTruthy();
  });

  it('shows template button when no images are uploaded', () => {
    render(<StartWithPrompt />);
    expect(screen.getByText('Choose from templates')).toBeTruthy();
  });

  it('hides template button when images are uploaded', async () => {
    const { container } = render(<StartWithPrompt />);
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const uploadButton = screen.getByText('Upload Image');
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    
    if (!fileInput) {
      throw new Error('File input not found');
    }

    // Simulate clicking the upload button
    fireEvent.click(uploadButton);

    // Simulate file upload
    await userEvent.upload(fileInput, file);

    // Log the images state
    console.log('File input files:', fileInput.files);
    console.log('Container HTML:', container.innerHTML);

    // Wait for the component to update
    await waitFor(() => {
      expect(screen.queryByText('Choose from templates')).toBeNull();
    }, { timeout: 3000 });
  });

  it('calls handleGenerate when generate button is clicked', async () => {
    render(<StartWithPrompt />);
    const generateButton = screen.getByText('Generate');
    const promptTextarea = screen.getByPlaceholderText('Enter your prompt here or paste an image...');

    await userEvent.type(promptTextarea, 'Test prompt');
    await userEvent.click(generateButton);

    expect(sessionStorage.getItem('mocked-md5-Test prompt')).toBeTruthy();
    
    // Check if the sessionStorage was set correctly
    const sessionData = JSON.parse(sessionStorage.getItem('mocked-md5-Test prompt') || '{}');
    expect(sessionData.prompt).toBe('Test prompt');
  });

  it('changes styles based on dark mode', () => {
    (useDarkMode as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ isDarkMode: true });
    const { container } = render(<StartWithPrompt />);
    
    expect(container.firstChild).toHaveClass('bg-gradient-to-br from-gray-900 to-gray-800 text-white');
  });
});