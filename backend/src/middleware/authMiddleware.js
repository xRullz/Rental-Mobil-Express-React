import pkg from "jsonwebtoken"; // Mengimpor modul sebagai default
const { verify } = pkg;
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.JWT_SECRET;

const authJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Akses ditolak, token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1];

  verify(token, secretKey, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token kedaluwarsa, silakan login kembali" });
      }
      return res.status(403).json({ message: "Token tidak valid" });
    }

    req.user = user;
    next();
  });
};

export default authJwt;
