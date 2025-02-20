import Payment from "../models/payments.js";
import rentals from "../models/rentals.js";

const index = (req, res) => {
  Payment.selectPayments((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Tidak ada pembayaran" });

    res.status(200).json(results);
  });
};

const showPayment = (req, res) => {
  const { id } = req.params;

  Payment.selectPaymentById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result) return res.status(404).json({ message: "Pembayaran tidak ditemukan" });

    res.status(200).json(result);
  });
};

const processPayment = async (req, res) => {
  try {
    const { id } = req.params;

    // Update status pembayaran menjadi "paid"
    const updateResult = await new Promise((resolve, reject) => {
      Payment.updatePaymentStatus(id, "PAID", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: "Pembayaran tidak ditemukan" });
    }

    // Ambil data pembayaran setelah diperbarui
    const payment = await new Promise((resolve, reject) => {
      Payment.selectPaymentById(id, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    if (!payment || !payment.rental_id) {
      return res.status(500).json({ message: "Data pembayaran tidak valid" });
    }

    const rental_id = payment.rental_id;

    // Update status rental menjadi "active"
    await new Promise((resolve, reject) => {
      rentals.updateRental(rental_id, "ACTIVE", (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    res.status(200).json({
      message: "Pembayaran berhasil diproses dan status rental diperbarui",
      status: "paid",
    });
  } catch (error) {
    console.error("Error saat memproses pembayaran:", error);
    res.status(500).json({ error: error.message });
  }
};

const destroyPayment = (req, res) => {
  const { id } = req.params;

  Payment.deletePayment(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Pembayaran tidak ditemukan" });

    res.status(200).json({ message: "Pembayaran berhasil dihapus" });
  });
};

export { index, showPayment, processPayment, destroyPayment };
