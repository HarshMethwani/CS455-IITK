import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Keyboard from './Keyboard';

describe('Keyboard Component', () => {
  test('renders all letters as buttons', () => {
    const { getByTestId } = render(<Keyboard onGuess={() => {}} guessedLetters={[]} />);
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach((letter) => {
      expect(getByTestId(`key-${letter}`)).toBeInTheDocument();
    });
  });

  test('calls onGuess when a letter button is clicked', () => {
    const onGuessMock = jest.fn();
    const { getByTestId } = render(<Keyboard onGuess={onGuessMock} guessedLetters={[]} />);
    const letterButton = getByTestId('key-a');
    fireEvent.click(letterButton);
    expect(onGuessMock).toHaveBeenCalledWith('a');
  });

  test('disables guessed letter buttons', () => {
    const { getByTestId } = render(<Keyboard onGuess={() => {}} guessedLetters={['a']} />);
    const letterButton = getByTestId('key-a');
    expect(letterButton).toBeDisabled();
  });

  test('calls onGuess when a letter key is pressed', () => {
    const onGuessMock = jest.fn();
    render(<Keyboard onGuess={onGuessMock} guessedLetters={[]} />);
    fireEvent.keyDown(window, { key: 'a' });
    expect(onGuessMock).toHaveBeenCalledWith('a');
  });

  test('does not call onGuess for already guessed letters when a key is pressed', () => {
    const onGuessMock = jest.fn();
    render(<Keyboard onGuess={onGuessMock} guessedLetters={['a']} />);
    fireEvent.keyDown(window, { key: 'a' });
    expect(onGuessMock).not.toHaveBeenCalled();
  });
});