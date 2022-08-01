import userMongo from "../model/userModel.js";
import pkg from 'mongoose';
const { Schema, model } = pkg;
export const userSchema = new Schema(userMongo);
export const UserMongo = model('users', userSchema);

userSchema.virtual('organization', {
    ref: 'org',
    localField: 'organizationId',
    foreignField: '_id',
    justOne: true,
});

export default class UserStore {

    async createUser(User) {
        let user;
        try {
            user = await userMongo(User).save();
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
        return user;
    }
    async loginUser(email) {
        let user;
        try {
            user = await UserMongo.findOne({ email })
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
            user = await UserMongo.findOne({ email });
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
        return user;
    }
    async updateUser(_id, attributes) {

        let user;
        try {
            user = await UserMongo.findByIdAndUpdate(_id, attributes, { new: true });
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
            user = await UserMongo.findById({ _id });
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
        return user;
    }
    async findUserByPhoneNumber(phoneNumber) {
        let user;

        try {
            user = await UserMongo.findOne({ phoneNumber });
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }

        return user;
    }
    async findUserOrganization({ organizationId }) {
        let user;
        try {
            user = await UserMongo.find({ organizationId, role: { $ne: "SuperAdmin" } }).populate('organization').exec();
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