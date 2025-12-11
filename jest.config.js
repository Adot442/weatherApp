export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  injectGlobals: true,
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Use Babel to transform JS/JSX files
  },
  extensionsToTreatAsEsm: [".jsx"], // Treat JSX files as ESM
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // Mock CSS imports
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js", // Mock static assets
  },
};