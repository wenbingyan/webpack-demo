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
## 4. devServer
webpack-dev-server是一个Web服务器,可以预览项目，并且当修改源码后可以实时刷新页面 server配置

### 4.1 安装devServer
```
$ npm install webpack-dev-server --save-dev
```
### 4.3 修改package.json
```
"scripts": {
+    "dev": "webpack-dev-server"
}
```
### 4.4 配置webpack.config.js
```
+    devServer: {
+        stats: { colors: true }, //显示颜色
+        port: 8080,//端口
+        contentBase: 'build',//指定静态文件的根目录
+    }
```
### 4.5 执行命令进行启动服务
```
$ npm run dev
```
> 启动此服务的时候，编译后的产出文件放在内存里,在build目录下看不见,但也不会删除原来已经有的文件

### 4.6 预览项目
打开浏览器中访问 http://localhost:8080

### 4.7 proxy模拟后台接口
#### 4.7.1 修改配置webpack.config.js
```
   //重写url
+ function rewriteUrl(replacePath) {
+     return function (req, opt) {
          //取得?所在的索引
+         var queryIndex = req.url.indexOf('?');
          //取得查询字符串的内容
+         var query = queryIndex >= 0 ? req.url.substr(queryIndex) : "";
          //$1取自path匹配到的真实路径中的第一个分组
+         //把proxy的path替换为 '/$1\.json',
+         req.url = req.path.replace(opt.path, replacePath) + query;
+     };
+ }

    devServer: {

        stats: { colors: true }, //显示颜色
        port: 8080,//端口
        contentBase: 'build',//指定静态文件的根目录
+       proxy: [
+           {
                //替换符合此正则的接口路径
+               path: /^\/api\/(.*)/,
                //目标域名端口
+               target: "http://localhost:8080/",
                //重新定向到新的地址
                //$1取自path正则匹配到的真实路径的第一个分组
+               rewrite: rewriteUrl('/$1\.json'),
                 //修改来源地址
+               changeOrigin: true
+           }
+       ]
    }
```
#### 4.7.2 在build目录下添加 book.json
```
{"name":"javascript"}
```
#### 4.7.3 直接访问此接口
在浏览器输入此地址 http://localhost:8080/api/book 将会被重写向到 http://localhost:8080/book.json


## 5. resolve解析
### 5.1 extension
指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配

#### 5.1.1 修改 webpack.config.js
```
+ resolve: {
    //自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
+   extensions: ["",".js",".css",".json"],
+ },
```
#### 5.1.2 修改src/index.js
```
- import comp from './component.js';
+ import comp from './component';
```
###5.2 alias
配置别名可以加快webpack查找模块的速度

- 每当引入jquery模块的时候，它会直接引入jqueryPath,而不需要从node_modules文件夹中按模块的查找规则查找
- 不需要webpack去解析jquery.js文件
#### 5.2.1 先安装jquery
```
$ npm install jquery --save
```
#### 5.2.2 修改 webpack.config.js
```
+ var jqueryPath = path.join(__dirname,
+  "./node_modules/jquery/dist/jquery.js");

resolve: {
       extensions: ["",".js",".css",".json"],
+        alias: {
+            'jquery': jqueryPath
+        }
    },

module: {
       loaders: [
           {
               test: /\.js$/,
               loader: 'babel-loader'
           }
       ],
       //如果你 确定一个模块中没有其它新的依赖 就可以配置这项，webpack 将不再扫描这个文件中的依赖
+       noParse: [jqueryPath]
},
```
#### 5.2.3 修改 build/index.html
```
+ <div id="app"></div>
```
#### 5.2.4 修改 src/index.js
```
+import $ from 'jquery'
- document.write(comp);
+ $('#app').html(comp);
```
## 6. 解析less样式文件
### 6.1 安装loader
- less-loader负责把less源码转成css代码
- css-loader负责读取css代码
- style-loader负责在css代码转变成style标签并作为页内样式插入到页面中去
```
$ npm install less style-loader css-loader less-loader --save-dev
```
### 6.2 修改配置文件webpack.config.js
```
+  {
+        test: /\.less/,
+        loader: 'style!css!less'
+  }
```
### 6.3 增加less文件 src/index.less
```
@color: red;
.red {
  color: @color;
}
```
### 6.4 在src/index.js中引入'less'文件
```
+  require('./index.less');
```
### 6.5 修改build/index.html,使用red
```
- <div id="app"></div>
+ <div id="app" class="red"></div>
```
##7. 资源文件的加载
实现CSS、图标、图片等资源文件加载

### 7.1 安装bootstrap和相应的loader
```
$ npm install bootstrap --save
$ npm install file-loader url-loader --save-dev
```
### 7.2 修改 webpack.config.js
设置css文件和图标文件的加载器
```
 devServer: {
        stats: {colors: true}, //显示颜色

+ {
+     test: /\.css/,
+     loader: 'style!css'
+ },
+ {
+      test: /\.(woff|woff2|ttf|svg|eot)$/,
+      loader: "url?limit=8192"
+ },
+ {
+       test: /\.(jpg|png)$/,
+       loader: "url?limit=8192"
+  }
```
> 配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式(其实应该说超过8kb的才使用url-loader 来映射到文件，否则转为data url形式)

DataURL和图片

### 7.3 修改 src/index.js
```
+  import 'bootstrap/dist/css/bootstrap.css';
+  var img = document.createElement("img");
+  img.className = 'img-circle';
+  img.src = require("./zfpx.jpg");
+  document.body.appendChild(img);
```
### 7.4 修改 build/index.html
```
+ <button class="btn btn-success">bootstrap按钮</button>
+ <span class="glyphicon glyphicon-qrcode"></span>
+ <img src="/zfpx.jpg" class="img-rounded" alt="lufy">
```
## 8. 自动刷新
在源码修改之后可以自动刷新页面 修改webpack.config.js
```
         contentBase: 'build',
+        inline:true, //设置自动刷新
         proxy: [
```
## 9. 自动产出html
### 9.1 创建html模板文件
```
$ cd src && touch index.html
```
### 9.2 下载webpack插件
```
npm install html-webpack-plugin --save-dev
```
### 9.3 修改webpack.config.js
```
+  var HtmlWebpackPlugin = require('html-webpack-plugin');
+  plugins: [
+        new HtmlWebpackPlugin({
+          title: 'zhufeng-react',//标题
+          template: './src/index.html', //模板文件
+          filename:'./index.html' //产出后的文件名称
+        })
+  ]
```
## 10. 自动打开浏览器
### 10.1 安装插件
```
$ npm install open-browser-webpack-plugin --save-dev
```
### 10.2 修改webpack.config.js
```
+ var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
+ plugin: [
+   new openBrowserWebpackPlugin({ url: 'http://localhost:8080' })
+ ]
```
