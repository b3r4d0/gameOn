var content;
var shape;
var sprite;
var physics;
var height = 50;
var width  = 50;
var toon;

var debug = true;

var stage;

var offSetX = -60;
var offSetY = 350;

var radius = 20;
var mass = 3;

var stageHeight;
var stageWidth;

var v  = cp.v;

var space;
var scale			    = 1;


exports.awake = function( stage,  stageHeight, stageWidth, inSpace ) {
	
	stage 			= stage;
	stageHeight 	= stageHeight;
	stageWidth 		= stageWidth;

	space 			= inSpace;

	trace("you do have space right " + space );

	content 		= new createjs.Container();

  	shape 			= new createjs.Shape();
  	shape.graphics.beginFill('rgba(255,0,0,1)').drawRoundRect(0,0, width, height, 10);
  
  	sprite 		= new createjs.SpriteSheet({images: ["images/kitty.png"], "animations": {"sit": [0, 0 ], "up": [2, 3]}, frames: [[0,0,219,160,0,20.35,2.85],[219,0,219,160,0,20.35,2.85],[438,0,219,160,0,20.35,2.85],[657,0,219,160,0,20.35,2.85],[0,160,219,160,0,20.35,2.85],[219,160,219,160,0,20.35,2.85],[438,160,219,160,0,20.35,2.85],[657,160,219,160,0,20.35,2.85],[0,320,219,160,0,20.35,2.85],[219,320,219,160,0,20.35,2.85],[438,320,219,160,0,20.35,2.85],[657,320,219,160,0,20.35,2.85],[0,480,219,160,0,20.35,2.85],[219,480,219,160,0,20.35,2.85],[438,480,219,160,0,20.35,2.85],[657,480,219,160,0,20.35,2.85],[0,640,219,160,0,20.35,2.85],[219,640,219,160,0,20.35,2.85],[438,640,219,160,0,20.35,2.85],[657,640,219,160,0,20.35,2.85],[0,800,219,160,0,20.35,2.85],[219,800,219,160,0,20.35,2.85],[438,800,219,160,0,20.35,2.85],[657,800,219,160,0,20.35,2.85],[0,960,219,160,0,20.35,2.85]]});
  	toon   		= new createjs.BitmapAnimation( sprite );
  	toon.gotoAndPlay("sit");
  
    content.addChild( shape );
  	content.addChild( toon  );
  	stage.addChild( content );

  	toon.x += offSetX;
  	toon.y += offSetY;

  	physics = space.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, radius, v(0, 0))));
  	physics.setPos(v(200 + 1,  400 ));
  	var circle = space.addShape(new cp.CircleShape( physics, radius, v(0, 0)));
  	circle.setElasticity(0.8);
  	circle.setFriction(1);
}

exports.update = function() {
	content.x = physics.p.x - width /2;
  	content.y = point2canvas( physics.p ).y - height/2;
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
