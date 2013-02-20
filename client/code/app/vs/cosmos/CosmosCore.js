"use strict";

var CosmosCore = function ( $name, $create, $physics ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	name:{ 			value:$name 	},

	//Errors
	createError:{ 	value:"Create JS Library Not Present"	},
	avatarError:{ 	value:"Avatar Type Not Present "		},

	create:{ 		value:$create	, writable:true },		
	cosmos:{ 		value:"cosmos"	, writable:true },	
	stage:{ 		value:"stage"	, writable:true	},

	server:{ 		value:"server"	, writable:true	},
	
	avatarSrc:{ 	value:"/vs/"	, writable:true	},
	avatars:{ 		value:{}		, writable:true	},
	avatarList:{ 	value:[]		, writable:true	},


	frameData:{ 	value:{}		, writable:true	},
	frameDataList:{ value:[] 		, writable:true }
	});

	return self; 
};

exports = module.exports = CosmosCore;