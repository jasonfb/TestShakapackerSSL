const { env } = require('shakapacker')
const { existsSync } = require('fs')
const { resolve } = require('path')
const path = require('path');

const envSpecificConfig = () => {
  const pathToConfig = resolve(__dirname, `${env.nodeEnv}.js`)
  if (existsSync(pathToConfig)) {
    console.log(`Loading ENV specific webpack configuration file ${path}`);

    const baseConfig = require(pathToConfig);

    baseConfig.devServer = baseConfig.devServer || {};
    baseConfig.devServer.port = 3035;
    baseConfig.devServer.https = {
      key: path.resolve(__dirname, '../../config/ssl/abc.localhost.key'),
      cert: path.resolve(__dirname, '../../config/ssl/abc.localhost.crt'),
    };

    baseConfig.output.publicPath = 'https://abc.localhost:3035/';

    return baseConfig;
  } else {
    throw new Error(`Could not find file to load ${path}, based on NODE_ENV`);
  }
}

module.exports = envSpecificConfig()
