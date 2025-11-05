import dotenv from "dotenv";
import express from "express";
import { router } from "./routes/routes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
    console.log("Running server on port", PORT);
});