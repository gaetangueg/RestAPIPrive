window.loggedIn = false

function checkLogIn() {
	const token = localStorage.getItem("token")
	const url = "http://localhost:3000/api/users/check"

	if (!token) {
        console.log("Token manquant. Redirection...")
        window.location.replace("./login.html")
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
				//console.log(res)

				throw new Error("Identifiants incorrects")
			}
			return res.json().then((data) => {
				console.log(data)
				loggedIn = true
				//console.log(loggedIn)
				if (window.location.pathname != "/") {
					return (window.location = "/")
				}
				const loggedInBtn = document.querySelector("header")
				const userImg = localStorage.getItem("img")
				loggedInBtn.innerHTML = `
						<a
				href="/"
				class="d-flex align-items-center text-white text-decoration-none text-bg-secondary p-3"
			>
				<span class="fs-4 text-center">Games</span>
			</a>
			<button
				class="d-flex align-items-center text-white text-decoration-none btn p-3 log-out"
			>
				<span class="fs-4 text-center">Log Out</span></button
			>

			<div class="dropdown position-absolute">
				<a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
					<img src="${userImg}" alt="" width="32" height="32" class="rounded-circle me-2">
					<strong>mdo</strong>
				</a>
				<ul class="dropdown-menu dropdown-menu-dark text-small shadow" style="">
					<li><a class="dropdown-item" href="#">New car...</a></li>
					<li><a class="dropdown-item" href="#">Profile</a></li>
					<li><hr class="dropdown-divider"></li>
					<li><button class="dropdown-item log-out">Sign out</button></li>
				</ul>
			</div>
				`

				const logOutBtns = document.querySelectorAll(".log-out")
				logOutBtns.forEach((btn) => {
					btn.addEventListener("click", () => {
						localStorage.removeItem("_id")
						localStorage.removeItem("token")
						window.location.pathname = "./index.html"
					})
				})

				return data
			})
		})
		.catch((error) => {
			console.log(error)
		})
}
