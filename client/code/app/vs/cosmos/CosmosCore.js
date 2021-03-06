"use strict";

var CosmosCore = function ( $name, $create, $physics ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	name:{ 			value:$name 	},


	//Errors
	createError:{ 		value:"Create JS Library Not Present"	},
	avatarError:{ 		value:"Avatar Type Not Present "		},

	create:{ 			value:$create	, writable:true },		
	cosmos:{ 			value:"cosmos"	, writable:true },

	worldSrc:{ 			value:"client/static/images/world/"	, writable:true	},
	world:{ 			value:{}	    , writable:true },		
	
	stage:{ 			value:"stage"	, writable:true	},
	width:{ 			value:500	, writable:true },		
	height:{ 			value:200 , writable:true },	


	server:{ 			value:"server"	, writable:true	},
	
	avatarSrc:{ 		value:"/vs/"	, writable:true	},
	avatars:{ 			value:{}		, writable:true	},
	avatarList:{ 		value:[]		, writable:true	},

	soulSrc:{ 			value:"client/static/images/soul/"	, writable:true	},
	soulNameSpace:{ 	value:"com.globhammer.soul."		, writable:true	}, //dont think this is needed anymore
	souls:{ 			value:{}		, writable:true	},
	soulList:{ 			value:[]		, writable:true	},

	waitingRoom:{ 		value:{}		, writable:true	},
	waitingRoomList:{ 	value:[]	, writable:true	},

	scene1:{ 			value:false		, writable:true	},
	scene2:{ 			value:false		, writable:true	},
	scene3:{ 			value:false		, writable:true	},

	frameData:{ 		value:{}		, writable:true	},
	frameDataList:{ 	value:[] 		, writable:true },

	//FPS 
	startTime:{ 		value:0		, writable:true	},
	prevTime:{ 	value:0 		, writable:true },
	ms:{ 	value:0 		, writable:true },
	msMin:{ 	value:Infinity 		, writable:true },
	msMax:{ 	value:0 		, writable:true },
	fps:{ 	value:0 		, writable:true },
	fpsMin:{ 	value:Infinity 		, writable:true },
	fpsMax:{ 	value:0 		, writable:true },
	frames:{ 	value:0 		, writable:true },
	mode:{ 	value:0 		, writable:true }





	});

	return self; 
};

exports = module.exports = CosmosCore;