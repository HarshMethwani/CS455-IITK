const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { performance } = require('perf_hooks');
const fs = require('fs');

async function createDriver() {
  const options = new chrome.Options();
  options.addArguments('headless');
  options.addArguments('no-sandbox');
  options.addArguments('disable-dev-shm-usage');
  return await new Builder().forBrowser('chrome').setChromeOptions(options).build();
}

async function measurePageLoadTime() {
  let driver = await createDriver();
  try {
    let t0 = performance.now();
    await driver.get('https://hangman-nine-fawn.vercel.app'); 
    let t1 = performance.now();
    const result = `Page load time: ${t1 - t0} milliseconds\n`;
    console.log(result);
    fs.appendFileSync('performanceTestResults.txt', result);
  } finally {
    await driver.quit();
  }
}

async function measureHangmanInteractionTime() {
  let driver = await createDriver();
  try {
    await driver.get('https://hangman-nine-fawn.vercel.app');
    let t0 = performance.now();
    const hangmanElement = await driver.wait(until.elementLocated(By.className('hangman')), 500); 
    await driver.wait(until.elementIsVisible(hangmanElement), 500);
    await driver.wait(until.elementIsEnabled(hangmanElement), 500);
    await hangmanElement.click();
    console.log('Clicked on the hangman element.');
    let t1 = performance.now();
    const result = `Hangman interaction time: ${t1 - t0} milliseconds\n`;
    console.log(result);
    fs.appendFileSync('performanceTestResults.txt', result);
  } catch (error) {
    const errorMessage = `Error during Hangman interaction test: ${error.message}\n`;
    console.error(errorMessage);
    fs.appendFileSync('performanceTestResults.txt', errorMessage);
  } finally {
    await driver.quit();
  }
}

async function measureKeyboardInteractionTime() {
  let driver = await createDriver();
  try {
    await driver.get('https://hangman-nine-fawn.vercel.app');
    let t0 = performance.now();
    const keyboardElement = await driver.wait(until.elementLocated(By.className('keyboard')), 500); 
    await driver.wait(until.elementIsVisible(keyboardElement), 500);
    await driver.wait(until.elementIsEnabled(keyboardElement), 500);
    await keyboardElement.click();
    console.log('Clicked on the keyboard element.');
    let t1 = performance.now();
    const result = `Keyboard interaction time: ${t1 - t0} milliseconds\n`;
    console.log(result);
    fs.appendFileSync('performanceTestResults.txt', result);
  } catch (error) {
    const errorMessage = `Error during Keyboard interaction test: ${error.message}\n`;
    console.error(errorMessage);
    fs.appendFileSync('performanceTestResults.txt', errorMessage);
  } finally {
    await driver.quit();
  }
}

async function measureLeaderboardInteractionTime() {
  let driver = await createDriver();
  try {
    await driver.get('https://hangman-nine-fawn.vercel.app');
    let t0 = performance.now();
    const showLeaderboardButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Show Leaderboard']")), 500); 
    await driver.wait(until.elementIsVisible(showLeaderboardButton), 500);
    await showLeaderboardButton.click();
    const leaderboardContainer = await driver.wait(until.elementLocated(By.className('leaderboard-container')), 500);
    await driver.wait(until.elementIsVisible(leaderboardContainer), 500);
    let t1 = performance.now();
    const result = `Leaderboard interaction time: ${t1 - t0} milliseconds\n`;
    console.log(result);
    fs.appendFileSync('performanceTestResults.txt', result);
  } catch (error) {
    const errorMessage = `Error during Leaderboard interaction test: ${error.message}\n`;
    console.error(errorMessage);
    fs.appendFileSync('performanceTestResults.txt', errorMessage);
  } finally {
    await driver.quit();
  }
}

