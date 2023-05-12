import express from "express";
import sql from "mssql";
import multer from "multer";
import pool from "../../database.pool.js";

export const router = express.Router();
const upload = multer();

let id = -1;

router.put("/", async (req, res) => {
    id = req.body.id;

    try {
        result = await pool.request().input("id", sql.Int, id)
            .query`SELECT * FROM Products WHERE id = @id`;

        res.status(200).send({ result: result.recordset });
    } catch (err) {
        console.log(err);
        res.status(500).send({ err: "Internal server error" });
    }
});

router.put("/", upload.single("image"), async (req, res) => {
    const { name, price, description } = req.body;
    const image = req.file;

    console.log(req.body);

    try {
        await pool
            .request()
            .input("id", sql.Int, id)
            .input("name", sql.VarChar, name)
            .input("description", sql.Text, description.trim())
            .input("image", sql.VarBinary, image.buffer)
            .input("price", sql.Money, price)
            .query`UPDATE Products SET name = @name, description = @description, image = @image, price = @price WHERE id = @id`;

        res.status(200).send({ msg: "successfull" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ err: "Internal server error" });
    }
});

export default router;
