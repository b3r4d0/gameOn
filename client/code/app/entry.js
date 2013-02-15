// This file automatically gets called first by SocketStream and must always exist

// Make 'ss' available to all modules and the browser console
window.trace = function (msg){
	console.log( "LOG: " + msg );
}

window.ss = require('socketstream');
// You won't need to require the file like this
//window.cp = require('chipmunk');

ss.server.on('disconnect', function(){
  console.log('Connection down :-(');
});

ss.server.on('reconnect', function(){
  console.log('Connection back up :-)');
});

ss.server.on('ready', function(){

  // Wait for the DOM to finish loading
  jQuery(function(){
    trace("about to start the cosmos");
    var cosmos1 = require("/vs/Cosmos")(); // dont forget the dog balls
    cosmos1.awake();
    cosmos1.core.self = 1;
    

    var cosmos2 = require("/vs/Cosmos")(); // dont forget the dog balls
    cosmos2.awake();
    cosmos2.core.self = 2;
    
    trace("$ shot1 = " + cosmos1.core.self );
    trace("$ shot2 = " + cosmos2.core.self );


  
  });

});
