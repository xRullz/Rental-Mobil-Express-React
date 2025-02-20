"use client";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Menggunakan useParams untuk ambil ID dari URL

export default function FormUpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil ID user dari URL
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [status, setStatus] = useState(null);

  // Fetch data user berdasarkan ID
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        if (response.ok) {
          const user = await response.json();
          setFormData({
            name: user.name || "",
            email: user.email || "",
            password: "", // Kosongkan password agar user bisa mengubah atau membiarkannya kosong
            role: user.role || "",
          });
        } else {
          console.error("Gagal mengambil data user");
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    }

    if (id) fetchUserData();
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
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("User berhasil diperbarui!");
        navigate("/admin/users"); // Redirect setelah update sukses
      } else {
        const result = await response.json();
        setStatus(result.message || "Gagal memperbarui user");
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
                <a href="/users">Data User</a>
              </li>
              <li className="separator">
                <i className="icon-arrow-right" />
              </li>
              <li className="nav-item">
                <a href={`/users/edit/${id}`}>Edit User</a>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <h4 className="card-title">Edit User</h4>
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
                      <label>Password (Kosongkan jika tidak ingin diubah)</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
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
