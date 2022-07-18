import shortid from 'shortid';
export default {
    _id: {
        type: String,
        default: shortid.generate,
    },
    organizationId: {
        type: String,
        ref: 'organizationModel',
        required: false,
    },
    location: { // Location due to this log is created
        type: String,
        required: true,
    },
    dateTime: { // timing of logs created
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
};