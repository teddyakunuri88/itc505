document.addEventListener('DOMContentLoaded', function() {
  const board = document.getElementById('board');
  const clearButton = document.getElementById('clearButton');
  const scoreElement = document.getElementById('score');
  const timerElement = document.getElementById('timer');
  const gridSize = 5; // Adjust grid size as needed

  let score = 0;
  let timer = 0;
  let timerInterval;

  // Function to toggle a square's state
  function toggleSquareState(square) {
    square.classList.toggle('is-off');
  }

  // Function to handle square click
  function handleSquareClick(event) {
    const clickedSquare = event.target;
    const targetSquareIndex = parseInt(clickedSquare.dataset.index);

    // Toggle the clicked square's state
    toggleSquareState(clickedSquare);
    updateScore();
    turnOnRandomSquare(); // Turn on a random square after clicking one
    checkGameSolved();
  }

  // Function to update the score
  function updateScore() {
    score++;
    scoreElement.textContent = `Score: ${score}`;
  }

  // Function to start the timer
  function startTimer() {
    timerInterval = setInterval(() => {
      timer++;
      timerElement.textContent = `Timer: ${timer}`;
    }, 1000);
  }

  // Function to stop the timer
  function stopTimer() {
    clearInterval(timerInterval);
  }

  // Function to reset the game
  function resetGame() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
      if (square.classList.contains('is-off')) {
        square.classList.remove('is-off');
      }
    });
    score = 0;
    timer = 0;
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Timer: ${timer}`;
    stopTimer();
    startTimer();
  }

  // Function to handle clear button click
  clearButton.addEventListener('click', resetGame);

  // Function to check if the game is solved
  function checkGameSolved() {
    const squares = document.querySelectorAll('.square');
    const isSolved = Array.from(squares).every(square => square.classList.contains('is-off'));
    if (isSolved) {
      window.alert(`You win! Your score is ${score} in ${timer} seconds.`);
      stopTimer();
      // You can add additional logic here for a new game or any other actions
    }
  }

  // Function to generate a solvable board
  function generateSolvableBoard() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
      // Simulate random clicks to create a solvable board
      if (Math.random() > 0.5) {
        toggleSquareState(square);
      }
    });
  }

  // Generate the grid of squares inside the board container
  for (let i = 0; i < gridSize ** 2; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.index = i; // Set the dataset index for each square
    square.addEventListener('click', handleSquareClick);
    board.appendChild(square);
  }

  // Function to turn on a random square
  function turnOnRandomSquare() {
    const squares = document.querySelectorAll('.square');
    const randomIndex = Math.floor(Math.random() * squares.length);
    const randomSquare = squares[randomIndex];
    if (!randomSquare.classList.contains('is-off')) {
      toggleSquareState(randomSquare);
    }
  }

  generateSolvableBoard(); // Generate a random but solvable starting configuration
  startTimer(); // Start the timer when the game starts
});
