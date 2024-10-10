import React from 'react';
import { render } from '@testing-library/react';
import Hangman from './Hangman';

describe('Hangman Component', () => {
  test('renders scaffold correctly', () => {
    const { container } = render(<Hangman wrongGuesses={0} />);
    const scaffoldLines = container.querySelectorAll('.scaffold');
    expect(scaffoldLines.length).toBe(4);
  });

  test('renders no body parts when wrongGuesses is 0', () => {
    const { queryAllByTestId } = render(<Hangman wrongGuesses={0} />);
    const bodyParts = queryAllByTestId(/body-part-/);
    bodyParts.forEach(part => {
      expect(part).toHaveClass('hidden');
    });
  });

  test('renders head when wrongGuesses is 1', () => {
    const { getByTestId } = render(<Hangman wrongGuesses={1} />);
    expect(getByTestId('body-part-0')).toHaveClass('visible');
  });

  test('renders head and body when wrongGuesses is 2', () => {
    const { getByTestId } = render(<Hangman wrongGuesses={2} />);
    expect(getByTestId('body-part-0')).toHaveClass('visible');
    expect(getByTestId('body-part-1')).toHaveClass('visible');
  });

  test('renders all body parts when wrongGuesses is 6', () => {
    const { getByTestId } = render(<Hangman wrongGuesses={6} />);
    for (let i = 0; i < 6; i++) {
      expect(getByTestId(`body-part-${i}`)).toHaveClass('visible');
    }
  });
});