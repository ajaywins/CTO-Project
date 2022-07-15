import Joi from "joi";
import UserStore from "../store/userStore.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import StatusCodes from '../utils/statusCodes.js';

const userStore = new UserStore();


export default class UserController {

    static OPERATION_UNSUCCESSFUL = class extends Error {
        constructor() {
            super('An error occured while processing the request.');
        }
    };
    async createUser(req, res) {
        const schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        const params = schema.validate(req, { abortEarly: false });

        const {
            email,
            firstName,
            lastName,
            password
        } = params.value;

        const hashPassword = await bcrypt.hash(password, 10);

        const attribute = {
            email,
            firstName,
            lastName,
            password: hashPassword
        };
        try {
            let user = await userStore.createUser(attribute);
            return user;
        } catch (e) {
            console.log(e);
            return Promise.reject(new userStore.OPERATION_UNSUCCESSFUL());
        }
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