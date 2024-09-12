import React from 'react';
import { render, screen } from '@testing-library/react';
import WordDisplay from './WordDisplay';

describe('WordDisplay Component', () => {
  test('renders the word with guessed letters visible', () => {
    const word = 'react';
    const guessedLetters = ['r', 'e', 'a'];

    render(<WordDisplay word={word} guessedLetters={guessedLetters} />);

    expect(screen.getByText('r')).toBeInTheDocument();
    expect(screen.getByText('e')).toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getAllByText('_').length).toBe(2);
  });

  test('renders underscores for non-guessed letters', () => {
    const word = 'javascript';
    const guessedLetters = ['a', 't'];

    render(<WordDisplay word={word} guessedLetters={guessedLetters} />);

    expect(screen.getAllByText('_').length).toBe(7);
    expect(screen.getAllByText('a').length).toBe(2);
    expect(screen.getByText('t')).toBeInTheDocument();
  });

  test('renders empty string when no word is provided', () => {
    render(<WordDisplay word="" guessedLetters={['a']} />);

    expect(screen.queryByText('_')).not.toBeInTheDocument();
  });

  test('renders underscores for all letters if no guessed letters are provided', () => {
    const word = 'hello';

    render(<WordDisplay word={word} guessedLetters={[]} />);

    expect(screen.getAllByText('_').length).toBe(5);
  });
});