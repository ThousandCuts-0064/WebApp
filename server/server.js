import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./user/user.js";
import registerRouter from "./register/register.js";
import authRouter from "./auth/auth.js";
import editRouter from "./edit/edit.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/register", registerRouter);
app.use("/edit", editRouter);
app.listen(port);

export default app;
