const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    // can be overwritten by process.env.HOST
    host: 'localhost',  
    port: 8080
  },
//   chainWebpack: config => {
//     config.resolve.alias
//       .set('@', resolve('src'))
//       .set('src', resolve('src'))
//       .set('common', resolve('src/common'))
//       .set('components', resolve('src/components'));
//   },
  pages: {
    index: 'src/views/main/main.ts', // your main window
    photo: 'src/views/photo/main.ts' // your video window
  },
  pluginOptions: {
    electronBuilder: {
        nodeIntegration: true
    }
  },
};
