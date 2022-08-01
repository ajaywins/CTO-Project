import Joi from "joi";
import { validationError, internalServerError } from "../utils/errorUtil.js"
import StatusCodes from "../utils/statusCodes.js"
import OrganisationStore from "../store/organizationStore.js";
import saveLogs from "../utils/saveLogs.js";
import UserStore from "../store/userStore.js";
import UserController from "./userController.js";

const organisationStore = new OrganisationStore();
const userController = new UserController()


export default class OrgController {
    constructor(controller) {
        this.controller = controller;
        this.storage = new UserStore();
    }
    //creating Organization..
    async createOrg(request) {
        let response = {
            status: StatusCodes.UNKNOWN_CODE,
        }

        const schema = Joi.object().keys({
            name: Joi.string().required(),
            ownerName: Joi.string().required(),
            email: Joi.string().required(),
            userId: Joi.string().optional(),
            User: Joi.object().optional()
        });
        const params = schema.validate(request, { abortEarly: false });

        const {
            email,
            name,
            ownerName,
            userId,
            User
        } = params.value;
        if (params.error) {
            return validationError(params.error, response)
        }
        //Make sure that there isn't an existing account
        //checking Owner's existing email
        let formattedEmail;
        if (email) {
            // lowercase email
            formattedEmail = email.toLowerCase();
            try {
                let existingOwnerEmail = await organisationStore.findOrgByEmail(formattedEmail);
                if (existingOwnerEmail) {
                    const err = 'owner with same email already exists'
                    await saveLogs("UserController::register", err)
                    return Error(err, response)

                }
            } catch (e) {
                await saveLogs("UserController::register", e)
                return Error(e, response);
            }
        }
        //Make sure that there isn't an existing account
        //checking user's existing email...
        let userEmail = User.email;
        if (userEmail) {
            try {
                let existingEmail = await this.storage.findUserByEmail(userEmail);
                if (existingEmail) {
                    const err = 'user with same email already exists'
                    await saveLogs("UserController::register", err)
                    return Error(err, response)

                }
            } catch (e) {
                await saveLogs("UserController::register", e)
                return Error(e, response);
            }
            //checking user's existing email...
            let phoneNumber = User.phoneNumber
            if (phoneNumber) {
                try {
                    let existingNumber = await this.storage.findUserByPhoneNumber(phoneNumber);
                    if (existingNumber) {
                        const err = 'user with same number already exists'
                        await saveLogs("UserController::register", err)
                        return Error(err, response)

                    }
                } catch (e) {
                    await saveLogs("UserController::register", e)
                    return Error(e, response);
                }
            }
            const attribute = {
                email,
                name,
                ownerName,
                userId: userId,
                User
            };
            let org;
            try {
                org = await organisationStore.createOrg(attribute);

                //after creting a orgs linked User is also created here..
                if (org) {

                    const attributes = {
                        email: User.email,
                        password: User.password,
                        firstName: User.firstName,
                        lastName: User.lastName,
                        phoneNumber: User.phoneNumber,
                        role: "User",
                        organizationId: org._id,
                    };
                    try {
                        let user = await userController.createUser(attributes);
                    } catch (e) {
                        await saveLogs("UserController::register", e)
                    }
                } else {
                    let errorMsg = e.message + " exception in creating User"
                    return internalServerError(errorMsg, response)
                }
            } catch (e) {
                await saveLogs("UserController::register", e)
            }
            return org;
        }
    }
    //update organization...
    async updateOrganization(request) {

        let response = {
            status: StatusCodes.UNKNOWN_CODE,
        };
        const params = Joi.object().keys({
            _id: Joi.string().required(),
            email: Joi.string().required(),
            name: Joi.string().required(),
            ownerName: Joi.string().required(),
        }).validate(request);

        if (params.error) {
            console.error('updateOrganization - validation error');
            return Error(params.error, response);
        }

        const {
            _id,
            email,
            name,
            ownerName,
        } = params.value;

        const attributes = {

            email,
            name,
            ownerName,
        };

        let org;
        try {
            org = await organisationStore.updateOrg(_id, attributes);
        } catch (e) {
            return Error(e, response);
        }

        response = {
            status: StatusCodes.OK,
            org,
        };

        return response.org;
    }
    async getOrganizationList(request) {
        let response = {
            status: StatusCodes.UNKNOWN_CODE,
        };

        const params = Joi.object().keys({
            userId: Joi.string().optional(),
        }).validate(request);

        if (params.error) {
            return Error(params.error, response);
        }
        const {
            userId
        } = params.value;
        let req = {
            userId: userId
        }

        let org;
        try {
            org = await organisationStore.getOrganizationList(req);
        } catch (e) {
            return Error(e, response);
        }
        response = {
            status: StatusCodes.OK,
            org,
        };
        return org;
    }
}