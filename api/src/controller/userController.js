import Joi from "joi";
import UserStore from "../store/userStore.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import StatusCodes from '../utils/statusCodes.js';
import saveLogs from '../utils/saveLogs.js';
import {
    internalServerError,
    badRequestError,
} from '../utils/errorUtil.js';

const userStore = new UserStore();


export default class UserController {

    static OPERATION_UNSUCCESSFUL = class extends Error {
        constructor() {
            super('An error occured while processing the request.');
        }
    };
    async createUser(req, res) {
        let response = {
            status: StatusCodes.UNKNOWN_CODE,
        };
        const schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phoneNumber: Joi.string().required(),
        });
        const params = schema.validate(req, { abortEarly: false });

        const {
            email,
            firstName,
            lastName,
            password,
            phoneNumber
        } = params.value;

        const hashPassword = await bcrypt.hash(password, 10);

        const attribute = {
            email,
            firstName,
            lastName,
            phoneNumber,
            password: hashPassword

        };

        // try {
        //     let user = await userStore.createUser(attribute);
        //     return user;
        // } catch (e) {
        //     console.log(e);
        //     return Promise.reject(new userStore.OPERATION_UNSUCCESSFUL());
        // }
        // lowercase email
        let formattedEmail;
        let existingUser;
        if (email) {
            formattedEmail = email.toLowerCase();

            /**
             * Make sure that there isn't an existing account
             * associated with this email address
             */
            try {
                existingUser = await this.storage.findUserByEmail(email);
            } catch (e) {
                await saveLogs("UserController::register", e)
                return internalServerError(e, response);
            }

            if (existingUser) {
                const errorMsg = this.controller.message.getMessage('emailExistsError');
                await saveLogs("UserController::register", errorMsg)
                return badRequestError(errorMsg, response);
            }
        }

        /**
         * Make sure that there isn't an existing account
         * associated with this phone number
         */

        // try {
        //     existingUser = await this.storage.findUserByPhoneNumber(formattedPhoneNumber);
        // } catch (e) {
        //     await saveLogs("UserController::register", e)
        //     return internalServerError(e, response);
        // }
        /**
         if an existing user has no roles, they are probably coming from user app
        and just want to create an admin account
        their phone number is already in the database so usually it would error
        but we have to special case it
        */
        let isAlreadyStandardUser = false;
        if (existingUser) {
            try {
                const roleResp = await this.controller.role.getUserRoles({
                    userId: existingUser._id
                });
                // user already has admin account, can't create another with the same phone number
                if (roleResp.roles && roleResp.roles.length > 0) {
                    const errorMsg = this.controller.message.getMessage('phoneExistsError');
                    await saveLogs("UserController::register", errorMsg)
                    return badRequestError(errorMsg, response);
                }

                isAlreadyStandardUser = true;
            } catch (e) {
                await saveLogs("UserController::register", e)
                return internalServerError(e, response);
            }
        }

        /**
         * Save the user to storage
         */
        let user;
        if (isAlreadyStandardUser) {
            const attributes = {
                email: formattedEmail,
                password,
                firstName,
                lastName,
            };

            try {
                user = await this.storage.createAdminUserFromStandardUser(existingUser._id, attributes);
            } catch (e) {
                await saveLogs("UserController::register", e)
                return internalServerError(e, response);
            }
        } else {
            const attributes = {
                email: formattedEmail,
                password,
                firstName,
                lastName,
                phoneNumber: formattedPhoneNumber,
                createdAt: Time.now(),
            };

            try {
                user = await this.storage.createUser(attributes);
            } catch (e) {
                await saveLogs("UserController::register", e)
                return internalServerError(e, response);
            }
        }

        /**
         * if user has oustanding roles, update them
         * with the userId. email check, ensure this
         * only fires for admin registrations
         */
        if (email) {
            const updateRoleRequest = {
                userId: user._id.toString(),
                phoneNumber: user.phoneNumber,
            };
            try {
                await this.controller.role.assignUserIdToRoles(updateRoleRequest);
            } catch (e) {
                await saveLogs("UserController::register", e)
                return internalServerError(e, response);
            }
        }

        response = {
            status: StatusCodes.OK,
            user,
            // token: this.generateJWT(user._id),
        };

        return response;

    }
    async userLogin(req, res) {
        try {
            const { email, password } = req;

            if (email && password) {
                const user = await userStore.loginUser(email);
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (user.email === email && isMatch) {
                        // token generate
                        const token = jwt.sign(
                            { userID: user._id },
                            process.env.SECRET_KEY,
                            { expiresIn: "5m" });
                        let response = {
                            message: "login sucessfull",
                            token: token,
                            status: StatusCodes.OK
                        }
                        return response;
                    }
                    else {
                        let response = {
                            message: "invalid credetial",
                            status: StatusCodes.UNKNOWN_CODE
                        }
                        return response;
                    }
                } else {
                    let response = {
                        message: "user not found",
                        status: StatusCodes.NOT_FOUND
                    }
                    return response;
                }
            } else {
                let response = {
                    message: "credential not matched",
                    status: StatusCodes.NOT_FOUND
                }
                return response;
            }
        } catch (e) {
            console.log(e);
            let response = {
                message: "login failed",
                status: StatusCodes.UNAUTHORIZED
            }
            return response;
        }
    };
}