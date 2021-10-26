//capture all html elements for input and output
//input

var wordBlanksEl = document.querySelector(".large-word");
var startButtonEl = document.querySelector(".start");
var resetButtonEl = document.querySelector(".reset");

//output
var winEl = document.querySelector(".wins");
var lossEl = document.querySelector(".loss");
var timerEl = document.querySelector(".timer-count");

//initialise
var winCount = 0;
var maxTime = 10;


// words to guess are stored in memory as array.
//wins and losses are the ones persisted in db.
//on loading display wins and loss and start timer.
//for timer - user set interval for 1 sec and keep printing number backwards and stop at 0.
//if reached zero. check if the work is correctly filled and throw alert to stop game.

//how to check if word is correctly guessed?
//we randomly display a work with some blanks.
//check lettter on key stroke belongs to the word. if so then place it and fill the blank.
//if there are no more blanks then give a win. and update DB. and clear the interval.


function resetGame(){
    winCount = 0;
    lossCount = 0;
    saveLosses();
    saveWins();
}
function saveWins(){
    winEl.textContent = winCount;
    localStorage.setItem("winCount", winCount);
}

function saveLosses(){
    lossEl.textContent = lossCount;
    localStorage.setItem("lossCount", lossCount);
}

function winGame(){
    wordBlanksEl.textContent = "YOU WONT!!!!"
    winCount ++;
    startButtonEl.disabled = false;
    saveWins();
}

function loseGame(){
    wordBlanksEl.textContent = "GAME OVER!!";
    lossCount ++;
    startButtonEl.disabled = false;
    saveLosses();
}

function startTimer(){
    var timer = setInterval(function(){
       
        maxTime --;
        timerEl.textContent = maxTime; 
        if(maxTime >=0){
            if(maxTime > 0 && isWin){
                clearInterval(timer);
                winGame();
            }
        }
        if(maxTime == 0){
            clearInterval(timer);
            loseGame();
        }
    },1000)
}

function startGame(event){
    event.preventDefault();
    isWin = true;
    maxTime = 10;
    startButtonEl.disabled = true;
    startTimer();
}

startButtonEl.addEventListener("click", startGame)

function getLosses(){
lossCount = localStorage.getItem("lossCount");
lossEl.textContent = lossCount != null ? lossCount : 0
}
function getWins(){
winCount = localStorage.getItem("winCount")
winEl.textContent = winCount != null? winCount: 0;
}

resetButtonEl.addEventListener("click", resetGame);

function init(){
    //load all data from db. ie. wins and losses.
    getWins();
    getLosses();
}


init();
