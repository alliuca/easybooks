const { override, fixBabelImports, addBabelPlugin } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    style: 'css',
  }),
  addBabelPlugin(['emotion', { sourceMap: process.env.NODE_ENV === 'development' ? true : false }])
);
