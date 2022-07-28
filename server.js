import connectDB from "./api/src/db/connectdb.js";
import { ApolloServer } from 'apollo-server-express';
import { executableSchema as schema } from './api/src/graphql/schema.js';
import dotenv from "dotenv";
import express from 'express'
import jwt from 'jsonwebtoken'

dotenv.config();




const DATABASE_URL = process.env.DATABASE_URL

connectDB(DATABASE_URL);

const app = express();


app.use(async (req, res, next) => {
  const tokenString = req.headers.authorization;
  if (tokenString) {
    try {
      let token = tokenString.replace('Bearer ', "");
      const currentUser = jwt.verify(token, process.env.SECRET_KEY);
      if (currentUser) {
        req.currentUser = currentUser;
      }
    } catch (e) {
      console.error(e);
    }
  }
  next();
});
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    currentUser: req.currentUser,
  }),
});
const PORT = process.env.PORT || 3000

await server.start()

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Now browse to http://localhost:${PORT}` + server.graphqlPath)
);

// server.listen().then(() => {
//   console.log(`
//       Server is running listening on port ${PORT}
//       Explore at https://studio.apollographql.com/sandbox
//     `);
// });