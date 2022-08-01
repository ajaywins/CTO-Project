import { gql } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { userResolvers } from "./resolver/userResolver.js";
import { OrgRsolvers } from "./resolver/organizationResolver.js";
import pkg from 'lodash';
const { merge } = pkg;


const typeDefs = gql`
  type User {
    _id:String
    email: String
    firstName: String
    lastName: String
	  password:String
    phoneNumber:String
    role: String
    organizationId: String
    organization:Organization

  }
  type Message{
    message:String
    token:String
    status:String
    organizationId: String
  }

  type Organization {
    _id: String
    name: String!
    ownerName: String
    email: String
    userId: String
    firstName: String
    lastName: String
    password:String
    phoneNumber:String
    role: String
    user: User
  }

  input UserInput {
    _id:String
    email: String
    firstName: String
    lastName: String
    password:String
    phoneNumber:String
    role: String
  }
  input OrganizationInput {
    _id: String
    name: String!
    ownerName: String
    email: String
    firstName: String
    lastName: String
    password: String
    phoneNumber: String
    role: String
    userId: String
    User: UserInput
  }

  type Query {
    #User
    getCurrentUser(params: UserInput): User
    getUsersWithOrganization: [ User ]
    
    #Organization
    getOrganizationList:[Organization]
    # getOrganization(organizationId: String!): Organization


  }
  type Mutation {
    # USER
	  userLogin(email: String!, password: String!): Message
    createUser(params: UserInput): User
    updateUserInfo(params: UserInput): User
   

    #ORGANISATION
    createOrg(params: OrganizationInput): Organization
    updateOrg(params: OrganizationInput): Organization
    

  }
`;
const resolvers = merge(userResolvers, OrgRsolvers);

export const executableSchema = makeExecutableSchema({
  resolvers: {
    ...resolvers,
  },
  typeDefs,
});