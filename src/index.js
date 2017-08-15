import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import './index.css'
import { ApolloClient, createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import App from './components/Repository.js'

const networkInterface = createNetworkInterface('https://api.github.com/graphql');

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    // Send the login token in the Authorization header
    req.options.headers.authorization = `Bearer BEARER_TOKEN`;
    next();
  }
}]);


const client = new ApolloClient({
  networkInterface,
}); 

function routeForRepository(owner, name) { return {
      title: `${owner}/${name}`,
      component: Repository,
      owner,
      name
  }}


ReactDOM.render( (
      <ApolloProvider client={client}>
        <Repository {...this.routeForRepository('manifoldco', 'torus-cli')} />
      </ApolloProvider>
    ),
  document.getElementById('root')
)

