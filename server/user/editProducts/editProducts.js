import express from "express";
import sql from "mssql";
import pool from "../../database.pool.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await pool.request().query`SELECT * FROM Products`;
        if (result.recordset.length === 0) {
            res.status(404).send({ err: "Products not found" });
        } else {
            res.status(200).send({ result: result.recordset });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ err: "Internal server error" });
    }
});

export default router;
