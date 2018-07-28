import React from 'react'
import { graphql } from 'react-relay'
import Route from 'found/lib/Route'
import makeRouteConfig from 'found/lib/makeRouteConfig'

import Body from './Body'
import App from './App'
import HomePage from '../pages/Home'

const appQuery  = graphql`query  Routes_App_Query { viewer(nodeId: "1") {  ...App_viewer } }`
const bodyQuery = graphql`query Routes_Body_Query { viewer(nodeId: "1") { ...Body_viewer } }`
const homeQuery = graphql`query Routes_Home_Query { viewer(nodeId: "1") { ...Home_viewer } }`

export default makeRouteConfig(
  <Route
    path="/"
    query={bodyQuery}
    // we use the render method instead of Component here to always display Header
    // and Navigation even if the data has not been fetched yet
    render={({ match, ownProps, props }) =>
      <Body {...match} {...ownProps} {...props} isLoading={!props} />}
  >
    <Route query={homeQuery} Component={HomePage} />
    <Route path="list" query={appQuery} Component={App} />
  </Route>
);
