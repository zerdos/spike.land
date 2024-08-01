import React from 'react';
import { render, act } from '@testing-library/react';
import { Wrapper } from '../Wrapper';
import * as sharedModule from '../shared';

jest.mock('../shared', () => ({
  transpile: jest.fn(),
}));

describe('Wrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Wrapper code="" />);
  });

  it('calls transpile with correct arguments', async () => {
    const mockTranspile = sharedModule.transpile as jest.MockedFunction<typeof sharedModule.transpile>;
    mockTranspile.mockResolvedValue('transpiled code');

    await act(async () => {
      render(<Wrapper code="test code" />);
    });

    expect(mockTranspile).toHaveBeenCalledWith({
      code: 'test code',
      originToUse: window.location.origin,
    });
  });

  // Add more tests as needed
});
