const express = require("express")
const usersRouter = express.Router()
const {
	deleteCarById,
	updateCarById,
} = require("../controllers/carsController")
// const { carValidation } = require("../middleware/carValidation")
const {
	getAllUsers,
	getOneUserById,
	signUp,
	logIn,
	checkUserAuth,
	updateUserById,
} = require("../controllers/usersController")
const { userValidation } = require("../middleware/userValidation")
const { checkToken } = require("../middleware/checkToken")

usersRouter.get("/test", (_req, res) => {
	res.json({
		msg: "users route test ok !!",
	})
})

// GET return a list of all users
usersRouter.get("/", getAllUsers)

// GET one car based on its id
usersRouter.get("/:id", getOneUserById)

// POST add a new user (sign up)
usersRouter.post("/signup", userValidation, signUp)

usersRouter.post("/check", checkToken, checkUserAuth)

// POST add a validate user (log in)
usersRouter.post("/login", userValidation, logIn)

// PUT update a car based on the param id
usersRouter.put("/:id", updateUserById)

// DELETE delete a car based on the param id
usersRouter.delete("/:id", deleteCarById)

module.exports = usersRouter