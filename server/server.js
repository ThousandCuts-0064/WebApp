import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
//import multer from "multer";
import userRouter from "./user/user.js";
import registerRouter from "./auth/register/register.js";
import loginRouter from "./auth/login/login.js";
import newProductRouter from "./user/newProduct/newProduct.js";
import editProductRouter from "./user/editProduct/editProduct.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer().array());
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/register", registerRouter);
app.use("/newProduct", newProductRouter);
app.use("/editProduct", editProductRouter);
app.listen(port);

export default app;
