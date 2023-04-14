// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const { resolver } = defaultConfig;

module.exports = {
  resolver: {
    ...resolver,
    assetExts: [...resolver.assetExts, "bin", "db"],
  },
};
