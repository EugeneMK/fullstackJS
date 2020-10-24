const analizeWord = (currentWord) => {
    return {
        word: currentWord,
        length: currentWord.length,
        isCapitalized: currentWord === currentWord.toUpperCase()
    }
};

// Предположил для упрощения, что знаков препинания в тексте нет, а то надо добавлять проверку на них и исключать их.
const analizeText = (text) => text.split(' ').map(analizeWord);