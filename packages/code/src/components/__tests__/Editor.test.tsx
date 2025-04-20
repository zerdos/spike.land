import React from 'react';
import { vi, Mock } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Editor } from '../Editor';
import { useEditorState } from '../../hooks/use-editor-state';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import type { ICode, ICodeSession } from '@/lib/interfaces';
import { sanitizeSession } from 'src/modules';

// Define the mock function beforehand
const mockInitializeMonacoFn = vi.fn();

// Mock hooks and services using purely relative paths
vi.mock('../../hooks/use-editor-state');
vi.mock('../../hooks/useErrorHandling');
// Mock the module factory using the predefined mock function
vi.mock('../../services/editorUtils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/services/editorUtils')>();
  return {
    ...actual,
    initializeMonaco: mockInitializeMonacoFn, // Use the predefined mock function
  };
});

const mockUseEditorState = vi.mocked(useEditorState);
const mockUseErrorHandling = vi.mocked(useErrorHandling);
// Use the predefined mock function reference directly
const mockInitializeMonaco = mockInitializeMonacoFn;

describe('Editor Component', () => {
  let mockCSess: ICode;
  let mockSessionData: ICodeSession;
  let mockContainerRef: React.RefObject<HTMLDivElement>;
  let mockSetValue: Mock;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    mockSetValue = vi.fn();
    // Assign a div element to the ref for initialization - make it writable
    mockContainerRef = { current: document.createElement('div') }; // Simpler and writable

    mockSessionData = sanitizeSession({
      code: 'console.log("hello");',
      transpiled: '',
      css: '',
      html: '',
      codeSpace: 'test-space',
      messages: [],
    });

    mockCSess = {
      getSession: vi.fn().mockResolvedValue(mockSessionData),
      setCode: vi.fn().mockResolvedValue(mockSessionData.code),
      sub: vi.fn().mockReturnValue(() => {}), // Mock unsubscribe function
      setSession: vi.fn(),
      init: vi.fn(),
      screenshot: vi.fn(),
      addMessageChunk: vi.fn(),
      getMessages: vi.fn(),
      // Add missing ICode interface methods/properties
      addMessage: vi.fn(),
      removeMessages: vi.fn(),
      getCode: vi.fn(),
      getCodeSpace: vi.fn(),
    };

    // Mock return values for hooks
    mockUseEditorState.mockReturnValue({
      containerRef: mockContainerRef,
      editorState: {
        started: false, // Initial state is not started
        sub: false,
        code: '',
        setValue: mockSetValue,
      },
      setEditorState: vi.fn((updateFn) => {
        // Simulate state update for 'started' and 'setValue'
        if (typeof updateFn === 'function') {
          const newState = updateFn({
            started: false,
            sub: false,
            code: '',
            setValue: mockSetValue,
          });
          // If the update sets 'started' to true, update the mock return value
          if (newState.started) {
             mockUseEditorState.mockReturnValue({
               containerRef: mockContainerRef,
               editorState: { ...newState },
               setEditorState: vi.fn(), // Keep the setter mock simple after update
               engine: "monaco",
             });
          }
        }
      }),
      engine: "monaco",
    });

    mockUseErrorHandling.mockReturnValue({
      errorType: null,
      throttledTypeCheck: vi.fn().mockResolvedValue(undefined),
      setErrorType: vi.fn(),
    });

    // Mock initializeMonaco to return a mock editor instance using the correct reference
    mockInitializeMonaco.mockResolvedValue({
        getValue: vi.fn(() => mockSessionData.code),
        silent: false,
        getErrors: vi.fn().mockResolvedValue([]),
        isEdit: false,
        setValue: mockSetValue, // Return the mock setValue function
    });
  });

  it('should initialize Monaco editor after session is loaded', async () => {
    render(<Editor codeSpace="test-space" cSess={mockCSess} />);

    // Wait for the session data to be fetched
    await waitFor(() => {
      expect(mockCSess.getSession).toHaveBeenCalled();
    });

    // IMPORTANT: Wait for the component to potentially re-render after session state is set
    // We can wait for the initializeMonaco mock itself, as it should be called after session is set.
    await waitFor(() => {
      expect(mockInitializeMonaco).toHaveBeenCalledTimes(1);
    });

    // Verify initializeMonaco was called with correct parameters (already covered by the above waitFor)
    expect(mockInitializeMonaco).toHaveBeenCalledWith({
      container: mockContainerRef.current,
      codeSpace: 'test-space',
      code: mockSessionData.code,
      onChange: expect.any(Function), // Check if onChange is a function
    });

    // Check if setEditorState was called to update the state (including setValue)
     await waitFor(() => {
        // Check the mock function passed to useEditorState
        const setEditorStateMock = mockUseEditorState().setEditorState;
        expect(setEditorStateMock).toHaveBeenCalled();
     });

     // Check if the editor's setValue function is eventually set in the state
     await waitFor(() => {
        // Re-evaluate the mock return value after state updates
        const finalState = mockUseEditorState().editorState;
        expect(finalState.started).toBe(true);
        expect(finalState.code).toBe(mockSessionData.code);
        // Ensure the setValue function passed during initialization is stored
        expect(finalState.setValue).toBe(mockSetValue);
     });
  });

  // Add more tests as needed:
  // - Test content change handling (handleContentChange)
  // - Test external update handling (cSess.sub callback)
  // - Test error scenarios during initialization or updates
  // - Test cleanup logic
});
