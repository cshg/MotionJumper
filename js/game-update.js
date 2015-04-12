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