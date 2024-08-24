import mongoose from "mongoose";

export const objectId = (id) => {
    return new mongoose.Types.ObjectId(id);
};
