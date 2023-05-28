module.exports = function(api) {
  presets: ['module:metro-react-native-babel-preset'],
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
