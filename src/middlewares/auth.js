import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { config } from "../config/config.js";

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization; // Lowercase 'authorization'

    console.debug("AUTH header ", authHeader);

    if (!authHeader) {
        return next(createHttpError(401, "Unauthorized: No token provided"));
    }

    const token = authHeader;

    try {
        const decoded = jwt.verify(token, config.jwt_secret);
        req.user = { _id: decoded.sub }; // Store the user ID in req.user._id
        next();
    } catch (error) {
        return next(createHttpError(401, "Unauthorized: Invalid token"));
    }
};
