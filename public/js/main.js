const newGameForm = document.createElement("div");
newGameForm.classList.add("new-game-form");
newGameForm.innerHTML =
	'<form action="/game/create"><input type="text" name="username" id="nickname" placeholder="enter your nick name"><button>create</button></form>';

document.querySelector(".bg").addEventListener("click", (e) => {
	document.querySelector("body").removeChild(newGameForm);
	e.target.classList.add("inactive");
});

document.querySelector("#new-room-button").addEventListener("click", () => {
	document.querySelector("body").appendChild(newGameForm);
	document.querySelector(".bg").classList.remove("inactive");
});

document.querySelector("#games-container").addEventListener("click", (e) => {
	if (e.target.tagName == "BUTTON")
		window.location.replace(
			document.URL + `game/join?gameID=${e.target.getAttribute("data-id")}`
		);
	e.preventDefault();
});
