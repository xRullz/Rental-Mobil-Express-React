import koneksi from "../models/db.js";

const Payment = {
  selectPayments: (callback) => {
    const query =
      "SELECT payments.id, rentals.id AS rental_id, users.id AS user_id, users.name AS user_name, payments.total_price,payments.payment_method, payments.status FROM payments JOIN rentals ON payments.rental_id = rentals.id JOIN users ON rentals.user_id = users.id ";
    koneksi.query(query, callback);
  },

  selectPaymentById: (id, callback) => {
    const query = "SELECT * FROM payments WHERE id = ?";
    koneksi.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  insertPayment: (rental_id, user_id, total_price, payment_method, status, callback) => {
    const query = `INSERT INTO payments (rental_id, user_id, total_price, payment_method, status, created_at)
                       VALUES (?, ?, ?, ?, ?, NOW())`;
    koneksi.query(
      query,
      [rental_id, user_id, total_price, payment_method, status],
      callback
    );
  },

  updatePaymentStatus: (id, status, callback) => {
    const query = "UPDATE payments SET status = ? WHERE id = ?";
    koneksi.query(query, [status, id], callback);
  },

  deletePayment: (id, callback) => {
    const query = "DELETE FROM payments WHERE id = ?";
    koneksi.query(query, [id], callback);
  },
};

export default Payment;
