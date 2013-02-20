"use strict";

var ServerControl = function ( $core ) { 
	
	var self = Object.create( module, { 
	core:{ value:$core }
	});

	self.fetchToonFrames = function (dir , type ){
		
  		trace("fectch toon frames");
  		return self.core.cosmos;
	}

	return self; 
};

exports = module.exports = ServerControl;