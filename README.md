# Hangman Game

A simple yet fun Hangman game built with React. The game allows players to guess a hidden word by selecting letters, with a limited number of incorrect guesses allowed before losing.

## Demo
You can view the game live here: [Live Demo](https://hangman-nine-fawn.vercel.app/)

## Features

* Interactive UI after every stage
* Get the hints for the word you're trying to guess
* Options to clear game and restart it
* Mobile-friendly and responsive design

## Screenshots
![image](https://github.com/user-attachments/assets/24b1eec9-4812-4448-b97c-fd0508634e1c)

## Technologies Used

* React
* ESLint
* Jest
* Vercel

## Code Quality Tools

### ESLint
ESLint is used to ensure code quality and consistency. It helps in identifying and fixing problems in your JavaScript code.

### Jest
Jest is used for running tests and generating coverage reports. It ensures that the code is well-tested and reliable.

## How to Run Code Quality Tools

### Running ESLint
To run ESLint and check for code quality issues, use the following command:
```sh
npx eslint src/
```
### Running Tests with Coverage
To run tests and generate a coverage report, use the following command:
```sh
npm run test 
```
### Checking Code Duplication
To check for code duplication, use the following command:
```sh
npx jscpd --min-lines 10 --threshold 5 src/
```
### Summary of Refactoring and Testing Changes

## Refactoring

* Improved code readability and maintainability by adhering to ESLint rules.
* Reduced code complexity by refactoring complex functions and components.
* Removed duplicate code to ensure a DRY codebase.

## Testing

* Added comprehensive unit tests to cover all components and functions.*
* Achieved high test coverage to ensure code reliability.
* Integrated test coverage checks into the CI pipeline to maintain code quality.

## Continuous Integration

The project uses GitHub Actions for continuous integration. The CI pipeline includes the following steps:
* Running ESLint to check for code quality issues.
* Running tests with Jest to ensure code reliability.
* Checking code duplication with jscpd.
* Deploying the project to Vercel if all checks pass.


# Hangman Game Application Architecture

## 1. Frontend (React)
- **Components**:
  - **App**: This is the main component where all the magic happens. It manages game state and logic.
  - **WordDisplay**: Displays the word being guessed, showing guessed letters.
  - **Keyboard**: The UI for players to guess letters.
  - **Hangman**: Visual representation of the hangman game.
  - **NameModal**: A popup for players to enter their names.
  
- **Interactions**:
  - The frontend communicates with the backend through HTTP requests for starting a new game, submitting guesses, and getting hints.
  - It also listens for updates from the backend about the game state and leaderboard.

## 2. Backend (Node.js with Express) - Deployed Using Render
- **API Endpoints**:
  - `POST /game/new`: Starts a new game and sends back the initial game state.
  - `POST /game/guess`: Takes a guessed letter and updates the game state based on that guess.
  - `GET /leaderboard`: Fetches the leaderboard data to show player scores.
  - `POST /leaderboard/score`: Submits a player’s score to update the leaderboard.
  - `GET /hints`: (Optional) Gets a hint for the current word from an external API.
  
- **Logic**:
  - The backend handles game states (win/loss), tracks guessed letters, and calculates scores.
  - It validates guesses and updates the game state accordingly.

## 3. Database (Sqlite)
- **Collections**:
  - **Scores**: This collection stores player scores, names, and game history.
  
- **Interactions**:
  - The backend queries the database to get scores for the leaderboard and stores new scores after games finish.

## 4. External API (Optional)
- **Dictionary API**: This is used to fetch hints based on the word players are trying to guess.
  
- **Interactions**:
  - When a player asks for a hint, the backend calls the Dictionary API to get a definition.

## Data Flow Overview
- **Frontend to Backend**:
  - Start New Game -> `POST /game/new`
  - Submit Guess -> `POST /game/guess`
  - Fetch Leaderboard -> `GET /leaderboard`
  - Show Hint -> (optional) `GET /hints` from the external API.

- **Backend to Database**:
  - Store Score -> `POST /leaderboard/score`
  - Get Scores -> `GET /leaderboard`

- **External API to Backend**:
  - Fetch Hint -> (optional) `GET` request to the Dictionary API.

## Summary
In short, the React app is the user interface that talks to the Node.js backend via API calls. The backend processes these requests and interacts with the Sqlite database to manage game data and leaderboard info. If hints are requested, the backend can also pull data from an external dictionary API. This setup keeps everything organized and ensures smooth gameplay!

# Testing Pyramid

## Unit Tests
  - The unit tests for services used are written in folder `hangman-server/tests`
  - The Component tests for each react components is mentioned in `hangman-client/src/compoments/.test.js`
  - The server-database integration test is also written in folder `hangman-server/tests`




