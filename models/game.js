import checkIfWin from "../helpers/checkIfWin.js";

export default class Game {
	constructor(ws, roomname) {
		this.roomname = roomname;
		this.player1 = { socket: ws, symbol: "x" };
		this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		ws.player = 1;
	}
	joinAndStart(ws) {
		this.player2 = { socket: ws, symbol: "o" };
		this.turn = Math.floor(Math.random() * 2) + 1;
		ws.player = 2;
	}
	move(tile) {
		this.board[tile - 1] = this[`player${this.turn}`].symbol;
		const message = {
			action: "changeTiles",
			data: {
				tile: tile,
				symbol: this[`player${this.turn}`].symbol,
				turn: this.turn == 1 ? "Opponent's" : "Your",
			},
		};
		this.player1.socket.send(JSON.stringify(message));
		message.data.turn = this.turn == 1 ? "Your" : "Oppenent's";
		this.player2.socket.send(JSON.stringify(message));
		this.turn = this.turn == 1 ? 2 : 1;
		const winningSet = checkIfWin(this.board);
		if (winningSet) {
			this[`player${this.turn == 1 ? 2 : 1}`].socket.send(
				JSON.stringify({
					action: "finishGame",
					result: "won",
					winningSet: winningSet,
				})
			);
			this[`player${this.turn}`].socket.send(
				JSON.stringify({
					action: "finishGame",
					result: "loose",
					winningSet: winningSet,
				})
			);
			this.turn = 0;
		}
	}
}
