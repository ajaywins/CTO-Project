import mongoose from "mongoose"
import shortid from "shortid";

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
    },
    phoneNumber:{
      type:String,
      required:false
    },
    _id: {
      type: String,
      default: shortid.generate,
    }
})
const userModel = mongoose.model('user', userSchema);
export default userModel;
