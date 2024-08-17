import { config as conF } from "dotenv";

conF();

const _config = {
    port: process.env.PORT,
    databaseURL: process.env.MONGO_CONNECTION_STR,
};

// can not override : readOnly
export const config = Object.freeze(_config);
