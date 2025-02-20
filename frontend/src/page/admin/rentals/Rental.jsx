// import React from 'react'

import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { Link } from "react-router-dom";

const Rental = () => {
  const [rentals, setRentals] = useState([]);
  const columns = ["nama", "mobil", "tanggal_pinjam", "tanggal_kembali", "total_harga", "status"];

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/rentals", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();

        const formatDate = (dateString) => {
          return new Date(dateString).toLocaleDateString("id-ID"); 
        };
        
        const formattedData = result.map((rentals) => ({
          id: rentals.id,
          nama: rentals.user_name,
          mobil: rentals.car_model,
          tanggal_pinjam: formatDate(rentals.start_date),
          tanggal_kembali: formatDate(rentals.end_date),
          total_harga: rentals.total_price,
          status: rentals.status,
        }));

        setRentals(formattedData);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);

  return (
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
              <a href="/cars">Data Mobil</a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="card-title">Data Transaksi</h4>
                  </div>
                  <div className="col-md-6">
                    <Link
                      to="/admin/rentals/form"
                      className="btn btn-primary btn-round float-end"
                    >
                      <i className="fa fa-plus" /> Tambah Transaksi
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <Table
                    columns={columns}
                    data={rentals}
                    routeName="rentals"
                    actions={["update"]}
                    onDeleteSuccess={(id) => {
                      setRentals((prevRentals) =>
                        prevRentals.filter((rental) => rental.id !== id)
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rental;
