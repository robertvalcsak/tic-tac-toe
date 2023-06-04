const ticTacToe = () => {
    const gameBoard = document.querySelector("#board");
    const gameStatus = document.querySelector("#gameStatus");
    const restart = document.querySelector('#restart');
    let boardSize = 10;
    const player1 = "X";
    const player2 = "O";
    let winCount = 5;
    let drawCount = boardSize * boardSize;

    let board = [];
    let currentPlayer = player1;
    let gameOver = false;

    function startGame(boardSize1, winCount1) {
        gameOver = false;
        currentPlayer = player1;
        board = [];
        boardSize = boardSize1;
        winCount = winCount1;
        drawCount = boardSize1 * boardSize1;


        initBoard();
        renderGameStatus(`Player ${currentPlayer}'s turn`);
        handleClick();
    }

    function initBoard() {
        for (let i = 0; i < boardSize; i++) {
            let row = [];
            for (let j = 0; j < boardSize; j++) {
                row.push(null);
            }
            board.push(row);
        }
        renderBoard();
    }

    function renderBoard() {
        gameBoard.innerHTML = "";
        let html = '';
        
        for (let i = 0; i < boardSize; i++) {
            html += `<div class="row">`;
            for (let j = 0; j < boardSize; j++) {
                html += `<div class="cell" data-row="${i}" data-col="${j}"></div>`;
            }
            html += `</div>`;
        }
        gameBoard.innerHTML = html;
    }


    function handleClick() {
        restart.addEventListener('click', function() {
            startGame(10, 5);
        })
        gameBoard.addEventListener("click", function (event) {
            const field = event.target;
            const row = parseInt(field.getAttribute("data-row"));
            const col = parseInt(field.getAttribute("data-col"));

            if (!gameOver && board[row][col] === null) {
                board[row][col] = currentPlayer;
                field.innerHTML = currentPlayer;
                if (checkWin(row, col)) {
                    gameOver = true;
                    renderGameStatus(`Player ${currentPlayer} wins!`);
                } else {
                    currentPlayer = getNextPlayer();
                    renderGameStatus(`Player ${currentPlayer}'s turn`);
                }
                checkDraw();
            }
        });
    }

    function renderGameStatus(text) {
        gameStatus.innerHTML = `<p class="gameInfo">${text}</p>`;
    }

    function checkWin(row, col) {
        return checkHorizontalWin(row, col) || checkVerticalWin(row, col) || checkDiagonalWin(row, col);
    }

    function checkHorizontalWin(row, col) {
        const startCol = Math.max(0, col - winCount + 1);
        const endCol = Math.min(col + winCount - 1, boardSize - 1);
        let count = 0;

        for (let c = startCol; c <= endCol; c++) {
            if (board[row][c] === currentPlayer) {
                count++;
                if (count === winCount) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    function checkVerticalWin(row, col) {
        const startRow = Math.max(0, row - winCount + 1);
        const endRow = Math.min(row + winCount - 1, boardSize - 1);
        let count = 0;
      
        for (let r = startRow; r <= endRow; r++) {
          if (board[r][col] === currentPlayer) {
            count++;
            if (count === winCount) {
              return true;
            }
          } else {
            count = 0;
          }
        }
      
        return false;
      }

      function checkDiagonalWin(row, col) {
        const startRow = Math.max(0, row - winCount + 1);
        const endRow = Math.min(row + winCount - 1, boardSize - 1);
        const startCol = Math.max(0, col - winCount + 1);
        const endCol = Math.min(col + winCount - 1, boardSize - 1);
        let count = 0;
      
        
        let r = row - Math.min(row - startRow, col - startCol);
        let c = col - Math.min(row - startRow, col - startCol);
        while (r <= endRow && c <= endCol) {
          if (board[r][c] === currentPlayer) {
            count++;
            if (count === winCount) {
              return true;
            }
          } else {
            count = 0;
          }
          r++;
          c++;
        }
      

        count = 0; 
        r = row + Math.min(endRow - row, col - startCol);
        c = col - Math.min(endRow - row, col - startCol);
        while (r >= startRow && c <= endCol) {
          if (board[r][c] === currentPlayer) {
            count++;
            if (count === winCount) {
              return true;
            }
          } else {
            count = 0;
          }
          r--;
          c++;
        }
      
        return false;
      }
      
    function checkDraw() {
      drawCount--;
      if(drawCount === 0){
        gameOver = true;
        renderGameStatus('Draw! The game is tied.')
      }
    }

    function getNextPlayer() {
        return currentPlayer === player1 ? player2 : player1;
    }
    startGame(boardSize, winCount);
};
let game = ticTacToe();

function logout() {
    window.location.assign('login.html');
  };