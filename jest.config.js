export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },

    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },

    transformIgnorePatterns: ['/node_modules/'],

    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'jsom', 'node'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}