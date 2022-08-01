import shortid from "shortid";

export default{

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
        required: false
    }
};
