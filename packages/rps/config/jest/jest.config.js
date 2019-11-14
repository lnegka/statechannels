const { configureEnvVariables } = require('@statechannels/devtools');
configureEnvVariables();
const { resolve } = require('path');
const root = resolve(__dirname, '../../');

module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    },
  },
  rootDir: root,
  setupFilesAfterEnv: ['./jest.setup.js'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  reporters: ['default', '@statechannels/jest-gas-reporter'],
  setupFiles: ['<rootDir>/config/polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['<rootDir>/src/**/__tests__/?(*.)test.ts?(x)'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/../../node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
  },
  preset: 'ts-jest',
  moduleFileExtensions: [
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'web.js',
    'js',
    'web.jsx',
    'jsx',
    'json',
    'node',
    'mjs',
  ],
};
