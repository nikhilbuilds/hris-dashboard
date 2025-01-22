import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/app/lib/graphql/schema";
import { resolvers } from "@/app/lib/graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

console.log("GraphQL API handler loaded");

// export const GET = startServerAndCreateNextHandler(server);
export const POST = startServerAndCreateNextHandler(server);
