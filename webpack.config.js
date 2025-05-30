const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    popup: "./popup.jsx",
    options: "./options.jsx"
  },
  output: {
    path: path.resolve(__dirname, "react-app"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};