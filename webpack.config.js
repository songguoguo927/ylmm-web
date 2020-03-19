var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 引入html-webpack-plugin
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const resolve = dir => path.resolve(__dirname, dir);
var config = {
  mode: "development",
  entry: "./src/main.js",
  devtool: "source-map",
  output: {
    // path: path.resolve(__dirname + '/dist'), // 打包生成文件地址
    path: resolve("dist"),
    filename: "[name].build.js" // 生成文件名成名
  },
  resolve: {
    // 设置别名
    alias: {
      "@": resolve("src") // 这样配置后 @ 可以指向 src 目录
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      // 普通的 `.scss` 文件和 `*.vue` 文件中的
      // `<style lang="scss">` 块都应用它
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 25000
          }
        }
      },

    //   {
    //     test: /\.(png|jpg|gif|svg)$/,
    //     loader: "file-loader",
    //     options: {
    //       name: "[name].[ext]?[hash]"
    //     }
    //   },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    // 使用html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html", // 生成的文件夹名
      template: "public/index.html", // 模板html
      favicon: "public/favicon.ico" // 标题图标
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true, // 是否压缩
    port: 9000, // 启动服务端口
    hot: true, // 是否自动刷新
    open: true, // 是否启动服务后，自动打开浏览器
    historyApiFallback: {
      index: "/index.html" //solve vue-router设置mode为history页面报Cannot Get
    },
    proxy: {
      '/api': {
        target: 'http://47.100.222.240:3000/',
        // pathRewrite: {'^/api' : ''},
        // changeOrigin: true,     // target是域名的话，需要这个参数，
        secure: false,          // 设置支持https协议的代理
      },
    }
  }
};
module.exports = config;
