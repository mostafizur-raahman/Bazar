import createHttpError from "http-errors";
import productModel from "../productModel.js";

export const createProduct = async (req, res, next) => {
    try {
        const data = req.body;

        const checkExistSlug = await productModel.findOne({
            slug: data.slug,
            isDeleted: false,
        });

        if (checkExistSlug) {
            return next(createHttpError(400, "Slug already exists"));
        }
        // Creating the product with validated data
        const newProduct = await productModel.create(data);

        res.status(201).json({
            message: "Product created successfully",
            data: newProduct,
        });
    } catch (error) {
        return next(createHttpError(500, "Error while creating product"));
    }
};
