import createHttpError from "http-errors";
import productModel from "../productModel.js";

export const deleteProduct = async (req, res, next) => {
    try {
        const id = req.query.id;
        const product = await productModel.findOne({
            _id: id,
            isDeleted: false,
        });

        if (!product) {
            return next(
                createHttpError(404, "Product not found or already deleted")
            );
        }

        await productModel.updateOne(
            { _id: id },
            { $set: { isDeleted: true } }
        );

        return res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        next(createHttpError(400, "Error while deleting product"));
    }
};
