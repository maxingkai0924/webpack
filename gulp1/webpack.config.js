const {
	resolve
} = require('path');
module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "main.js"
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
                query: {
                   presets: ['es2017']
                }
            }
        ]
    },
    mode:'production'
}