import { Schema, model } from 'mongoose';
import Joi from 'joi';
import RoleModel from '../model/role.js';

export const RoleSchema = new Schema(RoleModel);
export const Role = model('Role', RoleSchema);

export default class RoleStore {

    async createRole(attributes) {
        let savedRole;
        const role = new Role(attributes);
        try {
            savedRole = await role.save();
        } catch (e) {
            console.error(e);
            return Promise.reject(new RoleStore.OPERATION_UNSUCCESSFUL());
        }
        return savedRole;
    }
    async assignUserIdToRoles(userId, phoneNumber) {
        try {
            await Role.updateMany({ phoneNumber }, { $set: { userId } }, { new: true });
        } catch (e) {
            console.error(e);
            return Promise.reject(new RoleStore.OPERATION_UNSUCCESSFUL());
        }
        return true;
    }
}

RoleStore.OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
        super('An error occured while processing the request.');
    }
};
