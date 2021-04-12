module.exports = {
    collectCoverage: true,
    setupFiles: [
        '<rootDir>/setupFiles.js',
    ],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testMatch: [
        '<rootDir>/__tests__/**/*spec.js',
        '<rootDir>/src/**/*spec.js',
    ],
    modulePathIgnorePatterns: ['__mocks__','setupTests.js','setupFiles.js']
};
