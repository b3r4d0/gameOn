"use strict";

var AvatarContent = function ( $core, $control ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	core:{ 		value:$core    },
	control:{ 	value:$control },
	display:{	value:null , writable:true	}
	});

	self.createFrames = function( list ){
		var soul = self.core.soul;

		var max = list.length;
		var frames = [];
		var i = 0;

		for ( i = 0; i < max; i++ )
		{
			var src = list[ i ];
			src = soul.toonFrames[ src];
			frames.push( src );
		};

		return frames;
	};

	self.createSpriteSheet = function( list ){
		
		//var spriteSheet;
		//
		return spriteSheet;

	};

	self.onPress = function(evt) {
					
					if ( self.core.soul.onPress != null ) self.core.soul.onPress( evt );
					trace( "sayt my name " + self.core.type );
					//trace( self.core.soul.action() )
					// bump the target in front of it's siblings:
					//container.addChild(target);
					//var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};

					// add a handler to the event object's onMouseMove callback
					// this will be active until the user releases the mouse button:
					//evt.onMouseMove = function(ev) {
					//	target.x = ev.stageX+offset.x;
					//	target.y = ev.stageY+offset.y;
						// indicate that the stage should be updated on the next tick:
						//update = true;
					//}
				}

	self.createToon = function( id, list, builder ){

		var i = 0;
		var bitmap;
		var max = list.length;
		var frames = [];

		for ( i = 0; i < max; i++ )
		{
			var src = list[ i ];
			//trace(" do you have a source " + src );
			var bitmap = new createjs.Bitmap( src );
			var index = builder.addFrame( bitmap, new createjs.Rectangle(-0,-0, self.core.width, self.core.height ));
			frames.push( index );


		}

		builder.addAnimation( id, frames, true, 2);
	}

	self.play = function( id ){
			self.display.gotoAndPlay( id );
	}

	self.awake = function (){
		
		if ( self.core.soul == null ) throw new Error( "You got no SOUL");
		var soul = self.core.soul;
		if ( soul.awake != null ) soul.awake( self.core.avatar);
		self.core.width = soul.width;
		self.core.height = soul.height;

		var max = soul.toonFrames.length;

		var builder = new createjs.SpriteSheetBuilder();

		for( var p in soul.toons)
		{
			var id = p;
			var list = soul.toons[ p ];
			list = self.createFrames( list );
			soul.toons[ p ] = list;
			self.createToon( id, list, builder);
		} 

		var spriteSheet = builder.build();

		if ( self.core.type == "Kitty" ) spriteSheet.getAnimation("attack").next = "idle";

		// create our bitmap animations using the generated sprite sheet, and put them on stage:
		var display = new createjs.BitmapAnimation(spriteSheet);
		display.gotoAndPlay("idle");
		self.core.cosmos.stage.addChild( display );

		display.x = self.core.x;
		display.y = self.core.y;

		//next commit working dragging		

		self.display = display;
		self.display.onPress = self.onPress;

		return self.core.avatar;
	};


	self.run = function(){
		self.display.x = self.core.x;
		self.display.y = self.core.y;
		self.display.update = false;

		if ( self.core.soul.run != null ) self.core.soul.run();
	}

	return self; 
};

exports = module.exports = AvatarContent;