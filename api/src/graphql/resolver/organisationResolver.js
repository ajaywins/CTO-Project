import OrgController from "../../controller/organisationController.js";

const orgController = new OrgController();

export const OrgRsolvers = {
    Query: {
        //     getOrg: async (parent, args, context) => {
        //         try {
        //             response = await OrgController.org.get(request);
        //             return response;
        //         } catch (e) {
        //             console.log(e);
        //         }

        //         return response.user;
        //     },
    },

    Mutation: {
        createOrg: async (parent, args, context) => {
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
            } catch (e) {
                console.log(e);
            }
            console.log("resolver", response);
            return response;
        },
    },

};