const board = [ [], [], [], [], [], [], [], [] ];

class Piece {
    constructor (board, color, x, y) {
        this.color = color;
        board[x][y] = this;
    }

    getMoves (x, y) {
        const moves = [];
        this.coefficients.forEach( ([k1, k2]) => {
            for(let i = 1; i <= this.range; i++) {
                const x1 = x + k1 * i;
                const y1 = y + k2 * i;
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
        this.range = 7;
        this.koefficients = [ [1, 0], [0, -1], [-1, 0], [0, 1] ];
    }
}

class Knight extends Piece {
    constructor (...args) {
        super(...args);
        this.range = 1;
        this.koefficients = [ [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1] ];
    }
}

class Bishop extends Piece {
    constructor (...args) {
        super(...args);
        this.range = 7;
        this.koefficients = [ [1, -1], [-1, -1], [-1, 1], [1, 1] ];
    }
}

class Queen extends Piece {
    constructor (...args) {
        super(...args);
        this.range = 7;
        this.koefficients = [ [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1] ];
    }
}

class King extends Piece {
    constructor (...args) {
        super(...args);
        this.range = 1;
        this.koefficients = [ [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1] ];
    }
}

class Pawn extends Piece {
    constructor (board, color, x, y) {
        super(board, color, x, y);
        this.canMakePromotion = true;
    }

    getMoves (x, y) {
        const i = this.color == 'white' ? 1 : -1;
        const moves = [];

        if (!board[x][y + i]) {
            moves.push([x, y + i]);
        }
        if ((y == 2 && this.color == 'white') || (y == 7 && this.color == 'black')) {
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
        this.activePiece = null;
        this.movesHistory = [];    //[{side: , piece: , startSquare: , nextSquare: , capturedPiece: , gameState: }]
    }

    choosePiece (x, y) {
        if (board[x][y].color == this.activeSide) {
            this.activePiece = board[x][y];
        }
    }

    cancelChoice () {
        this.activePiece = null;
    }

    getPossibleMoves () {
        
    }

    makeMove () {}

    makePromotion () {}
}