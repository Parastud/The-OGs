import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASEURL } from '@/app.env';

const httpLink = createHttpLink({
  // Use SERVER_URL but replace /api/v1 (or append /graphql to the base)
  // Assuming SERVER_URL is http://<ip>:3000
  uri: `${BASEURL}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from async storage if it exists
  const token = await AsyncStorage.getItem('user_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
