
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = false; 

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    const voiceMessage = new Audio("lets play tic tac toe.mp3");
    voiceMessage.play();
    document.getElementById("startGame").style.display = "none";
    gameActive = true; 
    resetGame(); 
}

document.getElementById("startGame").addEventListener("click", startGame);


function speakResult(result) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(result);
    synth.speak(utterance);
}

function checkWinner() {
    for (let combo of winningCombos) {
                const [a, b, c] = combo;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    gameActive = false;
                    message.innerText = `Player ${gameBoard[a]} wins!`; 
                    cells[a].style.backgroundColor = "#1237cdea";
                    cells[b].style.backgroundColor = "#1237cdea";
                    cells[c].style.backgroundColor = "#1237cdea";
                    speakResult(`Player ${gameBoard[a]} wins!`);
                    return;
                }
            }
            if (!gameBoard.includes("") && gameActive) {
                gameActive = false;
                message.innerText = "It's a tie!";
                speakResult("It's a tie!");
            }
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.id;

    if (gameBoard[cellIndex] === "" && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.style.backgroundColor = "#6c3dd8f5";
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.innerText = `Player ${currentPlayer}'s turn`;
        checkWinner();
    }
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    cells.forEach(cell => {
        cell.innerText = "";
        cell.style.backgroundColor = "#7187dc";
        // #eee
        // message.innerText = "Play Again";
    });
    message.innerText = "Player X's turn";
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);


