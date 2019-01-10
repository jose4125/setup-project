import express from 'express';
const server = express();

const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  const webpack = require('webpack');
  const config = require('../../config/webpack.dev.js');
  const compiler = webpack(config);

  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer,
  );

  const webpackHotMiddlware = require('webpack-hot-middleware')(
    compiler,
    config.devServer,
  );

  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddlware);
}

const expressStaticGzip = require('express-static-gzip');
server.use(
  expressStaticGzip('dist', {
    enableBrotli: true,
    orderPreference: ['br'],
  }),
);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  /*eslint-disable */
  console.log(
    `Server listening on http://localhost:${PORT} in ${process.env.NODE_ENV}`,
  );
  /*eslint-enable */
});