async function measureHideLeaderboardInteractionTime() {
  let driver = await createDriver();
  try {
    await driver.get('https://hangman-nine-fawn.vercel.app');
    const showLeaderboardButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Show Leaderboard']")), 500); 
    await driver.wait(until.elementIsVisible(showLeaderboardButton), 500);
    await showLeaderboardButton.click();
    const leaderboardContainer = await driver.wait(until.elementLocated(By.className('leaderboard-container')), 500); 
    await driver.wait(until.elementIsVisible(leaderboardContainer), 500);

    let t0 = performance.now();
    const hideLeaderboardButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Hide Leaderboard']")), 500); 
    await driver.wait(until.elementIsVisible(hideLeaderboardButton), 500);
    await hideLeaderboardButton.click();
    await driver.wait(until.elementIsNotVisible(leaderboardContainer), 500); 
    let t1 = performance.now();
    const result = `Hide leaderboard interaction time: ${t1 - t0} milliseconds\n`;
    console.log(result);
    fs.appendFileSync('performanceTestResults.txt', result);
  } catch (error) {
    const errorMessage = `Error during Hide Leaderboard interaction test: ${error.message}\n`;
    console.error(errorMessage);
    fs.appendFileSync('performanceTestResults.txt', errorMessage);
  } finally {
    await driver.quit();
  }
}

async function measureNameModalInteractionTime() {
  let driver = await createDriver();
  try {
    await driver.get('https://hangman-nine-fawn.vercel.app');
    let t0 = performance.now();
    const nameModalElement = await driver.wait(until.elementLocated(By.className('ReactModal__Content ReactModal__Content--after-open modal')), 20000); 
    await driver.wait(until.elementIsVisible(nameModalElement), 500);
    await driver.wait(until.elementIsEnabled(nameModalElement), 500);
    await nameModalElement.sendKeys('Test Player');
    const submitButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Start Game']")), 20000);
    await driver.wait(until.elementIsVisible(submitButton), 500);
    await driver.wait(until.elementIsEnabled(submitButton), 500);
    await submitButton.click();
    let t1 = performance.now();
    const result = `NameModal interaction time: ${t1 - t0} milliseconds\n`;
    console.log(result);
    fs.appendFileSync('performanceTestResults.txt', result);
  } catch (error) {
    const errorMessage = `Error during NameModal interaction test: ${error.message}\n`;
    console.error(errorMessage);
    fs.appendFileSync('performanceTestResults.txt', errorMessage);
  } finally {
    await driver.quit();
  }
}

async function measureFetchHintInteractionTime() {
  let driver = await createDriver();
  try {
    await driver.get('https://hangman-nine-fawn.vercel.app');
    let t0 = performance.now();
    const fetchHintButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Show Hint']")), 500); 
    await driver.wait(until.elementIsVisible(fetchHintButton), 500);
    await driver.wait(until.elementIsEnabled(fetchHintButton), 500);
    await fetchHintButton.click();
    console.log('Clicked on the Fetch Hint button.');
    let t1 = performance.now();
    const result = `Fetch Hint interaction time: ${t1 - t0} milliseconds\n`;
    console.log(result);
    fs.appendFileSync('performanceTestResults.txt', result);
  } catch (error) {
    const errorMessage = `Error during Fetch Hint interaction test: ${error.message}\n`;
    console.error(errorMessage);
    fs.appendFileSync('performanceTestResults.txt', errorMessage);
  } finally {
    await driver.quit();
  }
}

(async function appPerformanceTest() {
  try {
    await measurePageLoadTime();
    await measureHangmanInteractionTime();
    await measureKeyboardInteractionTime();
    await measureLeaderboardInteractionTime();
    await measureHideLeaderboardInteractionTime();
    await measureNameModalInteractionTime();
    await measureFetchHintInteractionTime();
  } catch (error) {
    const errorMessage = `Error during performance test: ${error.message}\n`;
    console.error(errorMessage);
    fs.appendFileSync('performanceTestResults.txt', errorMessage);
  }
})();


