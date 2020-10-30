const cache = function () {
    const cacheStorage = [];
    
    return function (base, exp) {
        const searchEntry = cacheStorage.find(entry => entry.base == base & entry.exp == exp);
        if (searchEntry) {
            return {
                value: searchEntry.value,
                fromCache: true
                };
        }
        const value = Math.pow(base, exp);
        cacheStorage.push({base, exp, value});

        return {
            value: value,
            fromCache: false
        };
    };
};

const calculate = cache();

calculate(3, 3); // { value: 27, fromCache: false}
calculate(2, 10); // { value: 1024, fromCache: false}
calculate(2, 10); // { value: 1024, fromCache: true}