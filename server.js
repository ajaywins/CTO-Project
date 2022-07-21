import connectDB from "./api/src/db/connectdb.js";
import { ApolloServer } from 'apollo-server';
import { executableSchema as schema } from './api/src/graphql/schema.js';
import dotenv from "dotenv";
import express from 'express'

dotenv.config();



const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

connectDB(DATABASE_URL);

const app = express();


app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET_KEY);
      req.currentUser = currentUser;
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

server.listen().then(() => {
  console.log(`
      Server is running listening on port ${PORT}
      Explore at https://studio.apollographql.com/sandbox
    `);
});