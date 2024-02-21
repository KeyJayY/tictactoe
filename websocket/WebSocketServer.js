import url from "url";
import { WebSocketServer } from "ws";
import handleConnect from "../helpers/handleConnectTictactoe.js";

class WsServers {
	constructor(server) {
		this.tictactoeServer = new WebSocketServer({ noServer: true });
		this.menuServer = new WebSocketServer({ noServer: true });

		server.on("upgrade", (req, socket, head) => {
			const pathname = url.parse(req.url).pathname;
			if (pathname === "/tictactoe") {
				handleConnect(req, socket, head, this.tictactoeServer);
			} else if (pathname === "/menu") {
				this.menuServer.handleUpgrade(req, socket, head, (ws) => {
					ws.on;
				});
			} else {
				socket.destroy();
			}
		});
	}
	static getInstance(server) {
		if (!WsServers.instance) WsServers.instance = new WsServers(server);
		return WsServers.instance;
	}
}

export default WsServers;
