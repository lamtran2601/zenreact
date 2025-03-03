/// <reference types="node" />
import '@testing-library/jest-dom';

beforeEach(() => {
  // Clear all timer related state
  jest.clearAllTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  // Restore all timer related state
  jest.useRealTimers();
});
