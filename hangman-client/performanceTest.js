const { Builder, By, until } = require('selenium-webdriver');
const { performance } = require('perf_hooks');

async function createDriver() {
  return await new Builder().forBrowser('chrome').build();
}

async function measurePageLoadTime() {
  let driver = await createDriver();
  try {
    let t0 = performance.now();
    await driver.get('https://hangman-nine-fawn.vercel.app'); 
    let t1 = performance.now();
    console.log(`Page load time: ${t1 - t0} milliseconds`);
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
    console.log(`Hangman interaction time: ${t1 - t0} milliseconds`);
  } catch (error) {
    console.error(`Error during Hangman interaction test: ${error.message}`);
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
    console.log(`Keyboard interaction time: ${t1 - t0} milliseconds`);
  } catch (error) {
    console.error(`Error during Keyboard interaction test: ${error.message}`);
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
    console.log(`Leaderboard interaction time: ${t1 - t0} milliseconds`);
  } catch (error) {
    console.error(`Error during Leaderboard interaction test: ${error.message}`);
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
    console.log(`Hide leaderboard interaction time: ${t1 - t0} milliseconds`);
  } catch (error) {
    console.error(`Error during Hide Leaderboard interaction test: ${error.message}`);
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
    console.log(`NameModal interaction time: ${t1 - t0} milliseconds`);
  } catch (error) {
    console.error(`Error during NameModal interaction test: ${error.message}`);
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
      console.log(`Fetch Hint interaction time: ${t1 - t0} milliseconds`);
    } catch (error) {
      console.error(`Error during Fetch Hint interaction test: ${error.message}`);
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
    console.error(`Error during performance test: ${error.message}`);
  }
})();

// const { Builder, By, until } = require('selenium-webdriver');
// const { performance } = require('perf_hooks');

// async function measurePageLoadTime(driver) {
//     let t0 = performance.now();
//     await driver.get('https://hangman-nine-fawn.vercel.app'); // Replace with your app's URL
//     let t1 = performance.now();
//     console.log(`Page load time: ${t1 - t0} milliseconds`);
// }

// async function measureHangmanInteractionTime(driver) {
//     let t0 = performance.now();
//     const hangmanElement = await driver.wait(until.elementLocated(By.className('hangman')), 10000);
//     await driver.wait(until.elementIsVisible(hangmanElement), 10000);
//     await driver.wait(until.elementIsEnabled(hangmanElement), 10000);
//     await hangmanElement.click();
//     console.log('Clicked on the hangman element.');
//     let t1 = performance.now();
//     console.log(`Hangman interaction time: ${t1 - t0} milliseconds`);
// }

// async function measureKeyboardInteractionTime(driver) {
//     let t0 = performance.now();
//     const keyboardElement = await driver.wait(until.elementLocated(By.className('keyboard')), 10000);
//     await driver.wait(until.elementIsVisible(keyboardElement), 10000);
//     await driver.wait(until.elementIsEnabled(keyboardElement), 10000);
//     await keyboardElement.click();
//     console.log('Clicked on the keyboard element.');
//     let t1 = performance.now();
//     console.log(`Keyboard interaction time: ${t1 - t0} milliseconds`);
// }

// async function measureLeaderboardInteractionTime(driver) {
//     let t0 = performance.now();
//     const showLeaderboardButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Show Leaderboard']")), 10000);
//     await driver.wait(until.elementIsVisible(showLeaderboardButton), 10000);
//     await showLeaderboardButton.click();
//     const leaderboardContainer = await driver.wait(until.elementLocated(By.className('leaderboard-container')), 10000);
//     await driver.wait(until.elementIsVisible(leaderboardContainer), 10000);
//     let t1 = performance.now();
//     console.log(`Leaderboard interaction time: ${t1 - t0} milliseconds`);
// }

// async function measureHideLeaderboardInteractionTime(driver) {
//     const showLeaderboardButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Show Leaderboard']")), 10000);
//     await driver.wait(until.elementIsVisible(showLeaderboardButton), 10000);
//     await showLeaderboardButton.click();
//     const leaderboardContainer = await driver.wait(until.elementLocated(By.className('leaderboard-container')), 10000);
//     await driver.wait(until.elementIsVisible(leaderboardContainer), 10000);

//     let t0 = performance.now();
//     const hideLeaderboardButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Hide Leaderboard']")), 10000);
//     await driver.wait(until.elementIsVisible(hideLeaderboardButton), 10000);
//     await hideLeaderboardButton.click();
//     await driver.wait(until.elementIsNotVisible(leaderboardContainer), 10000);
//     let t1 = performance.now();
//     console.log(`Hide leaderboard interaction time: ${t1 - t0} milliseconds`);
// }

