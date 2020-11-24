const board = [ [], [], [], [], [], [], [], [] ];

class Piece {
    constructor (board, color, x, y) {
        this.color = color;
        board[x][y] = this;
    }

    getMoves (board, x, y) {
        const moves = [];
        this.directions.forEach( ([k1, k2]) => {
            for(let i = 1; i <= this.range; i++) {
                const x1 = x + k1 * i;
                const y1 = y + k2 * i;
                if (x1 < 0 || x1 > 7 || y1 < 0 || y1 > 7) {
                    break;
                }

                const PieceOnNextSquare = board[x1][y1];
                if (PieceOnNextSquare) {
                    if (PieceOnNextSquare.color != this.color) {
                        moves.push([x1, y1]);
                    }
                    break;
                }
                moves.push([x1, y1]);
            }
        });
        return moves;
    }
}

class Rook extends Piece {
    constructor (...args) {
        super(...args);
        this.type = 'rook';
        this.range = 7;
        this.directions = [ [1, 0], [0, -1], [-1, 0], [0, 1] ];
    }
}

class Knight extends Piece {
    constructor (...args) {
        super(...args);
        this.type = 'knight';
        this.range = 1;
        this.directions = [ [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1] ];
    }
}

class Bishop extends Piece {
    constructor (...args) {
        super(...args);
        this.type = 'bishop';
        this.range = 7;
        this.directions = [ [1, -1], [-1, -1], [-1, 1], [1, 1] ];
    }
}

class Queen extends Piece {
    constructor (...args) {
        super(...args);
        this.type = 'queen';
        this.range = 7;
        this.directions = [ [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1] ];
    }
}

class King extends Piece {
    constructor (...args) {
        super(...args);
        this.type = 'king';
        this.range = 1;
        this.directions = [ [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1] ];
    }
}

class Pawn extends Piece {
    constructor (...args) {
        super(...args);
        this.type = 'pawn';
        this.canMakePromotion = true;
    }

    getMoves (board, x, y) {
        const i = this.color == 'white' ? 1 : -1;
        const moves = [];

        if (!board[x][y + i]) {
            moves.push([x, y + i]);
        }
        if ((y == 1 && this.color == 'white') || (y == 6 && this.color == 'black')) {
            if (!board[x][y + i] || !board[x][y + i * 2]) {
                moves.push([x, y + i * 2]);
            } 
        }

        const leftAttackedPiece = board[x - 1][y + i];
        const rightAttackedPiece = board[x + 1][y + i];

        if (leftAttackedPiece && leftAttackedPiece.color != this.color) {
            moves.push([x + 1, y + i]);
        }

        if (rightAttackedPiece && rightAttackedPiece.color != this.color) {
            moves.push([x - 1, y + i]);
        }

        return moves;
    }
}

class Game {
    constructor () {
        this.gameState = 'Game continues';
        this.activeSide = 'white';
        this.activeSquare = null;
        this.activePiece = null;
        this.movesHistory = [];    //[{side: , piece: , startSquare: , endSquare: , capturedPiece: ]
    }

    choosePiece (x, y) {
        if (board[x][y].color == this.activeSide) {
            this.activeSquare = [x, y];
            this.activePiece = board[x][y];
            return this.activePiece;
        }
    }

    cancelChoice () {
        this.activeSquare = null;
        this.activePiece = null;
    }

    getPossibleMoves () {
        return this.activePiece.getMoves(board, ...this.activeSquare);      
    }

    makeMove (x1, y1) {
        if (!this.getPossibleMoves().find(([x, y]) => x == x1 && y == y1)) {
            return 'wrong move!';
        }

        this.movesHistory.push({
            side: this.activeSide,
            piece: this.activePiece.type,
            startSquare: this.activeSquare,
            endSquare: [x1, y1],
            capturedPiece: board[x1][y1] ? board[x1][y1] : null
        });
        const [x0, y0] = this.activeSquare;
        board[x0][y0] = null;
        board[x1][y1] = this.activePiece;
        this.activeSquare = null;
        this.activePiece = null;
        this.activeSide = this.activeSide == 'white' ? 'black' : 'white';
    }

    makePromotion (newPiece) {
        if (this.activePiece.canMakePromotion) {
            if ((this.activeSide == 'white' && this.activeSquare[1] == 7) ||
            (this.activeSide == 'black' && this.activeSquare[1] == 0)) {
                const [x, y] = this.activeSquare;
                switch(newPiece) {
                    case 'queen':
                        new Queen(board, this.activeSide, x, y);
                        break;
                    case 'bishop':
                        new Bishop(board, this.activeSide, x, y);
                        break;
                    case 'knight':
                        new Knight(board, this.activeSide, x, y);
                        break;
                    case 'rook':
                        new Rook(board, this.activeSide, x, y);
                        break;
                }
                this.makeMove(x, y);
            }
        }
    }
}

const whiteRook = new Rook(board, 'white', 0, 0);
const blackPawn = new Pawn(board, 'black', 2, 6);
const game = new Game();

game.choosePiece(0, 0);
game.makeMove(2, 0);
game.choosePiece(2, 6);
game.makeMove(2, 4);
game.choosePiece(2, 0);
game.makeMove(2, 4);
console.log(game.movesHistory);