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

const cookies = parseCookies();
const gameID = cookies.gameID;
const roomname = cookies.roomname;
const password = cookies.password || "";

ws = new WebSocket(
	`ws://${window.location.hostname}?gameID=${gameID}&roomname=${roomname}&password=${password}`
);

ws.addEventListener("message", (mes) => {
	const message = JSON.parse(mes.data);
	if (message.action == "changeTiles") {
		document
			.querySelector(`#tile${message.data.tile}`)
			.appendChild(message.data.symbol == "x" ? createX() : createO());
		document.querySelector("h1").innerHTML = message.data.turn + " Turn";
	} else if (message.action == "finishGame") {
		document.querySelector("h1").innerText = `You ${message.result}!`;
		colorWinningLine(message.winningSet);
	} else if (message.action == "abortGame") {
		document.querySelector("h1").innerText = "Your opponent left the game";
		ws.close();
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

window.addEventListener("beforeunload", () => {
	for (i in cookies)
		document.cookie = i + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	ws.send(
		JSON.stringify({
			gameID: gameID,
			action: "abortGame",
		})
	);
});
