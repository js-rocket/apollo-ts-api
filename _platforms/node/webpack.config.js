const { spawnSync, fork } = require('child_process');
const path = require('path');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

var runningPID = null;

function RunPlugin() {
  return {
    apply: (compiler) => {
      compiler.hooks.done.tap('RunPlugin', (compilation) => {
        if (!compiler.watchMode) return;
        if (runningPID) {
          console.log('\n\n## Restarting Server');
          runningPID.kill();
        }
        // spawnSync(`cp -f ./public/* ${compiler.outputPath}/`, {
        //   stdio: 'inherit',
        //   shell: true,
        // });
        runningPID = fork(`${compiler.outputPath}/server.js`);
      });
    },
  };
}

const isProd = process.argv.indexOf('--mode') + 1 === process.argv.indexOf('production');
const isAWSLambda = process.argv.indexOf('--lambda') > 0;

const entry = isAWSLambda ? { server: './src/index_aws.ts' } : { server: './src/index.ts' };

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'server.js',
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false, // !isProd, // true makes faster builds but no type checking
              // experimentalWatchApi: false,
            },
          },
        ],
        exclude: /node_modules/,
      },
      // {
      //   // Transpiles ES6-8 into ES5
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //   },
      // },
      {
        test: /\.(txt|graphql)$/i,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [RunPlugin()],
};
