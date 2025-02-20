import { createConnection } from "mysql2";
// Load env
import dotenv from "dotenv";
dotenv.config();

const koneksi = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

koneksi.connect((err) => {
    if (err) {
        console.error("Error koneksi ke database:", err.stack);
        return;
    }
    console.log("Berhasil koneksi ke database:", process.env.DB_NAME);
});

export default koneksi;
