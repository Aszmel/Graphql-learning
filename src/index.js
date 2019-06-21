import { GraphQLServer } from "graphql-yoga";
//hardcoded demo data
const users = [
  { id: "1", name: "arek", email: "arek@gmail.com", age: 44 },
  { id: "2", name: "kasia", email: "kasia@gmail.com", age: 31 },
  { id: "3", name: "lena", email: "lena@gmail.com", age: 5 }
];
const posts = [
  { id: "1", title: "post 1", body: "post 1 body", published: true },
  { id: "2", title: "post 2", body: "post 2 body", published: false },
  { id: "3", title: "post 3", body: "post 3 body", published: true }
];

//type definitions (schema)
const typeDefs = `
    type Query {
      me: User!
      users(query: String): [User!]!
      post: Post!
      posts(query: String): [Post!]!
      
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
      published: String!
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
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    post() {
      return {
        id: "123post",
        title: "post_title",
        body: "123post some text",
        published: "2019-06-20"
      };
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    }
    // start of learing, *args*
    // greeting(parent, args, ctx, info) {
    //   if (args.name) {
    //     return `Hello ${args.name}`;
    //   } else {
    //     return "Hello";
    //   }
    // },
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("gql server is running...");
});
