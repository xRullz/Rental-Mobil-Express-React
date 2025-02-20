import koneksi from "./db.js";
import { hashSync } from "bcryptjs";

const selectUsers = (callback) => {
  const q = "SELECT id, name, email, role FROM users";
  koneksi.query(q, callback);
};

const insertUser = (name, email, password, role, callback) => {
  if (!password) {
    return callback(new Error("Password tidak boleh kosong"));
  }
  // const hashedPassword = hashSync(password, 10);
  const q = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
  koneksi.query(q, [name, email, password, role], callback);
};

const selectUserById = (id, callback) => {
  const q = "SELECT id, name, email, role FROM users WHERE id = ?";
  koneksi.query(q, [id], callback);
};

const updateUser = (id, name, email, password, role, callback) => {
  if (password) {
    const hashedPassword = hashSync(password, 10);
    const q = "UPDATE users SET name=?, email=?, password=?, role=? WHERE id=?";
    koneksi.query(q, [name, email, hashedPassword, role, id], callback);
  } else {
    const q = "UPDATE users SET name=?, email=?, role=? WHERE id=?";
    koneksi.query(q, [name, email, role, id], callback);
  }
};

const deleteUser = (id, callback) => {
  const q = "DELETE FROM users WHERE id = ?";
  koneksi.query(q, [id], callback);
};

const selectUserByEmail = (email, callback) => {
  const q = "SELECT * FROM users WHERE email = ?";
  koneksi.query(q, [email], callback);
};

export default {
  selectUsers,
  insertUser,
  selectUserById,
  updateUser,
  deleteUser,
  selectUserByEmail,
};
