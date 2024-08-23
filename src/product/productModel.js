import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        slug: String,
        description: {
            type: String,
        },
        images: [String],
        category: String,
        tags: String,
        brand: String,
        variants: [
            {
                sku: String,
                stockId: String,
                quantity: Number,
                price: Number,
                offerPrice: Number,
                color: String,
                discountType: {
                    type: String,
                    enum: ["FLAT", "PERCENTAGE"],
                },
                discountAmount: Number,
                size: [String],
            },
        ],
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
