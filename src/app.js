import express from "express";
import { config } from "./config/config.js";
import createHttpError from "http-errors";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import morgan from "morgan";
import router from "./routes/index.js";

const app = express();

// Setup morgan for logging
if (config.env === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("combined"));
}

// middlewares
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "Hello world.",
    });
});

// routes
app.use("/api", router);

// global error handler
app.use(globalErrorHandler);

export default app;
