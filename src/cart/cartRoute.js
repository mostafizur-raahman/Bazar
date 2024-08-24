import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { addToCart } from "./app/addToCart.js";
import { readCart } from "./app/readCart.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", authenticate, addToCart);
cartRouter.get("/read", authenticate, readCart);

export default cartRouter;
