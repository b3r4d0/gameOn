"use strict";

var Avatar = function ( $name, $type, $cosmos ) { 
	
	var core 	= '/vs/avatar/AvatarCore';
	var control	= '/vs/avatar/AvatarControl';
	var content	= '/vs/avatar/AvatarContent';

	core 		= require( core )( $name, $type, $cosmos );
	control		= require( control )( core );
	content		= require( content )( core, control );

	var self 	= Object.create( module, {
	core: 		{ value:core 	},
	control:    { value:control },
	content:    { value:content }
	});

	//self.core.cosmos = self;

	//PUBLIC API
	Object.defineProperty( self, "soul", { configurable:true, set:function( input ){ 
		self.control.injectSoul( input );
		self.awake; 
	}} );

	Object.defineProperty( self, "awake", { get:function(){ 
		return self.content.awake(); 
	}} );

	Object.defineProperty( self, "run", { get:function(){ 
		return self.content.run(); 
	}} );

	Object.defineProperty( self, "cosmosIndex", { configurable:true, set:function( input ){ self.control.updateCosmosIndex( input ) }} );
	Object.defineProperty( self, "cosmosIndex", { configurable:true, get:function(){ return self.core.cosmosIndex; }} );

	Object.defineProperty( self, "x", { configurable:true, set:function( input ){ self.control.updateX( input ) }} );
	Object.defineProperty( self, "x", { configurable:true, get:function(){ return self.core.x; }} );

	Object.defineProperty( self, "y", { configurable:true, set:function( input ){ self.control.updateY( input ) }} );
	Object.defineProperty( self, "y", { configurable:true, get:function(){ return self.core.y; }} );

	Object.defineProperty( self, "height", { configurable:true, get:function(){ return self.core.height; }} );
	Object.defineProperty( self, "width", { configurable:true, get:function(){ return self.core.width; }} );

	Object.defineProperty( self, "toon", { configurable:true, set:function( input ){ 
		trace("you playing any");
		self.content.play( input );
	}} );
	



	Object.defineProperty( self, "name", 		{ get:function(){ return self.core.name; 		}} );
	Object.defineProperty( self, "id", 			{ get:function(){ return self.core.id; 			}} );
	Object.defineProperty( self, "cosmos", 		{ get:function(){ return self.core.cosmos; 		}} );

	Object.defineProperty( self, "body", 		{ get:function(){ return self.core.body; 		}} );

	//Object.defineProperty( self, "create", 	{ set:function( input ){return self.core.create = input }} );


	//Empty Public Actions which can be chained without need to include () 
	
	//Object.defineProperty( self, "start", 	{ get:function(){ return self.control.start(); }} );
	//Object.defineProperty( self, "stop", 	{ get:function(){ return self.control.stop(); }} );

	return self; 
};

exports = module.exports = Avatar;