// import React from 'react'

import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { Link } from "react-router-dom";

const Car = () => {
  const [cars, setCars] = useState([]);
  const columns = ["model", "brand", "tahun", "warna", "plat_nomor", "harga", "status"];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cars", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();

        const formattedData = result.map((car) => ({
          id: car.id,
          model: car.model,
          brand: car.brand,
          tahun: car.year,
          warna: car.color,
          plat_nomor: car.license_plate,
          harga: car.price_per_day,
          status: car.status,
        }));

        setCars(formattedData);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
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
                    <h4 className="card-title">Data Mobil</h4>
                  </div>
                  <div className="col-md-6">
                    <Link
                      to="/admin/cars/form"
                      className="btn btn-primary btn-round float-end"
                    >
                      <i className="fa fa-plus" /> Tambah Mobil
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <Table
                    columns={columns}
                    data={cars}
                    routeName="cars"
                    actions={["update", "delete"]}
                    onDeleteSuccess={(id) => {
                      setCars((prevCars) =>
                        prevCars.filter((car) => car.id !== id)
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

export default Car;
