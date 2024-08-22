import express from "express";
import { createRole } from "./roleController.js";

const roleRouter = express.Router();

roleRouter.post("/create", createRole);

export default roleRouter;
