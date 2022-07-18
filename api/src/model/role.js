import shortid from 'shortid';
import AccessLevels from '../utils/accessLevels.js';

export default {
    _id: {
        type: String,
        default: shortid.generate,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    acceptedAt: {
        type: Number,
        required: false,
        default: 0,
    },
    phoneCode: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        ref: 'userModel',
        required: false,
    },
    organizationId: {
        type: String,
        ref: 'organizationModel',
        required: true,
    },
    accessLevel: {
        type: String,
        enum: [AccessLevels.SuperAdmin, AccessLevels.Admin, AccessLevels.Server],
        required: true,
    },
};