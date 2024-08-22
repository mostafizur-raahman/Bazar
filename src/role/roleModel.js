import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            enum: ["ADMIN", "CUSTOMER", "MERCHENT"],
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

const roleModel = mongoose.model("Role", roleSchema);

export default roleModel;
