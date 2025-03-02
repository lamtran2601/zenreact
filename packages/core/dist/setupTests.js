/// <reference types="node" />
import '@testing-library/jest-dom';
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
    value: jest.fn((fn) => {
        fn();
        return 1;
    }),
});
Object.defineProperty(global, 'clearTimeout', {
    configurable: true,
    value: jest.fn(),
});
//# sourceMappingURL=setupTests.js.map