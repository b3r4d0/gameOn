"use strict";

var CosmosContent = function ( $core, $control ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	core:{ 		value:$core    },
	control:{ 	value:$control }
	});



	self.awake = function (){
		trace( " self has a control " + self.control 	);
		trace( " self has a core " 	  + self.core.name	);
		return self.core.cosmos;
	};

	self.control.server.fetchToonFrames();

	return self; 
};

exports = module.exports = CosmosContent;