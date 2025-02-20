import koneksi from "../models/db.js";

const selectCars = (callback) => {
  const q = "SELECT * FROM cars";
  koneksi.query(q, callback);
};

const insertCar = (
  model,
  brand,
  year,
  color,
  license_plate,
  price_per_day,
  status,
  callback
) => {
  const q = `INSERT INTO cars (model, brand, year, color, license_plate, price_per_day, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  koneksi.query(
    q,
    [model, brand, year, color, license_plate, price_per_day, status],
    callback
  );
};

const selectCarById = (id, callback) => {
  const q = "SELECT * FROM cars WHERE id = ?";
  koneksi.query(q, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

const updateCarStatus = (id, status, callback) => {
  const q = "UPDATE cars SET status=? WHERE id=?";
  koneksi.query(q, [status, id], callback);
};

const updateCar = (
  id,
  model,
  brand,
  year,
  color,
  license_plate,
  price_per_day,
  status,
  callback
) => {
  const q =
    "UPDATE cars SET model=?, brand=?, year=?, color=?, license_plate=?, price_per_day=?, status=? WHERE id=?";
  koneksi.query(
    q,
    [model, brand, year, color, license_plate, price_per_day, status, id],
    callback
  );
};

const deleteCar = (id, callback) => {
  const q = "DELETE FROM cars WHERE id = ?";
  koneksi.query(q, [id], callback);
};

export default {
  selectCars,
  insertCar,
  selectCarById,
  updateCar,
  deleteCar,
  updateCarStatus,
};
