import { render } from '@testing-library/react';
import { AIBuildingOverlay } from '@/components/app/ai-building-overlay';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useLocalStorage } from '@/hooks/use-local-storage';

// Mock the entire module
vi.mock('@/hooks/use-local-storage', () => ({
  useLocalStorage: vi.fn(),
}));

vi.mock('@/hooks/use-code-space', () => ({
  useCodeSpace: vi.fn(),
}));

describe('AIBuildingOverlay', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  it('should render correctly with codeSpace prop when building is true', () => {
    const codeSpace = 'test';
    vi.mocked(useLocalStorage).mockReturnValue([true, vi.fn()]);
    const { getByTestId } = render(<AIBuildingOverlay codeSpace={codeSpace} building={true} />);
    expect(getByTestId(`ai-building-overlay-${codeSpace}`)).toBeInTheDocument();
  });

  it('should remember the building state when true', () => {
    const codeSpace = 'test';
    vi.mocked(useLocalStorage).mockReturnValue([true, vi.fn()]);
    const { getByTestId } = render(<AIBuildingOverlay codeSpace={codeSpace} />);
    expect(getByTestId(`ai-building-overlay-${codeSpace}`)).toBeInTheDocument();
  });

  it('should not render when building is false', () => {
    const codeSpace = 'test';
    vi.mocked(useLocalStorage).mockReturnValue([false, vi.fn()]);
    const { queryByTestId } = render(<AIBuildingOverlay codeSpace={codeSpace} building={false} />);
    expect(queryByTestId(`ai-building-overlay-${codeSpace}`)).not.toBeInTheDocument();
  });

  it('should remember the building state when false', () => {
    const codeSpace = 'test';
    vi.mocked(useLocalStorage).mockReturnValue([false, vi.fn()]);
    const { queryByTestId } = render(<AIBuildingOverlay codeSpace={codeSpace} />);
    expect(queryByTestId(`ai-building-overlay-${codeSpace}`)).not.toBeInTheDocument();
  });
});