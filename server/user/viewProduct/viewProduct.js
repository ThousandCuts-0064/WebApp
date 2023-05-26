import express from "express";
import sql from "mssql";
import pool from "../../database.pool.js";

export const router = express.Router();

router.post("/", async (req, res) => {
    const id = req.body.id;

    try {
        const result = await pool.request().input("id", sql.Int, id)
            .query`SELECT * FROM Products WHERE id = @id`;

        res.status(200).send({ product: result.recordset[0] });
    } catch (err) {
        console.log(err);
        res.status(500).send({ isSuccess: false });
    }
});

export default router;
