module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    "plugins": [
      ["module-resolver", {
        "root": ["./src"],
        "alias": {
          '@assets': './src/assets',
          '@components': './src/components',
          '@screens': './src/screens',
          '@storage': './src/storage',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@contexts': './src/contexts',
          '@routes': './src/routes',
          '@theme': './src/theme',
          '@data': './src/data',
          '@notifications': './src/notifications'
        }
      }]
    ]
  };
};