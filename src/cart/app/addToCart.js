import { Cart } from "../cartModel.js";
import productModel from "../../product/productModel.js";
import createHttpError from "http-errors";

export const addToCart = async (req, res, next) => {
    try {
        const { productId, sku, quantity } = req.body;
        const userId = req.user._id;

        console.debug("USER", userId);

        // Find the product and the specific variant by SKU
        const product = await productModel.findOne({
            _id: productId,
            "variants.sku": sku,
            isDeleted: false,
        });

        if (!product) {
            return next(createHttpError(404, "Product or variant not found"));
        }

        // Get the variant
        const variant = product.variants.find((v) => v.sku === sku);

        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            // Check if the item already exists in the cart
            const itemIndex = cart.items.findIndex(
                (item) =>
                    item.product.toString() === productId && item.sku === sku
            );

            if (itemIndex > -1) {
                // Update quantity if item already exists
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add new item with variant details
                cart.items.push({ product: productId, sku, quantity });
            }
        } else {
            // Create new cart with the item
            cart = new Cart({
                user: userId,
                items: [{ product: productId, sku, quantity }],
            });
        }

        await cart.save();
        return res
            .status(200)
            .json({ message: "Cart updated successfully", cart });
    } catch (error) {
        next(createHttpError(500, "Error while updating cart"));
    }
};
