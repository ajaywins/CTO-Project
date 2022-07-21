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

  }
  type Message{
    message:String
    token:String
    status:String
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
    _id:String
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
    getCurrentUser(params:UserInput): User
    # getOrg(id: String): Organization

    # ROLE
		# getOrganizationRoles: [Role]
		getUserRoles: [Role]

  }
  type Mutation {
    # USER
	  userLogin(email: String!, password: String!): Message
    createUser(params: UserInput): User
    updateUserInfo(params: UserInput!): User

    #ORGANISATION
    createOrg(params: OrganizationInput): Organization

    # ROLE
		# createRole(accessLevel: String!): Role
  }
`;
const resolvers = merge(userResolvers, OrgRsolvers);

export const executableSchema = makeExecutableSchema({
  resolvers: {
    Role: {
      user: (role, args, context) =>
        userResolvers.Query.getCurrentUser(role, args, context),
      organization: (role, args, context) =>
        organizationResolvers.Query.getCurrentOrganization(
          role,
          args,
          context,
        ),
    },
    ...resolvers,
  },
  typeDefs,
});