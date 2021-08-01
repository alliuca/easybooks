const { override, fixBabelImports, addBabelPlugin } = require('customize-cra');

module.exports = override(
  fixBabelImports('babel-plugin-import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addBabelPlugin(['emotion', { sourceMap: process.env.NODE_ENV === 'development' ? true : false }])
);
