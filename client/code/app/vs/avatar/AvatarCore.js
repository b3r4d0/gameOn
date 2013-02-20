"use strict";

var AvatarCore = function ( $name, $cosmos ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	name:{ 			value:$name 	},
	id:{ 			value:"no id present", 		writable:true},

	//texture loading
	skin:{ 			value:"folder", 			writable:true},
	frames:{ 		value:10, 					writable:true},

	x:{ 			value:0, 					writable:true},
	y:{ 			value:0, 					writable:true},

	cosmos:{	 	value:$cosmos	, 			writable:true },
	cosmosIndex:{	value:0			, 			writable:true,  enumerable:true },
	avatar:{	 	value:"avatar"	, 			writable:true }	
	
	});

	if ( self.cosmos != null) self.id = self.cosmos.UUID;

	return self; 
};

exports = module.exports = AvatarCore;