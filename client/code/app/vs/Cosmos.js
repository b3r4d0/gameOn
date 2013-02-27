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

//A genius brain in action will tackle a problem, find an appropriate set of rules, and derive a solution. 
//Actually, the speed of processing the rules is not as critical as the skill in choosing the appropriate rules at hand. 

//Important Shit that Needs to Get Done

//Achieve Funding for Kickstarter Game 	(July 	4)
//Launch Kickstarter 					(April 	3)

//Launch Virus							(Feb 	25)
//Launch (Like a Kitty) Site			(Feb	24)
//Launch GlobHammer						(Feb    10) 
//-------------------
//create the api for toons
//format the soul file to include toons
//import soul( through streaming or loading  )
//load all assets related to the soul
//place soul on the stage
//trigger animation
//play music

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
	Object.defineProperty( self, "height", 	{ get:function(){ return self.core.stageHeight; }} );
	Object.defineProperty( self, "width", 	{ get:function(){ return self.core.stageWidth; }} );
	Object.defineProperty( self, "server", 	{ configurable:true,  get:function(){ return self.core.server; }} );
	Object.defineProperty( self, "UUID", 	{ get:function(){ return self.control.createUID() ; }} );

	Object.defineProperty( self, "stage", 	{  configurable:true, set:function( input ){return self.control.createStage( input ) }} );
	Object.defineProperty( self, "stage", 	{  configurable:true, get:function(){ return self.core.stage; }} );

	Object.defineProperty( self, "server", 	{ configurable:true, set:function( input ){return self.control.updateServer( input ) }} );
	Object.defineProperty( self, "create", 	{ set:function( input ){return self.core.create = input }} );
	Object.defineProperty( self, "avatar", 	{ set:function( input ){return self.control.avatar( input ) }} );

	//Empty Public Getter Actions which can be chained  
	Object.defineProperty( self, "awake", 	{ get:function(){
		
		//for ( var i = 0; i < 200; i++ )
		//{
		//	var posX = Math.random() * self.width;
		//	var posY = Math.random() * self.height;
		//	self.avatar = {type:'Sun', x:posX, y:posY };
		//}

		//for ( var i = 0; i < 200; i++ )
		//{
		//	var posX = Math.random() * self.width;
		//	var posY = Math.random() * self.height;
		//	self.avatar = {type:'Sun', x:posX, y:posY };
		//}

		return self.content.awake(); 
	}} );


	Object.defineProperty( self, "start", 	{ get:function(){ return self.control.start(); }} );
	Object.defineProperty( self, "stop", 	{ get:function(){ return self.control.stop(); }} );
	
	self.startMusic = function(){
		self.core.audio1.play();
		self.core.audio1.addEventListener('ended', 		self.negative );
	}

	//self.postive = function(){
	//	self.core.audio3.removeEventListener('ended', 		self.postive );
	//	self.core.audio1.play();
	//	self.core.audio0.addEventListener('ended', 		self.negative );
	//}

	self.negative = function(){
		//self.core.audio1.play();
		//self.core.audio1.removeEventListener('ended', 	self.negative );
		//self.core.audio2.addEventListener('ended', 		self.climax );
	}

	//self.climax = function(){
	//	self.core.audio3.play();
	//	self.core.audio3.addEventListener('ended', 		self.postive );
	//	self.core.audio2.removeEventListener('ended', 	self.climax );
	//}

	self.core.audio0    = document.getElementById('artist');
  	self.core.audio1    = document.getElementById('good');
  	self.core.audio2    = document.getElementById('bad');
  	self.core.audio3    = document.getElementById('ugly');
  	//self.core.audio0.addEventListener('ended', self.startMusic );

	return self; 
};

exports = module.exports = Cosmos;




