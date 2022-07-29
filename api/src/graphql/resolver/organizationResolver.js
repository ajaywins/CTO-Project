import OrgController from "../../controller/organizationController.js";
import StatusCodes from "../../utils/statusCodes.js";
import { ApolloError } from "apollo-server-express";
import { useAuthValidator } from '../../utils/authValidator.js';

const orgController = new OrgController();

export const OrgRsolvers = {
    Query: {
        // getOrg: async (parent, args, context) => {
        //     try {
        //         response = await OrgController.org.get(request);
        //         return response;
        //     } catch (e) {
        //         console.log(e);
        //     }
        //     return response.user;
        // },
    },
    Mutation: {
        //create organization...
        createOrg: async (parent, args, context) => {
            useAuthValidator(context);

            const {
                userId,
                email,
                ownerName,
                name,
                User

            } = args.params;

            const request = {
                email,
                ownerName,
                name,
                userId: context.currentUser._id._id,
                User
            };
            let response;
            try {
                response = await orgController.createOrg(request);
                help.checkStatus(response);
            } catch (e) {
                console.log(e);
                help.catchThrow(e);
            }
            return response
        },
        //update organization...
        updateOrg: async (parent, args, context) => {
            useAuthValidator(context);
            const {
                _id,
                email,
                ownerName,
                name,

            } = args.params;

            const request = {
                _id,
                email,
                ownerName,
                name,

            };
            let response;
            try {
                response = await orgController.updateOrganization(request);
                help.checkStatus(response);
            } catch (e) {
                console.log(e);
                help.catchThrow(e);
            }
            return response
        }
    }
};
const help = {
    checkStatus: (response) => {
        if (response.status === StatusCodes.OK) return;

        if (response.status === StatusCodes.NOT_FOUND) return;

        // throw new ApolloError(
        //     // response.error.message,
        //     response.status.toString(),
        // );
    },
    catchThrow: (err) => {
        console.log(err);
        throw err;
    },
};
