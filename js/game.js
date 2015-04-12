var game = new Phaser.Game(800, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var colors = new tracking.ColorTracker(['yellow']);

function preload() {
	game.load.image('sky', 'images/sky.png');
    game.load.image('ground', 'images/platform.png');
    game.load.image('star', 'images/star.png');
    game.load.spritesheet('dude', 'images/dude.png', 32, 48);
}

function create() {
	//Arcade physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//use phasers builtin keyboard manager
	cursors = game.input.keyboard.createCursorKeys();

	//background
	game.add.sprite(0, 0, 'sky');

	platforms = game.add.group();

	platforms.enableBody = true;

	//create ground
	var ground = platforms.create(0, game.world.height - 64, 'ground');

	ground.scale.setTo(2, 2);

	ground.body.immovable = true;

	//creating two ledges
	var ledge = platforms.create(400, 400, 'ground');

	ledge.body.immovable = true;

	ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;

    //create player
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

}

function update() {

	//  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    colors.on('track', function(event) {
    if (event.data.length === 0) {
      // No colors were detected in this frame.
    } 

    else {
      event.data.forEach(function(rect) {
        if (rect.height > 60 && rect.width > 90)
        {
        	//print location
        	console.log(rect.x, rect.y, rect.height, rect.width, rect.color);

        	//jump
    		if (rect.y < 80)
    		player.body.velocity.y = -350;

    		//move right
    		if (rect.x < 80)
    		player.body.velocity.x = 150;
        	player.animations.play('right');

    		//move left
    		if (rect.x > 220)
    		player.body.velocity.x = -150;
        	player.animations.play('left');
        }	 
      });
    }
    
  	});


    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}

tracking.track('#myVideo', colors, {camera: true});