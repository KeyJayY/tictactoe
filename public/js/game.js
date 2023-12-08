const parseCookies = () => {
	const cookies = document.cookie.split(";").reduce((acc, cookie) => {
		const [name, value] = cookie.trim().split("=");
		acc[name] = value;
		return acc;
	}, {});
	return cookies;
};

const createX = () => {
	const elem = document.createElement("div");
	elem.classList.add("x");
	elem.innerHTML =
		'<div class="line line-1"></div><div class="line line-2"></div>';
	return elem;
};

const createO = () => {
	const elem = document.createElement("div");
	elem.classList.add("o");
	elem.innerHTML = '<div class="circle"></div>';
	return elem;
};

const colorWinningLine = (set) => {
	set.forEach((elem) => {
		document.querySelector(`#tile${elem + 1}`).style.backgroundColor = "green";
	});
};

const gameID = parseCookies().gameID;

ws = new WebSocket(`ws://localhost:3000?gameID=${gameID}`);

ws.addEventListener("message", (mes) => {
	const message = JSON.parse(mes.data);
	console.log(message);
	if (message.action == "changeTiles") {
		document
			.querySelector(`#tile${message.data.tile}`)
			.appendChild(message.data.symbol == "x" ? createX() : createO());
	} else if (message.action == "finishGame") {
		document.querySelector("h1").innerText = `You ${message.result}!`;
		colorWinningLine(message.winningSet);
	}
});

document.querySelector("#board").addEventListener("click", (e) => {
	if (e.target.classList.contains("tile")) {
		ws.send(
			JSON.stringify({
				gameID: gameID,
				action: "makeMove",
				move: { tile: parseInt(e.target.getAttribute("id")[4]), symbol: "x" },
			})
		);
	}
});