import OrgStore from "../store/organizationStore.js";
import Joi from "joi";
import { validationError, internalServerError } from "../utils/errorUtil.js"
import StatusCodes from "../utils/statusCodes.js"

const orgStore = new OrgStore();


export default class OrgController {
    
    async createOrg(request) {
        let response = {
            status: StatusCodes.UNKNOWN_CODE,
        }

        const schema = Joi.object().keys({
            name: Joi.string().required(),
            ownerName: Joi.string().required(),
            email: Joi.string().required(),
        });
        const params = schema.validate(request, { abortEarly: false });

        const {
            email,
            name,
            ownerName,
        } = params.value;

        if (params.error) {
           
            return validationError(params.error, response)
        }

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
            let errorMsg = e.message + " exception in creating Organization"           
            return internalServerError(errorMsg, response)
        }
    }
}