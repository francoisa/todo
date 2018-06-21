import React from 'react';
import ReactDOM from 'react-dom';
import './client/css/index.css';
import routes from './client/components/Routes';
import registerServiceWorker from './registerServiceWorker';
import environment from './client/relay-environment';
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createFarceRouter from 'found/lib/createFarceRouter';
import createRender from 'found/lib/createRender';
import { Resolver } from 'found-relay';

registerServiceWorker();

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: routes,
  render: createRender({}),
})

ReactDOM.render(
  <Router resolver={new Resolver(environment)} />,
  // eslint-disable-next-line no-undef
  document.getElementById('app'),
)
