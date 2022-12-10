let mainstartEl = document.getElementById("main-start");
let startquizButtonEl = document.getElementById("start-quiz");
let submitEl = document.getElementById("submit");
let hsPageEl = document.getElementById("hsPage");
let clearscoreEl = document.getElementById("clear-score");
let goBackEl = document.getElementById("back");
let viewHSPageEl = document.getElementById("viewHSPage")

let q1El = document.getElementById("q1");
let q2El = document.getElementById("q2");
let q3El = document.getElementById("q3");
let q4El = document.getElementById("q4");
let q5El = document.getElementById("q5");

let allDoneEl = document.getElementById("all-done");
let questionsEl = document.getElementById("questions");
let timeEl = document.getElementById("time");
let finalscoreEl = document.getElementById("finalscore");
let highscoreConEL = document.getElementById("highscore-container");
let hsBoard = document.getElementById("highscoreBoard");

questionsEl.setAttribute("style", "display:none");
allDoneEl.setAttribute("style", "display:none");
highscoreConEL.setAttribute("style", "display:none");
hsPageEl.setAttribute("style", "display:none");

q1El.setAttribute("style", "display:none");
q2El.setAttribute("style", "display:none");
q3El.setAttribute("style", "display:none");
q4El.setAttribute("style", "display:none");
q5El.setAttribute("style", "display:none");
var incorrectElements = document.getElementsByClassName("incorrect");
var correctElements = document.getElementsByClassName("correct");

var submitButtonEl = document.getElementById("submit");
var initialsInputEl = document.getElementById("initials");

const numQuestions = 5;
const incorrectTimeDeduction = 10;
var questionsAnswered = 0;
var secondsLeft = 60;
var timer;
var highscoresBoard = [];

for (var i = 0; i < incorrectElements.length; i++) {
  incorrectElements[i].addEventListener("click", incorrectanswer);
}

for (var i = 0; i < correctElements.length; i++) {
  correctElements[i].addEventListener("click", correctanswer);
}

// add event listener to button that aclls above function
startquizButtonEl.addEventListener("click", startQuizButtonClick);

function startQuizButtonClick() {
  mainstartEl.setAttribute("style", "display:none");
  questionsEl.setAttribute("style", "display:block");
  q1El.setAttribute("style", "display:block");
  startTimer();
}

function enterInitials() {
  allDoneEl.setAttribute("style", "display:block");
  clearInterval(timer);
  timeEl.textContent = "Time: " + secondsLeft;
  document.getElementById("finalscore").textContent = secondsLeft;
}

// create function for correct answer

function correctanswer() {
  questionsAnswered++;
  showNextQuestion();
}

// create function for incorrect answer
function incorrectanswer() {
  questionsAnswered++;
  secondsLeft -= incorrectTimeDeduction;
  showNextQuestion();
}

function showNextQuestion() {
  document
    .getElementById("q" + questionsAnswered)
    .setAttribute("style", "display:none");

  if (questionsAnswered === numQuestions) {
    //TODO show ending screen here!
    // console.log(secondsLeft);
    questionsEl.setAttribute("style", "display:none");
    enterInitials();
    return;
  }

  document
    .getElementById("q" + (questionsAnswered + 1))
    .setAttribute("style", "display:block");
}

function startTimer() {
  timeEl.textContent = "Time: " + secondsLeft;
  timer = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft <= 0) {
        secondsLeft = 0;
      //TODO show ending screen here!
      console.log(secondsLeft);
      clearInterval(timer);
      console.log(timer);
      return;
    }
  }, 1000);
}

function submitScore() {
  var initials = initialsInputEl.value;
  highscoresBoard.push({ initials: initials, score: secondsLeft });
  // sort in descending
  highscoresBoard.sort((a, b) => b.score - a.score);

  allDoneEl.setAttribute("style", "display: none");
  hsPageEl.setAttribute("style", "display: block");

  // loop thru all elements of highscoresBoard instead and append to the hsBoard
  removeListItems();
  for (var i = 0; i < highscoresBoard.length; i++) {
    var nodeItem = document.createElement("li");
    nodeItem.textContent =
      highscoresBoard[i].initials + " " + highscoresBoard[i].score;
    hsBoard.appendChild(nodeItem);
  }
}

submitButtonEl.addEventListener("click", submitScore);
clearscoreEl.addEventListener("click", clearScoreButtonClick);

function clearScoreButtonClick() {
  highscoresBoard = [];
  removeListItems();
}

function removeListItems() {
  while (hsBoard.firstChild) {
    hsBoard.removeChild(hsBoard.firstChild);
  }
}

goBackEl.addEventListener("click", goBackButtonClick);

function goBackButtonClick() {
    timeEl.textContent = "Time"
    secondsLeft = 60;
    initialsInputEl.value = "";
//   TODO update time element with secondsLeft
  hsPageEl.setAttribute("style", "display: none");
  mainstartEl.setAttribute("style", "display:block");
  questionsAnswered = 0;
}

viewHSPageEl.addEventListener("click", viewHighscoreClick);

function viewHighscoreClick(){
    mainstartEl.setAttribute("style", "display:none")
    hsPageEl.setAttribute("style", "display:block")
    questionsEl.setAttribute("style", "display:none")

}