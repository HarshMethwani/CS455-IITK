
const { startNewGame, handleGuess, getGameState } = require('../services/gameService');

describe('Game Service', () => {
  beforeEach(() => {
    startNewGame();
  });

  test('startNewGame should initialize game state correctly', () => {
    startNewGame();
    const state = getGameState();

    expect(state.word).toBeTruthy();
    expect(state.guessedLetters).toEqual([]);
    expect(state.wrongGuesses).toBe(0);
    expect(state.isWinner).toBe(false);
    expect(state.isLoser).toBe(false);
  });

  test('handleGuess should correctly process a correct guess', () => {
    const initialWord = getGameState().word;
    const correctLetter = initialWord[0]; 

    handleGuess(correctLetter);

    const state = getGameState();
    expect(state.guessedLetters).toContain(correctLetter);
    expect(state.wrongGuesses).toBe(0);
    expect(state.isWinner).toBe(
      new Set(state.word.split('')).size === new Set(state.guessedLetters.filter((l) => state.word.includes(l))).size
    );
  });

  test('handleGuess should correctly process an incorrect guess', () => {
    handleGuess('z');

    const state = getGameState();
    expect(state.guessedLetters).toContain('z');
    expect(state.wrongGuesses).toBe(1);
    expect(state.isLoser).toBe(false);
  });

  test('handleGuess should not update game state for repeated guesses', () => {
    handleGuess('a');
    const initialWrongGuesses = getGameState().wrongGuesses;

    handleGuess('a'); 
    const state = getGameState();

    expect(state.guessedLetters.filter((letter) => letter === 'a').length).toBe(1); 
    expect(state.wrongGuesses).toBe(initialWrongGuesses);
  });

  test('handleGuess should set isWinner when all letters are guessed', () => {
    const word = getGameState().word;
    const uniqueLetters = [...new Set(word.split(''))];

    uniqueLetters.forEach((letter) => handleGuess(letter));

    const state = getGameState();
    expect(state.isWinner).toBe(true);
    expect(state.isLoser).toBe(false);
  });

  test('handleGuess should set isLoser when wrongGuesses reach limit', () => {
    for (let i = 0; i < 6; i++) {
      handleGuess('z' + i); 
    }

    const state = getGameState();
    expect(state.isLoser).toBe(true);
    expect(state.isWinner).toBe(false);
  });
});
