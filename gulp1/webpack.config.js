var webpack = require('webpack');
module.exports = {
    // watch:true,
    resolve: {
        extensions: ['.js'],
        alias:{
            'vue$':'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
                query: {
                   presets: ["es2017"]
                }
            }
        ]
    },
    // 添加代码
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery"
        })
   ],
    mode:'production'
}