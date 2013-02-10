/* QUICK CHAT DEMO */

// Delete this file once you've seen how the demo works

// Listen out for newMessage events coming from the server

ss.event.on('newMessage', function(message) {

  // Example of using the Hogan Template in client/templates/chat/message.jade to generate HTML for each message
  var html = ss.tmpl['chat-message'].render({
    message: message,
    time: function() { return timestamp(); }
  });

  // Append it to the #chatlog div and show effect
  return $(html).hide().appendTo('#chatlog').slideDown();
});

// Show the chat form and bind to the submit action
$('#demo').on('submit', function() {

  // Grab the message from the text box
  var text = $('#myMessage').val();

  // Call the 'send' funtion (below) to ensure it's valid before sending to the server
  return exports.send(text, function(success) {
    if (success) {
      return $('#myMessage').val('');
    } else {
      return alert('Oops! Unable to send message');
    }
  });
});

// Demonstrates sharing code between modules by exporting function
exports.send = function(text, cb) {
  if (valid(text)) {
    return ss.rpc('demo.sendMessage', text, cb);
  } else {
    return cb(false);
  }
};


//New 
var world = require('/world.js');
var canvas;

var v = cp.v;

var ctx;

var GRABABLE_MASK_BIT = 1<<31;
var NOT_GRABABLE_MASK = ~GRABABLE_MASK_BIT;

var layerGood = "good";

var space;
var self = this;

var width = 500;

var mouse = v(0,0);
var simulationTime = 0;
var drawTime = 0;

var scale = 1;
var resized = false;

var trace = function( msg ){
  console.log( msg  );
}

var point2canvas = function(point) {
      return v(point.x *  scale, (480 - point.y) * scale);
  };

  var canvas2point = function(x, y) {
    return v(x / self.scale, 480 - y / self.scale);
  };

  // HACK HACK HACK - its awful having this here, and its going to break when we
  // have multiple demos open at the same time.
 
 var traceMouse = function( e )
 {
      mouse = canvas2point(e.clientX, e.clientY);
 }

 var mouseDown = function (e) {
    e.preventDefault();
    var rightclick = e.which === 3; // or e.button === 2;
    mouse = canvas2point(e.clientX, e.clientY);

    if(!rightclick && !self.mouseJoint) {
      var point = canvas2point(e.clientX, e.clientY);
    
      var shape = space.pointQueryFirst(point, GRABABLE_MASK_BIT, cp.NO_GROUP);
      if(shape){
        var body = shape.body;
        var mouseJoint = self.mouseJoint = new cp.PivotJoint(mouseBody, body, v(0,0), body.world2Local(point));

        mouseJoint.maxForce = 50000;
        mouseJoint.errorBias = Math.pow(1 - 0.15, 60);
        space.addConstraint(mouseJoint);
      }
    }

    if(rightclick) {
      self.rightClick = true;
    }
  };

  var mouseUp = function(e) {
    
    trace("mouse up");
    var rightclick = e.which === 3; // or e.button === 2;
    mouse = canvas2point(e.clientX, e.clientY);

    if(!rightclick) {
      if(self.mouseJoint) {
        space.removeConstraint(self.mouseJoint);
        self.mouseJoint = null;
      }
    }

    if(rightclick) {
      self.rightClick = false;
    }
  };

exports.awake = function (){
  world.awake( window );

  //canvas = document.getElementsByTagName('canvas')[0];
  //ctx =  canvas.getContext('2d');
  
  //canvas.onmousemove  = traceMouse;
  //canvas.onmousedown  = mouseDown;
  //canvas.onmouseup    = mouseUp;
  //canvas.onmousemove  = mouseMove;

  //window.onkeyup      = keyUp;

  //space = new cp.Space();

  //trace("why arent you working");

  //balls();
  //run();

  //window.onresize();
  //window.setInterval( step , 10 );
};

var mouseMove = function( e )
{
  //trace( e );
}

var keyUp = function(e)
{
  trace( e );
}

var space = function()
{

}

var raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) {
    return window.setTimeout(callback, 1000 / 60);
  };

var update = function( dt) {
  space.step(dt);
}

var draw = function() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw shapes
  ctx.strokeStyle = 'black';
  ctx.clearRect(0, 0, this.width, this.height);

  ctx.font = "16px sans-serif";
  ctx.lineCap = 'round';

  space.eachShape(function(shape) {
    ctx.fillStyle = shape.style();
    shape.draw(ctx, scale, point2canvas);
  });

  // Draw collisions
  /*
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;

  var arbiters = this.space.arbiters;
  for (var i = 0; i < arbiters.length; i++) {
    var contacts = arbiters[i].contacts;
    for (var j = 0; j < contacts.length; j++) {
      var p = this.point2canvas(contacts[j].p);

      ctx.beginPath()
      ctx.moveTo(p.x - 2, p.y - 2);
      ctx.lineTo(p.x + 2, p.y + 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(p.x + 2, p.y - 2);
      ctx.lineTo(p.x - 2, p.y + 2);
      ctx.stroke();
    }
  }*/

  drawInfo();
};

var message;

