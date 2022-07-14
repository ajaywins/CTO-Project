import mongoose from "mongoose"

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

});
const orgModel = mongoose.model('org', orgSchema);
export default orgModel;