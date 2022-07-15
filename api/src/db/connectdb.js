import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: 'CheckThisOutDemo',
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log('MongoDB is connected...')

    } catch (e) {
        console.log(e)

    }
}
export default connectDB