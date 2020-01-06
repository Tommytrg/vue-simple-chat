module.exports = {
  banner: true,
  output: {
    extractCSS: false,
  },
  input: 'src/index.ts',
  plugins: {
    vue: {
      css: true
    }
  }
};
      // runtimeHelpers: true,
