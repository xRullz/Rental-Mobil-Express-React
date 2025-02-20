// import React from 'react'

import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const columns = ["name", "email", "role"];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();

        const formattedData = result.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }));

        setUsers(formattedData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
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
              <a href="/users">Data User</a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="card-title">Data User</h4>
                  </div>
                  <div className="col-md-6">
                    <Link
                      to="/admin/users/form"
                      className="btn btn-primary btn-round float-end"
                    >
                      <i className="fa fa-plus" /> Tambah User
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <Table
                    columns={columns}
                    data={users}
                    routeName="users"
                    actions={["update", "delete"]}
                    onDeleteSuccess={(id) => {
                      setUsers((prevUsers) =>
                        prevUsers.filter((user) => user.id !== id)
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

export default User;
