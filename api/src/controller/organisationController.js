import OrgStore from "../store/organisationStore.js";
import Joi from "joi";

const orgStore = new OrgStore();


export default class OrgController {
    async createOrg(req, res) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            ownerName: Joi.string().required(),
            email: Joi.string().required(),
        });
        const params = schema.validate(req, { abortEarly: false });

        const {
            email,
            name,
            ownerName,
        } = params.value;

        const attribute = {
            email,
            name,
            ownerName,
        };
        try {
            let org = await orgStore.createOrg(attribute);
            console.log("controller", org);
            return org;
        } catch (e) {
            console.log(e);
        }
    }
}