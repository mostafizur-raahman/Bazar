import { Cart } from "../cartModel.js";
import createHttpError from "http-errors";

export const readCart = async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Find the cart for the specific user
        const cart = await Cart.findOne({ user: userId }).populate({
            path: "items.product",
            select: "name images category brand variants", // Select fields you want to include
        });

        if (!cart) {
            return next(createHttpError(404, "Cart not found"));
        }

        return res.status(200).json({
            message: "Cart retrieved successfully",
            data: cart,
        });
    } catch (error) {
        console.error("Error while retrieving cart:", error);
        next(createHttpError(500, "Error while retrieving cart"));
    }
};
