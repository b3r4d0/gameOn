"use strict";

var CosmosContent = function ( $core, $control ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	core:{ 		value:$core    },
	control:{ 	value:$control },

	fps:{ 	value:null, writable:true },
	});

	self.awake = function (){
		self.fps = new createjs.Text("Hello World" );
 		self.fps.x = 100;
 		self.fps.y = 100;
 		self.fps.textBaseline = "alphabetic"; 		
		
		return self.core.cosmos;
	};

	self.run = function(){
		var posX = Math.random() * self.core.stageWidth;
		var posY = Math.random() * self.core.stageHeight;
		self.core.cosmos.avatar = {type:'Sun', x:posX, y:posY };
	
		self.fps.text = "FPS: " + self.core.fps + " Pussys: " + self.core.avatarList.length;
		self.core.stage.addChild( self.fps );
		self.core.stage.update();
	}

	return self; 
};

exports = module.exports = CosmosContent;