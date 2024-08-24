import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { config } from "../config/config.js";

export const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return next(createHttpError(401, "Unathorization user"));
    }

    try {
        const decoded = jwt.verify(token, config.jwt_secret);
        req.user = decoded;
        next();
    } catch (error) {
        next(createHttpError(400, "Invalid token."));
    }
};
