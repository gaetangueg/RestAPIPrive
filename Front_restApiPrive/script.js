// initialize variable
let carsList

fetch("http://localhost:3000/api/cars", {
	method: "GET",
	headers: {
		"x-api-key": "secret_phrase_here",
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
		const articleContainer = document.querySelector(".row");
		articleContainer.innerHTML = ""; // Réinitialiser le contenu pour éviter les doublons
	
		carsList.forEach((game) => {
			articleContainer.innerHTML += `
				<article class="col">
					<div class="card shadow-sm">
						<img src="${game.carImage}" alt="${game.carName}" class="card-img-top" />
						<div class="card-body">
							<h3>${game.carName}</h3>
							<p>${game.carYear}</p>
							<div class="btn-group">
								<button type="button" class="btn btn-sm btn-outline-secondary view" 
									data-bs-toggle="modal" data-bs-target="#exampleModal" 
									data-view-id="${game.id}">View</button>
								<button type="button" class="btn btn-sm btn-outline-secondary edit" 
									data-bs-toggle="modal" data-bs-target="#exampleModal" 
									data-edit-id="${game.id}">Edit</button>
							</div>
						</div>
					</div>
				</article>`;
		});
	
		// Réattacher les événements
		attachEventListeners();
	}
	
	function attachEventListeners() {
		document.querySelectorAll(".view").forEach((btn) => {
			btn.addEventListener("click", (e) => viewModal(e.target.dataset.viewId));
		});
	
		document.querySelectorAll(".edit").forEach((btn) => {
			btn.addEventListener("click", (e) => editModal(e.target.dataset.editId));
		});
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

function modifyModal(modalTitle, modalBody) {
    // Écrire le titre dans le header du modal
    document.querySelector("#exampleModalLabel").textContent = modalTitle;

    // Injecter le contenu dans le body du modal
    document.querySelector(".modal-body").innerHTML = modalBody;

    // Injecter les boutons dans le footer du modal
    document.querySelector(".modal-footer").innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Fermer
        </button>
    `;
}

let viewButtons = document.querySelectorAll(".view")
viewButtons.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		viewModal(e.target.getAttribute("data-view-id"))
	})
})

function viewModal(gameId) {
	// Trouvez le jeu en fonction de son identifiant
	fetch(`http://localhost:3000/api/cars/${gameId}`, {
		method: "GET",
		headers: {
			"x-api-key": "secret_phrase_here",
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error("Error with the car with this id")
			}
			res.json().then((data) => {
				console.log(data)
				const selectedCar = data
				// passer une image comme corps du modal
				const modalBody = `<img src="${selectedCar.carImage}" alt="${selectedCar.carName}" class="img-fluid" />`
				modifyModal(selectedCar.carName, modalBody)
				// edit footer
				// Écrire dans le footer
				document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>
</form>`
			})
		})
		.catch((error) =>
			console.error("Erreur lors de la récupération des voitures :", error)
		)
}

/*function editModal(gameId) {
	// console.log(gameId, carsList)
	// Trouvez le jeu en fonction de son identifiant
	const result = carsList.findIndex((game) => game.id === parseInt(gameId))
	modifyModal("Mode Edition")
}*/



function editModal(gameId) {
    fetch(`http://localhost:3000/api/cars/${gameId}`, {
        method: "GET",
        headers: {
            "x-api-key": "secret_phrase_here",
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            fetch("./form.html")
                .then((response) => response.text())
                .then((form) => {
                    modifyModal("Mode Edition", form);

                    // Pré-remplir les champs
                    modifyForm({
                        title: data.carName,
                        year: data.carYear,
                        imageUrl: data.carImage,
                    });

                    // Mettre à jour l'image
                    document.querySelector(".form-img").src = data.carImage;

                    // Ajouter les boutons dans le footer
                    document.querySelector(".modal-footer").innerHTML = `
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        <button type="button" class="btn btn-primary" id="saveChanges">Enregistrer</button>
                    `;

                    // Ajouter l'événement pour "Enregistrer"
                    document
                        .querySelector("#saveChanges")
                        .addEventListener("click", () => {
                            updateGames(
                                document.querySelector("#carName").value,
                                document.querySelector("#carYear").value,
                                document.querySelector("#carImage").value,
                                gameId
                            );
                        });
                });
        })
        .catch((error) => console.error("Erreur :", error));
}





function updateGames(title, year, imageUrl, carId) {
    // Créez un objet contenant les nouvelles données à envoyer
    const formData = {
        carName: title,
        carYear: year,
        carImage: imageUrl,
        id: carId,
    };

    // Envoyez les nouvelles données au backend via PUT
    fetch(`http://localhost:3000/api/cars/${carId}`, {
        method: "PUT",
        headers: {
            "x-api-key": "secret_phrase_here", // Votre clé API
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(formData), // Convertit les données en format JSON
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Erreur lors de la mise à jour des données !");
            }
            return res.json();
        })
        .then((updatedData) => {
            console.log("Données mises à jour avec succès :", updatedData);
            alert("Les modifications ont été enregistrées avec succès !");

            // Fermer le modal après la mise à jour
            const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"));
            modal.hide();

            // Optionnel : Recharger les données pour synchroniser le DOM
            fetchCarsData();
        })
        .catch((error) => {
            console.error("Erreur :", error);
            alert("Une erreur est survenue lors de la mise à jour des données.");
        });
}

function fetchCarsData() {
    fetch("http://localhost:3000/api/cars", {
        method: "GET",
        headers: {
            "x-api-key": "secret_phrase_here",
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            carsList = data; // Mettre à jour les données locales
            writeDom(); // Rafraîchir le DOM
        })
        .catch((error) => console.error("Erreur lors du chargement des données :", error));
}



function modifyForm(gameData) {
    const form = document.querySelector("form");
    form.querySelector("#carName").value = gameData.title;
    form.querySelector("#carYear").value = gameData.year;
    form.querySelector("#carImage").value = gameData.imageUrl;
}






