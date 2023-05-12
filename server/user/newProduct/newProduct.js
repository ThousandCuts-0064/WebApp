import express from "express";
import sql from "mssql";
import multer from "multer";
import pool from "../../database.pool.js";

const router = express.Router();
const upload = multer();

router.post("/", upload.single("image"), async (req, res) => {
    const { name, price, description } = req.body;
    const image = req.file;

    try {
        await pool
            .request()
            .input("name", sql.VarChar, name)
            .input("description", sql.Text, description.trim())
            .input("image", sql.VarBinary, image.buffer)
            .input("price", sql.Money, price)
            .query`INSERT INTO Products (name, description, image, price) VALUES(@name, @description, @image, @price)`;

        res.status(200).send({ msg: "successfull" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ err: "Internal server erroreeee" });
    }
});

export default router;
