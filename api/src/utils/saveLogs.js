import pkg from 'mongoose';
const { Schema, model } = pkg;
import LogsModel from '../model/logs.js'
export const Log = model('Log', new Schema(LogsModel));

import * as Time from './Times.js';

const saveLogs = async (location = "", info = {}, organizationId = "") => {
    info = info.toString()
    const attributes = {
        location,
        info,
        organizationId,
        dateTime: Time.now(),
    }
    const log = new Log(attributes);
    try {
        await log.save();
    } catch (e) {
        console.error(e);
    }
    console.log("log",log);
}
export default saveLogs;