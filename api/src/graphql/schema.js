import { gql } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { userResolvers } from "./resolver/userResolver.js";
// import { orgResolvers } from "./resolvers/orgResolver.js";


const typeDefs = gql`
  type User {
    # _id: String
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
    # _id: String
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
    # getOrganization(id:String): Organization
  }
  type Mutation {
	userLogin(email: String!, password: String!): User
    # USER
    createUser(params: UserInput): User
    # orgCreate(params: OrganizationInput): Organization
  }
`;
export const resolvers = userResolvers;


export const executableSchema = makeExecutableSchema({
	resolvers: {
		...resolvers,
	},
	typeDefs,
});