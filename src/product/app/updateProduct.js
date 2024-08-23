import createHttpError from "http-errors";
import productModel from "../productModel.js";

export const updateProduct = async (req, res, next) => {
    try {
        const id = req.query.id; // Assuming the ID is passed as a query parameter
        const data = req.body;

        const product = await productModel.findOne({
            _id: id,
            isDeleted: false,
        });

        // check duplicate slug if slug is given

        const isSlugExists = await productModel.findOne({
            slug: data.slug,
            isDeleted: false,
            _id: { $ne: id },
        });

        if (isSlugExists) {
            return next(createHttpError(400, "Slug already exists"));
        }

        if (!product) {
            return next(createHttpError(404, "Product not found"));
        }
        const updateData = { $set: {} };

        if (data.variants) {
            const mergeVariants = [...product.variants, ...data.variants];
            updateData.$set.variants = mergeVariants;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        console.debug("UPDTATE PRODUCT  [Update product] ", updateProduct);

        res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        console.error("Error while updating product:", error);
        next(createHttpError(500, "Error while updating product"));
    }
};
