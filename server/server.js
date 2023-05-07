import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productRouter from "./products/product.js";
import authRouter from "./auth/auth.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/products", productRouter);
app.use("/auth", authRouter);
app.listen(port, () => console.log("listening"));

export default app;
