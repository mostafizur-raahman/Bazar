import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
    try {
        // first register then connect
        mongoose.connection.on("connected", () => {
            console.debug("Database connected...");
        });

        mongoose.connection.on("error", (error) => {
            console.log("Failed to connect Database", error);
        });

        await mongoose.connect(config.databaseURL);
    } catch (error) {
        console.error("Failed to connect database", error);

        process.exit(1);
    }
};

export default connectDB;
