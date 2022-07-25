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
       async getOrganizations() {
        let orgs;

        try {
            orgs = await Organization.find().sort({ 'name': 1 });
        } catch (e) {
            console.error(e);
            return Promise.reject(new OrganisationStore.OPERATION_UNSUCCESSFUL());
        }
        return orgs;
    }

};
OrganisationStore.OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
        super('An error occured while processing the request.');
    }
};