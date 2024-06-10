
const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

const questions =[
    {
        question : "which one is the largest animal in the world?",
        answer : [
            { text : "shark",correct : false },
            { text : "Blue Whale",correct : true },
            { text : "Elephant",correct : false },
            { text : "Giraffe",correct : false },
        ]   
    },{
        question : "which one is the smallest continent in world?",
        answer : [
            { text : "vatican city",correct : true },
            { text : "Bhutan",correct :  false},
            { text : "Nepal",correct : false },
            { text : "shri lanka",correct : false },
        ]    
    },{
        question : "which one is the largest continent in world?",
        answer : [
            { text : "Asia",correct : true },
            { text : "Australia",correct : false },
            { text : "Arctic",correct : false },
            { text : "Africa",correct : false },
        ]    
    },
    {
        question : "which one is the largest desert in the world?",
        answer : [
        { text : "kalhari",correct : false },
        { text : "Gobi",correct : false },
        { text : "Sahara",correct : false },
        { text : "Antarctica",correct : true },
    ] 
}  
];

 let currentQuestionIndex= 0;
 let score = 0;

function startQuiz() {
    let currentQuestionIndex= 0;
    let  score =0;
    nextButton.innerHTML="Next";
    showQuestion();
} 

function showQuestion()
{
    // the following function will display the question as well as  list of answers
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML= questionNO + '.'+ currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button= document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function selectAnswer(e)
{
    // the following code will allow you when you select a button it will check the correctness of the answer and if it is correct the button will be changed to green and if the button is incorrec the button will be changed to red
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
    score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    // the following code will allow you to select only 1 answer and after selection the other button will be disabled and the next button will display
    Array.from(answerButton.children).forEach(button=>{
    if(button.dataset.correct === "true")
        {
            button.classList.add("correct")
        }
        button.disabled="true";
        });
        nextButton.style.display = "block";
   
}
function showScore()
{
    resetState()
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
        {
       showQuestion();
        }
    else{
        showScore()
    }
}

function resetState()
{
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();

