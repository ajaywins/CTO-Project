import orgModel from "../model/organisationModel.js";

export default class OrgStore {

    async createOrg(Org) {
        let org;
        try {
            org = await orgModel(Org).save();
        } catch (e) {
            console.log(e);
        }
        console.log("strore",org);
        return org;
    }

}