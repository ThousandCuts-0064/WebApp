import sql from "mssql";

const pool = new sql.ConnectionPool({
    server: "localhost",
    user: "admin",
    password: "admin",
    database: "WebAppDB",
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
});
pool.connect();

export default pool;
