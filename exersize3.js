(wordToReverse) => {
    const length = wordToReverse.length;
    let reversedWord = '';
    for (let i=1; i<=length; i++) {
        reversedWord = reversedWord + wordToReverse[length - i];
    }
    return reversedWord;
}