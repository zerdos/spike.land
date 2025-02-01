import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Mock } from 'vitest';
import { KVLogger } from './Logs';

type SpyInstance = ReturnType<typeof vi.spyOn>;

describe('KVLogger', () => {
  let mockKVNamespace: {
    get: Mock;
    put: Mock;
    list: Mock;
  };
  let mockConsoleLog: SpyInstance;
  let mockConsoleError: SpyInstance;
  let logger: KVLogger;

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    // Mock KVNamespace
    mockKVNamespace = {
      get: vi.fn(),
      put: vi.fn(),
      list: vi.fn()
    };

    // Mock console methods
    mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Create logger instance
    logger = new KVLogger('test-prefix', mockKVNamespace as any);

    // Set up default mock behaviors
    mockKVNamespace.get.mockImplementation((key: string) => {
      if (key === 'test-prefix:counter') return '0';
      return null;
    });
    mockKVNamespace.put.mockResolvedValue(undefined);
    mockKVNamespace.list.mockResolvedValue({ keys: [] });
  });

  describe('log method', () => {
    it('should increment counter and save log entry', async () => {
      // Mock date to have consistent timestamp
      const mockDate = new Date('2023-01-01T12:00:00Z');
      vi.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

      await logger.log('Test message');

      // Verify counter increment
      expect(mockKVNamespace.get).toHaveBeenCalledWith('test-prefix:counter');
      expect(mockKVNamespace.put).toHaveBeenCalledWith('test-prefix:counter', '1');

      // Verify log entry saved
      expect(mockKVNamespace.put).toHaveBeenCalledWith(
        'test-prefix:1', 
        JSON.stringify({ level: 'info', message: 'Test message' })
      );

      // Verify console log
      expect(mockConsoleLog).toHaveBeenCalledWith('Log entry saved: test-prefix:1');
    });

    it('should handle different log levels', async () => {
      await logger.log('Warning message', 'warn');

      expect(mockKVNamespace.put).toHaveBeenCalledWith(
        expect.any(String), 
        JSON.stringify({ level: 'warn', message: 'Warning message' })
      );
    });

    it('should handle initial counter setup', async () => {
      // Simulate first log with no existing counter
      mockKVNamespace.get.mockResolvedValueOnce(null);

      await logger.log('First log message');

      // Verify initial counter is set to 0 before incrementing
      expect(mockKVNamespace.put).toHaveBeenCalledWith('test-prefix:counter', '0');
      expect(mockKVNamespace.put).toHaveBeenCalledWith('test-prefix:counter', '1');
    });

    it('should handle log saving errors', async () => {
      // Simulate put method throwing an error
      mockKVNamespace.put.mockRejectedValueOnce(new Error('Storage error'));

      await logger.log('Error log');

      // Verify error is logged to console
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Failed to save log entry:', 
        expect.any(Error)
      );
    });
  });

  describe('getLogs method', () => {
    it('should retrieve and sort logs for a specific date', async () => {
      // Mock list and get methods to return sample logs
      mockKVNamespace.list.mockResolvedValue({
        keys: [
          { name: 'test-prefix:2023-01-01:10:30:00' },
          { name: 'test-prefix:2023-01-01:09:15:00' }
        ]
      });

      mockKVNamespace.get
        .mockResolvedValueOnce(JSON.stringify({ level: 'info', message: 'Log 2' }))
        .mockResolvedValueOnce(JSON.stringify({ level: 'warn', message: 'Log 1' }));

      const logs = await logger.getLogs('2023-01-01');

      expect(logs).toEqual([
        { 
          timestamp: '2023-01-01T09:15:00', 
          level: 'warn', 
          message: 'Log 1' 
        },
        { 
          timestamp: '2023-01-01T10:30:00', 
          level: 'info', 
          message: 'Log 2' 
        }
      ]);
    });

    it('should handle empty log list', async () => {
      const logs = await logger.getLogs('2023-01-02');

      expect(logs).toEqual([]);
    });

    it('should handle log retrieval errors', async () => {
      // Simulate list method throwing an error
      mockKVNamespace.list.mockRejectedValueOnce(new Error('Retrieval error'));

      const logs = await logger.getLogs('2023-01-03');

      // Verify error is logged and empty array is returned
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Failed to retrieve logs:', 
        expect.any(Error)
      );
      expect(logs).toEqual([]);
    });
  });
});
