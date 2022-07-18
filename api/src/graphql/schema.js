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
    phoneNumber:String

  }
  type Message{
    message:String
    token:String
  }

  type Organization {
    name: String!
    ownerName: String
    email: String
  }

  type Role {
		_id: String!
		acceptedAt: Int!
		userId: String
		phoneNumber: String
		phoneCode: String
		organizationId: String!
		user: User
		organization: Organization
		accessLevel: String!
	}

  input UserInput {
 
    email: String
    firstName: String
    lastName: String
    password:String
    phoneNumber:String
  }
 
  input OrganizationInput {
    name: String!
    ownerName: String
    email: String
  }
  type Query {
    #User
    getUser(id: String): User
    # getOrg(id: String): Organization

    # ROLE
		# getOrganizationRoles: [Role]
		getUserRoles: [Role]

  }
  type Mutation {
    # USER
	  userLogin(email: String!, password: String!): Message
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