import { config as conF } from "dotenv";

conF();

const _config = {
    port: process.env.PORT,
    databaseURL: process.env.MONGO_CONNECTION_STR,
    env: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expire: process.env.JWT_EXPIRE,
};

// can not override : readOnly
export const config = Object.freeze(_config);
