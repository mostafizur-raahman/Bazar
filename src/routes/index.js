import express from "express";
import userRouter from "../user/userRouter.js";
import roleRouter from "../role/roleRoute.js";
import productRoutes from "../product/productRoutes.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/roles", roleRouter);
router.use("/products", productRoutes);

export default router;
