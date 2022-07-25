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
        createOrg: async (parent, args, context) => {
            const { currentUser } = context;
            if (!currentUser) {
                throw new AuthenticationError(
                    'Authentication is required',
                );
            }

            const {
                email,
                ownerName,
                name,
            } = args.params;

            const request = {
                email,
                ownerName,
                name,
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
    },
};
const help = {
    checkStatus: (response) => {
        if (response.status === StatusCodes.OK) return;

        if (response.status === StatusCodes.NOT_FOUND) return;

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
