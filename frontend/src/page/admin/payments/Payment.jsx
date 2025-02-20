import { useEffect, useState } from "react";
import Table from "../../../components/Table";

const Payment = () => {
  const [payments, setPayment] = useState([]);
  const columns = ["nama", "total_harga", "metode_pembayaran", "status"];

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/payments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();

        const formattedData = result.map((payment) => ({
          id: payment.id,
          nama: payment.user_name,
          total_harga: payment.total_price,
          metode_pembayaran: payment.payment_method,
          status: payment.status,
        }));

        setPayment(formattedData);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  // Fungsi untuk mengupdate pembayaran
  const handleUpdatePayment = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin memperbarui pembayaran ini?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/payments/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Gagal memperbarui pembayaran");
        }

        // Update status di state setelah berhasil
        setPayment((prevPayments) =>
          prevPayments.map((payment) =>
            payment.id === id ? { ...payment } : payment
          )
        );

        alert("Pembayaran berhasil diperbarui");
      } catch (error) {
        console.error("Error updating payment:", error);
        alert("Gagal memperbarui pembayaran");
      }
    }
  };

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
              <a href="/payments">Data Pembayaran</a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="card-title">Data Pembayaran</h4>
                  </div>
                </div>
                <div className="card-body">
                  <Table
                    columns={columns}
                    data={payments}
                    routeName="payments"
                    actions={["custom-update"]}
                    onDeleteSuccess={(id) => {
                      setPayment((prevPayments) =>
                        prevPayments.filter((payment) => payment.id !== id)
                      );
                    }}
                    customActions={(id) => (
                      <button
                        className="btn btn-warning btn-sm mx-1"
                        onClick={() => handleUpdatePayment(id)}
                      >
                        Update Pembayaran
                      </button>
                    )}
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

export default Payment;
