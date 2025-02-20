import users from "../models/users.js";
import { compareSync } from "bcryptjs";
import pkg from "jsonwebtoken"; // Mengimpor modul sebagai default
const { sign } = pkg; // Mendestrukturisasi untuk mendapatkan fungsi sign
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

const login = (req, res) => {
  const { email, password } = req.body;

  users.selectUserByEmail(email, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan", data: req.body });
    }

    const user = result[0];
    const passwordValid = compareSync(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = sign({ id: user.id, role: user.role }, secretKey, {
      expiresIn: "1d", // Token berlaku 1 hari
    });

    res.status(200).json({
      auth: true,
      token:token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};

// Logout User
const logout = (req, res) => {
  res.status(200).json({ auth: false, token: null, message: "Logout berhasil" });
};

export { login, logout };
