import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import Navbar from './components/Navbar';
import Auth from './utils/auth';

// Apollo Client setup
const httpLink = createHttpLink({
  uri: '/graphql',  // This should be your GraphQL endpoint
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
