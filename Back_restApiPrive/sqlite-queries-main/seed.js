const db = require("./database")
const { generateRandomNumber } = require("./utils/randomUiGenerator")

const carsList = [
	{
		carName: "Toyota Corolla",
		carYear: 2020,
		carImg:
			"https://cdn.motor1.com/images/mgl/wN33Q/s3/2020-toyota-corolla-sedan.jpg",
	},
	{
		carName: "Honda Civic",
		carYear: 2019,
		carImg:
			"https://www.cnet.com/a/img/resize/5ad5ba0e3b30db7b737df5b99ef6096791fd133f/hub/2019/05/20/206ebe75-ceca-4a48-85f9-0ee77584d676/2019-honda-civic-touring-sedan-ogi-1.jpg?auto=webp&fit=crop&height=675&width=1200",
	},
	{
		carName: "Ford Mustang",
		carYear: 2021,
		carImg:
			"https://www.largus.fr/images/styles/max_1300x1300/public/images/ford-mustang-mach-1-10_1.jpg?itok=QOLiO0XE",
	},
	{
		carName: "Chevrolet Camaro",
		carYear: 2022,
		carImg:
			"https://media.ed.edmunds-media.com/chevrolet/camaro/2022/oem/2022_chevrolet_camaro_coupe_2ss_fq_oem_1_600.jpg",
	},
	{
		carName: "Tesla Model 3",
		carYear: 2023,
		carImg:
			"https://cdn.automobile-propre.com/uploads/2023/09/Tesla-Model-3-Highland-2023-01.jpg",
	},
	{
		carName: "BMW 3 Series",
		carYear: 2018,
		carImg:
			"https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2665/",
	},
	{
		carName: "Audi A4",
		carYear: 2020,
		carImg:
			"https://pictures.dealer.com/generic-aoa-OEM_VIN_STOCK_PHOTOS/1fdc73b175148e4c0fa95139efe53c1c.jpg",
	},
]

// Function to insert cars
function insertCars() {
	carsList.forEach((car) => {
		db.run(
			`INSERT INTO cars (id, carName, carYear, carImage) VALUES (?, ?, ?, ?)`,
			[generateRandomNumber(), car.carName, car.carYear, car.carImg],
			(err) => {
				if (err) {
					console.error("Error inserting car:", err.message)
				} else {
					console.log(`Inserted car: ${car.carName} : ${car.carYear}`)
				}
			}
		)
	})
}

const testUsers = [
	{
		firstName: "User",
		lastName: "Test",
		imageUrl: "",
		email: "testOne@test.net",
		items: [1, 2, 3],
	},
	{
		firstName: "User Two",
		lastName: "Test Two",
		imageUrl: "",
		email: "testTwo@test.net",
		items: [4, 5, 6, 7],
	},
]

// Function to insert cars
function insertUsers() {
	testUsers.forEach((user) => {
		const avatarUrl = `https://api.dicebear.com/5.x/pixel-art/png?seed=${encodeURIComponent(
			user.firstName
		)}`
		const jsonString = JSON.stringify(user.items)
		db.run(
			`INSERT INTO users ( id, firstName, lastName, imageUrl, email, items) VALUES ( ?, ?, ?, ?, ?, ?)`,
			[
				generateRandomNumber(),
				user.firstName,
				user.lastName,
				avatarUrl,
				user.email,
				jsonString,
			],
			(err) => {
				if (err) {
					console.error("Error inserting user:", err.message)
				} else {
					console.log(`Inserted user: ${user.firstName} : ${user.lastName}`)
				}
			}
		)
	})
}

// Run the insert function
insertCars()
insertUsers()
