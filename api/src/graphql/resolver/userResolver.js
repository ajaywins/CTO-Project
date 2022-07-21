import UserController from "../../controller/userController.js";
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import StatusCodes from '../../utils/statusCodes.js';
// import { AuthenticationError } from "apollo-server-express";

const userController = new UserController();

export const userResolvers = {

    Query: {
        getCurrentUser: async (parent, args, context) => {
            // const { currentUser } = context;

            // if (!currentUser) {
            //     throw new AuthenticationError(
            //         'Authentication is required',
            //     );
            // }
            // const userId = (parent && parent.userId ? parent.userId : currentUser._id).toString();
            const request =
                args.params
            let response;
            try {
                response = await userController.get(request);
                help.checkStatus(response);
            } catch (e) {
                help.catchThrow(e);
            }

            return response.user;
        },
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
                return response;
            } catch (err) {
                console.log(err)
                help.catchThrow(err);
            }
        },
        createUser: async (parent, args, context) => {
            // const { currentUser } = context;

            // if (!currentUser) {
            //     throw new AuthenticationError(
            //         'Authentication is required',
            //     );
            // }
            const {
                email,
                firstName,
                lastName,
                password,
                phoneNumber

            } = args.params;
            const request = {
                firstName,
                lastName,
                email,
                password,
                phoneNumber
            };
            let response;
            try {
                response = await userController.createUser(request);
                help.checkStatus(response);
            } catch (err) {
                console.log(err);
                help.catchThrow(err);
            }
            return response;
        },

        // updateUserInfo: async (_parent, args, context) => {
        //     // const { currentUser } = context;

        //     // if (!currentUser) {
        //     //     throw new AuthenticationError(
        //     //         'Authentication is required',
        //     //     );
        //     // }

        //     const {
        //         email, firstName, lastName, phoneNumber,
        //     } = args;

        //     const request = {
        //         userId: currentUser._id,
        //         email,
        //         firstName,
        //         lastName,
        //         phoneNumber,
        //     };
        //     let response;
        //     try {
        //         response = await userController.updateUserInfo(request);
        //         help.checkStatus(response);
        //     } catch (e) {
        //         help.catchThrow(e);
        //     }
        //     return response.user;
        // },
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
