import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { addToCart } from "./app/addToCart.js";
import { readCart } from "./app/readCart.js";
import { deleteFromCart } from "./app/deleteCart.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", authenticate, addToCart);
cartRouter.get("/read", authenticate, readCart);
cartRouter.post("/delete", authenticate, deleteFromCart);

export default cartRouter;
