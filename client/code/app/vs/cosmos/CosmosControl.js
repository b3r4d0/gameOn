"use strict";

var CosmosControl = function ( $core ) { 
	
	var self = Object.create( module, { 
	core:{ value:$core },
	});

	self.start = function (){
		if ( self.core.create 	== null ) throw new Error( self.core.createError );
		self.core.create.Ticker.setFPS( 60 );
		self.core.startTime = Date.now();
		self.core.prevTime = self.core.startTime; 

		trace("are you starting anything");
		
		self.core.create.Ticker.addEventListener("tick", self.run ); //whats the difference

		ss.event.on('addSoul', self.soulFromBeyond );
		ss.event.on('addFrames', self.toonFramesFromBeyond );
		
  		return self.core.cosmos;
	}

	self.world = function( data ){

		if ( data.type == null ) throw new Error( "WORLD data type is not present ");
		var core = self.core;
		var call = core.worldSrc;

		ss.event.on('addWorld', self.worldFromBeyond );
		ss.rpc('world.fetchWorld', call + data.type + '.js' ); //needs to be moved into server control
	}

	self.calcFPS = function (){
		var time = Date.now();
		var core = self.core;
		core.ms = time - core.startTime;
			core.msMin = Math.min( core.msMin, core.ms );
			core.msMax = Math.max( core.msMax, core.ms );

			core.frames ++;

			if ( time > core.prevTime + 1000 ) {

				core.fps = Math.round( ( core.frames * 1000 ) / ( time - core.prevTime ) );
				core.fpsMin = Math.min( core.fpsMin, core.fps );
				core.fpsMax = Math.max( core.fpsMax, core.fps );

				core.prevTime = time;
				core.frames = 0;
			}

			return time;
	}

	self.worldFromBeyond = function( worldData ){
		
		trace("we do have a world from beyond ");

		var world = worldData;
		eval( world );

		var sourceStart = self.start;

		self.start = function() {
     		sourceStart();
     		world.start();
		};

		var souceCreateSoul = self.createSoul;

		self.createSoul = function( avatar, soul ){
			sourceCreateSoul( avatar, soul );
			world.createSoul( avatar, soul );
		};

		self.run = world.run;
		self.start();

		//trace("do you have a world" + worldData );
	}

	self.toonFramesFromBeyond = function ( frameData, type ){
		var soul = self.core.souls[ type ];
		if ( soul == null ) throw new Error( "You got no SOUL");
		soul.toonFrames = frameData;		
		self.checkWaitingRoom( soul.type );
	}

	self.soulFromBeyond = function ( soulData ){
		
		trace("we have a soul from beyond ");

		var soul =  soulData;
		eval( soul );

		var souls = self.core.souls; 
		if ( souls[ soul.type ] == null) souls[ soul.type ] = soul;
		
		self.requestToonFrames( soul.toonFrames, soul.type  );
	}


	self.requestToonFrames = function ( dir, type ){
		var source = "client/static/images/toons/";
		ss.rpc('toon.fetchFrames', source + dir, type );
	}

	self.checkWaitingRoom = function ( type ){

		var soul = self.core.souls[ type ];
		var max = self.core.waitingRoomList.length;

		var remove = [];
		var i;

		for ( i = 0; i < max; i++ )
		{
			var avatar = self.core.waitingRoomList[ i ];
			
			if ( avatar.type == type ) {
				self.createSoul( avatar, soul );
				remove.push( i );
			}
		}

		max = remove.length;

		for ( i = 0; i < max; i++ ){ self.core.waitingRoomList.splice( remove[ i ] ); }

		var max = self.core.waitingRoomList.length;
	}

	self.stop = function(){
		if ( self.core.create 	== null ) throw new Error( self.core.createError );
		
		self.core.create.Ticker.removeListener( this.core.stage ); 			//whats the difference
		self.core.create.Ticker.removeEventListener("tick", self.run ); //whats the difference

		return self.core.cosmos;
	}

	self.createStage = function ( canvas ){
		if ( self.core.create 	== null ) throw new Error( self.core.createError );
		
		self.core.stage 		= new self.core.create.Stage( canvas );
  		self.core.stage.name 	= self.core.name;
  		self.core.stageWidth	= canvas.width;
  		self.core.stageHeight   = canvas.height;

  		createjs.Touch.enable( self.core.stage ); ///GLOBAL FUNCTION BAD BAD BAD
  		self.core.stage.enableMouseOver(10);
		self.core.stage.mouseMoveOutside = true; // k

		return self.core.cosmos;
	};

	//override
	self.run = function(){

	}

	self.updateServer = function( server ){
		self.core.server = server;
	}

	self.createUID = function(){
		if ( self.core.create 	== null ) throw new Error( self.core.createError );
		return self.core.create.UID.get();
	}

	//looks for data object to build avatar
	//{type:'AvatarType', name:'AvatarName', x:10, y:10 }
	self.avatar = function( data ){
		
		if ( data.type == null ) throw new Error( self.core.avatarError );
		if ( data.name == null ) data.name = 'No Name';

		var core = self.core;

		var avatar = require( core.avatarSrc + "Avatar" )( data.name, data.type, core.cosmos );
		core.avatars[ avatar.id ] = avatar;
		avatar.cosmosIndex = core.avatarList.length;
		core.avatarList.push( avatar );
		avatar.type = data.type;

		trace("something in the way the avatar moves ");

		if ( data.x != null ) avatar.x = data.x;
		if ( data.y != null ) avatar.y = data.y;
	
		var soul = core.souls[ data.type ]; 
		if ( soul  == null)
		{
			var call = core.soulSrc;
			self.addToWaitingRoom( avatar );
			ss.rpc('soul.fetchSoul', call + data.type + '.js' ); //needs to be moved into server control
			return avatar;
		}

		return self.createSoul( avatar, soul );
	}

	self.createSoul = function ( avatar, soul ){
		avatar.soul =  Object.create( soul );

		return avatar;
	}

	self.addToWaitingRoom = function( avatar ){
		//if ( self.checkWaitingRoomExist ) return;
		self.core.waitingRoom[ avatar.id ] = avatar;
		self.core.waitingRoomList.push( avatar );
	}

	self.checkWaitingRoomExist = function( avatar ){
		var exist = false;

		return exist;
	}

	self.addSoul = function ( name, soul){
		self.core.souls[name] = soul;
	}

		//Delete me
	self.loadSkin = function( skin ){
		trace("load the skin " + skin );
		if ( self.core.create == null ) throw new Error( self.core.createError );
		
		var queue = new self.core.create.LoadQueue();
		trace("Que " + queue );
	}

	self.worldFromBeyond = function( worldData ){
		
		trace("we do have a world from beyond ");

		var world = worldData;
		eval( world );

		var sourceStart = self.start;

		self.start = function() {
     		sourceStart();
     		world.start();
		};

		var sourceCreateSoul = self.createSoul;

		self.createSoul = function( avatar, soul ){
			sourceCreateSoul( avatar, soul );
			world.createSoul( avatar, soul );
		};

		self.run = world.run;
		self.start();

		//trace("do you have a world" + worldData );
	}


	return self; 
};

exports = module.exports = CosmosControl;