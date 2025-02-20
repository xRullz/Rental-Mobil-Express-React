import koneksi from "../models/db.js";

const selectRentals = (callback) => {
  const q = `SELECT rentals.id, users.name AS user_name, cars.model AS car_model, rentals.start_date, rentals.end_date, rentals.total_price, rentals.status
               FROM rentals 
               JOIN users ON rentals.user_id = users.id
               JOIN cars ON rentals.car_id = cars.id`;
  koneksi.query(q, callback);
};

const insertRental = (
  user_id,
  car_id,
  start_date,
  end_date,
  total_price,
  status,
  callback
) => {
  const q = `INSERT INTO rentals (user_id, car_id, start_date, end_date, total_price, status) VALUES (?, ?, ?, ?, ?, ?)`;
  koneksi.query(
    q,
    [user_id, car_id, start_date, end_date, total_price, status],
    callback
  );
};

const selectRentalById = (id, callback) => {
  const q = `SELECT rentals.id, users.id AS user_id, cars.id AS car_id, users.name AS user_name, cars.model AS car_model, rentals.start_date, rentals.end_date, rentals.total_price, rentals.status
  FROM rentals 
  JOIN users ON rentals.user_id = users.id 
  JOIN cars ON rentals.car_id = cars.id 
  WHERE rentals.id = ?`;
  koneksi.query(q, [id], callback);
};

const updateRental = (id, status, callback) => {
  const q = "UPDATE rentals SET status=? WHERE id=?";
  koneksi.query(q, [status, id], callback);
};

const deleteRental = (id, callback) => {
  const q = "DELETE FROM rentals WHERE id = ?";
  koneksi.query(q, [id], callback);
};

export default {
  selectRentals,
  insertRental,
  selectRentalById,
  updateRental,
  deleteRental,
};
