import { render, fireEvent, screen, act } from '@testing-library/react';
import React from 'react';
import PropTypes from 'prop-types';
import useHangmanGame from './useHangmanGame';

// Define TestComponent with PropTypes validation
const TestComponent = ({ words }) => {
  const {
    word, guessedLetters, wrongGuesses, isWinner, isLoser, handleGuess, resetGame, startNewGame
  } = useHangmanGame(words);

  return (
    <div>
      <p>Word: {word}</p>
      <p>Guessed Letters: {guessedLetters.join(', ')}</p>
      <p>Wrong Guesses: {wrongGuesses}</p>
      <p>Is Winner: {isWinner ? 'Yes' : 'No'}</p>
      <p>Is Loser: {isLoser ? 'Yes' : 'No'}</p>
      <button onClick={() => handleGuess('a')}>Guess A</button>
      <button onClick={() => handleGuess('x')}>Guess X</button>
      <button onClick={resetGame}>Reset Game</button>
      <button onClick={startNewGame}>New Game</button>
    </div>
  );
};

TestComponent.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
};

describe('useHangmanGame', () => {
  const words = ['react', 'javascript', 'hangman'];

  test('initializes with a random word and empty guesses', () => {
    render(<TestComponent words={words} />);

    // Check if the word is initialized and guessed letters are empty
    const wordElement = screen.getByText(/Word:/);
    expect(words).toContain(wordElement.textContent.split('Word: ')[1]);
    expect(screen.getByText(/Guessed Letters:/).textContent).toBe('Guessed Letters: ');
    expect(screen.getByText(/Wrong Guesses:/).textContent).toBe('Wrong Guesses: 0');
  });

  test('handles correct and wrong guesses', () => {
    render(<TestComponent words={['react']} />);

    // Simulate clicking a correct letter ('a')
    fireEvent.click(screen.getByText(/Guess A/));

    // Check that the letter 'a' is added to guessed letters and wrong guesses remain 0
    expect(screen.getByText(/Guessed Letters:/).textContent).toContain('a');
    expect(screen.getByText(/Wrong Guesses:/).textContent).toBe('Wrong Guesses: 0');

    // Simulate clicking an incorrect letter ('x')
    fireEvent.click(screen.getByText(/Guess X/));

    // Check that wrong guesses have incremented
    expect(screen.getByText(/Wrong Guesses:/).textContent).toBe('Wrong Guesses: 1');

    // Check that 'x' is in the guessed letters
    expect(screen.getByText(/Guessed Letters:/).textContent).toContain('x');
  });

  test('resets the game when reset button is clicked', () => {
    render(<TestComponent words={['react']} />);

    act(() => {
      screen.getByText(/Guess A/).click();  // Make a guess
    });

    // Ensure the guessed letter is there
    expect(screen.getByText(/Guessed Letters:/).textContent).toBe('Guessed Letters: a');

    // Reset the game
    act(() => {
      screen.getByText(/Reset Game/).click();
    });

    // Ensure the game is reset
    expect(screen.getByText(/Guessed Letters:/).textContent).toBe('Guessed Letters: ');
    expect(screen.getByText(/Wrong Guesses:/).textContent).toBe('Wrong Guesses: 0');
  });

  test('starts a new game with a new word when New Game is clicked', () => {
    render(<TestComponent words={['react', 'javascript', 'hangman']} />);

    // Get the initial word
    const initialWord = screen.getByText(/Word:/).textContent.split('Word: ')[1];

    // Mock Math.random() to ensure a different word is chosen (e.g., return a value for 'javascript')
    jest.spyOn(globalThis.Math, 'random').mockReturnValueOnce(0.5); // Assume this picks 'javascript'

    // Click the 'New Game' button
    fireEvent.click(screen.getByText(/New Game/));

    // Get the new word after clicking New Game
    const newWord = screen.getByText(/Word:/).textContent.split('Word: ')[1];

    // Expect the new word to be different from the initial word
    expect(newWord).not.toBe(initialWord);

    // Restore Math.random()
    jest.spyOn(globalThis.Math, 'random').mockRestore();
  });
});
