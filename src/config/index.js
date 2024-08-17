import { config as conF } from "dotenv";

conF();

const _config = {
    port: process.env.PORT,
};

// can not override : readOnly
export const config = Object.freeze(_config);
