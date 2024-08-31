document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const status = document.querySelector(".status");
    const resetButton = document.querySelector(".reset-btn");
    const playerXButton = document.getElementById("playerX");
    const playerOButton = document.getElementById("playerO");

    let currentPlayer = "";
    let gameActive = false;
    let board = ["", "", "", "", "", "", "", "", ""];

    const startGame = (selectedPlayer) => {
        currentPlayer = selectedPlayer;
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;

        cells.forEach(cell => {
            cell.textContent = "";
            cell.addEventListener("click", handleCellClick);
        });
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.id);

        if (!gameActive || board[cellIndex] !== "") return;

        board[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkWinner();
        switchPlayer();

        if (gameActive && currentPlayer === "O") {
            setTimeout(botTurn, 1000); // Delay bot turn for 1 second
        }
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    };

    const checkWinner = () => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                status.textContent = `Player ${currentPlayer} wins!`;
                status.classList.add("game-over");
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            status.textContent = "It's a tie!";
            status.classList.add("game-over");
        }
    };

    const botTurn = () => {
        const availableCells = Array.from(cells).filter(cell => cell.textContent === "");
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const selectedCell = availableCells[randomIndex];
        selectedCell.click();
    };

    const resetGame = () => {
        currentPlayer = "";
        gameActive = false;
        board = ["", "", "", "", "", "", "", "", ""];
        status.textContent = "Select your player:";
        status.classList.remove("game-over");

        cells.forEach(cell => {
            cell.textContent = "";
            cell.removeEventListener("click", handleCellClick);
        });
    };

    playerXButton.addEventListener("click", () => startGame("X"));
    playerOButton.addEventListener("click", () => startGame("O"));
    resetButton.addEventListener("click", resetGame);
});
