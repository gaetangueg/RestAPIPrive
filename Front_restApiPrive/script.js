// initialize variable
let carsList

fetch("http://localhost:3000/api/cars", {
	method: "GET",
	headers: {
		"x-api-key": "test",
		"Content-Type": "application/json",
		Accept: "application/json",
	},
})
	.then((res) => {
		if (!res.ok) {
			console.log("your API isn't working !!!")
		}
		res.json().then((data) => {
			console.log(data)
			carsList = data // Mise à jour de la liste des voitures avec les données récupérées
			writeDom()  // APRÈS que les données aient été récupérées 
		})
	})
	.catch((error) =>
		console.error("Erreur lors de la récupération des voitures :", error)
	)

function writeDom() {
	carsList.forEach((game) => {
		const articleContainer = document.querySelector(".row")
		articleContainer.innerHTML += `<article class="col">
							<div class="card shadow-sm">
								<img src="${game.carImage}" alt="${game.carName}" class="card-img-top" />

								<div class="card-body">
								<h3 class="card-carName">${game.carName}</h3>
									<p class="card-text">
										${game.carYear}
									</p>
									<div
										class="d-flex justify-content-between align-items-center"
									>
										<div class="btn-group">
											<button
												type="button"
												class="btn btn-sm btn-outline-secondary view"
												data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                data-view-id="${game.id}"
											>
												View
											</button>
											<button
												type="button"
												class="btn btn-sm btn-outline-secondary edit"
												data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                data-edit-id="${game.id}"
											>
												Edit
											</button>
										</div>
									</div>
								</div>
							</div>
						</article>`
	})
}
//writeDom()

//const editButtons = document.querySelectorAll(".edit")
//console.log(editButtons)

/*const editButtons = document.querySelectorAll(".edit")
editButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		console.log("hello edit !!!")
	})
})*/

/*const editButtons = document.querySelectorAll(".edit")
editButtons.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		console.log(e.target.getAttribute("data-edit-id"))
	})
})*/

let editButtons = document.querySelectorAll(".edit")
editButtons.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		editModal(e.target.getAttribute("data-edit-id"))
	})
})

/*function editModal(gameId) {
	// console.log(gameId, carsList)
	// Trouvez le jeu en fonction de son identifiant
	const result = carsList.findIndex((game) => game.id === parseInt(gameId))
	// passer une image comme corps du modal
	const modalBody = `<h4>ajoutez un formulaire pour modifier le jeu ici</h4>`
	modifyModal("Mode Edition", modalBody)
}*/

function modifyModal(modalcarName, modalBody) {
	// Écrire le nom du jeu dans le titre du modal
	document.querySelector(".modal-carName").textContent = modalcarName
	// Écrire dans le corps du modal
	document.querySelector(".modal-body").innerHTML = modalBody
	// Écrire dans le footer
	document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>
		<button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
</form>`
}

let viewButtons = document.querySelectorAll(".view")
viewButtons.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		viewModal(e.target.getAttribute("data-view-id"))
	})
})

function viewModal(gameId) {
	// console.log(gameId, carsList)
	// Trouvez le jeu en fonction de son identifiant
	const result = carsList.findIndex((game) => game.id === parseInt(gameId))
	// passer une image comme corps du modal
	const modalBody = `<img src="${carsList[result].carImage}" alt="${carsList[result].carName}" class="img-fluid" />`
	modifyModal(carsList[result].carName, modalBody)
	// edit footer
	// Écrire dans le footer
	document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>
</form>`
}

/*function editModal(gameId) {
	// console.log(gameId, carsList)
	// Trouvez le jeu en fonction de son identifiant
	const result = carsList.findIndex((game) => game.id === parseInt(gameId))
	modifyModal("Mode Edition")
}*/



function editModal(gameId) {
	// Trouvez le jeu en fonction de son identifiant
	const result = carsList.findIndex((game) => game.id === parseInt(gameId))
	// Injectez le formulaire dans le corps du modal
	fetch("form.html").then((data) => {
		data.text().then((form) => {
			// Modifiez le titre et le corps du modal
			const selectedGame = carsList[result]
			modifyModal("Mode Edition", form)
			modifyFom({
				carName: selectedGame.carName,
				carYear: selectedGame.carYear,
				carImage: selectedGame.carImage,
			})
			document
				.querySelector('button[type="submit"]')
				.addEventListener("click", () =>
					updateGames(carName.value, carYear.value, carImage.value, gameId)
				)
		})
	})
}

function updateGames(carName, carYear, carImage, gameId) {
    // Trouvez le jeu en fonction de son identifiant
    const index = carsList.findIndex((game) => game.id === parseInt(gameId))

    // Mettez à jour les données dans carsList
    carsList[index].carName = carName
    carsList[index].carYear = carYear
    carsList[index].carImage = carImage

    // Supprimez tout le contenu des jeux dans le DOM
    document.querySelector(".row").innerHTML = ""

    // Réécrivez le DOM avec les données mises à jour
    writeDom()

    // Réattachez les gestionnaires d'événements pour les boutons "Edit" et "View"
    const editButtons = document.querySelectorAll(".edit")
    editButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            editModal(e.target.getAttribute("data-edit-id"))
        })
    })

    const viewButtons = document.querySelectorAll(".view")
    viewButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            viewModal(e.target.getAttribute("data-view-id"))
        })
    })
}


function modifyFom(gameData) {
	const form = document.querySelector("form")
	form.carName.value = gameData.carName
	form.carYear.value = gameData.carYear
	form.carImage.value = gameData.carImage
}



