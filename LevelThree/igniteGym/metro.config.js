const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const { mergeConfig } = require('metro-config');

const nativeWindConfig = withNativeWind(getDefaultConfig(__dirname), { input: './src/theme/global.css' });

const svgTransformerConfig = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  },
  resolver: {
    assetExts: getDefaultConfig(__dirname).resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...getDefaultConfig(__dirname).resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(nativeWindConfig, svgTransformerConfig);