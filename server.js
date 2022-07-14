import connectDB from "./api/src/db/connectdb.js";
import { ApolloServer } from 'apollo-server';
import { executableSchema as schema } from './api/src/graphql/schema.js';
import dotenv from "dotenv";

dotenv.config();


const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

connectDB(DATABASE_URL);

const server = new ApolloServer({
    schema
});

server.listen().then(() => {
    console.log(`
      Server is running listening on port ${PORT}
      Explore at https://studio.apollographql.com/sandbox
    `);
  });

