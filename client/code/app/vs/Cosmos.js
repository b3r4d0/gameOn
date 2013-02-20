"use strict";

//983 Bushwick ( Bushwicks Living Room )

var Cosmos = function ( $name, $create, $physics ) { 
	
	var core 		= '/vs/cosmos/CosmosCore';
	var control		= '/vs/cosmos/CosmosControl';
	var content		= '/vs/cosmos/CosmosContent';

	core 			= require( core )( $name, $create, $physics );
	control			= require( control )( core );
	content			= require( content )( core, control );

	var self 		= Object.create( module, {
	core: 	{ value:core 	},
	control:{ value:control },
	content:{ value:content }
	});

	self.core.cosmos = self;

	//PUBLIC API
	Object.defineProperty( self, "name", 	{ get:function(){ return self.core.name; }} );
	Object.defineProperty( self, "cosmos", 	{ get:function(){ return self.core.cosmos; }} );
	Object.defineProperty( self, "server", 	{ configurable:true,  get:function(){ return self.core.server; }} );
	Object.defineProperty( self, "UUID", 	{ get:function(){ return self.control.createUID() ; }} );


	Object.defineProperty( self, "stage", 	{ set:function( input ){return self.control.createStage( input ) }} );
	Object.defineProperty( self, "server", 	{ configurable:true, set:function( input ){return self.control.updateServer( input ) }} );
	Object.defineProperty( self, "create", 	{ set:function( input ){return self.core.create = input }} );
	Object.defineProperty( self, "avatar", 	{ set:function( input ){return self.control.avatar( input ) }} );

	//Empty Public Getter Actions which can be chained  
	Object.defineProperty( self, "awake", 	{ get:function(){ return self.content.awake(); }} );
	Object.defineProperty( self, "start", 	{ get:function(){ return self.control.start(); }} );
	Object.defineProperty( self, "stop", 	{ get:function(){ return self.control.stop(); }} );
	
	return self; 
};

exports = module.exports = Cosmos;




