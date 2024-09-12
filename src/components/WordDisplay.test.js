import React from 'react';
import { render } from '@testing-library/react';
import WordDisplay from './WordDisplay';

describe('WordDisplay Component', () => {
  test('renders correctly with guessed letters', () => {
    const word = 'react';
    const guessedLetters = ['r', 'e', 'a'];
    const { container } = render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    expect(container.textContent).toBe('rea__');
  });

  test('renders correctly with no guessed letters', () => {
    const word = 'react';
    const guessedLetters = [];
    const { container } = render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    expect(container.textContent).toBe('_____');
  });

  test('renders correctly with all guessed letters', () => {
    const word = 'react';
    const guessedLetters = ['r', 'e', 'a', 'c', 't'];
    const { container } = render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    expect(container.textContent).toBe('react');
  });

  test('renders correctly with guessed letters not in the word', () => {
    const word = 'react';
    const guessedLetters = ['x', 'y', 'z'];
    const { container } = render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    expect(container.textContent).toBe('_____');
  });

  test('renders correctly with an empty word', () => {
    const word = '';
    const guessedLetters = ['r', 'e', 'a', 'c', 't'];
    const { container } = render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    expect(container.textContent).toBe('');
  });

  test('renders correctly with default props', () => {
    const { container } = render(<WordDisplay />);
    expect(container.textContent).toBe('');
  });
});