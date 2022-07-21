import { ApolloError, AuthenticationError } from 'apollo-server-express';
import controller from '../../controller/roleController';
import StatusCodes from '../../utils/statusCodes.js';

export const roleResolvers = {
    Query: {
        // getOrganizationRoles: async (parent, args, context) => {
        //     const { currentUser } = context;

            // if (!currentUser._id || !currentUser.organizationId) {
            //     throw new AuthenticationError(
            //         'Authentication is required',
            //     );
            // }

            // const request = {
            //     organizationId: currentUser.organizationId,
            // };
        //     let response;
        //     try {
        //         response = await controller.role.getOrganizationRoles(request);
        //         help.checkStatus(response);
        //     } catch (e) {
        //         help.catchThrow(e);
        //     }
        //     return response.roles;
        // },
        getUserRoles: async (parent, args, context) => {
            // const { currentUser } = context;

            // if (!currentUser._id) {
            //     throw new AuthenticationError(
            //         'Authentication is required',
            //     );
            // }

            // const request = {
            //     userId: currentUser._id,
            // };
            let response;
            try {
                response = await controller.role.getUserRoles(request);
                help.checkStatus(response);
            } catch (e) {
                help.catchThrow(e);
            }

            return response.roles;
        },
    },
    Mutation: {
        createRole: async (parent, args, context) => {
            const { currentUser } = context;

            if (!currentUser._id || !currentUser.organizationId) {
                throw new AuthenticationError(
                    'Authentication is required',
                );
            }

            const {accessLevel } = args;
            const request = {
                organizationId: currentUser.organizationId,
                accessLevel,
            };
            let response;
            try {
                response = await controller.role.createRole(request);
                help.checkStatus(response);
            } catch (e) {
                help.catchThrow(e);
            }
            return response.role;
        },
    }
}
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