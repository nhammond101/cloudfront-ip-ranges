module.exports = {
  collectCoverage: false,
  coverageReporters: ['json-summary', 'lcov', 'text'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  preset: 'ts-jest',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        output: './test-reports/junit.xml',
      },
    ],
  ],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testEnvironment: 'node',
  verbose: true,
};
