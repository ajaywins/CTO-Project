import orgModel from "../model/organizationModel.js";

export default class OrganisationStore {

    async createOrg(Org) {
        let org;
        try {
            org = await orgModel(Org).save();
        } catch (e) {
            console.log(e);
            return Promise.reject(new OrganisationStore.OPERATION_UNSUCCESSFUL());
        }
        return org;
    }
    async updateOrg(_id, attributes) {

        let org;
        try {
            org = await orgModel.findByIdAndUpdate(_id, attributes, { new: true });
        } catch (e) {
            console.error(e);
            return Promise.reject(new orgModel.OPERATION_UNSUCCESSFUL());
        }
        return org;
    }
    async findOrgById(_id) {
        let org;

        try {
            org = await orgModel.find({ user: user._id });
        } catch (e) {
            console.error(e);
            return Promise.reject(new orgModel.OPERATION_UNSUCCESSFUL());
        }
        return org;
    }

};
OrganisationStore.OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
        super('An error occured while processing the request.');
    }
};