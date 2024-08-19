import createHttpError from "http-errors";
import userModel from "./userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    const validateUserInput = (name, email, password) => {
        if (!name || !email || !password) {
            throw createHttpError(400, "All fields are required");
        }
    };

    const checkUserExists = async (email) => {
        const user = await userModel.findOne({ email, isDeleted: false });
        if (user) {
            throw createHttpError(400, "User already exists");
        }
    };

    const hashPassword = async (password) => {
        return await bcrypt.hash(password, 10);
    };

    const generateToken = (userId) => {
        return jwt.sign({ sub: userId }, config.jwt_secret, {
            expiresIn: config.jwt_expire,
        });
    };

    try {
        // Validate user input
        validateUserInput(name, email, password);

        // Check if user already exists
        await checkUserExists(email);

        // Hash the password
        const hashedPass = await hashPassword(password);

        // Create the new user
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPass,
        });

        // Generate the JWT token
        const token = generateToken(newUser._id);

        // Send the response
        res.json({
            messgae: "User created succesfully",
            newUser,
            accessToken: token,
        });
    } catch (error) {
        next(createHttpError(500, "Error for creating user"));
    }
};

export { createUser };
