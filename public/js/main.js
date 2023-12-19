const newGameForm = document.createElement("div");
newGameForm.classList.add("new-game-form");
newGameForm.innerHTML =
	'<form action="/game/create"><input type="text" name="roomname" id="nickname" placeholder="enter your room name"><label for="checkbox">Locked room:</label><input type="checkbox" name="isLocked" id="isLocked"><input type="password" name="password" id="password"><button>create</button></form>';

const joinLockedRoomForm = document.createElement("div");
joinLockedRoomForm.classList.add("join-game-form");
joinLockedRoomForm.innerHTML =
	'<form><input type="password" name="password" id="password" placeholder="enter password"><button class="join">enter</button></form>';

const joinGame = (id) => {
	window.location.replace(
		document.URL +
			`game/join?gameID=${id}&password=${
				document.querySelector("#password")?.value
			}`
	);
};

const createGame = (id) => {
	window.location.replace(document.URL + "game/create");
};

document.querySelector(".bg").addEventListener("click", (e) => {
	if (document.querySelector("body").contains(newGameForm))
		document.querySelector("body").removeChild(newGameForm);
	if (document.querySelector("body").contains(joinLockedRoomForm))
		document.querySelector("body").removeChild(joinLockedRoomForm);
	e.target.classList.add("inactive");
});

document.querySelector("#new-room-button").addEventListener("click", () => {
	document.querySelector("body").appendChild(newGameForm);
	document.querySelector(".bg").classList.remove("inactive");
});

document.querySelector("#games-container").addEventListener("click", (e) => {
	e.preventDefault();
	if (e.target.tagName == "BUTTON") {
		if (e.target.classList.contains("join-btn")) {
			if (e.target.classList.contains("locked")) {
				joinLockedRoomForm
					.querySelector(".join")
					.setAttribute("data-id", e.target.getAttribute("data-id"));
				document.querySelector("body").appendChild(joinLockedRoomForm);
				document.querySelector(".bg").classList.remove("inactive");
			} else {
				joinGame(e.target.getAttribute("data-id"));
			}
		} else if (e.target.classList.contains("create"))
			createGame(e.target.getAttribute("data-id"));
	}
});

document.querySelector("body").addEventListener("click", (e) => {
	if (e.target.tagName == "BUTTON" && e.target.classList.contains("join")) {
		e.preventDefault();
		joinGame(e.target.getAttribute("data-id"));
	}
});
