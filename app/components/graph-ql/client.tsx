import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';



// initialize a GraphQL client
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
});