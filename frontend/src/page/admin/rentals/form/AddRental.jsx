"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormRental() {
  const router = useNavigate();
  const [formData, setFormData] = useState({
    car_id: "",
    user_id: "",
    start_date: "",
    end_date: "",
    payment_method: "",
    total_price: "",
  });

  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);

  console.log(formData);

  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/cars");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useState(() => {
    fetchCars();
    fetchUsers();
  }, []);

  const [status, setStatus] = useState(null);

  // Handler untuk input perubahan di form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("http://localhost:3000/api/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Transaksi berhasil ditambahkan!");
        router("/admin/rentals"); // Navigasi setelah sukses
      } else {
        const result = await response.json();
        setStatus(result.message || "Gagal menambahkan transaksi");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Terjadi kesalahan saat mengirim data.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="page-inner">
          <div className="page-header">
            <ul className="breadcrumbs mb-3">
              <li className="nav-home">
                <a href="#">
                  <i className="icon-home" />
                </a>
              </li>
              <li className="separator">
                <i className="icon-arrow-right" />
              </li>
              <li className="nav-item">
                <a href="/users">Data Transaksi</a>
              </li>
              <li className="separator">
                <i className="icon-arrow-right" />
              </li>
              <li className="nav-item">
                <a href="/users">Tambah Transaksi</a>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <h4 className="card-title">Form Transaksi</h4>
                  </div>
                </div>
                <div className="card-body pt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Penyewa</label>
                          <select
                            name="user_id"
                            value={formData.user_id}
                            onChange={handleChange}
                            className="form-control"
                            required
                          >
                            <option value="">Pilih Penyewa</option>
                            {users.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Mobil</label>
                          <select
                            name="car_id"
                            value={formData.car_id}
                            onChange={handleChange}
                            className="form-control"
                            required
                          >
                            <option value="">Pilih Mobil</option>
                            {cars.map((car) => (
                              <option key={car.id} value={car.id}>
                                {car.model}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Tanggal Mulai</label>
                          <input
                            name="start_date"
                            type="date"
                            value={formData.start_date}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Tanggal Selesai</label>
                          <input
                            name="end_date"
                            type="date"
                            value={formData.end_date}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Metode Pembayaran</label>
                          <select
                            name="payment_method"
                            value={formData.payment_method}
                            onChange={handleChange}
                            className="form-control"
                            required
                          >
                            <option value="">Pilih Metode Pembayaran</option>
                            <option value="TUNAI">Tunai</option>
                            <option value="KARTU KREDIT">Kartu Kredit</option>
                            <option value="TRANSFER BANK">Transfer Bank</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3 float-end">
                      {status === "loading" ? "Menyimpan..." : "Simpan"}
                    </button>
                  </form>

                  {status && status !== "loading" && (
                    <p className="mt-2 text-danger">{status}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
