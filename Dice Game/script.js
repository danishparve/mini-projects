'use strict'

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



// Starting Conditions
let scores, currentScore, activePLayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePLayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();
const switchPlayer = function () {
    document.getElementById(`current--${activePLayer}`).textContent = 0;
    activePLayer = activePLayer === 0 ? 1 : 0;
    currentScore = 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling Dice functionality
btnRoll.addEventListener('click', function () {

    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display Dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        // 3. Check for Rolled 1: if true, switch to next player
        if (dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePLayer}`).textContent = currentScore;


        } else {
            //Switch to next Player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {

    if (playing) {
        //add current score to active player
        scores[activePLayer] += currentScore;
        // scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePLayer}`).textContent = scores[activePLayer];
        //check if player's score is >= 100
        if (scores[activePLayer] >= 20) {
            //finish the game
            playing = false;
            diceEl.classList.add('hidden')
            document.querySelector(`.player--${activePLayer}`).classList.add('player--winner')
            document.querySelector(`p.layer--${activePLayer}`).classList.remove('player--active')
        } else {
            switchPlayer();
        }
    }
    //switch to the next player
})

btnNew.addEventListener('click', init)