import express from "express";
import sql from "mssql";
import pool from "../../database.pool.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool
            .request()
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, password)
            .query`SELECT * FROM Users WHERE username = @username AND password = @password`;

        if (result.recordset.length > 0) {
            res.status(404).send({
                isSuccess: false,
                msg: "User already exists",
            });
        } else {
            await pool
                .request()
                .input("username", sql.VarChar, username)
                .input("password", sql.VarChar, password)
                .query`INSERT INTO Users (username, password, isAdmin) VALUES(@username, @password, 0)`;

            res.status(200).send({ isSuccess: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ isSuccess: false });
    }
});

export default router;
