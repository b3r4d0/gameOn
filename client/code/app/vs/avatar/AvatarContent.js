"use strict";

var AvatarContent = function ( $core, $control ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	core:{ 		value:$core    },
	control:{ 	value:$control }
	});

	self.awake = function (){
		
		return self.core.avatar;
	};

	return self; 
};

exports = module.exports = AvatarContent;