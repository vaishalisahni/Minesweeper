function startGame() {
    const levelSelect = document.querySelector(".minesweeper-level");
    const flags = document.querySelector(".minesweeper-flag-count");
    const restart = document.querySelector(".minesweeper-restart");
    const gameBoard = document.querySelector(".minesweeper-board");

    let level = levelSelect.value;

    let board = [];
    let boardSize = levelMapper[level].boardSize;
    let mineCount = levelMapper[level].mineCount;
    let mines = [];
    let flagsCount = mineCount;
    let revealedBoxCount = 0;
    let gameOver = false;
    // let a=true;
    while(mines.length<mineCount){
        let random=Math.floor(Math.random()*boardSize);
        console.log(random);
        mines.push(random);
    }

    createBoard();

    function createBoard() {
        for (let i = 0; i < boardSize; i++) {
            const row = document.createElement("div");
            row.classList.add("minesweeper-row", "row");

            let rowArray = [];
            for (let j = 0; j < boardSize; j++) {
                const box = document.createElement("div");
                box.classList.add("box", "unrevealed");
                box.addEventListener("click",revealBox);
                box.addEventListener("contextmenu",flagBox); // right click
                rowArray.push(box);
                row.append(box);
            }
            board.push(rowArray);
            gameBoard.append(row);
        }
    }
    function revealBox(event) {
        const box = event.currentTarget;
        if (box.classList.contains("flag")) return;
        if (box.classList.contains("revealed")) {
            box.removeEventListener("click", revealBox);
            return;
          }
          checkMine(box);
          revealCount();
        box.classList.add("revealed");
    }
    function flagBox(event){
        event.preventDefault(); // context menu hide
        const box = event.currentTarget;
        if (box.classList.contains("revealed")) return;
        
        if(box.classList.contains("flag")){
            box.classList.remove("flag");
            flagsCount++;
        }
        else{
            box.classList.add("flag");
            flagsCount--;
        }
    }
    function checkMine(box){

    }
    function revealCount(){

    }


}
document.addEventListener("DOMContentLoaded", startGame)

const levelMapper = {
    easy: {
        boardSize: 10,
        mineCount: 5,
    },
    medium: {
        boardSize: 15,
        mineCount: 10,
    },
    hard: {
        boardSize: 20,
        mineCount: 15,
    },

};
{/* <div class="minesweeper-row row">
    <div class="box revealed flag"></div>
    <div class="box revealed mine">2</div>
    <div class="box revealed flag">3</div>
    <div class="box revealed text-5">5</div>
    <div class="box revealed text-4">4</div>
</div>  */}