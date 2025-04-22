module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.jest.json', // Usar o tsconfig específico para Jest
            },
        ],
    },
    transformIgnorePatterns: [
        'node_modules/(?!(.*\\.mjs$))',
    ],
};