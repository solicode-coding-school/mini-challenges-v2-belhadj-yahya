let moving; 
let hightScore = document.querySelector(".high-score");
let test = localStorage.getItem("high-score") || 0;

function gameStartMenu() {
  let start = document.querySelector(".play");
  let black2 = document.querySelector(".black2");
  black2.style.display = "block";
  start.style.display = "flex";
  hightScore.innerText = `High Score : ${test}`;
  let choice;
  document.addEventListener("click", function(event) {
    if (event.target.classList.contains("yes")) {
      choice = true;
      black2.style.display = "none";
      start.style.display = "none";
      startGame(choice);
    } else if (event.target.classList.contains("no")) {
      choice = false;
      black2.style.display = "none";
      gameStartMenu();
    }
  }, { once: true }); 
}

gameStartMenu();

function startGame(choice) {
  if (choice === true) {
    let foodX;
    let foodY;
    let snakeHeadX = 5;
    let snakeHeadY = 10;
    let movementX = 0, movementY = 0;
    let snakeBody = [];
    let gameState = false;
    let score = 0;

    

  
    let playBord = document.querySelector(".game-bord");
    let scorespan = document.querySelector(".score");

    hightScore.innerText = `High Score : ${test}`;

    let foodplace = function() {
      foodX = Math.floor(Math.random() * 30) + 1;
      foodY = Math.floor(Math.random() * 30) + 1;
    };

    let gameOver = function() {
      clearInterval(moving); 
      document.removeEventListener("keydown", changeDirection); 
      gameStartMenu(); 
    };

    let changeDirection = function(e) {
      if (e.key === "ArrowUp" && movementY != 1) {
        movementX = 0;
        movementY = -1;
      } else if (e.key === "ArrowDown" && movementY != -1) {
        movementX = 0;
        movementY = 1;
      } else if (e.key === "ArrowLeft" && movementX != 1) {
        movementX = -1;
        movementY = 0;
      } else if (e.key === "ArrowRight" && movementX != -1) {
        movementX = 1;
        movementY = 0;
      }
     
      inGameItems();
    };

    const inGameItems = function() {
      if (gameState) {
        return gameOver();
      }
      scorespan.innerText = `score : ${score}`;
      let playObjects = `<div class='food' style='grid-area:${foodY} / ${foodX}'></div>`;
      if (snakeHeadX === foodX && snakeHeadY === foodY) {
        foodplace();
        snakeBody.push([foodX, foodY]);
        score++;
        test = score >= test ? score : test;
        localStorage.setItem("high-score", test);
        scorespan.innerText = `score : ${score}`;
        hightScore.innerText = `High Score : ${test}`;
      }

      // Moving snake body
      for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
      }
      snakeBody[0] = [snakeHeadX, snakeHeadY];
      snakeHeadX += movementX;
      snakeHeadY += movementY;

      if (snakeHeadX <= 0 || snakeHeadX > 30 || snakeHeadY <= 0 || snakeHeadY > 30) {
        gameState = true;
      }

      for (let i = 0; i < snakeBody.length; i++) {
        playObjects += `<div class='head' style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
          gameState = true;
        }
      }
      playBord.innerHTML = playObjects;
    };

    foodplace();
    moving = setInterval(inGameItems, 125);
    document.addEventListener("keydown", changeDirection);
  } else if (choice === false) {
    console.log("No");
  }
}
