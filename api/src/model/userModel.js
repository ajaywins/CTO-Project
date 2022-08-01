
import shortid from "shortid";
import AccessLevels from '../utils/accessLevel.js'

export default ({

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
  password: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false
  },
  _id: {
    type: String,
    default: shortid.generate,
  },
  role: {
    type: String,
    enum: [AccessLevels.User, AccessLevels.Admin, AccessLevels.SuperAdmin],
    required: true,
  },
  organizationId: {
    type: String,
    required: false
  },
})

