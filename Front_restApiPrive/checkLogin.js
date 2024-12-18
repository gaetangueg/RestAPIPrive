window.loggedIn = false

function checkLogIn() {
    const token = localStorage.getItem("token");
    const userImg = localStorage.getItem("userImg");
    const userName = localStorage.getItem("userName");
    const url = "http://localhost:3000/api/users/check";

    if (!token) {
        console.log("Token manquant. Redirection...");
        window.location.replace("./login.html");
        return;
    }

    fetch(url, {
        method: "POST",
        headers: {
            "x-api-key": "secret_phrase_here",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ msg: "auth" }),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Authentification échouée");
            }
            return res.json();
        })
        .then(() => {
            const header = document.querySelector("header");
            header.innerHTML = `
						 <div class="d-flex justify-content-center gap-4 flex-grow-1">
        <a href="./" class="d-flex align-items-center text-white text-decoration-none text-bg-secondary p-3 rounded">
            <span class="fs-4">Games</span>
        </a>
        <button class="btn btn-link text-white text-decoration-none fs-4 log-out">
            Log Out
        </button>
    </div>

			<div class="dropdown ms-auto">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" 
           data-bs-toggle="dropdown" aria-expanded="false">
            <img src="${userImg}" alt="" width="32" height="32" class="rounded-circle me-2">
            <strong>mdo</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end text-small shadow">
            <li><a class="dropdown-item" href="#">New car...</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="dropdown-item log-out">Sign out</button></li>
        </ul>
    </div>
				`

            // Gestionnaire pour le bouton déconnexion
            document.querySelectorAll(".log-out").forEach((btn) => {
                btn.addEventListener("click", () => {
                    localStorage.clear();
                    window.location.href = "./login.html";
                });
            });
        })
        .catch((error) => {
            console.error(error);
            window.location.replace("./login.html");
        });
}
