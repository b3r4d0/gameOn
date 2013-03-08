"use strict";

var AvatarContent = function ( $core, $control ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	core:{ 		value:$core    },
	control:{ 	value:$control }
	});

	self.awake = function (){
		
		if ( self.core.soul == null ) throw new Error( "You got no SOUL");

		var soul = self.core.soul;

		var max = soul.toonFrames.length;
		//lets create some images
		var frames = [];
		var i = 0;

		var builder = new createjs.SpriteSheetBuilder();
		for ( i = 0; i < max; i++ )
		{
			var src = soul.toonFrames[ i ];
			var bitmap = new createjs.Bitmap( src );
			var index = builder.addFrame( bitmap, new createjs.Rectangle(-0,-0, soul.width, soul.height ));
			frames.push( index );
		}

		builder.addAnimation("circle", frames, true, 8);
		var spriteSheet = builder.build();

		// create our bitmap animations using the generated sprite sheet, and put them on stage:
		var circle2 = new createjs.BitmapAnimation(spriteSheet);
		circle2.gotoAndPlay("circle");
		self.core.cosmos.stage.addChild(circle2);

		circle2.x = self.core.x;
		circle2.y = self.core.y;
		
		return self.core.avatar;
	};

	return self; 
};

exports = module.exports = AvatarContent;