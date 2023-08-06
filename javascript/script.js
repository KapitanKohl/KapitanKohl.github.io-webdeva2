//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
//let onepage = document.querySelector("#page" + pgno);
const page1 = document.querySelector("#page1");
const page2 = document.querySelector("#page2");
const page3 = document.querySelector("#page3");
var allpages = document.querySelectorAll(".page");
//select all subtopic pages
const resetBtn = document.getElementById('reset');
const answerBtn = document.getElementById('answer');
const trueBtn = document.getElementById('True');
const falseBtn = document.getElementById('False');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const userScore = document.getElementById('user-score');
const questionText = document.getElementById('q-text');
//listener for quiz buttons
resetBtn.addEventListener('click', reset);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
answerBtn.addEventListener('click', answerQ);

hideall();

function hideall() { //function to hide all pages
	for (let onepage of allpages) { //go through all subtopic pages
		onepage.style.display = "none"; //hide it
	}
}

function hide(pgno) //function to hide page
{
	//select the page based on the parameter passed in
	let onepage = document.querySelector("#page" + pgno);
	//hide the page
	onepage.style.display = "none";
	console.log(onepage.style.display);
}

function show(pgno) { //function to show selected page no
	hideall();
	//select the page based on the parameter passed in
	let onepage = document.querySelector("#page" + pgno);
	//show the page
	onepage.style.display = "block";
	//console.log(onepage.style.display);
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
/*
This also works as the button
function ShowPage(){
    let thisPage=document.querySelector("#page1")
    thisPage.style.display="block";
}
*/
page1btn.addEventListener("click", function() {
	if (page1.style.display == "none") /*page not shown already*/ {
		show(1);
	} else if (page1.style.display == "block") /*page shown already*/ {
		hide(1);
	}
});
page2btn.addEventListener("click", function() {
	if (page2.style.display == "none") /*page not shown already*/ {
		show(2);
	} else if (page2.style.display == "block") /*page shown already*/ {
		hide(2);
	}
});
page3btn.addEventListener("click", function() {
	if (page3.style.display == "none") /*page not shown already*/ {
		show(3);
	} else if (page3.style.display == "block") /*page shown already*/ {
		hide(3);
	}
});

/*for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);
const menuItemsList = document.querySelector("nav ul");

function toggleMenus() { /*open and close menu*/
	menuItemsList.classList.toggle("menuShow");
	//if(menuItemsList.style.display=="block")
	//menuItemsList.style.display="none";
	//else menuItemsList.style.display="block";
} //can optimize using toggle class with css transitions

//for quiz
let currentQuestion = 1;
var score = 0;

let questions = //array of questions and answers
	[{
		question: "The Fire Lance used bullets as ammunition.",
		answers: [{
			choice: "Yes",
			answer: false
		}, {
			choice: "No",
			answer: true
		}]
	}, {
		question: "The blunderbuss came before the double-barrelled shotgun",
		answers: [{
			choice: "Yes",
			answer: true
		}, {
			choice: "No",
			answer: false
		}]
	}, {

		question: "Reliability is one of the most key aspects of a gun.",
		answers: [{
			choice: "Yes",
			answer: true
		}, {
			choice: "No",
			answer: false
		}]
	}, ];
//functions for quiz
function startQuiz() {
	currentQuestion = 0; //starts on question 1
	questionText.innerHTML = questions[currentQuestion].question; //
	trueBtn.innerHTML = questions[currentQuestion].answers[0].choice; //questions[i].answers[option 1].choice
	trueBtn.onclick = trueOnClick;

	function trueOnClick() {
		let ansChoice = 0; //checks if true is correct;
		if (questions[currentQuestion].answers[ansChoice].answer) {
			if (score < 3) {
				score++;
			}
		}
		//userScore.innerHTML = score;
		if (currentQuestion < 2) {
			next();
		}
	}
	//if player press wrong option, retain the score
	falseBtn.innerHTML = questions[currentQuestion].answers[1].choice;
	falseBtn.onclick = falseOnClick;

	function falseOnClick() {
		let ansChoice = 1; //checks if false is correct
		if (questions[currentQuestion].answers[ansChoice].answer) {
			if (score < 3) {
				score++;
			}
		}
		//userScore.innerHTML = score;
		if (currentQuestion < 2) {
			next();
		}
	}

}

