import { RawData, WebSocket } from 'ws';

// map of all connections
export class WebSocketConnectionMap {
	private _connections: Map<string, WebSocket>;

	constructor() {
		this._connections = new Map<string, WebSocket>();
	}

	public addConnection(connectionId: string, connection: WebSocket) {
		this._connections.set(connectionId, connection);
	}

	public removeConnection(connectionId: string) {
		this._connections.delete(connectionId);
	}

	public getConnection(connectionId: string) {
		return this._connections.get(connectionId);
	}
}

export class WebSocketConnection {
	private _connectionId: string;
	private _connection: WebSocket;
	private _isAlive: boolean = true;
	private _TIMEOUT = 30000;


	constructor(uuid: string, webSocket: WebSocket, clients: WebSocketConnectionMap) {
		this._connectionId = uuid;
		this._connection = webSocket;
		this.init(clients);
	}
	
	public init(clients: WebSocketConnectionMap){
		clients.addConnection(this._connectionId, this._connection);
		
		this._connection.on('message', (data: RawData) => {
			const message = JSON.parse(data.toString())

			switch (message.method) {
				case 'join':
					this.handleJoin(message)
					break
				case 'join-cancel':
					this.handleCancel(message)
					break
				case 'play':
					this.handleMove(message)
					break
				case 'play-again':
					this.handlePlayAgain(message)
					break
				case 'play-again-prompt':
					this.handlePlayAgainResponse(message)
					break
				case 'abort-game':
					this.handleAbortGame(message)
					break
				default:
					break
			}
		})
		this._connection.on('close', () => {
			clients.removeConnection(this._connectionId);
		});
		this._connection.on('pong', () => {
			this._isAlive = true;
		});
		setInterval(() => {
			if (!this._isAlive) {
				return this._connection.terminate();
			}
			this._isAlive = false;
			this._connection.ping(() => { });
		}, this._TIMEOUT);
	}

	public send(message: string): void {
		this._connection.send(message);
	}

	/**
	 * Handles join game requests. Checks for existing ready games in the 
	 * readyRandomGames queue if random mode is requested or in the 
	 * readyHostedGames set if hosted mode. Creates a new game if none are found.
	 */
	public handleJoin(message: string): void {
		console.log(message);
	}

	/**
	 * Removes the game from the readyRandomGames or readyHostedGames set 
	 * if joining was canceled by the initiating player.
	 */
	public handleCancel(message: string): void {
		console.log(message);
	}

	/**
	 * Updates the game state and sends the played move to both players.
	 * Checks if the game is over and sends the game over message to both players.
	 */
	public handleMove(message: string): void {
		console.log(message);
	}

	/**
	 * Checks the last rematch request and sends the rematch request to the other player.
	 * If the other player has already requested a rematch, the game is restarted.
	 */
	public handlePlayAgain(message: string): void {
		console.log(message);
	}

	/**
	 * Checks whether the receipient of the rematch request
	 * has accepted or declined the request.
	 */
	public handlePlayAgainResponse(message: string): void {
		console.log(message);
	}

	/**
	 * Sends the abort game message to both players.
	 */
	public handleAbortGame(message: string): void {
		console.log(message);
	}
}
