"use client";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Menggunakan useParams untuk ambil ID dari URL

export default function FormUpdateCar() {
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil ID user dari URL
  const [formData, setFormData] = useState({
    model: "",
    brand: "",
    year: 0,
    color: "",
    license_plate: "",
    price_per_day: 0,
    status: "",
  });
  const [status, setStatus] = useState(null);

  // Fetch data user berdasarkan ID
  useEffect(() => {
    async function fetchCarData() {
      try {
        const response = await fetch(`http://localhost:3000/api/cars/${id}`);
        if (response.ok) {
          const car = await response.json();
          setFormData({
            model: car.model || "",
            brand: car.brand || "",
            year: car.year || 0,
            color: car.color || "",
            license_plate: car.license_plate || "",
            price_per_day: car.price_per_day || 0,
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
      const response = await fetch(`http://localhost:3000/api/cars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Mobil berhasil diperbarui!");
        navigate("/admin/cars"); // Redirect setelah update sukses
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
                <a href="/users">Data Mobil</a>
              </li>
              <li className="separator">
                <i className="icon-arrow-right" />
              </li>
              <li className="nav-item">
                <a href={`/users/edit/${id}`}>Edit Mobil</a>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <h4 className="card-title">Edit Mobil</h4>
                  </div>
                </div>
                <div className="card-body pt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Model</label>
                          <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Brand</label>
                          <input
                            name="brand"
                            value={formData.brand}
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
                          <label>Tahun</label>
                          <input
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Warna</label>
                          <input
                            name="color"
                            value={formData.color}
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
                          <label>Plat Nomor</label>
                          <input
                            name="license_plate"
                            value={formData.license_plate}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Harga Per Hari</label>
                          <input
                            name="price_per_day"
                            type="number"
                            value={formData.price_per_day}
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
                          <label>Status</label>
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="form-control"
                            required
                          >
                            <option value="">Pilih Status</option>
                            <option value="available">Available</option>
                            <option value="rented">Rented</option>
                          </select>
                        </div>
                      </div>
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
