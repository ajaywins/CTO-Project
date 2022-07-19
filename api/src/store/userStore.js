import userModel from "../model/userModel.js";
import Joi from 'jsonwebtoken'


export default class UserStore {

    async createUser(User) {
        let user;
        try {
            user = await userModel(User).save();
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
        return user;
    }
    async loginUser(email) {
        let user;
        try {
            user = await userModel.findOne({ email })
        }
        catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
        return user;
    }
    async findUserByEmail(email) {
        let user;
        try {
            user = await userModel.findOne({ email });
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
        return user;
    }
    async createAdminUserFromStandardUser(userId, attributes) {
        try {
            if (attributes.password) {
                attributes.passwordHash = await this.hashPassword(attributes.password);
            }
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
        // delete attributes.password;

        const params = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.any().required(),
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
        }).validate(attributes);

        const {
            email,
            password,
            firstName,
            lastName,
        } = params.value;

        if (params.error) {
            return Promise.reject(params.error);
        }

        const attribute = {
            email,
            password,
            firstName,
            lastName,
        };
        const resp = this.updateUser(userId, attribute);
        return resp;
    }
    async updateUser(userId, attributes) {
        try {
            if (attributes.password) {
                attributes.passwordHash = await this.hashPassword(attributes.password);
            }
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
    }

};

UserStore.OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
        super('An error occured while processing the request.');
    }
};