import Joi from "joi";
import { validationError, internalServerError } from "../utils/errorUtil.js"
import StatusCodes from "../utils/statusCodes.js"
import OrganisationStore from "../store/organizationStore.js";
import saveLogs from "../utils/saveLogs.js";

const organisationStore = new OrganisationStore();


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
            userId,
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
        let org;
        try {
             org = await organisationStore.createOrg(attribute);
            console.log("controller", org);
            return org;
        } catch (e) {
            let errorMsg = e.message + " exception in creating Organization"
            return internalServerError(errorMsg, response)
        }
        // let organizationId = org._id.toString()
        // const createRoleRequest = {
        //     userId,
        //     phoneNumber: userResp.user.phoneNumber,
        //     organizationId: organizationId,
        //     accessLevel: AccessLevels.Admin,
        //     doNotSendText: true,
        // }
        // let createRoleResponse
        // try {
        //     createRoleResponse = await this.controller.role.createRole(
        //         createRoleRequest,
        //     )
        // } catch (e) {
        //     let errorMsg = e.message + " exception in creating user role"
        //     await saveLogs(
        //         "OrganizationController::createOrganization",
        //         errorMsg,
        //         organizationId,
        //     )
        //     return internalServerError(errorMsg, response)
        // }
    }
}