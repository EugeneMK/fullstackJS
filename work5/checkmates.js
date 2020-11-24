class Piece {
    constructor (color) {
        this.color = color;
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
            moves.push([x - 1, y + i]);
        }

        if (rightAttackedPiece && rightAttackedPiece.color != this.color) {
            moves.push([x + 1, y + i]);
        }

        return moves;
    }
}

class Game {
    constructor (board, pieces) {
        this.board = board;
        this.pieces = pieces;
        this.gameState = 'Game continues';
        this.activeSide = 'white';
        this.activeSquare = null;
        this.activePiece = null;
        this.movesHistory = [];    //[{side: , piece: , startSquare: , endSquare: , capturedPiece: ]
    }

    choosePiece (x, y) {
        const piece = this.board[x][y];
        if (piece.color == this.activeSide) {
            this.activeSquare = [x, y];
            this.activePiece = piece;
            return this.activePiece;
        }
    }

    cancelChoice () {
        this.activeSquare = null;
        this.activePiece = null;
    }

    getPossibleMoves () {
        return this.activePiece.getMoves(this.board, ...this.activeSquare);      
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
            capturedPiece: this.board[x1][y1] ? this.board[x1][y1] : null
        });
        const [x0, y0] = this.activeSquare;
        this.board[x0][y0] = null;
        this.board[x1][y1] = this.activePiece;
        this.activeSquare = null;
        this.activePiece = null;
        this.activeSide = this.activeSide == 'white' ? 'black' : 'white';
    }

    makePromotion (newPiece) {
        if (this.activePiece.canMakePromotion) {
            if ((this.activeSide == 'white' && this.activeSquare[1] == 7) || 
                (this.activeSide == 'black' && this.activeSquare[1] == 0)) {
                    const [x, y] = this.activeSquare;
                    this.board[x][y] = this.pieces
                        .find(piece => piece.color = this.activePiece && piece.type == newPiece);
                    this.makeMove(x, y);
            }
        }
    }
}

const whitePawn = new Pawn('white');
const whiteRook = new Rook('white');
const whiteKnight = new Knight('white');
const whiteBishop = new Bishop('white');
const whiteQueen = new Queen('white');
const whiteKing = new King('white');

const blackPawn = new Pawn('black');
const blackRook = new Rook('black');
const blackKnight = new Knight('black');
const blackBishop = new Bishop('black');
const blackQueen = new Queen('black');
const blackKing = new King('black');

const pieces = [whitePawn, whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing,
    blackPawn, blackRook, blackKnight, blackBishop, blackQueen, blackKing];

const board = [
    [whiteRook, whitePawn, null, null, null, null, blackPawn, blackRook],
    [whiteKnight, whitePawn, null, null, null, null, blackPawn, blackKnight],
    [whiteBishop, whitePawn, null, null, null, null, blackPawn, blackBishop],
    [whiteQueen, whitePawn, null, null, null, null, blackPawn, blackQueen],
    [whiteKing, whitePawn, null, null, null, null, blackPawn, blackKing],
    [whiteBishop, whitePawn, null, null, null, null, blackPawn, blackBishop],
    [whiteKnight, whitePawn, null, null, null, null, blackPawn, blackKnight],
    [whiteRook, whitePawn, null, null, null, null, blackPawn, blackRook],
];

const game = new Game(board, pieces);

game.choosePiece(4, 1); //белая пешка Е2
game.makeMove(4, 3);    //белая пешка ходит Е2-Е4
game.choosePiece(3, 6); //чёрная пешка D7
game.makeMove(3, 4);    //чёрная пешка ходит D7-D5
game.choosePiece(4, 3); //белая пешка E4
game.makeMove(3, 4);    //белая пешка рубит чёрную на D5
console.log(game.movesHistory);