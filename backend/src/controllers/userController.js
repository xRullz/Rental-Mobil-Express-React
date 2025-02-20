import { default as users } from "../models/users.js";
import { hashSync } from "bcryptjs";

// Get All Users
const index = (req, res) => {
  users.selectUsers((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Belum ada user terdaftar" });
    }
    res.status(200).json(result);
  });
};

// Create New User
const storeUser = (req, res) => {
  const { name, email, password, role } = req.body;

  // Hash password sebelum menyimpan
  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password harus minimal 6 karakter" });
  }

  const hashedPassword = hashSync(password, 10);

  users.insertUser(name, email, hashedPassword, role, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: "User berhasil ditambahkan",
      dara: result.insertId,
    });
  });
};

// Get Single User by ID
const showUser = (req, res) => {
  const { id } = req.params;

  users.selectUserById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    res.status(200).json(result[0]);
  });
};

// Update User Data
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  let hashedPassword = password ? hashSync(password, 8) : null;

  users.updateUser(id, name, email, hashedPassword, role, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Data user berhasil diperbarui" });
  });
};

// Delete User
const destroyUser = (req, res) => {
  const { id } = req.params;

  users.deleteUser(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "User berhasil dihapus" });
  });
};

export { index, storeUser, showUser, updateUser, destroyUser };
