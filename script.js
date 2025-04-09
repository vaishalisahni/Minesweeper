const levelMapper = {
    easy: {
        boardSize: 10,
        mineCount: 5,
        boxSize:40,
        fontSize:20,
    },
    medium: {
        boardSize: 15,
        mineCount: 10,
        boxSize:26,
        fontSize:16,
    },
    hard: {
        boardSize: 20,
        mineCount: 15,
        boxSize:20,
        fontSize:14,
    },

};

function endGame(message) {
    const board = document.querySelector(".minesweeper-board");
    const endScreen = document.querySelector('.minesweeper-endscreen');
    const result = document.querySelector(".minesweeper-endscreen-text");
    const restart = document.querySelector(".minesweeper-endscreen-restart");
    endScreen.style.display = "flex";
    // board.style.visibility = "hidden";
    result.innerText = message;
    restart.addEventListener("click", () => {
        endScreen.style.display = 'none';
        // board.style.visibility = "visible";
        startGame();
    })
}
const levelSelect = document.querySelector(".minesweeper-level");
const restart = document.querySelector(".minesweeper-restart");

function startGame() {

    const flags = document.querySelector(".minesweeper-flag-count");
    const gameBoard = document.querySelector(".minesweeper-board");

    gameBoard.innerHTML = "";

    let level = levelSelect.value;

    let boardSize = levelMapper[level].boardSize;
    let mineCount = levelMapper[level].mineCount;
    let boxSize=levelMapper[level].boxSize;
    let fontSize=levelMapper[level].fontSize;

    let board = [];
    let mines = [];
    let flagsCount = mineCount;
    let revealedBoxCount = 0;
    let gameOver = false;
    flags.textContent = `🚩 ${flagsCount}`;

    generateMines();
    createBoard();
    function generateMines() {
        while (mines.length < mineCount) {
            let r = Math.floor(Math.random() * boardSize);
            let c = Math.floor(Math.random() * boardSize);
            let id = r + "-" + c; //0-2
            console.log(id);
            if (!mines.includes(id)) mines.push(id);
        }

    }


    function createBoard() {
        // let boxSize = boxSizeMap[levelSelect.value];
        for (let i = 0; i < boardSize; i++) {
            const row = document.createElement("div");
            row.classList.add("minesweeper-row", "row");

            let rowArray = [];
            for (let j = 0; j < boardSize; j++) {
                const box = document.createElement("div");

                box.id = i + "-" + j;

                box.style.width = `${boxSize}px`;
                box.style.height = `${boxSize}px`;

                box.style.fontSize=`${fontSize}px`;

                box.classList.add("box", "unrevealed");
                box.addEventListener("click", revealBox);
                box.addEventListener("contextmenu", flagBox); // right click

                rowArray.push(box); // push in array
                row.append(box); // ui
            }
            board.push(rowArray);
            gameBoard.append(row);
        }
    }
    function revealBox(event) {
        if(gameOver) return;
        const box = event.currentTarget;
        const values = box.id.split("-");
        const r = parseInt(values[0]);
        const c = parseInt(values[1]);
        if (box.classList.contains("flag")) return;
        if (box.classList.contains("revealed")) {
            box.removeEventListener("click", revealBox);
            return;
        }
        checkMine(box);
        revealCount(r, c);
        console.log(revealedBoxCount, (boardSize * boardSize -
            mineCount -
            document.querySelectorAll(".revealed.mine").length))
        if (
            revealedBoxCount ===
            (boardSize * boardSize -
                mineCount -
                document.querySelectorAll(".revealed.mine").length)
        ) {
            gameOver = true;
            revealAllMines();
            // alert("You Won");
            endGame("You Won The Game");
        }
        // box.classList.remove("unrevealed");
        // box.classList.add("revealed");
    }
    function flagBox(event) {
        event.preventDefault(); // context menu hide (right-click)
        const box = event.currentTarget;
        if (box.classList.contains("revealed")) return;

        if (box.classList.contains("flag")) {
            box.classList.remove("flag");
            flagsCount++;
        }
        else {
            box.classList.add("flag");
            flagsCount--;
        }
        flags.textContent = `🚩 ${flagsCount}`;
    }
    function checkMine(box) {
        if (mines.includes(box.id) && !box.classList.contains("flag")) {
            box.classList.add("revealed", "mine");
            gameOver = true;
            revealAllMines();
            endGame("You Lost!Try Again...");
        }

    }
    function revealAllMines() {
        mines.forEach(mineIndex => {
            const values = mineIndex.split("-");
            const r = parseInt(values[0]);
            const c = parseInt(values[1]);
            board[r][c].classList.add("revealed", "mine")
        });

    }
    function revealCount(r, c) {
        if (r < 0 || c < 0 || r >= boardSize || c >= boardSize || gameOver) return;
        if (board[r][c].classList.contains("revealed")) return;
        board[r][c].classList.add("revealed");
        revealedBoxCount++;
        let count = 0;
        for (let i = r - 1; i <= r + 1; i++) {
            for (let j = c - 1; j <= c + 1; j++) {
                if (i < 0 || j < 0 || i >= boardSize || j >= boardSize) continue;
                if (mines.includes(i + "-" + j)) count++;
            }
        }
        if (count > 0) {
            board[r][c].innerText = count;
            board[r][c].classList.add("text-"+count)

        } else {
            for (let i = r - 1; i <= r + 1; i++) {
                for (let j = c - 1; j <= c + 1; j++) {
                    if (i < 0 || j < 0 || i >= boardSize || j >= boardSize) continue;
                    // if (mines.includes(i + "-" + j)) count++;
                    revealCount(i, j);
                }
            }
        }
    }
    

}

restart.addEventListener("click",()=>{
    endScreen.style.display = 'none';
    // board.style.visibility = "visible";
    startGame();
})


document.addEventListener("DOMContentLoaded", startGame)

levelSelect.addEventListener("change", () => {
    startGame();
});



{/* <div class="minesweeper-row row">
    <div class="box revealed flag"></div>
    <div class="box revealed mine">2</div>
    <div class="box revealed flag">3</div>
    <div class="box revealed text-5">5</div>
    <div class="box revealed text-4">4</div>
</div>  */}