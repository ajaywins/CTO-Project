import UserController from "../../controller/userController.js";
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import StatusCodes from '../../utils/statusCodes.js';

const userController = new UserController();

export const userResolvers = {

    Query: {
        //     getUser: async (parent, args, context) => {
        //         try {
        //             response = await userController.user.get(request);
        //             return response;
        //         } catch (e) {
        //             console.log(e);
        //         }

        //         return response.user;
        //     },
    },

    Mutation: {
        userLogin: async (parent, args, context) => {
            const {
                email,
                password
            } = args

            const request = {
                email,
                password
            };
            let response;
            try {
                response = await userController.userLogin(request);
                help.checkStatus(response);
            } catch (e) {
                console.log(e)
                help.catchThrow(e);

            }
            return response;
        },
        createUser: async (parent, args, context) => {
            const {
                email,
                firstName,
                lastName,
                password
            } = args.params;

            const request = {
                firstName,
                lastName,
                email,
                password
            };
            let response;

            try {
                response = await userController.createUser(request);
                help.checkStatus(response);
            } catch (e) {
                console.log(e);
                help.catchThrow(e);
            }
            return response
        },
    },
};

const help = {
    checkStatus: (response) => {
      if (response.status === StatusCodes.OK) return;
  
      if (response.status !== StatusCodes.NOT_FOUND) return;
  
      throw new ApolloError(
        response.error.message,
        response.status.toString(),
      );
    },
    catchThrow: (err) => {
      console.log(err);
      throw err;
    },
  };
