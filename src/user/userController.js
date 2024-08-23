import createHttpError from "http-errors";
import userModel from "./userModel.js";
import roleModel from "../role/roleModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const createUser = async (req, res, next) => {
    const { name, email, password, accountType } = req.body;

    const validateUserInput = (name, email, password) => {
        if (!name || !email || !password) {
            return next(createHttpError(400, "All fields are required"));
        }
    };

    const checkUserExists = async (email) => {
        const user = await userModel.findOne({ email, isDeleted: false });
        if (user) {
            return next(createHttpError(400, "User already exists"));
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

    const isRoleExist = async (accountType) => {
        const role = await roleModel.findOne({
            name: accountType,
            isDeleted: false,
        });

        if (!role) {
            return next(createHttpError(500, "Can not find role "));
        }

        return role;
    };

    try {
        // TODO: validate req and need schema validation
        // Validate user input
        validateUserInput(name, email, password);

        // Check if user already exists
        await checkUserExists(email);

        // Hash the password
        const hashedPass = await hashPassword(password);

        // role

        const role = accountType && (await isRoleExist(accountType));

        console.debug("ROLE : ", role);

        // Create the new user
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPass,
        });

        console.debug("NEW ", newUser);

        // Generate the JWT token
        const token = generateToken(newUser._id);

        // Send the response
        return res.status(201).json({
            messgae: "User created succesfully",
            newUser,
            accessToken: token,
        });
    } catch (error) {
        next(createHttpError(500, "Error for creating user"));
    }
};

const loginUser = async (req, res, next) => {
    const generateToken = (userId) => {
        return jwt.sign({ sub: userId }, config.jwt_secret, {
            expiresIn: config.jwt_expire,
        });
    };

    const validateuserInput = (email, password) => {
        if (!email || !password) {
            return next(createHttpError(400, "All fields are required"));
        }
    };

    const isUserExist = async (email) => {
        const user = await userModel.findOne({
            email: email,
            isDeleted: false,
        });

        if (!user) {
            return next(createHttpError(404, "User not found"));
        }

        return user;
    };

    const isMatchPassword = async (password, userPassword) => {
        const isMatch = await bcrypt.compare(password, userPassword);

        if (!isMatch) {
            return next(
                createHttpError(401, "Username or password is incorrect")
            );
        }
    };

    try {
        const { email, password } = req.body;

        validateuserInput(email, password);

        const user = await isUserExist(email);

        await isMatchPassword(password, user.password);

        // Generate the JWT token
        const token = generateToken(user._id);

        return res.status(200).json({
            message: "Login successfully",
            accessToken: token,
        });
    } catch (error) {
        next(createHttpError(500, "Error while creating login user"));
    }
};
export { createUser, loginUser };
