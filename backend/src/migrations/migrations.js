import { createConnection } from "mysql2";
import koneksi from "../models/db.js";

const konekMysql = createConnection({
  host: "localhost",
  user: "rull",
  password: "rull",
});

// Membuat database jika belum ada
const createDatabase = () => {
  return new Promise((resolve, reject) => {
    konekMysql.query("CREATE DATABASE IF NOT EXISTS rentalmobil", (err, result) => {
      if (err) {
        console.error("Error membuat database", err.stack);
        reject(err);
      } else {
        console.log("Database berhasil dibuat atau sudah ada.");
        resolve();
      }
    });
  });
};

// Membuat tabel users
const createUserTable = () => {
  const q = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'customer') DEFAULT 'customer',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`;

    
  koneksi.query(q, (err, result) => {
    if (err) {
      console.error("Error membuat tabel users", err.stack);
    } else {
      console.log("Tabel users berhasil dibuat.");
    }
  });
};

const createCarTable = () => {
  const q = `CREATE TABLE IF NOT EXISTS cars (
        id INT AUTO_INCREMENT PRIMARY KEY,
        model VARCHAR(100) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        year INT NOT NULL,
        color VARCHAR(50),
        license_plate VARCHAR(20) UNIQUE NOT NULL,
        price_per_day BIGINT NOT NULL,
        status ENUM('AVAILABLE', 'RENTED') DEFAULT 'AVAILABLE',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`;

  koneksi.query(q, (err, result) => {
    if (err) {
      console.error("Error membuat tabel cars", err.stack);
    } else {
      console.log("Tabel cars berhasil dibuat.");
    }
  });
};

const createRentalTable = () => {
  const q = `CREATE TABLE IF NOT EXISTS rentals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        car_id INT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        total_price BIGINT NOT NULL,
        status ENUM('PENDING', 'ACTIVE' ,'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
    )`;

  koneksi.query(q, (err, result) => {
    if (err) {
      console.error("Error membuat tabel rentals", err.stack);
    } else {
      console.log("Tabel rentals berhasil dibuat.");
    }
  });
};

const createPaymentTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rental_id INT NOT NULL,
        user_id INT NOT NULL,
        total_price BIGINT NOT NULL,
        payment_method ENUM('TUNAI', 'KARTU KREDIT', 'TRANSFER BANK') NOT NULL,
        status ENUM('PENDING', 'PAID', 'FAILED') DEFAULT 'PENDING',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (rental_id) REFERENCES rentals(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`;

  koneksi.query(query, (err) => {
    if (err) console.error("Error membuat tabel payments", err.stack);
    else console.log("Tabel payments berhasil dibuat.");
  });
};

const dropTable = (tableName) => {
  const query = `DROP TABLE IF EXISTS ${tableName};`;
  koneksi.query(query, (err) => {
    if (err) console.error(`Error menghapus tabel ${tableName}`, err.stack);
    else console.log(`Tabel ${tableName} berhasil dihapus.`);
  });
};

const migration = async () => {
  dropTable("payments");
  dropTable("rentals");
  dropTable("cars");
  // dropTable("users");
  try {
    await createDatabase();
    createUserTable();
    createCarTable();
    createRentalTable();
    createPaymentTable();
    konekMysql.end();
  } catch (error) {
    console.error("Error dalam migrasi:", error);
  }
};

export default migration;
