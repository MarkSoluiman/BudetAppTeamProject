module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    testEnvironment: "node",
  };
  