import React from 'react'
import { graphql } from 'react-relay'
import Route from 'found/lib/Route'
import makeRouteConfig from 'found/lib/makeRouteConfig'

import App from './App'
import HomePage from '../pages/Home'
import Logout from './Logout'

const appQuery = graphql`
  query Routes_App_Query {
    viewer(nodeId: "1") {
      ...App_viewer
    }
  }`

const homeQuery = graphql`
  query Routes_Home_Query {
    viewer(nodeId: "1") {
      ...Home_viewer
    }
  }`

const logoutQuery = graphql`
  query Routes_Logout_Query {
    viewer(nodeId: "1") {
      ...Logout_viewer
    }
  }`

export default makeRouteConfig(
  <Route
    path="/"
    query={appQuery}
    // we use the render method instead of Component here to always display Header
    // and Navigation even if the data has not been fetched yet
    render={({ match, ownProps, props }) =>
      <App {...match} {...ownProps} {...props} isLoading={!props} />}
  >
    <Route
      query={homeQuery}
      Component={HomePage}
    />
    <Route
      path="/logout"
      query={logoutQuery}
      Component={Logout}
      />
  </Route>,
)
