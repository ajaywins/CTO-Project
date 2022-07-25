import Joi from "joi";
import UserStore from "../store/userStore.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import StatusCodes from '../utils/statusCodes.js';
import saveLogs from '../utils/saveLogs.js';
import * as Time from '../utils/Times.js'
import formatPhoneNumber from "../utils/formatPhoneNumber.js";


export default class UserController {
    constructor(controller) {
        this.controller = controller;
        this.storage = new UserStore();
    }

    static OPERATION_UNSUCCESSFUL = class extends Error {
        constructor() {
            super('An error occured while processing the request.');
        }
    };

    generateJWT(userId, organizationId) {
        return jwt.sign({
            _id: userId,
            organizationId,

        },

            process.env.SECRET_KEY,
            { expiresIn: '2h' }
        );
    }

    async createUser(req, res) {
        let response = {
            status: StatusCodes.UNKNOWN_CODE,
        };
        const schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            role: Joi.string().required()
        });
        const params = schema.validate(req, { abortEarly: false });

        const {
            email,
            firstName,
            lastName,
            password,
            phoneNumber,
            role
        } = params.value;

        const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

        const hashPassword = await bcrypt.hash(password, 10);

        // lowercase email
        let formattedEmail;
        let existingUser;
        let existingNumber;
        let user;
        if (email) {
            formattedEmail = email.toLowerCase();
            /*
            * Make sure that there isn't an existing account
            * associated with this email address
            */
            try {
                existingUser = await this.storage.findUserByEmail(formattedEmail);
                if (!existingUser) {
                    existingNumber = await this.storage.findUserByPhoneNumber(formattedPhoneNumber);
                    if (!existingNumber) {
                        const attributes = {
                            email: formattedEmail,
                            password: hashPassword,
                            firstName,
                            lastName,
                            phoneNumber: formattedPhoneNumber,
                            role,
                            createdAt: Time.now(),
                        };
                        try {
                            user = await this.storage.createUser(attributes);
                        } catch (e) {
                            await saveLogs("UserController::register", e)
                        }
                    } else {
                        const err = 'user with same number already exist'
                        await saveLogs("UserController::register", err)
                        return Error(err, response)

                    }
                } else {
                    const err = 'user with same email already exist'
                    await saveLogs("UserController::register", err)
                    return Error(err, response)

                }
            } catch (e) {
                await saveLogs("UserController::register", e)
                return Error(e, response);
            }
        }
        return user;

    }

    async userLogin(req, res) {
        try {
            const { email, password } = req;

            if (email && password) {
                const user = await this.storage.loginUser(email);
                if (user != null) {
                    const isMatch = bcrypt.compare(password, user.password);
                    if (user.email === email && isMatch) {
                        let response = {
                            message: "Login successful",
                            status: StatusCodes.UNKNOWN_CODE,
                            token: this.generateJWT(user),
                        }
                        return response;
                    }
                    else {
                        let response = {
                            message: "Login successful",
                            status: StatusCodes.OK,
                            token: token,
                        }
                        return response;
                    }
                } else {
                    let response
                    const err = 'user email already exist'
                    return Error(err, response);
                }
            } else {
                let response = {
                    message: "credential not matched",
                    status: StatusCodes.NOT_FOUND
                }
                return response;
            }
        }
        catch (e) {
            console.log(e);
            let response = {
                message: "login failed",
                status: StatusCodes.UNAUTHORIZED
            }
            return response;
        }
    };
    async updateUserInfo(request) {
        let response = {
            status: StatusCodes.UNKNOWN_CODE,
        };
        const params = Joi.object().keys({
            _id: Joi.string().optional(),
            email: Joi.string().optional(),
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            phoneNumber: Joi.string().optional(),
            phoneCode: Joi.string().optional(),
        }).validate(request);


        if (params.error) {
            console.error('updateUserInfo - validation error');
            return Error(params.error, response);
        }

        const {
            _id,
            email,
            firstName,
            lastName,
            phoneNumber
        } = params.value;

        const attributes = {
            email,
            firstName,
            lastName,
            phoneNumber,

        };

        let user;
        try {
            user = await this.storage.updateUser(_id, attributes);
        } catch (e) {
            return Error(e, response);
        }

        response = {
            status: StatusCodes.OK,
            user,
        };

        return response;
    }
    async get(request) {
        let response = {
            status: StatusCodes.UNKNOWN_CODE,
        };
        const params = Joi.object().keys({
            _id: Joi.string().required(),
        }).validate(request);

        if (params.error) {
            return validationError(params.error, response);
        }
        const {
            _id
        } = params.value;

        let user;
        try {
            user = await this.storage.findUserById(_id);
        } catch (e) {
            return Error(e, response);
        }

        if (!user) {
            const errorMsg = ('userNotFound', {
                userId
            });
            return Error(errorMsg, response);
        }

        response = {
            status: StatusCodes.OK,
            user,
        };
        return response;
    }




}
