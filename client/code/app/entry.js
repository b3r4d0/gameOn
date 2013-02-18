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
   
    var cosmos1 = require("/vs/Cosmos")("balls");
    var cosmos2 = require("/vs/Cosmos")("nuts"); 
   
    trace("whats in a name "        + cosmos1.name );
    trace("whats in a name part 2 " + cosmos1.cosmos.name );

    trace("whats in a name "        + cosmos2.name );
    trace("whats in a name part 2 " + cosmos2.cosmos.name );

    cosmos1.awake();
    cosmos2.awake();


    //cosmos1.stop =  "rock";
    //cosmos2.stop =  "roll";
    //cosmos1.bad.rule.ass.step2;
    //cosmos1.cool;

    

    //cosmos1.cool = "yeah yeah yeah";

    //trace("$ shot1 = " + cosmos1.core);
    //trace("$ shot2 = " + cosmos2.core);
   
    //trace("should be wierd = " +  cosmos2.core.self );
 


  });

});
