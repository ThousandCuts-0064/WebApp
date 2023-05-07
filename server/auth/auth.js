import express from "express";
import sql from "mssql";
import config from "../database.config.js";

const router = express.Router();

// Create a database connection pool
const pool = new sql.ConnectionPool(config);
pool.connect();

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    try {
        // Query the database using a prepared statement
        const result = await pool
            .request()
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, password)
            .query(
                "SELECT * FROM Users WHERE username = @username AND password = @password"
            );
        if (result.recordset.length === 0) {
            // User not found
            res.status(404).send({ err: "User not found" });
        } else {
            // Send response with user data
            const user = result.recordset[0];
            res.status(200).send({
                exist: true,
                isAdmin: user.isAdmin,
            });
        }
    } catch (err) {
        // Handle errors
        console.log(err);
        res.status(500).send({ err: "Internal server error" });
    }
});

export default router;
