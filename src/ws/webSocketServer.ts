import { Server, WebSocket } from 'ws';
import * as http from 'http';
import { WebSocketConnection, WebSocketConnectionMap } from './webSocketConnection';
import { v4 as uuidv4 } from 'uuid';

export const clients = new WebSocketConnectionMap();

export class webSocketServer {
	private _webSocketServer: Server<WebSocket>;

	constructor(server: http.Server) {
		this._webSocketServer = new Server({ server: server, path: '/game' });
		this.init();
	}

	public init() {
		this._webSocketServer.on('connection', (webSocket: WebSocket) => {
			const uuid = uuidv4();
			const connection = new WebSocketConnection(uuid, webSocket, clients);
			connection.send(JSON.stringify({ method: 'connect', clientId: uuid }))
		});
	}
}
