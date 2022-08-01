import OrganizationMongo from "../model/organizationModel.js";
import pkg from 'mongoose';
const { Schema, model } = pkg;

export const OrganizationSchema = new Schema(OrganizationMongo);
export const Organization = model('org', OrganizationSchema);

OrganizationSchema.virtual('user', {
    ref: 'user',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});

export default class OrganisationStore {


    async createOrg(Org) {
        let org;
        try {
            org = await Organization(Org).save();
        } catch (e) {
            console.log(e);
            return Promise.reject(new OrganisationStore.OPERATION_UNSUCCESSFUL());
        }
        return org;
    }
    async updateOrg(_id, attributes) {

        let org;
        try {
            org = await Organization.findByIdAndUpdate(_id, attributes, { new: true });
        } catch (e) {
            console.error(e);
            return Promise.reject(new Organization.OPERATION_UNSUCCESSFUL());
        }
        return org;
    }
    async findOrgById(_id) {
        let org;

        try {
            org = await Organization.find({ user: user._id });
        } catch (e) {
            console.error(e);
            return Promise.reject(new Organization.OPERATION_UNSUCCESSFUL());
        }
        return org;
    }
    async findOrgByEmail(email) {
        let org;
        try {
            org = await Organization.findOne({ email });
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
        return org;
    }
    async getOrganizationList({ userId }) {
        let org;
        try {
            org = await Organization.find({ userId, role: { $et: "Admin" } }).populate('user').exec();

        } catch (e) {
            console.log(e);
            return Promise.reject(new OrganisationStore.OPERATION_UNSUCCESSFUL());
        }
        return org;
    }
};
OrganisationStore.OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
        super('An error occured while processing the request.');
    }
};