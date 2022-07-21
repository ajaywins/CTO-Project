import Joi from '@hapi/joi';
import RoleStore from '../store/roleStore';
import StatusCodes from '../utils/statusCodes';
import { validationError, internalServerError } from '../util/ErrorUtil';


export default class RoleController {
    constructor(controller) {
        this.controller = controller;
        this.storage = new RoleStore();
    }

    async createRole(request) {
        let response = {
            status: StatusCodes.UNKNOWN_CODE,
        };

        const params = Joi.object().keys({
            userId: Joi.string().optional(),
            phoneNumber: Joi.string().required(),
            organizationId: Joi.string().required(),
            accessLevel: Joi.string().required(),
            doNotSendText: Joi.boolean().optional(),
        }).validate(request);

        if (params.error) {
            return validationError(params.error, response);
        }

        const {
            userId,
            phoneNumber,
            organizationId,
            accessLevel,
            doNotSendText,
        } = params.value;

        // const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

        const attributes = {
            userId,
            phoneNumber,
            organizationId,
            accessLevel,
        };
        let role;
        try {
            role = await this.storage.createRole(attributes);
        } catch (e) {
            return internalServerError(e, response);
        }
    }
}
