module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  setupFilesAfterEnv: ["./jest-setup.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-redux|@react-navigation|@react-native|react-native|react-test-renderer|@testing-library/react-native|jest)/)",
  ],
};
