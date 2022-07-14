import userModel from "../model/userModel.js";

export default class UserStore {

    async createUser(User) {
        let user;
        try {
            user = await userModel(User).save();
        } catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
        return user;
    }
    async loginUser(email) {
        let user;
        try {
            user = await userModel.findOne({email})
            return user;
        }
        catch (e) {
            console.error(e);
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
    }
}
