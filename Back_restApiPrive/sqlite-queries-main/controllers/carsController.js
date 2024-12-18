const db = require("../database")

// GET all cars from the database
exports.getAllCars = (_req, res) => {
	db.all("SELECT * FROM cars", [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message })
		} else {
			res.json(rows)
		}
	})
}

// GET one car based on its ID
exports.getOneCarById = (req, res) => {
	const { id } = req.params
	// find the car with this ID,
	db.get("SELECT * FROM cars WHERE id = ?", [parseInt(id)], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message })
		} else {
			if (!rows) {
				return res
					.status(404)
					.json({ error: "car not found with this ID: " + id })
			} else {
				return res.status(200).json(rows)
			}
		}
	})
}

// POST create a new car
exports.createNewCar = (req, res) => {
	const { carName, carYear, carImage } = req.body

	// Lancez la requête pour ajouter des voitures à la base de données.
	db.run(
		"INSERT INTO cars (carName,carYear, carImage ) VALUES (?, ?, ?)",
		[carName, carYear, carImage],
		function (err) {
			if (err) {
				res.status(500).json({ error: err.message })
			} else {
				res.status(201).json({ id: this.lastID, carName })
			}
		}
	)
}

exports.updateCarById = (req, res) => {
	const carId = req.params.id
	const carDetails = req.body

	// Attempt to find the car with this ID
	db.get("SELECT * FROM cars WHERE id = ?", [parseInt(carId)], (err, car) => {
		if (err) {
			return res.status(500).json({ error: err.message })
		}

		if (!car) {
			return res
				.status(404)
				.json({ error: `Car not found with this ID: ${carId}` })
		}

		// List of fields that can be updated
		const updatableFields = ["carName", "carYear", "carImage"]

		// Filter and build the new car data
		const newCarsData = { ...car }

		updatableFields.forEach((field) => {
			if (carDetails[field] !== undefined) {
				newCarsData[field] = carDetails[field]
			}
		})

		// Generate the SET clause for the SQL query dynamically
		const updates = Object.keys(newCarsData)
			.filter((key) => key !== "id") // Exclude the ID field
			.map((key) => `${key} = ?`)
			.join(", ")

		const values = Object.keys(newCarsData)
			.filter((key) => key !== "id")
			.map((key) => newCarsData[key])

		// Execute the update query
		db.run(
			`UPDATE cars SET ${updates} WHERE id = ?`,
			[...values, carId],
			(updateErr) => {
				if (updateErr) {
					return res.status(500).json({ error: updateErr.message })
				}

				res.status(200).json({
					message: "Car updated successfully!",
					updatedCar: newCarsData,
				})
			}
		)
	})
}

// DELETE car based on its ID
exports.deleteCarById = (req, res) => {
	const { id } = req.params

	// run the query
	db.run("DELETE FROM cars WHERE id = ?", [id], function (err) {
		if (err) {
			res.status(500).json({ error: err.message })
		} else if (this.changes === 0) {
			// if nothing found
			res.status(404).json({ message: "Car not found" })
		} else {
			// is successful
			res.status(200).json({ message: "Car deleted !" })
		}
	})
}