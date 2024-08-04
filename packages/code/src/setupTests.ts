import '@testing-library/jest-dom';


import  {TextEncoder, TextDecoder} from 'text-encoding';   


globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

self.TextEncoder = TextEncoder;
self.TextDecoder = TextDecoder;