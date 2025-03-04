/// <reference types="node" />
import '@testing-library/jest-dom';

// Enable fake timers globally
jest.useFakeTimers();

beforeEach(() => {
  // Clear all timer related state
  jest.clearAllTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  // Just clear timers without disabling them
  jest.clearAllTimers();
});
