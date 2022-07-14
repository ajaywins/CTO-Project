import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'

export default class UserStore {

    async createUser(User) {
        let user;
        try {
            user = await userModel(User).save();
        } catch (e) {
            console.log(e);
        }
        return user;
    }
    async loginUser(email) {
        let user;
        try {
            user = await userModel.findOne({email})
            console.log('user',user);
            return user;
        }
        catch (e) {
            console.log(e);
        }
    }
}
