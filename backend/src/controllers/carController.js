import cars from "../models/cars.js";

const index = (req, res) => {
    cars.selectCars((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Mobil tidak ditemukan" });
        }
        res.status(200).json(result);
    });
};

const storeCar = (req, res) => {
    const { model, brand, year, color, license_plate, price_per_day, status } = req.body;

    cars.insertCar(model, brand, year, color, license_plate, price_per_day, status, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message, data: req.body });
        }
        res.status(201).json({
            message: "Mobil berhasil ditambahkan",
            carId: result.insertId
        });
    });
};

const showCar = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: "ID harus berupa angka" });
    }

    cars.selectCarById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        console.log("Hasil Query:", result); // Debugging

        if (!result) {
            return res.status(404).json({ message: "Mobil tidak ditemukan" });
        }
        res.status(200).json(result);
    });
};


const updateCar = (req, res) => {
    const { id } = req.params;
    const { model, brand, year, color, license_plate, price_per_day, status, } = req.body;

    cars.updateCar(id, model, brand, year, color, license_plate, price_per_day, status, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Data mobil berhasil diperbarui" });
    });
};

const destroyCar = (req, res) => {
    const { id } = req.params;

    cars.deleteCar(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Mobil berhasil dihapus" });
    });
};

export { index, storeCar, showCar, updateCar, destroyCar };
