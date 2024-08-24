import { Cart } from "../cartModel.js";
import createHttpError from "http-errors";

export const deleteFromCart = async (req, res, next) => {
    try {
        const { sku } = req.body;
        const userId = req.user._id;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return next(createHttpError(404, "Cart not found"));
        }

        if (sku) {
            // If SKU is provided, delete the specific item
            const itemIndex = cart.items.findIndex((item) => item.sku === sku);

            if (itemIndex > -1) {
                cart.items.splice(itemIndex, 1);
                await cart.save();
                return res
                    .status(200)
                    .json({ message: "Item removed from cart", cart });
            } else {
                return next(createHttpError(404, "Item not found in cart"));
            }
        } else {
            // If no SKU is provided, clear the entire cart
            cart.items = [];
            await cart.save();
            return res
                .status(200)
                .json({ message: "All items removed from cart", cart });
        }
    } catch (error) {
        console.error("ERROR : ", error);
        next(createHttpError(500, "Error while deleting from cart"));
    }
};
