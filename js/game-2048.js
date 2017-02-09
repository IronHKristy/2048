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

Game2048.prototype._renderBoard = (function () {
  this.board.forEach(function(row) {
    console.log(row);
  });
});
