"use strict";

//983 Bushwick ( Bushwicks Living Room )
//Dean Kamen formula for success: 
//Pick something you love and make it your life's work. 
//Do what is important and not what is easy.
//Seymour Cray, when designing his supercomputers would maximally simplify the architecture 
//in order to be sure his designs see the market. 
//Cleverly balancing implementation speed against perfection, 
//Cray has outdistanced everyone in the supercomputing field.
//Creativity and cold meticulousness are often at odds. 
//They require a different type of mind. 
//A biologist will notice that they are based on a different neurohormonal brain profile! 
//Tim Berners-Lee is an excellent example of a brilliantly creative mind, 
//which is still able to focus on a task at hand, efficiently execute the plan of action, and make things happen. 
//Remember Cray? He would give up bells and whistles only to be the first with a workable solution. 
//If the expected payoff of the new goal is greater than that of the former goal, switch it. 
//Otherwise persist even though your emotions may tell you that the new thing seems so much bigger 

//Important Shit that Needs to Get Done

//Achieve Funding for Kickstarter Game 	(July 	4)
//Launch Kickstarter 						(April 	3)

//Launch Virus							(Feb 	25)
//Launch (Like a Kitty) Site				(Feb	24)
//Launch GlobHammer						(Feb    10) 
//-------------------
//create the api for toons
//format the soul file
//import soul( through streaming or loading  )
//load all assets related to the soul
//place soul on the stage
//trigger animation


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




