// Retrieve elements from the DOM
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Function to render questions
function renderQuestions() {
  // Clear existing questions
  questionsElement.innerHTML = "";

  // Iterate through each question
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    // Create question container
    const questionElement = document.createElement("div");

    // Create question text element
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    // Iterate through each choice
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      // Create choice input element
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Check if choice is selected from session storage
      if (getSessionChoice(i) === choice) {
        choiceElement.setAttribute("checked", true);
      }

      // Create choice text element
      const choiceText = document.createTextNode(choice);

      // Append choice elements to question container
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    // Append question container to questions element
    questionsElement.appendChild(questionElement);
  }
}

// Function to retrieve selected choice from session storage
function getSessionChoice(questionIndex) {
  return sessionStorage.getItem(`question-${questionIndex}`);
}

// Function to save selected choice to session storage
function saveSessionChoice(questionIndex, choice) {
  sessionStorage.setItem(`question-${questionIndex}`, choice);
}

// Event listener for submit button click
submitButton.addEventListener("click", function () {
  let score = 0;

  // Iterate through each question
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const selectedChoice = document.querySelector(`input[name="question-${i}"]:checked`);

    // Check if a choice is selected
    if (selectedChoice) {
      const userAnswer = selectedChoice.value;

      // Check if user's answer is correct
      if (userAnswer === question.answer) {
        score++;
      }
    }
  }

  // Display score on the page
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Store score in local storage
  localStorage.setItem("score", score);
});

// Render questions initially
renderQuestions();
