import { readFactory } from "../../Factory/readfactory.js";
import productModel from "../productModel.js";

export const readProduct = readFactory(productModel, {
    searchFields: ["name", "description"],
    // aggregationPipeline: [
    //     {
    //         $lookup: {
    //             from: "categories",
    //             localField: "categoryId",
    //             foreignField: "_id",
    //             as: "categoryDetails",
    //         },
    //     },
    //     {
    //         $unwind: {
    //             path: "$categoryDetails",
    //             preserveNullAndEmptyArrays: true,
    //         },
    //     },
    //     {
    //         $project: {
    //             name: 1,
    //             slug: 1,
    //             categoryDetails: "$categoryDetails.name",
    //             price: 1,
    //             variants: 1,
    //             createdAt: 1,
    //         },
    //     },
    // ],
});
