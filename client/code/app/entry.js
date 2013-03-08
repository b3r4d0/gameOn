
//less talk more rock

// This file automatically gets called first by SocketStream and must always exist

// Make 'ss' available to all modules and the browser console
window.trace = function (msg){
	console.log( "LOG: " + msg );
}

window.ss = require('socketstream');
// You won't need to require the file like this
//window.cp = require('chipmunk');




window.fun = function ( event ) {

  //trace(" mouse up ");

  exports.send("does this work");
}

// Demonstrates sharing code between modules by exporting function
exports.send = function(text, cb) {
  // return ss.rpc('soul.fetchSoul', 'client/static/images/soul/Sun.js');
};


///GOOD STUFF

ss.server.on('disconnect', function(){
  console.log('Connection down :-(');
});

ss.server.on('reconnect', function(){
  console.log('Connection back up :-)');
});



ss.server.on('ready', function(){

  // Wait for the DOM to finish loading
  jQuery(function(){
   
  var stage     = document.getElementById('stage');
  
  var cosmos1   = require("/vs/Cosmos")("Going Down", createjs );
  cosmos1.server = ss;
  cosmos1.stage = stage;
  
  //load the world
  cosmos1.world = {type:"Level1"};
  //

  //var avatar1 = cosmos1.avatar = {type:'Avatar', name:'Avatar1', x:100, y:100 };
  //var avatar2 = cosmos1.avatar = {type:'Avatar', name:'Avatar2', x:200, y:300 };
   
  //window.fun();

  //var avatar1 = require("/vs/Avatar")("avatar1", cosmos1 );
  //var avatar2 = require("/vs/Avatar")("avatar2", cosmos1 );   
  });

});



//the game off was coming up
//he must win
//if he won his place in the pecking order would increase
//an increase in his pecking position meant 
//lower blood pressure meant a larger social network
//a larger social network ment a better looking mate
//he must win
//in order to win he must stop biting his fingernails
//he couldnt stop biting his fingernails
//he didnt win
//he didnt win this time

