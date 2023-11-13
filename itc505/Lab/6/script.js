document.addEventListener("DOMContentLoaded", function () {
  const choices = ["rock", "paper", "scissors"];

  function computerPlay() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function playRound(playerSelection) {
    const computerSelection = computerPlay();

    let result = "";
    let explanation = "";

    if (playerSelection === computerSelection) {
      result = "It's a tie!";
      explanation = "You both chose " + playerSelection + ".";
    } else if (
      (playerSelection === "rock" && computerSelection === "scissors") ||
      (playerSelection === "paper" && computerSelection === "rock") ||
      (playerSelection === "scissors" && computerSelection === "paper")
    ) {
      result = "You win!";
      explanation =
        "Computer chose " +
        computerSelection +
        ". " +
        playerSelection +
        " beats " +
        computerSelection +
        ".";
    } else {
      result = "You lose!";
      explanation =
        "Computer chose " +
        computerSelection +
        ". " +
        computerSelection +
        " beats " +
        playerSelection +
        ".";
    }

    displayResult(result, explanation);
  }

  function displayResult(result, explanation) {
    const resultText = document.getElementById("result-text");
    const computerChoiceText = document.getElementById("computer-choice");

    resultText.textContent = result;
    computerChoiceText.textContent = explanation;

    // Hide choices and display play again button
    const choicesDiv = document.querySelector(".choices");
    const playAgainButton = document.getElementById("play-again");

    choicesDiv.style.display = "none";
    playAgainButton.style.display = "block";
  }

  function resetGame() {
    const choicesDiv = document.querySelector(".choices");
    const playAgainButton = document.getElementById("play-again");
    const resultText = document.getElementById("result-text");
    const computerChoiceText = document.getElementById("computer-choice");

    // Reset display
    choicesDiv.style.display = "flex";
    playAgainButton.style.display = "none";
    resultText.textContent = "";
    computerChoiceText.textContent = "";
  }

  const rockButton = document.getElementById("rock");
  const paperButton = document.getElementById("paper");
  const scissorsButton = document.getElementById("scissors");
  const playAgainButton = document.getElementById("play-again");

  rockButton.addEventListener("click", function () {
    playRound("rock");
  });

  paperButton.addEventListener("click", function () {
    playRound("paper");
  });

  scissorsButton.addEventListener("click", function () {
    playRound("scissors");
  });

  playAgainButton.addEventListener("click", resetGame);
});
