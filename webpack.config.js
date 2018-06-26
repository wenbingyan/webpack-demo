var path = require('path');
module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
		    {
		    	test:/\.js$/,
				loader: 'babel-loader'
            }
		]
	},
	devServer: {
		stats: {color:true},
		port: 8080,
		contentBase: 'build',
		inline: true,
		open: true
	},
	resolve: {
		extensions: ["",".js",".css",".json"]
	}
}

