const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  coveragePathIgnorePatterns: [],
  coverageReporters: ["lcov", "text", "text-summary"],
  moduleDirectories: ["node_modules", "src"],
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
