const questions= [
   {
      question:'Who had composed the original Ramayana?',
      answers: [
         {text: "Rishi Valmiki", correct: true},
         {text: "Tulsi Das", correct: false},
         {text: "Sant Ek Nath", correct: false},
         {text: "Anhinanda", correct: false}
      ]
   },
   {
      question:"Lakshmana is considered to be the incarnation of whom?",
      answers: [
         {text: "Lord Vishnu", correct: false},
         {text: "Lord Shiva", correct: false},
         {text: "Lord Brahma", correct: false},
         {text: "Sheshnag", correct: true}
      ]
   },
   {
      question:" What was the name of the forest where Lord Rama, Lakshmana and Goddess Sita stayed during exile?",
      answers: [
         {text: "Aranya", correct: false},
         {text: "Aranyak", correct: false},
         {text: "Dandakaranya", correct: true},
         {text: "Karanya", correct: false}
      ]
   },
   {
      question:"Ravana was a devotee of who among the following God?",
      answers: [
         {text: "Vishnu", correct: false},
         {text: "Brahma", correct: false},
         {text: "Shiva", correct: true},
         {text: "None of the above", correct: false}
      ]
   },
   {
      question:"What was the name of Lord Rama's father?",
      answers: [
         {text: "Shalishuka", correct: false},
         {text: "Nahapana", correct: false},
         {text: "Rajadhiraj", correct: false},
         {text: "Dasaratha", correct: true}
      ]
   },
];

const questionElement=document.getElementById("question");
const answerButtons= document.querySelector('.answer-buttons')
const nextButton= document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
   currentQuestionIndex=0;
   score = 0;
   nextButton.innerHTML= "Next";
   showQuestion();
}

function showQuestion(){
   resetState();
   let currentQuestion= questions[currentQuestionIndex];
   let questionNo=currentQuestionIndex + 1;
   questionElement.innerHTML= questionNo + ". " + currentQuestion.question;

   currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerHTML = answer.text;
      button.classList.add('btn');
      answerButtons.appendChild(button);
      if(answer.correct){
         button.dataset.correct=answer.correct;
      }
      button.addEventListener('click',selectAnswer);
   });
}

function resetState(){
   nextButton.style.display="none";
   while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
   }
}

function selectAnswer(e){
   const selectedBtn=e.target;
   const isCorrect= selectedBtn.dataset.correct === 'true';
   if(isCorrect){
      selectedBtn.classList.add('correct');
      score++;
   }else{
      selectedBtn.classList.add('incorrect');
   }
   Array.from(answerButtons.children).forEach(button =>{
      if(button.dataset.correct === 'true'){
         button.classList.add('correct');
      }
      button.disabled= true;
   });
   nextButton.style.display='block';
}

function showScore(){
   resetState();
   questionElement.innerHTML= `You scored ${score} out of ${questions.length} !`;
   nextButton.innerHTML= 'Play Again';
   nextButton.style.display= "block";
}

function handleNextButton(){
   currentQuestionIndex++;
   if(currentQuestionIndex < questions.length){
      showQuestion();
   }else{
      showScore();
   }
}

nextButton.addEventListener('click', ()=>{
   if(currentQuestionIndex < questions.length){
      handleNextButton();
   }else{
      startQuiz();
   }
})

startQuiz();