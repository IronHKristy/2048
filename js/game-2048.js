function Game2048 () {

  //beggining score should be set to zero
  this.score = 0;
  this.board = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  this.hasWon = false;
  this.hasLost = false;

  this._generateTile();
  this._generateTile();
}

//console.log to check for functioning kristysGame = new Game2048()

Game2048.prototype._generateTile = function () {
  var tileValue;

  if (Math.random() < 0.8) {
    tileValue = 2;
  } else {
    tileValue = 4;
  }

  var emptyTile = this._getAvailablePosition();

  if (emptyTile !== null) {
    var row = emptyTile.x;
    var col = emptyTile.y;
    this.board[row][col] = tileValue;
  }
};

Game2048.prototype._getAvailablePosition = function () {
  var emptyTiles = [];



//when looping through 2d array, must nest two forEach statements to check
//within each row and then each column within the row.
  this.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex) {
      if (cell === null) {
        emptyTiles.push({ x: rowIndex, y: colIndex });
      }
    });
  });


  //this prevents us from adding new tile because there are no spaces available
  //but doesn't yet mean game is over because maybe can still merge tiles
  //?not sure that makes sense?
  if (emptyTiles.length === 0) {
    return null;
  }

  var randomIndex = Math.floor(Math.random() * emptyTiles.length);
  return emptyTiles[randomIndex];
};

Game2048.prototype._renderBoard = function () {
  this.board.forEach(function(row) {
    console.log(row);
  });
};

Game2048.prototype._moveLeft = function () {
  var updatedBoard = [];
  this.board.forEach(function (row) {
    //1. Remove empties from row
    var newRow = [];

    row.forEach(function (cell) {
      if (cell !== null) {
        newRow.push(cell);
      }
    });

    //2. Merge tiles in row that are together and the same number.
    for (var i = 0; i < newRow.length; i += 1) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        newRow[i + 1] = null;
      }
    }

    //3. remove new empties in the middle
    //e.g. [8,8,4] results in [8,null,4]
    //we want [8,4,null]
    var moved = [];

    newRow.forEach(function (cell) {
      if (cell !== null) {
        moved.push(cell);
      }
    });

    //4. push nulls until row has length 4 again
    while (moved.length < 4) {
      moved.push(null);
    }

    updatedBoard.push(moved);
  });

  this.board = updatedBoard;
};


//move right...............................................................
Game2048.prototype._moveRight = function () {
  var updatedBoard = [];
  this.board.forEach(function (row) {
    //1. Remove empties from row
    var newRow = [];

    row.forEach(function (cell) {
      if (cell !== null) {
        newRow.push(cell);
      }
    });

    //2. Merge tiles in row that are together and the same number.
    for (var i = (newRow.length - 1); i >= newRow.length; i -= 1) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        newRow[i - 1] = null;
      }
    }

    //3. remove new empties in the middle
    //e.g. [8,8,4] results in [8,null,4]
    //we want [8,4,null]
    var moved = [];

    newRow.forEach(function (cell) {
      if (cell !== null) {
        moved.push(cell);
      }
    });

    //4. push nulls until row has length 4 again
    while (moved.length < 4) {
      moved.unshift(null);
    }

    updatedBoard.push(moved);
  });

  this.board = updatedBoard;
};


kristysGame = new Game2048();
kristysGame._renderBoard();
kristysGame._moveLeft();
kristysGame._renderBoard();
