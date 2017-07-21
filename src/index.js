import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import './index.css'
import { ApolloClient, createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import App from './components/App.js'
const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql',
});
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    req.options.headers.authorization = token ? `Bearer  d1f08ed273f65b38465a6993532576e4dab5eb31` : null;
    next();
  }
}]);
const client = new ApolloClient({
  networkInterface,
}); 


ReactDOM.render((
<div>
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
    </Router>
  </ApolloProvider>
  </div>
  ),
  document.getElementById('root')
)

