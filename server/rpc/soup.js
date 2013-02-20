exports.actions = function(req, res, ss){

  // return list of actions which can be called publicly
  return {

    fetchFrames: function( dir ){
      
      var fs 	= require('fs');
      //fs.readdir( '' , exports.end )
      var got = fs.readdirSync( dir );
      ss.publish.all('newMessage', got ); 
      res( got );
    }

  }
}

exports.end = function(){

}