var drawInfo = function() {
  
  var maxWidth = width - 20;

  ctx.textAlign = 'start';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = "black";
  //this.ctx.fillText(this.ctx.font, 100, 100);
  var fpsStr = Math.floor(this.fps * 10) / 10;
  if (space.activeShapes.count === 0) {
    fpsStr = '--';
  }
  
  ctx.fillText("FPS: " + fpsStr, 10, 50, maxWidth);
  ctx.fillText("Step: " + space.stamp, 10, 80, maxWidth);

  var arbiters = space.arbiters.length;
  this.maxArbiters = this.maxArbiters ? Math.max(this.maxArbiters, arbiters) : arbiters;
  ctx.fillText("Arbiters: " + arbiters + " (Max: " + this.maxArbiters + ")", 10, 110, maxWidth);

  var contacts = 0;
  for(var i = 0; i < arbiters; i++) {
    contacts += space.arbiters[i].contacts.length;
  }
  
  maxContacts = this.maxContacts ? Math.max(this.maxContacts, contacts) : contacts;
  ctx.fillText("Contact points: " + contacts + " (Max: " + this.maxContacts + ")", 10, 140, maxWidth);
  ctx.fillText("Simulation time: " + this.simulationTime + " ms", 10, 170, maxWidth);
  ctx.fillText("Draw time: " + this.drawTime + " ms", 10, 200, maxWidth);

  if ( message) {
    ctx.fillText(this.message, 10, this.height - 50, maxWidth);
  }
};

window.onresize = function(e) {
  

  //width = canvas.width = window.innerWidth;   //full screen
  //height = canvas.height = window.innerHeight; //full screen

  //width = canvas.width ;
  //height = canvas.height ;

  //if (width/height > 640/480) {
  //  scale = height / 480;
  //} else {
  //  scale = width / 640;
  //}

  //trace("scale ::: " + scale );
  //resized = true;
};


var lastTime = 0;

var step2 = function( time){
    
   lastTime = time;

    if ( running) {
      raf(step);
    }

}

var run = function() {
  
  this.running = true;
  step2(0);
};


var soon = function(fn) { setTimeout(fn, 1); };

var stop = function() {
  this.running = false;
};

var mouseBody = this.mouseBody = new cp.Body(Infinity, Infinity);

var step = function(dt) {
  // Update FPS

  if(dt > 0) {
    this.fps = 0.9*this.fps + 0.1*(1000/dt);
  }

  // Move mouse body toward the mouse
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
    resized = false;  //we should enable resizing
  }
};

var addFloor = function() {
  var floor = space.addShape(new cp.SegmentShape(space.staticBody, v(0, 0), v(640, 0), 0));
  floor.setElasticity(1);
  floor.setFriction(1);
  floor.setLayers(NOT_GRABABLE_MASK);
};

var addWalls = function() {
  var wall1 = space.addShape(new cp.SegmentShape(space.staticBody, v(0, 0), v(0, 480), 0));
  wall1.setElasticity(1);
  wall1.setFriction(1);
  wall1.setLayers(NOT_GRABABLE_MASK);

  var wall2 = space.addShape(new cp.SegmentShape(space.staticBody, v(640, 0), v(640, 480), 0));
  wall2.setElasticity(1);
  wall2.setFriction(1);
  wall2.setLayers(NOT_GRABABLE_MASK);
};

// Drawing helper methods

var drawCircle = function(ctx, scale, point2canvas, c, radius) {
  
  //trace("scale " + scale );
  var c = point2canvas(c);
  ctx.beginPath();
  ctx.arc(c.x, c.y, scale * radius, 0, 2*Math.PI, false);
  ctx.fill();
  ctx.stroke();
};

var drawLine = function(ctx, point2canvas, a, b) {
  a = point2canvas(a); b = point2canvas(b);

  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
};

var drawRect = function(ctx, point2canvas, pos, size) {
  var pos_ = point2canvas(pos);
  var size_ = cp.v.sub(point2canvas(cp.v.add(pos, size)), pos_);
  ctx.fillRect(pos_.x, pos_.y, size_.x, size_.y);
};

// **** Draw methods for Shapes

cp.PolyShape.prototype.draw = function(ctx, scale, point2canvas)
{
  ctx.beginPath();

  var verts = this.tVerts;
  var len = verts.length;
  var lastPoint = point2canvas(new cp.Vect(verts[len - 2], verts[len - 1]));
  ctx.moveTo(lastPoint.x, lastPoint.y);

  for(var i = 0; i < len; i+=2){
    var p = point2canvas(new cp.Vect(verts[i], verts[i+1]));
    ctx.lineTo(p.x, p.y);
  }
  ctx.fill();
  ctx.stroke();
};

cp.SegmentShape.prototype.draw = function(ctx, scale, point2canvas) {
  var oldLineWidth = ctx.lineWidth;
  ctx.lineWidth = Math.max(1, this.r * scale * 2);
  drawLine(ctx, point2canvas, this.ta, this.tb);
  ctx.lineWidth = oldLineWidth;
};

