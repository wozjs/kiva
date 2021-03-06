const fs = require('fs-extra')
const path = require('path')
const defaultConfig = require('./default')

let kivaConfig = {}
try {
  const configFilePath = path.resolve(process.cwd(), 'kiva.config.js')
  fs.accessSync(configFilePath)
  kivaConfig = require(configFilePath)
  if (kivaConfig.demoHtml) kivaConfig.demoHtml = path.resolve(process.cwd(), kivaConfig.demoHtml)
  if (kivaConfig.configureWebpack && typeof kivaConfig.configureWebpack !== 'function') {
    kivaConfig.configureWebpack = webpack => {
      return kivaConfig.configureWebpack
    }
  }
} catch (err) {
  console.log('未找到 kiva 配置文件', err)
  kivaConfig = {}
}

module.exports = {
  ...defaultConfig,
  ...kivaConfig,
}
