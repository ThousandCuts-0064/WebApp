import express from "express";
import sql from "mssql";
import multer from "multer";
import pool from "../../database.pool.js";

export const router = express.Router();

router.post("/id", async (req, res) => {
    const id = req.body.id;

    try {
        const result = await pool.request().input("id", sql.Int, id)
            .query`SELECT * FROM Products WHERE id = @id`;

        res.status(200).send({ product: result.recordset[0] });
    } catch (err) {
        console.log(err);
        res.status(500).send({ err: "Internal server error" });
    }
});

router.post("/update", multer().single("image"), async (req, res) => {
    const { id, name, price, description } = req.body;
    const image = req.file;

    try {
        const query = pool
            .request()
            .input("id", sql.Int, id)
            .input("name", sql.VarChar, name)
            .input("description", sql.Text, description.trim())
            .input("price", sql.Money, price);

        if (image) {
            query.input("image", sql.VarBinary, image.buffer);
            await query.query`UPDATE Products SET name = @name, description = @description, image = @image, price = @price WHERE id = @id`;
        } else {
            await query.query`UPDATE Products SET name = @name, description = @description, price = @price WHERE id = @id`;
        }

        res.status(200).send({ isSuccess: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({ isSuccess: false });
    }
});

export default router;
