/// <reference types="node" />
import '@testing-library/jest-dom';

declare const global: typeof globalThis;

// Mock window.performance for tests
const originalPerformance = global.performance || {};
Object.defineProperty(global, 'performance', {
  configurable: true,
  value: {
    ...originalPerformance,
    now: jest.fn(() => Date.now()),
  },
});

// Mock setTimeout/clearTimeout
Object.defineProperty(global, 'setTimeout', {
  configurable: true,
  value: jest.fn((fn: () => void) => {
    fn();
    return 1;
  }) as unknown as typeof setTimeout,
});

Object.defineProperty(global, 'clearTimeout', {
  configurable: true,
  value: jest.fn() as unknown as typeof clearTimeout,
});
