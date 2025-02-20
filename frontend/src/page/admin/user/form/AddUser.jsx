"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";
import Footer from "../../../../components/Footer";

export default function FormUser() {
  const router = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
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
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("User berhasil ditambahkan!");
        router("/admin/users"); // Navigasi setelah sukses
      } else {
        const result = await response.json();
        setStatus(result.message || "Gagal menambahkan user");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Terjadi kesalahan saat mengirim data.");
    }
  };

  return (
    <>
      <Sidebar />
      <Header />
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
                <a href="/users">Data User</a>
              </li>
              <li className="separator">
                <i className="icon-arrow-right" />
              </li>
              <li className="nav-item">
                <a href="/users">Tambah User</a>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <h4 className="card-title">Form User</h4>
                  </div>
                </div>
                <div className="card-body pt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Role</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Pilih Role</option>
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                      </select>
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
      <Footer />
    </>
  );
}
