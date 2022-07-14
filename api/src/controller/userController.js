import Joi from "joi";
import UserStore from "../store/userStore.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userStore = new UserStore();


export default class UserController {
    async createUser(req, res) {
        const schema = Joi.object().keys({
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            email: Joi.string().email().optional(),
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
                        (res, { msg: "Login Sucessfull", token: token })
                        return user;

                    }
                    else {
                        res.send({
                            status: "failed",
                            message: " Email or password not valid",

                        });
                    }
                } else {
                    res.send({
                        status: "failed",
                        message: "you are Not Registered User",
                    });
                }
            } else {
                res.status(400)({ status: "failed", message: "All fields are required" });
            }
        } catch (e) {
            console.log(e);
            res.status(400)({ status: "failed", mesaage: "unable to login" });
        }
    };
}