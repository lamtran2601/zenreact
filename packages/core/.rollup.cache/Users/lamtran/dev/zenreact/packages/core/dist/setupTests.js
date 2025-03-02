import '@testing-library/jest-dom';
const originalPerformance = global.performance || {};
Object.defineProperty(global, 'performance', {
    configurable: true,
    value: {
        ...originalPerformance,
        now: jest.fn(() => Date.now()),
    },
});
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