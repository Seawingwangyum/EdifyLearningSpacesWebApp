/**
 * function that builds all the quiz question, handles
 * scoring and displays a final message to user.
 *
 */
(function() {
  const myQuestions = [
    {
      question: "Are you a resident of B.C.? or will you be moving" +
       " to B.C. in the near future ",
      answers: {
        a: "Yes",
        b: "No"
      },
      correctAnswer: "a"
    },
    {
      question: "Do you have a keen interest in working with children?",
      answers: {
        a: "Yes",
        b: "No"
      },
      correctAnswer: "a"
    },
    {
      question: "Are you a responsible adult?",
      answers: {
        a: "Yes",
        b: "No"
      },
      correctAnswer: "a"
    },
    {
      question: "Do you like hands-on activities?",
      answers: {
        a: "Yes",
        b: "No"
      },
      correctAnswer: "a"
    },
    {
      question: "Do you have sufficient space to teach children?",
      answers: {
        a: "Yes",
        b: "No"
      },
      correctAnswer: "a"
    },
    {
      question: "Are you creative?",
      answers: {
        a: "Yes",
        b: "No"
      },
      correctAnswer: "a"
    },
    {
      question: "Are you frustrated with the current education model?",
      answers: {
        a: "Yes",
        b: "No"
      },
      correctAnswer: "a"
    }
  ];

  function buildQuiz() {
    
    const output = [];

    
    myQuestions.forEach((currentQuestion, questionNumber) => {
      
      const answers = [];

      
      for (letter in currentQuestion.answers) {
        
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
   
    const answerContainers = quizContainer.querySelectorAll(".answers");

    
    let numCorrect = 0;

    
    myQuestions.forEach((currentQuestion, questionNumber) => {
      
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      
    });

    
    if (numCorrect >= 5 ){
    resultsContainer.innerHTML = `You are
    a great candidate to become an Edify Provider, apply today!`;
}else{
  resultsContainer.innerHTML = `You should
  look into what it takes to become an Edify Provider.`
}
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function goHome() {
    location.href = '/landing_page'
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const homeButton = document.getElementById("home");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  homeButton.addEventListener("click", goHome);
})();