// async function measureNameModalInteractionTime(driver) {
//     const newGameButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='New Game']")), 10000);
//     await driver.wait(until.elementIsVisible(newGameButton), 10000);
//     await driver.wait(until.elementIsEnabled(newGameButton), 10000);
//     await newGameButton.click();

//     let t0 = performance.now();
//     const nameModalElement = await driver.wait(until.elementLocated(By.className('ReactModal__Content ReactModal__Content--after-open modal')), 10000); // Replace with the actual class name
//     await driver.wait(until.elementIsVisible(nameModalElement), 10000);
//     await driver.wait(until.elementIsEnabled(nameModalElement), 10000);
//     await nameModalElement.sendKeys('Test Player'); // Replace with the actual class name
//     const submitButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Start Game']")), 10000); // Replace with the actual class name
//     await driver.wait(until.elementIsVisible(submitButton), 10000);
//     await driver.wait(until.elementIsEnabled(submitButton), 10000);
//     await submitButton.click(); // Replace with the actual class name
//     let t1 = performance.now();
//     console.log(`NameModal interaction time: ${t1 - t0} milliseconds`);
//   }
    
// (async function appPerformanceTest() {
//     let driver = await new Builder().forBrowser('chrome').build();
//     try {
//         await measurePageLoadTime(driver);
//         await measureHangmanInteractionTime(driver);
//         await measureKeyboardInteractionTime(driver);
//         await measureLeaderboardInteractionTime(driver);
//         await measureHideLeaderboardInteractionTime(driver);
//         await measureNameModalInteractionTime(driver);
//     } catch (error) {
//         console.error(`Error during performance test: ${error.message}`);
//     } finally {
//         await driver.quit();
//     }
// })();

// // (async function appPerformanceTest() {
// //   let driver = await new Builder().forBrowser('chrome').build();
// //   try {
// //     const backendUrl = "https://hangman-server-1u6k.onrender.com";

// //     // Measure page load time
// //     let t0 = performance.now();
// //     await driver.get('http://localhost:3000'); // Replace with your app's URL
// //     let t1 = performance.now();
// //     console.log(`Page load time: ${t1 - t0} milliseconds`);

// //     // Measure interaction time for hangman element
// //     t0 = performance.now();

// //     // Wait for the hangman element to be interactable
// //     const hangmanElement = await driver.wait(until.elementLocated(By.className('hangman')), 10000);
// //     await driver.wait(until.elementIsVisible(hangmanElement), 10000);
// //     await driver.wait(until.elementIsEnabled(hangmanElement), 10000);

// //     // Click the hangman element
// //     await hangmanElement.click();
// //     console.log('Clicked on the hangman element.');

// //     // Wait for and click the keyboard element
// //     const keyboardElement = await driver.wait(until.elementLocated(By.className('keyboard')), 10000);
// //     await driver.wait(until.elementIsVisible(keyboardElement), 10000);
// //     await driver.wait(until.elementIsEnabled(keyboardElement), 10000);
// //     await keyboardElement.click();
// //     console.log('Clicked on the keyboard element.');

// //     t1 = performance.now();
// //     console.log(`Modal interaction time: ${t1 - t0} milliseconds`);


// //     t0 = performance.now();

// //     // Find and click the "Show Leaderboard" button
// //     const showLeaderboardButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Show Leaderboard']")), 10000);
// //     await driver.wait(until.elementIsVisible(showLeaderboardButton), 10000);
// //     await showLeaderboardButton.click();

// //     // Wait until the leaderboard container is visible
// //     const leaderboardContainer = await driver.wait(until.elementLocated(By.className('leaderboard-container')), 10000);
// //     await driver.wait(until.elementIsVisible(leaderboardContainer), 10000);

// //     t1 = performance.now();
// //     console.log(`Show leaderboard interaction time: ${t1 - t0} milliseconds`);

// //     // Measure interaction time for hiding the leaderboard
// //     t0 = performance.now();

// //     // Re-locate the "Hide Leaderboard" button to avoid stale element reference error
// //     const hideLeaderboardButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Hide Leaderboard']")), 10000);
// //     await driver.wait(until.elementIsVisible(hideLeaderboardButton), 10000);
// //     await hideLeaderboardButton.click();

// //     // Wait until the leaderboard container is no longer visible
// //     await driver.wait(until.elementIsNotVisible(leaderboardContainer), 10000);

// //     t1 = performance.now();
// //     console.log(`Hide leaderboard interaction time: ${t1 - t0} milliseconds`);

// //   } catch (error) {
// //     console.error(`Error during performance test: ${error.message}`);
// //   } finally {
// //     await driver.quit();
// //   }
// // })();
