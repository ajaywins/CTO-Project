export default {
    _id: {
        type: String,
        default: generate,
    },
    name: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: false,
        default: ""
    },
    createdAt: {
        type: Number,
        required: true,
    },
    logoUrl: {
        type: String,
        required: true,
    },
    posterImageUrl: {
        type: String,
        required: true,
    },
    subscriptionId: {
        type: String,
        required: false,
        default: "",
    },
    activeSubscriber: {
        type: Boolean,
        required: true,
        default: false,
    },
    address: {
        address1: {
            type: String,
            required: false,
            default: "",
        },
        address2: {
            type: String,
            required: false,
            default: "",
        },
        city: {
            type: String,
            required: false,
            default: "",
        },
        state: {
            type: String,
            required: false,
            default: "",
        },
        zip: {
            type: String,
            required: false,
            default: "",
        },
        country: {
            type: String,
            required: false,
            default: "USA",
        },
    },
    configurations: {
        affiliateCredit: {
            type: Number,
            required: true,
            default: 500,
        },
        firstTimeRecipientCredit: {
            type: Number,
            required: true,
            default: 1000,
        },
        repeatRecipientCredit: {
            type: Number,
            required: true,
            default: 500,
        },
        returnLimit: {
            type: Number,
            required: true,
            default: 30, // days
        },
        couponActivationExpiration: {
            //deprecated, should delete
            type: Number,
            required: false,
            default: 30, // days
        },
        couponRedemptionExpiration: {
            type: Number,
            required: true,
            default: 30, // days
        },
        welcomeMessage: {
            // deprecated, should delete
            type: String,
            required: true,
            default: "",
        },
        websiteUrl: {
            type: String,
            required: false,
            default: "",
        },
        reservationUrl: {
            type: String,
            required: false,
            default: "",
        },
        shortWebsiteUrl: {
            type: String,
            required: false,
            default: "",
        },
        shortReservationUrl: {
            type: String,
            required: false,
            default: "",
        },
        shortWebsiteUrlClicks: {
            type: Number,
            required: false,
            default: 0,
        },
        shortReservationUrlClicks: {
            type: Number,
            required: false,
            default: 0,
        }
    },
    keyword: {
        type: String,
        default: "",
    },
    phrase: {
        type: String,
        default: "",
    },
    phoneNumber: {
        type: String,
        default: "",
    },
    campaignPhoneNumber: {
        type: String,
        default: "",
    },
    mmsEnabled: {
        type: String,
        default: "N",
    },
    smsCampaign: {
        OptInAt: String,
        mmsEnabledAt: String,
    },
    timezoneId: {
        type: String,
        required: false,
    },
    shortcode: {
        type: String,
        required: false,
    },
    tags: [{
        type: String,
        required: true
    }],
    // saveLogs: {
    //     inboundMessaging: {
    //         type: Boolean,
    //         default: true,
    //     },
    //     outboundMessaging: {
    //         type: Boolean,
    //         default: false,
    //     }
    // }
};