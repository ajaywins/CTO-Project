import UserController from "../../controller/userController.js";
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import StatusCodes from '../../utils/statusCodes.js';
import { useAuthValidator } from "../../utils/authValidator.js";


const userController = new UserController();

export const userResolvers = {

    Query: {
        getCurrentUser: async (parent, args, context) => {
            useAuthValidator(context);
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
        //get users organizations...
        async getUsersWithOrganization(parent, args, context) {
            // useAuthValidator(context);
            let organizationId = context.currentUser._id.organizationId;
            const request = {

                organizationId
            }
            let response;
            try {
                response = await userController.getUserOrganization(request);
                help.checkStatus(response)
            } catch (e) {
                help.catchThrow(e)
            }
            return response;
        }
    },
    Mutation: {
        //login user...
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
        //create user...
        createUser: async (parent, args, context) => {
            useAuthValidator(context);
            const {
                email,
                firstName,
                lastName,
                password,
                phoneNumber,
                role,
                organizationId
            } = args.params;
            const request = {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                role,
                organizationId: context.currentUser._id._id,
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
        //update user...
        updateUserInfo: async (_parent, args, context) => {
            // useAuthValidator(context)
            const { currentUser } = context
            if (currentUser._id.role !== "User" && currentUser._id.role !== "SuperAdmin") {
                throw new AuthenticationError('Authentication is required');
            }
            const {
                _id,
                email,
                firstName,
                lastName,
                phoneNumber,
            } = args.params;
            const request = {
                _id,
                email,
                firstName,
                lastName,
                phoneNumber,
            };
            let response;
            try {
                response = await userController.updateUserInfo(request);
                help.checkStatus(response);
            } catch (e) {
                help.catchThrow(e);
            }
            return response.user;
        },
    }
};
// TODO:you can move this Object to separate file(s)
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
