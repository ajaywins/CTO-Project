import mongoose from "mongoose"
import shortid from "shortid";


export const schema = mongoose.Schema;

const orgSchema = new schema({

    name: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    _id: {
        type: String,
        default: shortid.generate,
    },
    userId: {
        type: String,
        ref: 'userModel',
        required: false
    }
});
const orgModel = mongoose.model('org', orgSchema);
export default orgModel;