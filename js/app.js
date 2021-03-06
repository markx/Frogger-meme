// Enemies our player must avoid
var Enemy = function(col, row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.size = 80;


    this.col= typeof col !== 'undefined' ?  col : 0;
    this.x = this.col * 101;

    this.row= typeof row !== 'undefined' ?  row : 0 ;
    this.y = this.row * 83 + 55;

    this.speed= typeof speed !== 'undefined' ?  speed : 30;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    if(this.y == player.y && Math.abs(this.x-player.x)<this.size ){
      //collision
      setTimeout(function(){ player.reset(); }, 100);
    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
  this.sprite = 'images/char-boy.png';
  this.reset();
}

Player.prototype.reset = function(){
  this.row = 4
  this.col = 2
}


Player.prototype.update = function(){
  this.y= this.row*83+55
  this.x= this.col*101

};
Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
  switch (key) {
    case 'left':
      this.col--;
      break;
    case 'right':
      this.col++;
      break;
    case 'up':
      this.row--;
      break;
    case 'down':
      this.row++;
      break;
    default:
  }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i=0; i<3; i++){
    allEnemies.push(new Enemy(i, i));
}

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
