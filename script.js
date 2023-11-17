'use strict';

// getting elements from DOM
// getting player cards elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// getting player scores elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

// getting player's current score elements
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

// getting Dice image element
const diceEl = document.querySelector('.dice');

// getting buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// setting starting conditions with empty vars

let scores, currentScore, activePlayer, playing;

// creating resuable functions

// start or restart game
const init = () => {
  // starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // setting all scores to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // hidding dice until roll
  diceEl.classList.add('hidden');

  // removing or adding active & winner player classes on player's cards
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// invoking the init function when page reload
init();

// switching player function
const switchPlayer = () => {
  // setting current score to 0 when palyer switch
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  /* condition if active player is 0 switch to 1
  if active player is 1 switch to 0 */
  activePlayer = activePlayer === 0 ? 1 : 0;

  /* toggle between active player class on player's cards */
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Dice rolling function on btn click
btnRoll.addEventListener('click', () => {
  if (playing === true) {
    // 1. gereate random number from 1 - 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice according to the dice number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; /* --> dynamicaly changing dice images based on dice number */

    // 3. check if rolled 1: if true switch player if not add score to current score
    if (dice !== 1) {
      currentScore += dice; // --> add dice numbers to current score

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; /* --> dynamicaly getting current player based on activePlayer 0,1
        and setting activePlayer current score */
    } else {
      switchPlayer();
    }
  }
});

// hold & switch function on btn click
btnHold.addEventListener('click', () => {
  if (playing === true) {
    // 1. add current score of active player to total score
    scores[activePlayer] += currentScore; // --> scores[0 or 1 ] += current score

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // --> concate total score of active player on screen

    // 2. check if current player score if >=100: if true finish the game
    if (scores[activePlayer] >= 100) {
      // --> activePlayer holds 0 or 1
      playing = false;

      // 3. /* if score is above 100 for active player remove active class and add winner class*/
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // 4. and hide dice image
      diceEl.classList.add('hidden');
    } else {
      // 5. if score is below 100 simply save the score and switch player
      switchPlayer();
    }
  }
});

// Reset the game to init conditions when new btn clicked
btnNew.addEventListener('click', init);
