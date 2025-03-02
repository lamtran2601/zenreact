/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/packages/core/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/packages/core/src/$1',
  },
  testMatch: ['<rootDir>/packages/*/src/**/*.test.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  verbose: true,
};
