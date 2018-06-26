## webpack
webpack是一款强大的模块加载器兼打包工具，它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、图片等都作为模块来使用和处理,优势如下:
1. webpack 是以commonJS的形式来书写，但对AMD/CMD的支持也很全面,方便旧项目进行代码迁移
2. 能被模块化的不仅仅是JS,还包括各种资源文件
3. 开发便捷，能替代部分gulp的工作，比如打包、混淆压缩、图片转base64等
4. 扩展性强，插件机制完善，特别是支持React热插拔
## 1. webpack命令行
### 1.1 全局安装webpack
```
$ npm install webpack -g
```
### 1.2 本地安装webpack
```
$ npm install webpack --save-dev
```
### 1.3 命令行中使用
```
$    webpack index.js bundle.js
```
 > index.js 打包的入口文件路径 bundle.js 打包后的输出文件名

### 1.4 命令行参数
- webpack 开发环境下编译
- webpack -p 生产环境下编译，会压缩生成后的文件
- webpack -w 开发环境下持续的监听文件>变动来进行编译
- webpack -d 生成map映射文件,会在控制台的Sources页签中出现存放打包前原始文件的webpack://目录，可以打断点，帮助调试 `webpack index.js bundle.js -d'
- webpack --progress 显示构建百分比进度
- webpack --display-error-details 显示打包过程中的出错信息(比如 webpack寻找模块的过程)
- webpack --profile 输出性能数据，可以看到每一步的耗时