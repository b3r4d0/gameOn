"use strict";

var Cosmos = function ( $name, $create, $physics ) { 
	
	var core 		= '/vs/cosmos/CosmosCore';
	var control		= '/vs/cosmos/CosmosControl';
	var content		= '/vs/cosmos/CosmosContent';

	core 		= require( core )( $name, $create, $physics );
	control		= require( control )( core );
	content		= require( content )( core, control );

	var self 	= Object.create( module, {
	core: 	{ value:core },
	control:{ value:control},
	content:{ value:content}
	});

	self.core.cosmos = self;

	//PUBLIC API
	Object.defineProperty( self, "name", 	{ get:function(){ return self.core.name; }} );
	Object.defineProperty( self, "cosmos", 	{ get:function(){ return self.core.cosmos; }} );

	self.awake = function (){
		self.content.awake();
		return self;
	};

	return self; 
};

exports = module.exports = Cosmos;




