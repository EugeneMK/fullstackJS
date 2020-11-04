const Ship = function (type, ...args) {
    if (type === 'motor') {
        return new MotorShip(...args);
    }
    if (type === 'sail') {
        return new SailShip(...args);
    }
};

const MotorShip = function (name, enginePower, material, color) {
    this.type = 'motor';
    this.name = name;
    this.enginePower = enginePower;
    this.material = material;
    this.color = color;
};

const SailShip = function (name, numberOfMusts, sailArea, color) {
    this.type = 'sail';
    this.name = name;
    this.numberOfMusts = numberOfMusts;
    this.sailArea = sailArea;
    this.color = color;
};

const Shipyard = function () {

    this.build = function (...args) {
        return new Ship(this.type, ...args);
    };

    this.repaint = function (ship, newColor) {
        ship.color = newColor;
        return `"${ship.name}" repainted ${newColor}.`;
    };

    this.repair = function (ship) {
        if (ship.type === this.type) {
            return `"${ship.name}" repaired.`;
        }
        return `"${ship.name}" can't be repaired. Ship type: ${ship.type}, required type: ${this.type}.`;
    };

    this.changeShip = function (ship, ...args) {
        if (ship.type === this.type) {
            return this.build(...args);
        }
        else {
            return `"${ship.name}" can't be changed. Ship type: ${ship.type}, required type: ${this.type}.`;
        }
    };
};

const MotorShipyard = function () {
    this.type = 'motor';
};

const SailShipyard = function () {
    this.type = 'sail';
};

MotorShipyard.prototype = new Shipyard();
SailShipyard.prototype = new Shipyard();

//Test:
const motorShipyard = new MotorShipyard();
const atom = motorShipyard.build('Atom', 300, 'wood', 'red');

const sailShipyard = new SailShipyard();
const kraken = sailShipyard.build('Kraken', 2, 500, 'black');

console.log(atom);
console.log(motorShipyard.repair(atom));
console.log(sailShipyard.repair(atom));
console.log(sailShipyard.repaint(atom, 'green'));
console.log(atom);
console.log(motorShipyard.changeShip(atom, 'Electron', 250, 'steel', 'white'));
console.log(sailShipyard.changeShip(atom, 'Pearl', 2, 400, 'blue'));

console.log(kraken);
console.log(sailShipyard.repair(kraken));
console.log(motorShipyard.repair(kraken));
console.log(motorShipyard.repaint(kraken, 'blue'));
console.log(kraken);
console.log(motorShipyard.changeShip(kraken, 'electron', 250, 'steel', 'white'));
console.log(sailShipyard.changeShip(kraken, 'Pearl', 2, 400, 'blue'));
