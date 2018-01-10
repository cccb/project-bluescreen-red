
let config = require('./webpack.config');

config.devServer = {
    contentBase: 'src/public',
    hot: true,
    inline: true,
    port: 3333,
    host: 'localhost',
}

module.exports = config;

