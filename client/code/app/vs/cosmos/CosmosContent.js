"use strict";

var CosmosContent = function ( $core, $control ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	core:{ 		value:$core    	},
	control:{ 	value:$control },

	fps:{ 	value:null, writable:true },
	});

	self.awake = function (){
		self.fps = new createjs.Text("!!!",  "12px Arial" );
		
 		self.fps.x = 30;
 		self.fps.y = 10;
 		self.fps.textBaseline = "alphabetic"; 		
		
		return self.core.cosmos;
	};

	self.run = function(){

		//if ( self.core.fps < 24 || self.core.avatarList.length > 0 ) return;

		//var posX = 0;
		//var posY = 0;

		//trace( document.URL );

		//
	
		//self.fps.text = "";
		//self.core.stage.addChild( self.fps );
		//self.core.stage.update();
	}

	return self; 
};

exports = module.exports = CosmosContent;