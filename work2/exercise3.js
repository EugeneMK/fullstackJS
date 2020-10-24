const filterByLength = (array, minLength, maxLength) => array.filter(
    element => element.length >= minLength & element.length <= maxLength
);