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



