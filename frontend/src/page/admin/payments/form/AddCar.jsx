"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormCar() {
  const router = useNavigate();
  const [formData, setFormData] = useState({
    model: "",
    brand: "",
    year: "",
    color: "",
    license_plate: "",
    price_per_day: "",
    status: "",
  });

  console.log(formData);

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
      const response = await fetch("http://localhost:3000/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Mobil berhasil ditambahkan!");
        router("/admin/cars"); // Navigasi setelah sukses
      } else {
        const result = await response.json();
        setStatus(result.message || "Gagal menambahkan mobil");
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
                <a href="/users">Tambah Mobil</a>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <h4 className="card-title">Form Mobil</h4>
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
