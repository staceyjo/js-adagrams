const letterDistribution = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1
};

let letterPoolArr = Object.keys(letterDistribution)
  .map((key) => {
    const newArr = new Array(letterDistribution[key]).fill(key);
    return newArr;
  })
  .flat(1);



export const drawLetters = () => {
  // Implement this method for wave 1
  let lettersInHand = [];
  let myLetterPoolArr = JSON.parse(JSON.stringify(letterPoolArr));
  for (let i = 0; i < 10; i++) {
    const randInt = Math.floor(Math.random() * myLetterPoolArr.length - 1) + 1;
    const myLetter = myLetterPoolArr[randInt];
    if (!myLetter) {
      console.log(randInt);
    }
    lettersInHand.push(myLetter);
    myLetterPoolArr.splice(randInt, 1);
  }
  return lettersInHand;
};


export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
  let myLettersInHand = JSON.parse(JSON.stringify(lettersInHand));
  for (let i = 0; i < input.length; i++) {
    const currLetter = input[i].toUpperCase();
    if (myLettersInHand.includes(currLetter)) {
      const index = myLettersInHand.indexOf(currLetter);
      myLettersInHand.splice(index, 1);
    } else {
      return false;
    }
  }
  return true;
};

const letterScore = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
  word = word.toUpperCase();
  let score = 0;
  for (let letter of word) {
    score += letterScore[letter];
  }
  if (word.length >= 7) {
    score += 8;
  }
  return score;
};

const tieBreaker = (potentialWinningWords) => {
  const tenLetterWords = [];
  const shortestWords = [];
  let shortestWordLength = 11

  for (const word of potentialWinningWords) {
    if (word.length === 10) {
      tenLetterWords.push(word)
    } else if (word.length < shortestWordLength) {
      shortestWordLength = word.length;
    }
  }

  for (const word of potentialWinningWords) {
    if (word.length === shortestWordLength) {
      shortestWords.push(word);
    }
  }

  if (tenLetterWords.length > 0) {
    return tenLetterWords[0];
  } else {
    return shortestWords[0];
  }
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
  const wordsScores = new Map();
  let scoreCounter = 0;
  const potentialWinners = [];

  for (const word of words) {
    wordsScores.set(word, scoreWord(word));
    if (wordsScores.get(word) > scoreCounter) {
      scoreCounter = wordsScores.get(word);
    }
  }

  for (const word of wordsScores.keys()) {
    if (wordsScores.get(word) === scoreCounter) {
      potentialWinners.push(word);
    }
  }

  if (potentialWinners.length === 1) {
    const winningWord = {
      'word': potentialWinners[0],
      'score': wordsScores.get(potentialWinners[0]),
    };
    return winningWord;
  } else {
    const tieBreakerWinner = tieBreaker(potentialWinners);
    const winningWord = {
      'word': tieBreakerWinner,
      'score': wordsScores.get(tieBreakerWinner),
    };
    return winningWord;
  }
};

export default {
  drawLetters,
  usesAvailableLetters,
  scoreWord,
  highestScoreFrom
};