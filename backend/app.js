import express, { json } from "express";
import cors from "cors";
import migration from "./src/migrations/migrations.js";
import routes from "./src/routes/routes.js";

const app = express();
const port = 3000;

(async () => {
  try {
    // await migration();
    app.use(json());

    app.use(cors());


    app.use("/api", routes);

    app.listen(port, () => {
      console.log(`Server berjalan di port ${port}`);
    });
  } catch (error) {
    console.error("Error saat migrasi:", error);
  }
})();
