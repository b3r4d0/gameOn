exports.actions = function(req, res, ss){

  // return list of actions which can be called publicly
  return {

    fetchWorld: function( dir, name ){
      
      var fs 	= require('fs');
      //fs.readdir( '' , exports.end )
      var got = fs.readFileSync( dir, 'utf8');
      ss.publish.all('addWorld', got, name ); 
      //res( got );
    }

  }
}

exports.end = function(){

}