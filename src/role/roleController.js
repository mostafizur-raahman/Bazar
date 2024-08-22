import createHttpError from "http-errors";
import roleModel from "./roleModel.js";

const createRole = async (req, res, next) => {
    try {
        const { name } = req.body;

        const isExist = await roleModel.findOne({
            name: name,
            isDeleted: false,
        });

        if (isExist) {
            return next(createHttpError(400, "Role already exists"));
        }

        const _doc = await roleModel.create({
            name,
        });

        return res.status(201).json({
            message: "Role created succesfully",
            _doc,
        });
    } catch (error) {
        next(createHttpError(500, "Error while creating role"));
    }
};

export { createRole };
