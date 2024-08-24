import { Cart } from "../cartModel.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const readCart = async (req, res, next) => {
    try {
        const userId = req.user._id;

        console.debug("USER : ", userId);

        // Use aggregation to join and filter data
        const cart = await Cart.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } }, // Match the user's cart
            {
                $unwind: "$items", // Deconstruct the items array
            },
            {
                $lookup: {
                    from: "products", // Join with the products collection
                    localField: "items.product",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            {
                $unwind: "$productDetails", // Deconstruct the productDetails array
            },
            {
                $addFields: {
                    "items.product.name": "$productDetails.name",
                    "items.product.slug": "$productDetails.slug",
                    "items.product.images": "$productDetails.images",
                    "items.product.variant": {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: "$productDetails.variants",
                                    as: "variant",
                                    cond: {
                                        $eq: ["$$variant.sku", "$items.sku"],
                                    },
                                },
                            },
                            0,
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    items: { $push: "$items" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                },
            },
        ]);

        if (!cart || cart.length === 0) {
            return next(createHttpError(404, "Cart not found"));
        }

        return res.status(200).json({
            message: "Cart retrieved successfully",
            data: cart[0],
        });
    } catch (error) {
        console.error("Error while retrieving cart:", error);
        next(createHttpError(500, "Error while retrieving cart"));
    }
};
