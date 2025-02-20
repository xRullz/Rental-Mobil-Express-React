import Rental from "../models/rentals.js";
import Car from "../models/cars.js";
import Payment from "../models/payments.js";

const index = (req, res) => {
  Rental.selectRentals((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Belum ada transaksi rental" });
    }
    res.status(200).json(result);
  });
};

const showRental = (req, res) => {
  const { id } = req.params;
  Rental.selectRentalById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }
    res.status(200).json(result[0]);
  });
};

const storeRental = (req, res) => {
  const { user_id, car_id, start_date, end_date, payment_method } = req.body;

  if (!user_id || !car_id || !start_date || !end_date || !payment_method) {
    return res.status(400).json({ message: "Semua data harus diisi" });
  }

  // Cek apakah mobil tersedia
  Car.selectCarById(car_id, (err, car) => {
    if (err) return res.status(500).json({ error: err.message });

    console.log("Data Mobil:", car);

    if (!car || car.status !== "AVAILABLE") {
      return res
        .status(400)
        .json({ message: "Mobil tidak tersedia untuk disewa", carId: car_id });
    }

    // Pastikan `price_per_day` ada dan dalam format angka
    if (!car.price_per_day || isNaN(car.price_per_day)) {
      return res
        .status(500)
        .json({ message: "Harga per hari tidak valid untuk mobil ini", car });
    }

    // Hitung total harga sewa
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const rentalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Konversi milidetik ke hari
    const total_price = Number(rentalDays) * Number(car.price_per_day); // Pastikan total_price angka

    if (isNaN(total_price) || total_price <= 0) {
      return res
        .status(400)
        .json({ message: "Perhitungan total harga tidak valid", rentalDays, car });
    }

    const status = "PENDING";
    // Simpan rental ke database
    Rental.insertRental(
      user_id,
      car_id,
      start_date,
      end_date,
      total_price,
      status,
      (err, rentalResult) => {
        if (err) return res.status(500).json({ error: err.message });

        const rental_id = rentalResult.insertId;

        // Tambahkan pembayaran terkait rental ini
        Payment.insertPayment(
          rental_id,
          user_id,
          total_price,
          payment_method,
          "PENDING",
          (err, paymentResult) => {
            if (err) return res.status(500).json({ error: err.message });

            // Ubah status mobil menjadi "rented"
            Car.updateCarStatus(car_id, "RENTED", (err) => {
              if (err) return res.status(500).json({ error: err.message });
              res.status(201).json({
                message: "Rental dan pembayaran berhasil dibuat",
                rentalId: rental_id,
                paymentId: paymentResult.insertId,
                total_price,
                status: "pending",
              });
            });
          }
        );
      }
    );
  });
};

const updateRental = (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Status bisa "returned"

  Rental.updateRental(id, status, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (status === "COMPLETED") {
      // Jika mobil dikembalikan, ubah status mobil ke "available"
      Rental.selectRentalById(id, (err, rental) => {
        if (err) return res.status(500).json({ error: err.message });

        const car_id = rental.car_id;
        Car.updateCarStatus(car_id, "AVAILABLE", (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res
            .status(200)
            .json({ message: "Rental berhasil diperbarui dan mobil tersedia kembali" });
        });
      });
    } else if (status === "CANCELLED") {
      Rental.selectRentalById(id, (err, rental) => {
        if (err) return res.status(500).json({ error: err.message });

        const car_id = rental.car_id;
        Car.updateCarStatus(car_id, "AVAILABLE", (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res
            .status(200)
            .json({ message: "Rental berhasil diperbarui dan mobil tersedia kembali" });
        });
      });
    } else {
      res.status(200).json({ message: "Rental berhasil diperbarui" });
    }
  });
};

const destroyRental = (req, res) => {
  const { id } = req.params;

  Rental.deleteRental(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Rental berhasil dihapus" });
  });
};

export { index, showRental, storeRental, updateRental, destroyRental };
