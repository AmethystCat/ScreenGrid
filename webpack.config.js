let path = require('path'),
    webpack = require('webpack'),
    figlet = require('figlet'),
    env = process.env.NODE_ENV;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/**
 * 自定义ip ，并启动服务
 * export TEST_URL=xxxxx && yarn start
 * 
 */
const getUrl = (() => {
    let argv = process.env.TEST_URL;
    // process.argv.forEach((el, index) => {
    //     if (el.indexOf('cc=') > -1) {
    //         argv = el;
    //     }
    // });
    // console.log(process.argv);
    let defaultUrl = 'http://localhost:8080';
    if (argv) return `http://${argv}`;
    return defaultUrl;
})();

const getHost = ((url) => {
    return url.split(':')[1].split('//')[1];
})(getUrl);

// let proxyServer = 'http://192.168.31.141:8080';
let proxyServer = 'http://localhost:3000';

// 生成注释图案 哈哈
figlet('Big Screen', {
    verticalLayout: 'fitted'
}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
    console.log('---------------------------------------------------------');
    console.log('node_env   : ', env);
    console.log('default_url: ', getUrl);
    console.log('---------------------------------------------------------');
});

// dev
const config_dev = {
    entry: {
        index: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?${getUrl}`,
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, 'src/entry.js')
        ],
        vendors: [
            'react',
            'react-dom',
            'redux',
            'react-router'
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.json', '.less']
    },
    context: path.resolve(__dirname, 'src'),
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    devtool: 'eval',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                use: ['eslint-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?sourceMap']
            },
            {
                test: /.less$/,
                use: ['style-loader', 'css-loader', 'less-loader?sourceMap']
            },
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/i,
                use: ['url-loader?limit=15000&name=images/[name].[ext]']
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=25000']
            }
        ]
    },
    devServer: {
        host: getHost,
        hot: true,
        inline: true,
        contentBase: path.resolve(__dirname, 'build'),
        publicPath: '/',
        proxy: {
            '/icmc': proxyServer,
        }
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', 
            filename: 'js/vendors.js'
        }),
        new webpack.NamedModulesPlugin()
    ]
};

// production
const config_prod = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: [
            path.join(__dirname, 'src/entry.js')
        ],
        vendors: [
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    // 设置了resolve就不行，why
    // resolve: {
    //     modules: [
    //         'node_modules',
    //         path.resolve(__dirname, 'src')
    //     ],
    //     extensions: ['js', '.jsx', '.json', '.less']
    // },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                })
            },
            {
                test: /.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: ["css-loader", "less-loader"]
                })
            },
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/i,
                use: ['url-loader?limit=15000&name=images/[name].[ext]']
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=25000']
            }
        ]
    },
    context: path.resolve(__dirname, 'src'),
    plugins: [
            new ExtractTextPlugin('css/style.css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendors', 
                filename: 'js/vendors.js'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
};

module.exports = (env === 'production') ? config_prod : config_dev;