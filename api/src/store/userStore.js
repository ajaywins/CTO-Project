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
    async updateUser(_id, attributes) {

        let user;
        try {
            user = await userModel.findByIdAndUpdate(_id, attributes, { new: true });
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
        console.log(user);
        return user;
    }
    async findUserById(_id) {
        let user;

        try {
            user = await userModel.findById({ _id });
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
        return user;
    }
    async findUserByPhoneNumber(phoneNumber) {
        let user;

        try {
            user = await userModel.findOne({ phoneNumber });
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }

        return user;
    }
    async findUserOrganization({ organizationId }) {
        let user;
        try {
            user = await userModel.find({ organizationId: organizationId, role: { $ne: "SuperAdmin" } }).exec();
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
        return user;
    }
};

UserStore.OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
        super('An error occured while processing the request.');
    }
};