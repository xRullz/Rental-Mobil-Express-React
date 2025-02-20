import { Router } from "express";
import {
  index as indexUser,
  storeUser,
  showUser,
  updateUser,
  destroyUser,
} from "../controllers/userController.js";
import {
  index as indexCar,
  storeCar,
  showCar,
  updateCar,
  destroyCar,
} from "../controllers/carController.js";
import {
  index as indexRental,
  storeRental,
  showRental,
  updateRental,
  destroyRental,
} from "../controllers/rentalController.js";
import {
  index as indexPayment,
  showPayment,
  processPayment,
  destroyPayment,
} from "../controllers/paymentController.js";
import { logout, login } from "../controllers/authController.js";
// impor from "../middleware/authMiddleware.js";

const router = Router();

// Routes untuk User
router.get("/users", indexUser);
router.post("/users", storeUser);
router.get("/users/:id", showUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", destroyUser);

// Routes untuk Car
router.get("/cars", indexCar);
router.post("/cars", storeCar);
router.get("/cars/:id", showCar);
router.put("/cars/:id", updateCar);
router.delete("/cars/:id", destroyCar);

// // Routes untuk Rental
router.get("/rentals", indexRental);
router.post("/rentals", storeRental);
router.get("/rentals/:id", showRental);
router.put("/rentals/:id", updateRental);
router.delete("/rentals/:id", destroyRental);

// // Routes untuk Payment
router.get("/payments", indexPayment);
router.get("/payments/:id", showPayment);
router.put("/payments/:id", processPayment);
router.delete("/payments/:id", destroyPayment);

// Routes untuk Authentication
router.post("/login", login);
router.post("/logout", logout);

export default router;
