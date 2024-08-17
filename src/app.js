import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "Hello world.",
    });
});

export default app;
