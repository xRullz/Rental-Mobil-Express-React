import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./page/admin/Dashboard";
import User from "./page/admin/user/User";
import FormUser from "./page/admin/user/form/AddUser";
import FormUpdateUser from "./page/admin/user/form/UpdateUser";
import Car from "./page/admin/car/Car";
import FormCar from "./page/admin/car/form/AddCar";
import FormUpdateCar from "./page/admin/car/form/UpdateCar";
import Rental from "./page/admin/rentals/Rental";
import FormRental from "./page/admin/rentals/form/AddRental";
import FormUpdateRental from "./page/admin/rentals/form/UpdateRental";
import Payment from "./page/admin/payments/Payment";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<User />} />
            <Route path="users/form" element={<FormUser />} />
            <Route path="users/form/:id" element={<FormUpdateUser />} />
            <Route path="cars" element={<Car />} />
            <Route path="cars/form" element={<FormCar />} />
            <Route path="cars/form/:id" element={<FormUpdateCar />} />
            <Route path="rentals" element={<Rental />} />
            <Route path="rentals/form" element={<FormRental />} />
            <Route path="rentals/form/:id" element={<FormUpdateRental />} />
            <Route path="payments" element={<Payment />} />

          </Route>
          <Route path="/" element={<Layout />}>
            {/* <Route path="/" element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
