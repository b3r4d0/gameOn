"use strict";

var CosmosControl = function ( $core ) { 
	
	var serverLoc		= '/vs/cosmos/ServerControl';

	var self = Object.create( module, { 
	core:{ value:$core },
	server:{ value:require( serverLoc )( $core ) }
	});

	self.start = function (){
		if ( self.core.create 	== null ) throw new Error( self.core.createError );
		self.core.create.Ticker.setFPS( 30 );

		self.core.create.Ticker.addListener( this.core.stage ); //whats the difference
		self.core.create.Ticker.addEventListener("tick", self.execute ); //whats the difference

  		return self.core.cosmos;
	}

	self.stop = function(){
		if ( self.core.create 	== null ) throw new Error( self.core.createError );
		
		self.core.create.Ticker.removeListener( this.core.stage ); //whats the difference
		self.core.create.Ticker.removeEventListener("tick", self.execute ); //whats the difference

		return self.core.cosmos;
	}

	self.createStage = function ( canvas ){
		if ( self.core.create 	== null ) throw new Error( self.core.createError );
		this.core.stage 		= new this.core.create.Stage( canvas );
  		this.core.stage.name 	= this.core.name;
		return self.core.cosmos;
	};

	self.execute = function(){
		self.core.stage.update();
	}

	self.updateServer = function( server ){
		self.core.server = server;
	}

	self.createUID = function(){
		if ( self.core.create 	== null ) throw new Error( self.core.createError );
		return self.core.create.UID.get();
	}

	//looks for data object to build avatar
	//{type:'/vs/Avatar', name:'AvatarName', x:10, y:10, texture:"folder/folder" }
	self.avatar = function( data ){
		
		if ( data.type == null ) throw new Error( self.core.avatarError );
		if ( data.name == null ) data.name = 'No Name';

		var avatar = require( self.core.avatarSrc + data.type )( data.name, self.core.cosmos );
		avatar.awake;
		self.core.avatars[ avatar.id ] = avatar;
		avatar.cosmosIndex = self.core.avatarList.length;
		
		self.core.avatarList.push( avatar );

		if ( data.x != null ) avatar.x = data.x;
		if ( data.y != null ) avatar.y = data.y;

		//if ( data.skin != null ) avatar.skin 
		//self.loadSkin( data.skin);  
		
		return avatar;
	}

	self.loadSkin = function( skin ){
		trace("load the skin " + skin );
		if ( self.core.create == null ) throw new Error( self.core.createError );
		
		var queue = new self.core.create.LoadQueue();
		trace("Que " + queue );
	}

	return self; 
};

exports = module.exports = CosmosControl;