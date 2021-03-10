module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  moduleNameMapper: {
    '^@src/(.*)': '<rootDir>/src/$1',
  },
  // roots: ['src'],
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/lib/', '/node_modules/', './schema.graphql'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
