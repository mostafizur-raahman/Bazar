import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                sku: String,
                quantity: { type: Number, required: true, default: 1 },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Cart = mongoose.model("Cart", cartSchema);
