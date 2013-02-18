"use strict";

var CosmosControl = function ( $core ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	core:{ value:$core }
	});

	return self; 
};

exports = module.exports = CosmosControl;