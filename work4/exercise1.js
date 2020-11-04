Array.prototype.shuffle = function () {
    return this.sort(() => Math.random() - 0.5);
};

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr.shuffle());
