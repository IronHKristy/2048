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
  this.boardHasChanged = false;

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

  console.log('Current Score: ' + this.score);
};

Game2048.prototype._moveLeft = function () {
  var updatedBoard = [];
  var theGame = this;

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

        theGame._updateScore(newRow[i]);
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
    if (moved.length !== row.length) {
      theGame.boardHasChanged = true;
    }

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
  var theGame = this;

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

        theGame._updateScore(newRow[i]);
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
    if (moved.length !== row.length) {
      theGame.boardHasChanged = true;
    }

    while (moved.length < 4) {
      moved.unshift(null);
    }


    updatedBoard.push(moved);
  });

  this.board = updatedBoard;
};

Game2048.prototype._transposeMatrix = function () {
  for (var row = 0; row < this.board.length; row++) {
    for (var column = row+1; column < this.board.length; column++) {
      var temp = this.board[row][column];
      this.board[row][column] = this.board[column][row];
      this.board[column][row] = temp;
    }
  }
};

Game2048.prototype.moveUp = function () {
  this._transposeMatrix();
  var boardChanged = this._moveLeft();
  this._transposeMatrix();
  return boardChanged;
};

Game2048.prototype.moveDown = function () {
  this._transposeMatrix();
  var boardChanged = this._moveRight();
  this._transposeMatrix();
  return boardChanged;
};

Game2048.prototype.move = function (direction) {
  if (this.hasWon || this.hasLost) {
    return;
  }

  switch (direction) {
    case 'up':
    this.moveUp();
    break;

    case 'down':
    this.moveDown();
    break;

    case 'left':
    this._moveLeft();
    break;

    case 'right':
    this._moveRight();
    break;
  }

  if (this.boardHasChanged) {
    this._generateTile();
    this.boardHasChanged = false;
  }
};

Game2048.prototype._updateScore = function (points) {
  this.score += points;

  if (points === 2048) {
    this.hasWon = true;
  }
};

Game2048.prototype._updateScore = function (points) {
  this.score += points;
};

// kristysGame = new Game2048();
// kristysGame._renderBoard();
// kristysGame._moveLeft();
// kristysGame._renderBoard();
