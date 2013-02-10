var tag = "2.10.13.11.17";

var physicsHeight 	= 0;
var physicsWidth 		= 0;

var width 			 = 100;
var height 			  = 100;
var scale			    = 1;

var canvas 			 = null;
var ctx 			   = null;

var physics 			= null;
var space 			= null;

var mouse 			= null;
var mouseBody		= null;

var simulationTime 	= 0;
var resized 		= true;

var drawTime 		= 0;

var v 				  = cp.v;

var startLine		= 0;
var endLine			= 0;

var debug       = true;


//new 
var stage       = null;

var kitty;
var kittyPhysics;
var kittyHeight = 40;
var kittyWidth  = 40;

exports.awake = function( physics ) {
	trace("awake again");
	physics 		  = physics;
	canvas 	     	= document.getElementsByTagName('canvas')[0];
	physicsWidth 	= canvas.width 	= window.innerWidth;   	//full screen
  physicsHeight = canvas.height = window.innerHeight; 	//full screen
	
	//physicsWidth 	= canvas.width;   	
  	//physicsHeight = canvas.height; 	
	ctx 		= canvas.getContext('2d');

	height = physicsHeight;
	width = physicsWidth;
  
  space = new cp.Space();
  space.iterations = 60;
  space.gravity = v(0, -500);
  space.sleepTimeThreshold = 0.5;
  space.collisionSlop = 0.5;
  space.sleepTimeThreshold = 0.5;

  mouse = v(0,0); 
  mouseBody = new cp.Body(Infinity, Infinity);

  	//physics.onresize();
  trace("awaking the world");
  physics.setInterval( step , 10 );

  drawBorders();
  run();
  addListeners();
  keyUp();

  var stageCanvas = document.getElementById('stage');

  stageCanvas.width  = window.innerWidth;    //full screen
  stageCanvas.height = window.innerHeight;   //full screen
  
  trace( "new height " + stageCanvas.width );

 
  stage = new createjs.Stage( stageCanvas );
  stage.name = "Feed Me";
   trace("is there a stage canvas " + stage );

  kitty  = new createjs.Shape();
  kitty.graphics.beginFill('rgba(255,0,0,1)').drawRoundRect(0,0, kittyWidth, kittyHeight, 10);
  stage.addChild( kitty );
  stage.update();
}

var step = function(dt) {
  
  var newPoint = v.lerp( mouseBody.p, mouse, 0.25);
  mouseBody.v = v.mult(v.sub(newPoint, mouseBody.p), 60);
  mouseBody.p = newPoint;

  var lastNumActiveShapes = space.activeShapes.count;

  var now = Date.now();
  update(1/60);
  simulationTime += Date.now() - now;

  // Only redraw if the simulation isn't asleep.
  if (lastNumActiveShapes > 0 || resized) {  //OLD
    now = Date.now();
    draw();
    drawTime += Date.now() - now;
    resized = false;  
  }
};

var point2canvas = function(point) {
    return v(point.x *  scale, ( height - point.y) * scale);
  };

var canvas2point = function(x, y) {
    return v(x / scale, height - y / scale);
  };

var run = function() {
  
  this.running = true;
  step2(0);
};

var step2 = function( time){
    
   lastTime = time;

    if ( running) {
      raf(step);
    }
}

var raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) {
    return window.setTimeout(callback, 1000 / 60);
  };

var draw = function() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText("Version: " + tag, 0, 0, physicsWidth );

  // Draw shapes
  ctx.strokeStyle = 'black';
  ctx.clearRect(0, 0, this.width, this.height);

  ctx.font = "16px sans-serif";
  ctx.lineCap = 'round';

  space.eachShape(function(shape) {
    ctx.fillStyle = shape.style();
    shape.draw(ctx, scale, point2canvas);
  });

  kitty.x = kittyPhysics.p.x - kittyWidth /2;
  
  kitty.y = point2canvas( kittyPhysics.p ).y - kittyHeight/2;
  stage.update();

};

var update = function( dt) {
  space.step(dt);
}


var trace = function( msg ){
  if ( debug == false ) return
  console.log( msg  );
}

var drawBorders = function (){
  trace("adding the borders ");

  var wall1 = space.addShape(new cp.SegmentShape(space.staticBody, v(0, 0), v(0, height  ), 0));
  wall1.setElasticity(1);
  wall1.setFriction(1);

  var wall2 = space.addShape(new cp.SegmentShape(space.staticBody, v(width, 0), v(width, height ), 0));
  wall2.setElasticity(1);
  wall2.setFriction(1);

  var floor = space.addShape(new cp.SegmentShape(space.staticBody, v( 0, height / 2), v(width, height /2 ), 0));
  floor.setElasticity(1);
  floor.setFriction(1);

}

var addListeners = function() {
	
	//physics.onresize		= resize;
	canvas.onmousedown  = mouseDown;
  canvas.onmouseup    = mouseUp;
	window.onkeyup      = keyUp;

	//canvas.onmousemove  = traceMouse;
 	
  	//canvas.onmousemove  = mouseMove;
}

var keyUp	= function( e ) {

	var radius = 20;
  var mass = 3;
  var body = space.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, radius, v(0, 0))));
  body.setPos(v(200 + 1,  400 ));
  kittyPhysics = body;
  var circle = space.addShape(new cp.CircleShape(body, radius, v(0, 0)));
  circle.setElasticity(0.8);
  circle.setFriction(1);
    
}

var mouseDown 	= function( e ) {
	startLine = canvas2point( e.clientX, e.clientY);
	trace( "start line x " + startLine.x + " :::: " + startLine.y );
}

var mouseUp		= function ( e ) {
	endLine  = canvas2point( e.clientX, e.clientY);
	trace( "end line x " + endLine.x + " :::: " + endLine.y );

	var wall2 = space.addShape(new cp.SegmentShape(space.staticBody, startLine, endLine, 0));
 	wall2.setElasticity(1);
  	wall2.setFriction(1);
  	
  	resized = true;	

  	trace("mouseUp");
}

var resize = function(e) {
	
  //width = canvas.width = window.innerWidth;   //full screen
  //height = canvas.height = window.innerHeight; //full screen

  width = canvas.width;
  height = canvas.height;

  if (width/height > 640/480) {
    scale = height / 480;
  } else {
    scale = width / 640;
  }

  trace("scale ::: " + scale );
  resized = true;	
}



