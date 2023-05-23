// Configurações do jogo
var rows = 8;
var cols = 8;
var bombCount = 10;

// Variável global para o tabuleiro
var board;

// Função para criar o tabuleiro vazio
function createEmptyBoard() {
  var board = new Array(rows);
  for (var i = 0; i < rows; i++) {
    board[i] = new Array(cols);
    for (var j = 0; j < cols; j++) {
      board[i][j] = {
        bomb: false,
        revealed: false,
        count: 0
      };
    }
  }
  return board;
}

// Função para posicionar as bombas no tabuleiro
function placeBombs(board) {
  var bombsPlaced = 0;
  while (bombsPlaced < bombCount) {
    var row = Math.floor(Math.random() * rows);
    var col = Math.floor(Math.random() * cols);
    if (!board[row][col].bomb) {
      board[row][col].bomb = true;
      bombsPlaced++;
    }
  }
}

// Função para contar o número de bombas ao redor de cada célula
function countBombs(board) {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (!board[i][j].bomb) {
        var count = 0;
        for (var x = -1; x <= 1; x++) {
          for (var y = -1; y <= 1; y++) {
            var row = i + x;
            var col = j + y;
            if (row >= 0 && row < rows && col >= 0 && col < cols) {
              if (board[row][col].bomb) {
                count++;
              }
            }
          }
        }
        board[i][j].count = count;
      }
    }
  }
}

// Função para revelar uma célula
function revealCell(row, col) {
  if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col].revealed) {
    return;
  }

  board[row][col].revealed = true;

  if (board[row][col].bomb) {
    gameOver();
  } else if (board[row][col].count === 0) {
    revealNeighbors(row, col);
  }

  if (checkWin()) {
    gameWon();
  }
}

// Função para revelar os vizinhos de uma célula vazia
function revealNeighbors(row, col) {
  for (var x = -1; x <= 1; x++) {
    for (var y = -1; y <= 1; y++) {
      var neighborRow = row + x;
      var neighborCol = col + y;
      if (neighborRow >= 0 && neighborRow < rows && neighborCol >= 0 && neighborCol < cols) {
        revealCell(neighborRow, neighborCol);
      }
    }
  }
}

// Função para verificar se todas as células não bomba foram reveladas
function checkWin() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
            if (!board[i][j].bomb && !board[i][j].revealed) {
        return false;
      }
    }
  }
  return true;
}

// Função para lidar com o fim do jogo (perda)
function gameOver() {
  // Implemente a lógica de fim de jogo aqui
  console.log("Você perdeu!");
}

// Função para lidar com o fim do jogo (vitória)
function gameWon() {
  // Implemente a lógica de fim de jogo aqui
  console.log("Você venceu!");
}

// Função para exibir o tabuleiro na página HTML
function renderBoard() {
  var container = document.getElementById("board");

  // Limpar o conteúdo atual do tabuleiro
  container.innerHTML = "";

  // Loop para criar as células do tabuleiro
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.col = j;

      if (board[i][j].revealed) {
        cell.classList.add("revealed");
        if (board[i][j].bomb) {
          cell.classList.add("bomb");
        } else {
          cell.textContent = board[i][j].count > 0 ? board[i][j].count : "";
        }
      }

      container.appendChild(cell);
    }
  }
}

// Função para iniciar um novo jogo
function newGame() {
  board = createEmptyBoard();
  placeBombs(board);
  countBombs(board);
  renderBoard();
}

// Event listener para clique em uma célula
document.addEventListener("click", function(event) {
  var target = event.target;
  if (target.matches(".cell")) {
    var row = parseInt(target.dataset.row);
    var col = parseInt(target.dataset.col);
    revealCell(row, col);
    renderBoard();
  }
});

// Iniciar novo jogo ao carregar a página
newGame();
