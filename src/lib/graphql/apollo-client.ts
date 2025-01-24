import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let client: ApolloClient<any> | null = null;

export const getClient = () => {
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: new HttpLink({
        uri: `${process.env.GRAPHQL_URI}/api/graphql`,
      }),
      cache: new InMemoryCache(),
    });
  }
  console.log(`${process.env.GRAPHQL_URI}/api/graphql`);
  return client;
};
