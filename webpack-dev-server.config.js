
let config = require('./webpack.config');

config.devServer = {
    contentBase: 'src/public',
    hot: false,
    inline: true,
    port: 3333,
    host: 'localhost',
    historyApiFallback: true
}

module.exports = config;

