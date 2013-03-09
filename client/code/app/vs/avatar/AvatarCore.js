"use strict";

var AvatarCore = function ( $name, $type, $cosmos ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	soul:{			value:null, 				writable:true},

	name:{ 			value:$name 	},
	type:{ 			value:$type 	},
	id:{ 			value:"no id present", 		writable:true},

	selected:{ 		value:false 	},
	
	//texture loading
	skin:{ 			value:"folder", 			writable:true},
	frames:{ 		value:10, 					writable:true},

	x:{ 			value:0, 					writable:true},
	y:{ 			value:0, 					writable:true},

	cosmos:{	 	value:$cosmos	, 			writable:true },
	cosmosIndex:{	value:0			, 			writable:true,  enumerable:true },
	avatar:{	 	value:"avatar"	, 			writable:true },	
	body:{	 		value:null	, 				writable:true }	
	
	});

	if ( self.cosmos != null) self.id = self.cosmos.UUID;

	return self; 
};

exports = module.exports = AvatarCore;