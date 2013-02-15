var content;
var shape;
var sprite;
var physics;
var body;
var height = 50;
var width  = 50;
var toon;

var debug = true;

var stage;

var offSetX = -60;
var offSetY = 350;

var radius = 10;
var mass = 3;

var stageHeight;
var stageWidth;

var v  = cp.v;

var space;
var scale			    = 1;

var left = 50;

exports.awake = function( stage,  stageHeight, stageWidth, inSpace ) {
	
	stage 			= stage;
	stageHeight 	= stageHeight;
	stageWidth 		= stageWidth;

	space 			= inSpace;

	trace("go go go you do have space right " + space );

	content 		= new createjs.Container();

  	shape 			= new createjs.Shape();
  	shape.graphics.beginFill('rgba(255,0,0,1)').drawRoundRect(0,0, width, height, 10);
  
  	sprite 		= new createjs.SpriteSheet(
  		{	images: ["images/testWalk.png"], 
  			animations: {"sit": [4, 15 ], "up": [2, 3]}, 
  			frames: [[0,0,251,227,0,11.6,31.2],[251,0,251,227,0,11.6,31.2],[502,0,251,227,0,11.6,31.2],[753,0,251,227,0,11.6,31.2],[0,227,251,227,0,11.6,31.2],[0,454,251,227,0,11.6,31.2],[0,681,251,227,0,11.6,31.2],[251,227,251,227,0,11.6,31.2],[502,227,251,227,0,11.6,31.2],[753,227,251,227,0,11.6,31.2],[251,454,251,227,0,11.6,31.2],[251,681,251,227,0,11.6,31.2],[502,454,251,227,0,11.6,31.2],[753,454,251,227,0,11.6,31.2],[502,681,251,227,0,11.6,31.2],[753,681,251,227,0,11.6,31.2]]
  		});
  	toon   		= new createjs.BitmapAnimation( sprite );
  	toon.gotoAndPlay("sit");

  	var builder = new createjs.SpriteSheetBuilder();
  	
  
    content.addChild( shape );
  	content.addChild( toon  );
  	stage.addChild( content );

  	toon.x += offSetX;
  	toon.y += offSetY;

  	body = new cp.Body(mass, cp.momentForCircle(mass, 0, radius, v(0, 0)));

  	physics = space.addBody( body );
  	physics.setPos(v(200 + 1,  400 ));
  	var circle = space.addShape(new cp.CircleShape( physics, radius, v(0, 0)));
  	circle.setElasticity(0.8);
  	circle.setFriction(1);

  	trace("not frustrated");
}

exports.update = function() {
	content.x = physics.p.x - width /2;
  	content.y = point2canvas( physics.p ).y - height/2;

  	if ( body.vx > 0 ) content.scaleX =  1;
  	if ( body.vx < 0 ){
  		content.scaleX = -1;
  		content.x += left;
  	} 

  		

  	
  	


  	trace( "body oh my god" + body.vy  ); 
}

exports.move = function( speed) {
	physics.applyImpulse( v( speed, 0), v(0,0 ));
}

var trace = function( msg ){
  	if ( debug == false ) return
  	console.log( msg  );
}

var point2canvas = function(point) {
    return v(point.x *  scale, ( height - point.y) * scale);
  };

var canvas2point = function(x, y) {
    return v(x / scale, height - y / scale);
  };
