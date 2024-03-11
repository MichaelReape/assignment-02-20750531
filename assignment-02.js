//array for the color, used to generate random
const colors = ["red", "blue", "yellow", "green"];

//user and cpu array of colors
let sequence = [];
let userSequence = [];

let state = 0;
var isGood = true;
var timeout = true;
let score = 0;
var highscore = get_high_score();

//updates the all time highscore
set_high_score();

//starts the game
async function start_game() {
  //turns light green
  document.getElementById("light").style.backgroundColor = "green";
  //colors start out bright so dim them when game starts
  dim_colors();
  score = 0;
  //3 second delay after start is pressed
  await delay(3000);
  //generate random color for cpu sequence
  random_color();
}

//random color sequence generator
function random_color() {
  //generates random number between 0-3 and adds the color at that position in colors to cpu sequence
  sequence.push(colors[Math.floor(Math.random() * 4)]);
  //call the next stage of game, displays the sequence of colors
  display_sequence();
}

//displays the sequence of colors and controls the time each is shown for
async function display_sequence() {
  var time = 0;

  //speeds up the game depending on the round
  if (sequence.length >= 13) {
    time = 400;
  } else if (sequence.length >= 9) {
    time = 600;
  } else if (sequence.length >= 5) {
    time = 800;
  } else {
    time = 1000;
  }

  //displays the sequence by setting each circle to its color, the id and sequence use string of the color name, red, yellow...
  //flashes color for set time then dims again and waits for 1/4 of the set time before showing the next one
  for (let i = 0; i < sequence.length; i++) {
    document.getElementById(sequence[i]).style.backgroundColor = sequence[i];
    await delay(time);
    dim_colors();
    await delay(time / 4);
  }
  //sets the state to 1, important for making sure user click dont register while displaying color
  state = 1;
  timeout = true;
  //starts the time limit counter
  timelimit(sequence.length);
}

//when user presses a color in state 1, guess color is called
function guess_color(color) {
  //pushes user guess to user sequence
  //when on last guess of the sequence sets the state back to 0 and calls verify guess to check answer
  if (state === 1 && userSequence.length === sequence.length - 1) {
    userSequence.push(color);
    state = 0;
    verify_guess();
  } else if (state === 1 && userSequence.length < sequence.length) {
    userSequence.push(color);
  }
}

//checks the user answer vs the expected answer
function verify_guess() {
  //set timeout to false to stop the 5 second limit
  timeout = false;
  //if sequence doesnt match anywhere set isGood to false
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] !== userSequence[i]) {
      isGood = false;
    }
  }
  //is isGood is true proceed to next round else game over
  if (isGood) {
    next_round();
  } else {
    game_over();
  }
}

//updates score, resets the user sequence and calls random color for next cpu sequence
function next_round() {
  score = userSequence.length;
  userSequence = [];
  random_color();
}

//displays the score of the round just ended, see if is all time high score
//resets sequences, states and booleans, turns light red and calls flash lights
function game_over() {
  set_previous_score();
  set_high_score();
  userSequence = [];
  sequence = [];
  state = 0;
  isGood = true;
  timeout = true;
  document.getElementById("light").style.backgroundColor = "red";
  flash_lights();
}

//used to create the delay, takes in time in milliseconds
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//time limit counter takes in the turn so turns dont overlap, the state should be 1 when user turn to input and timeout must be true
async function timelimit(turn) {
  //waits 5 seconds
  await delay(5000);
  //calls game over if time out
  if (timeout && state === 1 && turn === sequence.length) {
    game_over();
  }
}

//dims the all the colors
function dim_colors() {
  document.getElementById("red").style.backgroundColor = "#803b3b";
  document.getElementById("yellow").style.backgroundColor = "#baba77";
  document.getElementById("blue").style.backgroundColor = "#6767a3";
  document.getElementById("green").style.backgroundColor = "#6d916d";
}
//brightens all the colors
function bright_colors() {
  document.getElementById("red").style.backgroundColor = "red";
  document.getElementById("yellow").style.backgroundColor = "yellow";
  document.getElementById("blue").style.backgroundColor = "blue";
  document.getElementById("green").style.backgroundColor = "green";
}

//flash light sequence for signalling end of game, flashes 5 times
async function flash_lights() {
  for (var i = 0; i < 5; i++) {
    dim_colors();
    await delay(300);
    bright_colors();
    await delay(500);
    dim_colors();
  }
}

//displays the previous score, if statement to pad number with 0 as shown in pdf
function set_previous_score() {
  if (score <= 0) {
    score = "00";
  } else if (score < 10) {
    score = "0" + score;
  }
  document.getElementById("previous").textContent = score;
}
//grabs the all time highscore from local storage or returns 0 if no highscore found
function get_high_score() {
  return localStorage.getItem("highscore") || 0;
}
//sets and displays the all time high score
function set_high_score() {
  if (score > highscore) {
    localStorage.setItem("highscore", score);
    highscore = score;
  }
  if (highscore.length < 2) {
    highscore = "0" + highscore;
  }
  document.getElementById("all-time").textContent = highscore;
}

//event listeners for clicking the colors
document
  .getElementById("red")
  .addEventListener("click", () => guess_color("red"));
document
  .getElementById("yellow")
  .addEventListener("click", () => guess_color("yellow"));
document
  .getElementById("blue")
  .addEventListener("click", () => guess_color("blue"));
document
  .getElementById("green")
  .addEventListener("click", () => guess_color("green"));
