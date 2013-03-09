"use strict";

var AvatarContent = function ( $core, $control ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	core:{ 		value:$core    },
	control:{ 	value:$control },
	display:{	value:null , writable:true	}
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

		self.core.width = soul.width;
		self.core.height = soul.height;

		builder.addAnimation("circle", frames, true, 8);
		var spriteSheet = builder.build();

		// create our bitmap animations using the generated sprite sheet, and put them on stage:
		var display = new createjs.BitmapAnimation(spriteSheet);
		display.gotoAndPlay("circle");
		self.core.cosmos.stage.addChild( display );

		display.x = self.core.x;
		display.y = self.core.y;

		//next commit working dragging		

		self.display = display;

		return self.core.avatar;
	};


	self.run = function(){
		self.display.x = self.core.x;
		self.display.y = self.core.y;
		self.display.update = false;
	}

	return self; 
};

exports = module.exports = AvatarContent;