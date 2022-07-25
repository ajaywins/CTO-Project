import roleModel from '../model/roleModel.js';



export default class RoleStore {

    async createRole(attributes) {
        let savedRole;
        const role = new roleModel(attributes);
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
