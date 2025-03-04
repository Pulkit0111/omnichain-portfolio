import mongoose from "mongoose"
import { config } from "dotenv"

config()

export const connectToDatabse = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL || "")
        console.log("Connected to Database")
    } catch(error) {
        console.log(error)
        throw new Error("Cannot connect to database")
    }
}