startQuiz(); //causes quiz to be activated immediately

function reset() {
	currentQuestion = 0;
	answerBtn.classList.remove('hide');
	trueBtn.classList.remove('hide');
	falseBtn.classList.remove('hide');
	score = 0;
	userScore.innerHTML = "?";
	startQuiz();
}

function next() //goes to next question
{
	currentQuestion++; // increase the number of questions went through
	if (currentQuestion >= 2) //stops player from exceeding question limit
	{
		nextBtn.classList.add('hide');
		prevBtn.classList.remove('hide');
	}
	questionText.innerHTML = questions[currentQuestion].question; //
	trueBtn.innerHTML = questions[currentQuestion].answers[0].choice;
	trueBtn.onclick = trueOnClick;

	function trueOnClick() {
		let ansChoice = 0; //checks if true is correct
		if (questions[currentQuestion].answers[ansChoice].answer) {
			if (score < 3) {
				score++;
			}
		}
		//userScore.innerHTML = score;
        //check if player is on final question
        if (currentQuestion == 2)
        {
            questionText.innerHTML = "You have completed the quiz, press submit or click previous to check other questions.";
            trueBtn.classList.add('hide');
            falseBtn.classList.add('hide');
        }
		if (currentQuestion < 2) {
			next();
		}
	}
	//do the same for false

	falseBtn.innerHTML = questions[currentQuestion].answers[1].choice;
	falseBtn.onclick = falseOnClick;

	function falseOnClick() {
		let ansChoice = 1; //checks if false is correct
		if (questions[currentQuestion].answers[ansChoice].answer) {
			if (score < 3) {
				score++;
			}
		}
		//userScore.innerHTML = score;
		if (currentQuestion < 2) {
			next();
		}
	}
	prevBtn.classList.remove('hide'); //allows player to click previous button
}


function prev() { //goes to prev question

	currentQuestion--; // increase the number of questions went through
	if (currentQuestion <= 0) { //hide previous btn and add next button
		prevBtn.classList.add('hide');
		nextBtn.classList.remove('hide');
	}
    else
    {
        trueBtn.classList.remove('hide');
        falseBtn.classList.remove('hide');
    }
	questionText.innerHTML = questions[currentQuestion].question; //
	trueBtn.innerHTML = questions[currentQuestion].answers[0].choice;
	trueBtn.onclick = trueOnClick;

	function trueOnClick() {
		let ansChoice = 0; //checks if true is correct
		if (questions[currentQuestion].answers[ansChoice].answer) {
			if (score < 3) {
				score++;
			}
            
		}
        else{
            if (score < 0 )
            {
                score--;
            }
        }
		//userScore.innerHTML = score;
		if (currentQuestion < 2) {
			next();
		}
	}
	//if player press wrong option, retain the score
	falseBtn.innerHTML = questions[currentQuestion].answers[1].choice;
	falseBtn.onclick = falseOnClick;

	function falseOnClick() {
		let ansChoice = 1; //checks if false is correct
		if (questions[currentQuestion].answers[ansChoice].answer) {
			if (score < 3) {
				score++;
			}
		}
        else{
            if (score < 0 )
            {
                score--;
            }
        }
		//userScore.innerHTML = score;
		if (currentQuestion < 2) {
			next();
		}
	}
	nextBtn.classList.remove('hide');
}

function answerQ() {
	prevBtn.classList.add('hide');
	nextBtn.classList.add('hide');
	answerBtn.classList.add('hide');
	trueBtn.classList.add('hide');
	falseBtn.classList.add('hide');
	questionText.innerHTML = "Submitted Quiz!";
    userScore.innerHTML = score;

}