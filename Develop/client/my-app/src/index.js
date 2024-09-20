import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Define your GraphQL server URL
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql', // Make sure to update with your actual GraphQL endpoint
});

// Middleware to attach the token to every request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken'); // Get the token from localStorage
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Attach token if available
    },
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Render the App with ApolloProvider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// Performance monitoring (optional)
reportWebVitals();
