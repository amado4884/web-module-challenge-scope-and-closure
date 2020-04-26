// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 *
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 *
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
 */
function processFirstItem(stringList, callback) {
  return callback(stringList[0]);
}

// ⭐️ Example Challenge END ⭐️

///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 *
 * 1. What is the difference between counter1 and counter2?
 *
 * counter1 uses closure and keeps internal scope of the count variable
 *
 * 2. Which of the two uses a closure? How can you tell?
 *
 *  counter1 uses closure and keeps internal scope of the count variable
 *
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better?
 *
 *  the counter1 code is useful because it keeps track of its own variables and makes coding cleaner
 *
 *  counter2 is useful when more than one function needs the access to the count variable
 *
 */

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
    return count++;
  };
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}

/* Task 2: inning() 

Write a function called `inning` that generates a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

function inning() {
  return Math.floor(Math.random() * 3);
}

/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/

function finalScore(inning, num) {
  let Home = 0;
  let Away = 0;
  let homeBatting = true;
  return function () {
    for (let i = 1; i <= num; i++) {
      if (homeBatting === true) Home += inning();
      else Away += inning();
      homeBatting = !homeBatting;
    }
    return { Home, Away };
  };
}
// const getInningScore = finalScore(inning, 9);
// console.log(getInningScore());
/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(2) A number of innings

and returns the score at each pont in the game, like so:

1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam

Final Score: awayTeam - homeTeam */

function scoreboard(getInningScore, inning, numberOfInnings) {
  let currentInning = 1;
  const scoreList = new Array(numberOfInnings + 1).fill({ Home: 0, Away: 0 });
  const inningScore = getInningScore(inning, 1);
  return () => {
    const { Home, Away } = inningScore();
    scoreList[currentInning] = { Home, Away };
    let end = "st";
    if (currentInning === 2) end = "nd";
    else if (currentInning === 3) end = "rd";
    else if (currentInning > 3) end = "th";
    return `${currentInning++ + end} inning: ${Away} - ${Home}`;
  };
}
const sb = scoreboard(finalScore, inning, 9);
console.log(sb());
console.log(sb());
console.log(sb());
console.log(sb());
console.log(sb());
console.log(sb());
console.log(sb());
console.log(sb());
console.log(sb());
