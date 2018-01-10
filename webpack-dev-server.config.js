
let config = require('./webpack.config');

config.devServer = {
    contentBase: 'src/public',
    hot: false,
    inline: true,
    port: 3333,
    host: 'localhost',
}

module.exports = config;

