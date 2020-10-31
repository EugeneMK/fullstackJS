const Rectangle = function (a, b) {
    this.side1 = a;
    this.side2 = b;
    this.getPerimeter = function () {
        return 2 * (this.side1 + this.side2);
    };
    this.getSurface = function () {
        return this.side1 * this.side2;
    };
};

const Square = function (a) {
    this.side1 = a;
    this.side2 = a;
};
Square.prototype = new Rectangle();

const rect = new Rectangle(3, 4);
console.log(rect.getPerimeter());
console.log(rect.getSurface());

const sq = new Square(5);
console.log(sq.getPerimeter());
console.log(sq.getSurface());
