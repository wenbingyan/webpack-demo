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

## 2. 使用webpack配置文件
### 2.1 初始化git
```
$ mkdir webpack-demos && cd webpack-demos && git init
```
### 2.2 初始化项目
```
$ npm init -y
```
### 2.3 增加.gitignore
创建文件
```
$ touch.gitignore
```
在文件中增加以下内容
```
node_modules
.idea
```
### 2.4 在项目根目录下创建src和build目录
src目录存放源码，build目录存放编译打包之后的资源
```
$ mkdir src build
```
### 2.5 增加以下文件
#### 2.5.1 src/component.js
```
$ cd src && touch component.js
exports.name = 'zfpx';
```
#### 2.5.2 src/index.js
```
$ cd src && touch index.js
var comp = require('./component.js');
console.log(comp.name);
```
####2.5.3 build/index.html
```
$ cd build && touch index.html
<script src="bundle.js"></script>
```
### 2.6 下载webpack
```
$ npm install webpack --save-dev
```
### 2.7 创建webpack的配置文件
```
$ touch webpack.config.js
```
配置webpack.config.js
```
var path = require('path');
module.exports = {
     //打包的入口文件  String|Object
    entry: path.resolve(__dirname, 'src/index.js'),
    output: { //配置打包结果     Object
        //定义输出文件路径
        path: path.resolve(__dirname, 'build'),
        //指定打包文件名称
        filename: 'bundle.js'
    },
};
```
请注意webpack.config.js这个文件名是定死的，不然会报Output filename not configured的错误；另外，如果不按这个命名，那么在webpack运行的时候需要通过--config这个参数指定配置文件，比如：webpack --config conf.js

### 2.8 修改 package.json
```
  "scripts": {
+    "build": "webpack"
  }
```  
### 2.9 执行命令进行编译
```
$ npm run build
```
> build目录下会新增了一个bundle.js文件，里面就存放着打包后的目录

## 3. loader
使用babel-loader来解析es6写成的模块 加载器列表

### 3.1 安装loader
babel-loader可以将ES6的代码转为ES5的代码 babel官网
```
$ npm install babel-loader babel-core --save-dev
$ npm install babel-preset-es2015 babel-preset-stage-0 --save-dev
```
### 3.2 修改webpack.config.js
```
module.exports = {
    ////打包的入口文件  String|Object
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        //定义输出文件路径
        path: path.resolve(__dirname, 'build'),
        //指定打包文件名称
        filename: 'bundle.js'
    },
    //定义了对模块的处理逻辑     Object
+    module: {
+        loaders: [ 定义了一系列的加载器   Array
+            {
+                test: /\.js$/, //正则，匹配到的文件后缀名
+                // loader/loaders：string|array，处理匹配到的文件
+                loader: 'babel-loader'
+                // include：String|Array  包含的文件夹
+                 // exclude：String|Array  排除的文件夹
+
+            }
+        ]
+    }
};
```
> "-loader"其实是可以省略不写的，多个loader之间用“!”连接起来 loaders是一个数组

### 3.3 添加.babelrc文件
内容如下:
```
{
   "presets": ["es2015", "stage-0"],
   "plugins": []
}
```
### 3.4 修改src/component.js
```
-  exports.name = 'zfpx';
+  export var name = 'zfpx';
```
### 3.4 修改src/index.js
```
-  var comp = require('./component.js');
-  console.log(comp.name);
+  import {name} from './component.js';
+  console.log(name);
```
### 3.5 增加.babelrc文件
```
{
  "presets": ["es2015", "stage-0"],
  "plugins": []
}
```
### 3.6 执行命令进行编译
```
$ npm run build
```
