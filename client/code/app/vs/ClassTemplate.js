//"use strict";
var self = {};

var Cosmos = function ( $got ) { 
	
	//Create the vars
	self = Object.create( module, {
	r: 		{	value:10  },
	core: 	{ 	value:require( '/vs/cosmos/CosmosCore')( $got ) },
	});

	//Create getters and setters
	//Object.defineProperty( self, "cool", { set:function( input ){
	//trace( input );
	//return self;
	//}} );

	Object.defineProperty( self, "step2", { set:function( input ){
			trace( "we are done with step 2 " + input );
			return self;
		}} );

	Object.defineProperty( self, "bad", { get:function( input ){
			trace( "i am bad" );
			return self;
		}} );

	Object.defineProperty( self, "rule", { get:function( input ){
			trace( "i rule" );
			return self;
		}} );


	Object.defineProperty( self, "ass", { get:function( input ){
			trace( "i will kick some ass" );
			return self;
		}} );

	self.step3 = function ( inside ){
		self.step2 = inside;
		return self;
	};

	var set = function( name, method ) { Object.defineProperty( self, name, { set: method} ) };

	cool = function (){
		trace(" i think it will pop pop pop " + self.core );
	}

	set( "cool",  cool );

	return self; 
};

exports = module.exports = Cosmos;

//this is one cool line baby
//cosmos1.bad.rule.ass.step2.step3( "step3").cool = "will you let me";


