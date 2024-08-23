import express from "express";
import { createProduct } from "./app/createProduct.js";
import { updateProduct } from "./app/updateProduct.js";
import { deleteProduct } from "./app/deleteProduct.js";
import { readProduct } from "./app/readProduct.js";

const productRoutes = express.Router();

productRoutes.post("/create", createProduct);
productRoutes.patch("/update", updateProduct);
productRoutes.delete("/delete", deleteProduct);
productRoutes.get("/all", readProduct);

export default productRoutes;
