import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import React from 'react';
import { graphql } from 'react-relay';

import TodoApp from './components/TodoApp';
import { Login } from './components/Login';

export default makeRouteConfig(
  <Route path="/" Component={Login}>
    <Route
      path="app" 
      Component={TodoApp}
      query={graphql`
        query routes_Query {
          viewer {
            ...TodoApp_viewer
          }
        }
      `}
  />
  </Route>,
);
