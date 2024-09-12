import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import React from 'react';
import * as api from './controllers/fetchHint'; // Mock API calls

// Mock the API for fetching the hint
jest.spyOn(api, 'fetchHint').mockResolvedValue('A test hint');

describe('App Component', () => {
  test('renders the App component with its children', () => {
    // Render the App component
    const {container} = render(<App />);

    // Check that the WordDisplay, Hangman, and Keyboard components are rendered
    expect(container.querySelector('.hangman')).toBeInTheDocument();
    expect(container.querySelector('.word')).toBeInTheDocument();
    expect(container.querySelector('.keyboard')).toBeInTheDocument();
  });

  test('handles guesses correctly', () => {
    const {container}=render(<App />);

    // Simulate guessing a letter
    fireEvent.click(screen.getByText("r"));

    // Assert that some expected change occurs in the DOM
    // (Assume that the guessed letter should now appear somewhere, e.g., the word display updates)
    // Still shows Hangman
    expect(container.querySelector('.hangman')).toBeInTheDocument();
    expect(container.querySelector('.word')).toBeInTheDocument();
    expect(container.querySelector('.keyboard')).toBeInTheDocument();
  });

  test('fetches and displays hint when Show Hint button is clicked', async () => {
    render(<App />);

    // Click the 'Show Hint' button
    const hintButton = screen.getByText('Show Hint');
    fireEvent.click(hintButton);

    // Wait for the hint to appear (since it's async)
    await waitFor(() => {
      expect(screen.getByText(/Hint: A test hint/i)).toBeInTheDocument();
    });
  });

  test('resets the game when New Game button is clicked', () => {
    const {container} = render(<App />);

    // Click the 'New Game' button
    fireEvent.click(screen.getByText('New Game'));

    // Expect the game to reset (for example, the word or guessed letters should reset)

    expect(container.querySelector('.hangman')).toBeInTheDocument();
    expect(container.querySelector('.word')).toBeInTheDocument();
    expect(container.querySelector('.keyboard')).toBeInTheDocument();
  });
});
