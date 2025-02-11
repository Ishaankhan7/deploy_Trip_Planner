if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    plugins: [
      require('tailwindcss'),
      require('@tailwindcss/postcss'),
      require('autoprefixer'),
    ],
  };
}
