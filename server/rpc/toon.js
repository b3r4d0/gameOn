exports.actions = function(req, res, ss){

  // return list of actions which can be called publicly
  return {

    fetchFrames: function( dir , type){
      
      var fs 	= require('fs');
      //fs.readdir( '' , exports.end )
      var got = fs.readdirSync( dir );
      ss.publish.all('addFrames', got, type ); 
      res( type );
    }

  }
}

exports.end = function(){

}