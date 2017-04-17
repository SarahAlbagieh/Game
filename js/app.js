
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 100 * Math.floor(Math.random() * (-1 - -5 + 1) + -5);
    this.y = (80 * Math.floor(Math.random() * (3 - 1 + 1) + 1)) + -20;
    this.speed = Math.floor(Math.random() * (300 - 100)) + 100;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    this.x += this.speed * dt;


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (this.x > 500) {
        this.x = -20 - 80;
        this.speed = Math.floor(Math.random() * (300 - 100)) + 100;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




//PLAYER
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 330;
};

//checking if there is any collision the method is from MDN and it's called 2D collision detection
Player.prototype.collisionCheck = function() {

    var enemySpace = null;
    var playerSpace = {
        x: this.x,
        y: this.y,
        width: 50,
        height: 50
    };

    for (var enemy of allEnemies) {
        enemySpace = {
            x: enemy.x,
            y: enemy.y,
            width: 50,
            height: 50
        };

        if (enemySpace.x < playerSpace.x + playerSpace.width &&
            enemySpace.x + enemySpace.width > playerSpace.x &&
            enemySpace.y < playerSpace.y + playerSpace.height &&
            enemySpace.height + enemySpace.y > playerSpace.y) {

            this.x = 200;
            this.y = 330;
        }
    }
};
//resting the player postion to start point

Player.prototype.update = function() {
    if (this.y === 0) {
        this.x = 200;
        this.y = 330;

    }
    this.collisionCheck();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
Player.prototype.handleInput = function(input) {
    switch (input) {
        case 'left':
            this.x -= 100;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'up':
            this.y -= 80;
            break;
        case 'down':
            this.y += 80;
            break;
    }

    if (this.x < 0)
        this.x = 0;
    else if (this.x > 400)
        this.x = 400;
    else if (this.y < 0)
        this.y = 0;
    else if (this.y > 410)
        this.y = 410;
    else {}

};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();
//allEnemies.randomLocation();
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