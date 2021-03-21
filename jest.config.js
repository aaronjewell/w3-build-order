module.exports = {
  roots: ["<rootDir>/lib/"],
  moduleFileExtensions: ["js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/lib/$1",
  },
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/lib/**/*.js"],
  coverageDirectory: "<rootDir>/coverage",
}
