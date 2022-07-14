import UserController from "../../controller/userController.js";

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
                console.log('respomse', response);
            } catch (e) {
                console.log(e)
                
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
            } catch (e) {
                console.log(e);
            }
            return response;
        },
    },

};