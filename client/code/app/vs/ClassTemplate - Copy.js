"use strict";

// Load app
//  var cosmos1 = require( '/vs/ClassTemplate');
  //var cosmos2 = require( '/vs/Cosmos');
  // cosmos1.awake();
  // trace( "do you have a core " + cosmos1.core );
  
  //cosmos2.awake();

  //trace("you have to make it public " + cosmos1.cosmos);

  //var  cosmos1 	=  require('/vs/Cosmos.js')( 1);//must include ()
  //var  cosmos2  =  require('/vs/Cosmos.js')( 2);

  //trace("do you have a cosmos " + cosmos1.core );

  //cosmos.awake( createjs );
  //trace("do you have a cosmos" + cosmos.create );
  
  //OLD VERSION
  //var app = require('/app');
 	//app.awake();


//Create the Cosmos class
//Right now only one will exist on a page
//Setup the stage container
//create a new avatar
//create the avatar class
//load in all the avatar parts
//build the avatar sprite sheet
//display the avatar

var core, content, control, createJS;

var cosmos;

function Cosmos( $in ) {

trace("trying to create my baby" + $in );



//var array = Object.keys( module );
 //for ( var prop in array ) {
 //   trace(prop);
  //}

//};
//Object.defineProperties( cosmos, {
//  "foo": { value: "foo" },
//  "bar": { value: "bar" }
//  "method": { value: function () { } }
//}
}



module.exports = function ( $test ) {
    trace("inside the export " + $test );
    cosmos = $test;
    return Object.create( module );
    //var result = {};
    //result.test = "foo";
    //return result;
};

module.awake = function ( $create ){
	trace("are you going to hurt me " + $create );
	ugly();
	//trace("Awaking our core " + core );
	//trace("Awaking our content" + content);
}

function ugly (){
	trace("will you do something for me" + cosmos);
}

Object.defineProperty( this, "create", { get: function() { return createJS;}, set: function(value) { createJS = value; } 

//exports.awake = function ( $create ){
	
//	CosmosCore	= require('/vs/cosmos/CosmosCore');//
//	core.start();
	//control = require('/vs/cosmos/CosmosControl');
	//content = require('/vs/cosmos/CosmosContent');
	
//	core.cosmos = this;
//	core.create = $create;
//}

}); 

//var setUpCreateJS = function ( $create ){
//	core.create = $create;
//	trace("do you have a create " + core.create );
//}

//exports.start = function (){
//	trace("start");
//}

//exports.stop = function(){

//}



