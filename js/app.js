import React from 'react';
import ReactDOM from 'react-dom';

import HashProtocol from 'farce/lib/HashProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createFarceRouter from 'found/lib/createFarceRouter';
import createRender from 'found/lib/createRender';
import { Resolver } from 'found-relay';

import { installRelayDevTools } from 'relay-devtools';

import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import {Login} from './components/Login';
import TodoApp from './components/TodoApp';
import routes from './routes';

// Useful for debugging, but remember to remove for a production deploy.
installRelayDevTools();

function fetchQuery(operation, variables) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

export const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

const Router = createFarceRouter({
  historyProtocol: new HashProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: routes,

  render: createRender({}),
});

const mountNode = document.getElementById('root');

ReactDOM.render(
  <Router resolver={new Resolver(modernEnvironment)}  />,
  mountNode
);
