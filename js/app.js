console.log('app.js');

// 1. create game object
var myGlobalGame;

$(document).ready(function () {
  myGlobalGame = new Game2048();

// 2. take initial tiles and put them on screen
  renderTiles();
  loadSounds();
// 3. handle keyboard events
$(document).keydown(moveGame);
});

function moveGame (ev) {
  console.log("hello");

  var acceptableKeys = [37, 65, 38, 87, 39, 68, 40, 83];

  if(!acceptableKeys.includes(ev.keyCode)) {
    return;
}

//prevent arrow from scrolling
  ev.preventDefault();

// 4. move board in object based on keypresses

    switch (ev.keyCode) {
      case 37:
      case 65:
      myGlobalGame.move('left');
      break;
      case 38:
      case 87:
      myGlobalGame.move('up');
      break;
      case 39: //right arrow
      case 68: // d
      myGlobalGame.move('right');
      break;
      case 40:
      case 83:
      myGlobalGame.move('down');
      break;
    }



// 5. updating the screen based on new board state
      renderTiles();
      _updateScore();


// 6. win or lose... maybe
      checkIfDone();
}

      function _updateScore() {

        $('.score-number').text(myGlobalGame.score);
      }


      function checkIfDone() {
        if (myGlobalGame.hasWon) {
        $('#game-board').remove();
        var winnerHtml = '<img src="https://media1.giphy.com/media/26xBKwkLLvr6NSMi4/200.gif#7">';
        $('#container').append(winnerHtml);
      }

       else if (myGlobalGame.hasLost) {
        $('#game-board').remove();
        var loserHtml = '<img src="https://media3.giphy.com/media/l0Ex6JSGDMpdh5VPW/200.gif#10">';
        $('#container').append(loserHtml);
      }
    }

function renderTiles() {
  $('#tile-container').empty();

  myGlobalGame.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex) {
      if (cell === null) {
        return;
      }

      console.log('Tile value: ' + cell);
      console.log('Row: ' + rowIndex);
      console.log('Column: ' + colIndex);

      var tileHtml = '<div class="tile tile-position-' + rowIndex + '-' + colIndex + ' val-' + cell + '"> ' + cell + ' </div>';
      $('#tile-container').append(tileHtml);
    });
  });
}


function loadSounds() {
  ion.sound({
    sounds: [{name: "pop_cork"}, {name: "branch_break"}],

    path: "../lib/sounds/ion/sounds/",
    preload: true,
    volume: 1.0
  });
}
