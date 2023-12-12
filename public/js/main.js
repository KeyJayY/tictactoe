const newGameForm = document.createElement("div");
newGameForm.classList.add("new-game-form");
newGameForm.innerHTML =
	'<form action="/game/create"><input type="text" name="roomname" id="nickname" placeholder="enter your room name"><label for="checkbox">Locked room:</label><input type="checkbox" name="isLocked" id="isLocked"><input type="password" name="password" id="password"><button>create</button></form>';

const joinLockedRoomForm = document.createElement("div");
joinLockedRoomForm.classList.add("join-game-form");
joinLockedRoomForm.innerHTML =
	'<form><input type="password" name="password" id="password" placeholder="enter password"><button class="join">enter</button></form>';

document.querySelector(".bg").addEventListener("click", (e) => {
	document.querySelector("body").removeChild(newGameForm);
	e.target.classList.add("inactive");
});

document.querySelector("#new-room-button").addEventListener("click", () => {
	document.querySelector("body").appendChild(newGameForm);
	document.querySelector(".bg").classList.remove("inactive");
});

document.querySelector("#games-container").addEventListener("click", (e) => {
	if (e.target.tagName == "BUTTON" && e.target.classList.contains("create"))
		window.location.replace(
			document.URL + `game/join?gameID=${e.target.getAttribute("data-id")}`
		);
	e.preventDefault();
});

document.querySelector("#games-container").addEventListener("click", (e) => {
	if (e.target.tagName == "BUTTON" && e.target.classList.contains("join-btn")) {
		joinLockedRoomForm
			.querySelector(".join")
			.setAttribute("data-id", e.target.getAttribute("data-id"));
		document.querySelector("body").appendChild(joinLockedRoomForm);
	}
});

document.querySelector("body").addEventListener("click", (e) => {
	if (e.target.tagName == "BUTTON" && e.target.classList.contains("join")) {
		e.preventDefault();
		window.location.replace(
			document.URL +
				`game/join?gameID=${e.target.getAttribute("data-id")}&password=${
					document.querySelector("#password").value
				}`
		);
	}
});
