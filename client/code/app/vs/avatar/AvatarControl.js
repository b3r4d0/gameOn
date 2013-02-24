"use strict";

var AvatarControl = function ( $core ) { 
	
	//Create the vars
	var self = Object.create( module, { 
	core:{ value:$core }
	});

	self.injectSoul	= function ( soul ){
		trace("Injecting SOUL" + soul.type );
		self.core.soul = soul;
	}

	self.updateCosmosIndex = function( value ){ self.core.cosmosIndex = value; return self.core.avatar; };

	self.updateX = function( value ){ self.core.x = value; return self.core.avatar; };
	
	self.updateY = function( value ){ self.core.y = value; return self.core.avatar; };
	
	return self; 
};

exports = module.exports = AvatarControl;