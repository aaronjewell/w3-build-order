module.exports = {
  roots: ["<rootDir>/lib/", "<rootDir>/components/"],
  moduleFileExtensions: ["js", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/lib/$1",
  },
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
  },
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
};
