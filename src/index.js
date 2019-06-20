import { GraphQLServer } from "graphql-yoga";

//type definitions (schema)
const typeDefs = `
    type Query {
      me: User!
      post: Post!
      greeting(name: String): String
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: 123,
        name: "user_name",
        email: "fake@gmail.com",
        age: 28
      };
    },
    post() {
      return {
        id: "123post",
        title: "post_title",
        body: "123post some text",
        published: true
      };
    },
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello ${args.name}`;
      } else {
        return "Hello";
      }
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("gql server is running...");
});
