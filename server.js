import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {schema} from './data/schema';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

const handleNonRoot = function (req, res, next) {
  if (req && req.path === '/favicon.ico') {
    res.sendFile(path.resolve(__dirname, 'public', 'favicon.ico'));
  }
  else if (next) {
    next();
  }
}

// Expose a GraphQL endpoint
const graphQLServer = express();
graphQLServer.use('/', handleNonRoot, graphQLHTTP(
  {
    schema, graphiql:
    true,
    pretty: true
  })
);
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `server:GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

// Serve the Relay app
const compiler = webpack({
  entry: ['whatwg-fetch', path.resolve(__dirname, 'js', 'app.js')],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/,
      },
    ],
  },
  output: {filename: 'app.js', path: '/'},
});

const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/js/',
  stats: {colors: true},
});
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
  console.log(`server:App is now running on http://localhost:${APP_PORT}`);
});
