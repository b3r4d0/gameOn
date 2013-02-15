"use strict";
//private 
//
var create = 69;
var physics = 45;

var Cosmos = function ( $gotIt ) { 
	trace("you are creating something ");
	return Object.create( module ); 
};

exports = module.exports = Cosmos;


var core = 69;
module.exports.core = core;

module.awake = function () {
	trace("you making anything ");
	module.core = require( '/vs/cosmos/CosmosCore')();
	trace("do you have a core " + module.core.self );
}