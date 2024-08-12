module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        "root": ["./src"],
        "alias": {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@data": "./src/data",
          "@routes": "./src/routes",
          "@screens": "./src/screens",
          "@storage": "./src/storage",
          "@styles": "./src/styles",
        }
      }], 'react-native-reanimated/plugin'
    ]
  };
};