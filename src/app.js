import express from "express";
import { config } from "./config/config.js";
import createHttpError, { HttpError } from "http-errors";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

const app = express();

app.get("/", (req, res) => {
    const error = createHttpError(400, "something went Wrong");
    throw error;
    res.json({
        status: 200,
        message: "Hello world.",
    });
});

// global error handler
app.use(globalErrorHandler);

export default app;
