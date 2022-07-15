import orgModel from "../model/organisationModel.js";

export default class OrgStore {

    async createOrg(Org) {
        let org;
        try {
            org = await orgModel(Org).save();
        } catch (e) {
            console.log(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
        return org;
    }

};
OrgStore.OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
        super('An error occured while processing the request.');
    }
};