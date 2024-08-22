import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            default: "66c75595984462d6e4cc083f", // customer
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
