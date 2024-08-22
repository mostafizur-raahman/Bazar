import express from "express";
import userRouter from "../user/userRouter.js";
import roleRouter from "../role/roleRoute.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/roles", roleRouter);

export default router;
