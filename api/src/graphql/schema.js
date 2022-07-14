import { gql } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { userResolvers } from "./resolver/userResolver.js";
import { OrgRsolvers } from "./resolver/organisationResolver.js";
import pkg from 'lodash';
const { merge } = pkg;


const typeDefs = gql`
  type User {
    email: String
    firstName: String
    lastName: String
	  password:String
  }
  type Organization {
    name: String!
    ownerName: String
    email: String
  }
  input UserInput {
 
    email: String
    firstName: String
    lastName: String
    password:String
  }
 
  input OrganizationInput {
    name: String!
    ownerName: String
    email: String
  }
  type Query {
    #User
    getUser(id: String): User
  }
  type Mutation {
    # USER
	  userLogin(email: String!, password: String!): User
    createUser(params: UserInput): User

    #ORGANISATION
    createOrg(params: OrganizationInput): Organization
  }
`;
const resolvers = merge(userResolvers, OrgRsolvers);



export const executableSchema = makeExecutableSchema({
  resolvers: {
    ...resolvers,
  },
  typeDefs,
});