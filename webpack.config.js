const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    main: ['./main.js'],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    library: 'huixi',
  },

  mode: 'development',
};
