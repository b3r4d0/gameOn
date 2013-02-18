"use strict";

var CosmosCore = function ( $name, $create, $physics ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	name:{ 			value:$name 	},	
	cosmos:{ 		value:"cosmos"	, writable:true },	
	stage:{ 		value:"stage"	, writable:true	},
	frameData:{ 	value:{}		, writable:true	},
	frameDataList:{ value:[] 		, writable:true }
	});

	return self; 
};

exports = module.exports = CosmosCore;