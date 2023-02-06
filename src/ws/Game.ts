import { WebSocketConnectionMap } from "./webSocketConnection";

export default class Game {
    private _gameId: string;
    private _mode: string;
    private _players: string[] = [];
    private _gameOver: boolean = false;
    private _rematchTime: number = 0;
    private _cells: { [key: string]: string } = 
        { c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', c7: '', c8: '', c9: '' };

    constructor(gameId: string, mode: string,players?: string[]) {
        this._gameId = gameId;
        this._mode = mode;
        this._players = players;
    }

    // getPlayers
    public getPlayers(): string[] {
        return this._players;
    }

    // getCells
    public getCells(): { [key: string]: string } {
        return this._cells;
    }

    // getRematchTime
    public getRematchTime(): number {
        return this._rematchTime;
    }
    
    // SetRematchTime
    public setRematchTime(time: number): void {
        this._rematchTime = time;
    }

    // flushGameState
    public flushState(): void {
        this._cells = { c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', c7: '', c8: '', c9: '' };
        // this._gameOver = false;
    }

    /**
     * 
     * Check if the most recent move resulted in a win. Evaluate all possible win conditions and return the winning cells.
     * @param recentMove
     */
    public checkWin(recentMove: string) {
        const { c1, c2, c3, c4, c5, c6, c7, c8, c9 } = this._cells;

        const winConditions = [
            [c1, c2, c3],[c4, c5, c6],[c7, c8, c9], // rows
            [c1, c4, c7],[c2, c5, c8],[c3, c6, c9], // columns
            [c1, c5, c9],[c3, c5, c7]               // diagonals
        ];

        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            // skip this win condition if any of the cells are empty
            if (a === '' || b === '' || c === '') {
                continue;
            }
            // check if all cells are equal
            if (a === b && b === c && c === recentMove) {
                // get indexes of the winningCells 
                const winningCells = Object.keys(this._cells).filter(key => winConditions[i].includes(this._cells[key]));
                // call endGame
                return this.endGame(recentMove, winningCells);
            }
            
            // check if all cells are filled and declare a draw
            if (Object.values(this._cells).every(cell => cell !== '')) {
                // call endGame
                return this.endGame();
            }
        }
    }

    /**
     *  End the game and broadcast the result to all players
     * @param winningSymbol
     * @param winningCells
     */
    public endGame(winningSymbol: string = 'D', winningCells: string[] = []): void {
        // construct end game broadcast message
        const payload = {
            method: 'end',
            message: winningSymbol === 'D' ? 'match draw' : `Player ${winningSymbol} won`,
            gameId: this._gameId,
            symbol: winningSymbol,
            cells: winningCells ? winningCells : []
        }

        // send end game message to all players in game
        this._players.forEach( async(player) => {
            let connection = await WebSocketConnectionMap.getConnection(player);
            connection.send(JSON.stringify(payload));
        })
    }
}