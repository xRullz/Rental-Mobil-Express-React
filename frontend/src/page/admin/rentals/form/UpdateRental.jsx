"use client";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Menggunakan useParams untuk ambil ID dari URL

export default function FormUpdateRental() {
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil ID user dari URL
  const [formData, setFormData] = useState({
    car_id: "",
    user_id: "",
    start_date: "",
    end_date: "",
    payment_method: "",
    total_price: "",
    status: "",
  });
  const [status, setStatus] = useState(null);

  // Fetch data user berdasarkan ID
  useEffect(() => {
    async function fetchCarData() {
      try {
        const response = await fetch(`http://localhost:3000/api/rentals/${id}`);
        if (response.ok) {
          const car = await response.json();
          setFormData({
            user_id: car.user_name || "",
            car_id: car.car_model || "",
            start_date: car.start_date || "",
            end_date: car.end_date || "",
            total_price: car.total_price || "",
            payment_method: car.payment_method || "",
            status: car.status || "",
          });
        } else {
          console.error("Gagal mengambil data user");
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    }

    if (id) fetchCarData();
  }, [id]);

  // Handler untuk input perubahan di form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler untuk submit form update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`http://localhost:3000/api/rentals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          status: formData.status,
        },
      });

      if (response.ok) {
        alert("Mobil berhasil diperbarui!");
        navigate("/admin/rentals"); // Redirect setelah update sukses
      } else {
        const result = await response.json();
        setStatus(result.message || "Gagal memperbarui mobil");
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
                <a href={`/users/edit/${id}`}>Edit Transaksi</a>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <h4 className="card-title">Edit Transaksi</h4>
                  </div>
                </div>
                <div className="card-body pt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Penyewa</label>
                          <input
                            name="user_id"
                            type="text"
                            readOnly
                            value={formData.user_id}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Mobil</label>
                          <input
                            name="car_id"
                            type="text"
                            readOnly
                            value={formData.car_id}
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
                          <label>Tanggal Mulai</label>
                          <input
                            name="start_date"
                            readOnly
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
                            readOnly
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
                          <label>Total Harga</label>
                          <input
                            name="total_price"
                            type="text"
                            readOnly
                            value={formData.total_price}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Status</label>
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="form-control"
                            required
                          >
                            <option value="pending">Pending</option>
                            <option value="active">Aktif</option>
                            <option value="completed">Selesai</option>
                            <option value="cancelled">Dibatalkan</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6"></div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3 float-end">
                      {status === "loading" ? "Menyimpan..." : "Simpan Perubahan"}
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