cp.CircleShape.prototype.draw = function(ctx, scale, point2canvas) {
  drawCircle(ctx, scale, point2canvas, this.tc, this.r);

  // And draw a little radian so you can see the circle roll.
  drawLine(ctx, point2canvas, this.tc, cp.v.mult(this.body.rot, this.r).add(this.tc));
};


// Draw methods for constraints

cp.PinJoint.prototype.draw = function(ctx, scale, point2canvas) {
  var a = this.a.local2World(this.anchr1);
  var b = this.b.local2World(this.anchr2);
  
  ctx.lineWidth = 2;
  ctx.strokeStyle = "grey";
  drawLine(ctx, point2canvas, a, b);
};

cp.SlideJoint.prototype.draw = function(ctx, scale, point2canvas) {
  var a = this.a.local2World(this.anchr1);
  var b = this.b.local2World(this.anchr2);
  var midpoint = v.add(a, v.clamp(v.sub(b, a), this.min));

  ctx.lineWidth = 2;
  ctx.strokeStyle = "grey";
  drawLine(ctx, point2canvas, a, b);
  ctx.strokeStyle = "red";
  drawLine(ctx, point2canvas, a, midpoint);
};

cp.PivotJoint.prototype.draw = function(ctx, scale, point2canvas) {
  var a = this.a.local2World(this.anchr1);
  var b = this.b.local2World(this.anchr2);
  ctx.strokeStyle = "grey";
  ctx.fillStyle = "grey";
  drawCircle(ctx, scale, point2canvas, a, 2);
  drawCircle(ctx, scale, point2canvas, b, 2);
};

cp.GrooveJoint.prototype.draw = function(ctx, scale, point2canvas) {
  var a = this.a.local2World(this.grv_a);
  var b = this.a.local2World(this.grv_b);
  var c = this.b.local2World(this.anchr2);
  
  ctx.strokeStyle = "grey";
  drawLine(ctx, point2canvas, a, b);
  drawCircle(ctx, scale, point2canvas, c, 3);
};

cp.DampedSpring.prototype.draw = function(ctx, scale, point2canvas) {
  var a = this.a.local2World(this.anchr1);
  var b = this.b.local2World(this.anchr2);

  ctx.strokeStyle = "grey";
  drawSpring(ctx, scale, point2canvas, a, b);
};

var randColor = function() {
  return Math.floor(Math.random() * 256);
};

var styles = [];
for (var i = 0; i < 100; i++) {
  styles.push("rgb(" + randColor() + ", " + randColor() + ", " + randColor() + ")");
}

//styles = ['rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(0,0,255,0.5)'];

cp.Shape.prototype.style = function() {
  var body;
  if (this.sensor) {
    return "rgba(255,255,255,0)";
  } else {
    body = this.body;
    if (body.isSleeping()) {
      return "rgb(50,50,50)";
    } else if (body.nodeIdleTime > this.space.sleepTimeThreshold) {
      return "rgb(170,170,170)";
    } else {
      return styles[this.hashid % styles.length];
    }
  }
};



// Private functions

var timestamp = function() {
  var d = new Date();
  return d.getHours() + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
};

var pad2 = function(number) {
  return (number < 10 ? '0' : '') + number;
};

var valid = function(text) {
  return text && text.length > 0;
};

var balls = function() {
  //Demo.call(this);
  space.iterations = 60;
  space.gravity = v(0, -500);
  space.sleepTimeThreshold = 0.5;
  space.collisionSlop = 0.5;
  space.sleepTimeThreshold = 0.5;

  addFloor();
  addWalls();

  var width = 50;
  var height = 60;
  var mass = width * height * 1/1000;
  var rock = space.addBody(new cp.Body(mass, cp.momentForBox(mass, width, height)));
  rock.setPos(v(500, 100));
  rock.setAngle(1);
  shape = space.addShape(new cp.BoxShape(rock, width, height));
  shape.setFriction(0.3);
  shape.setElasticity(0.3);

  for (var i = 1; i <= 10; i++) {
    
    var radius = 20;
    mass = 3;
    var body = space.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, radius, v(0, 0))));
    body.setPos(v(200 + i, (2 * radius + 5) * i));
    var circle = space.addShape(new cp.CircleShape(body, radius, v(0, 0)));
    circle.setElasticity(0.8);
    circle.setFriction(1);
    circle.setLayers( NOT_GRABABLE_MASK );
  }
/*
 * atom.canvas.onmousedown = function(e) {
      radius = 10;
      mass = 3;
      body = space.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, radius, v(0, 0))));
      body.setPos(v(e.clientX, e.clientY));
      circle = space.addShape(new cp.CircleShape(body, radius, v(0, 0)));
      circle.setElasticity(0.5);
      return circle.setFriction(1);
    };
*/

  ctx.strokeStyle = "black";

  var ramp = space.addShape(new cp.SegmentShape(space.staticBody, v(100, 100), v(300, 100), 1));
  ramp.setElasticity(1);
  ramp.setFriction(1);
  ramp.setLayers(NOT_GRABABLE_MASK);
};




//Balls.prototype = Object.create(this.prototype);

//addDemo('Balls', Balls);

