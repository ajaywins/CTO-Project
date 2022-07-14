import mongoose from "mongoose"

export const schema = mongoose.Schema;

const userSchema = new schema({
 
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
 
    email: {
      type: String,
      required: false,
    },
    password:{
        type: String,
      required: false,
    }
})
const userModel = mongoose.model('user', userSchema);
export default userModel;
