world = {

	type:"Level1",
	toonFrames:"Level",
	v:null,
	scale:1,
	styles:[], 
  balloon:null,
  kitty:null,
  gravityV:-100,
  gravityH:0,				  

	start:function( ){

      world.initPhysics();
  		world.drawBorders();
      
      document.onkeypress = world.keyPress;
      //avatars
    	
      self.core.cosmos.avatar = {type:'Balloon',  x:0, y:0 };
      self.core.cosmos.avatar = {type:'Kitty',    x:100, y:100 };
	},

  run: function ( ){
    
    self.calcFPS();
    self.core.stage.update(); //shouldnt be here

    var i = 0;
    var max = self.core.avatarList.length;

  if ( world.balloon != null ) 
  {
    var force = world.gravityV * -1;
    world.balloon.applyImpulse( world.v ( 0, force), world.v(0,0 ));
  }

    
     

    for ( i; i < max; i++ )
    {
      var avatar = self.core.avatarList[ i ];
      
      var body = avatar.core.body ;

      if ( body != null) 
      {
          var v = world.v;

           var newPoint = world.point2canvas( body.p );
           var x = newPoint.x;
           var y = newPoint.y;
           avatar.x = x - avatar.width * .5;
           avatar.y = y - avatar.height * .5;
           avatar.run; 
      }

    }

    world.draw();

   },

   createSoul:function( avatar, soul ){
    
    var radius = soul.radius;
    var mass = soul.mass;

    avatar.core.body = world.space.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, radius, world.v(0, 0))));
    avatar.core.body.setPos( world.v( 40,  40 ) );
    
    var circle = world.space.addShape(new cp.CircleShape( avatar.core.body, radius, world.v(0, 0)));
    circle.setElasticity(0.8);
    circle.setFriction(1);

    if ( avatar.type == "Balloon" )   world.balloon = avatar.core.body;
    if ( avatar.type == "Kitty" )     world.kitty = avatar.core.body;

    if ( world.balloon == null ) return
      if ( world.kitty == null ) return


    

    // Slide Joints - Like pin joints but with a min/max distance.
    // Can be used for a cheap approximation of a rope.
    var posA = world.v( 50, 60);
    var posB = world.v( 110, 60);
    var boxOffset;
    boxOffset = world.v(160, 0);
    //label('Slide Joint');
    //body1 = addBall(posA);
    //body2 = addBall(posB);
    //body2.setAngle(Math.PI);
    world.space.addConstraint(new cp.SlideJoint( world.balloon, world.kitty, world.v(15,0), world.v(15,0), 20, 40));

  },

  keyPress:function( e ){
    var e=window.event || e;

    var body = world.balloon;
    if ( body == null ) return;

    switch ( e.keyCode ) {
      case 38:
      body.applyImpulse( world.v ( 0, 10), world.v(0,0 ));
      break;

      case 40:
      body.applyImpulse( world.v ( 0, -10), world.v(0,0 ));
      break;

      case 37:
      body.applyImpulse( world.v ( -10, 0), world.v(0,0 ));
      break;

      case 39:
      body.applyImpulse( world.v ( 0, 10), world.v(0,0 ));
      break;
    };

  },

  initPhysics:function(){

    world.physics  = document.getElementById('physics');
    world.height    = self.core.height;
    world.width   = self.core.width;

    world.ctx     = world.physics.getContext('2d');
    
    var v = world.v = cp.v;

    var space = world.space = new cp.Space();
      space.iterations = 60;
      space.gravity = v( world.gravityH, world.gravityV);
      space.sleepTimeThreshold = 0.5;
      space.collisionSlop = 0.5;
      space.sleepTimeThreshold = 0.5;

      self.mouse = v(0,0); 
      self.mouseBody = new cp.Body(Infinity, Infinity);

      //physics.onresize();
      //trace("awaking the world");

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
        return "rgb(0,255,0)";
      };
      }
    };


    //http://www.youtube.com/watch?v=EnCL2sYO41Q


    cp.SegmentShape.prototype.draw = function(ctx, scale, point2canvas) {
      var oldLineWidth = ctx.lineWidth;
      ctx.lineWidth = Math.max(1, this.r * scale * 2);
      world.drawLine(ctx, point2canvas, this.ta, this.tb);
      ctx.lineWidth = oldLineWidth;
    };

    cp.CircleShape.prototype.draw = function(ctx, scale, point2canvas) {
      world.drawCircle(ctx, scale, point2canvas, this.tc, this.r);

      // And draw a little radian so you can see the circle roll.
      world.drawLine(ctx, point2canvas, this.tc, cp.v.mult(this.body.rot, this.r).add(this.tc));
    };
  },

	drawLine:function(ctx, point2canvas, a, b) {
  	a = point2canvas(a); b = point2canvas(b);
  	ctx.beginPath();
  	ctx.moveTo(a.x, a.y);
  	ctx.lineTo(b.x, b.y);
 	ctx.stroke();
	},

	point2canvas:function(point) {
      return world.v(point.x *  world.scale, ( world.height - point.y) * world.scale);
  },

  	drawCircle:function(ctx, scale, point2canvas, c, radius) {
  	//trace("scale " + scale );
  	var c = point2canvas(c);
  	ctx.beginPath();
  	ctx.arc(c.x, c.y, scale * radius, 0, 2*Math.PI, false);
  	ctx.fill();
  	ctx.stroke();
},

  canvas2point:function(x, y) {
    return world.v(x / world.scale, world.height - y / world.scale);
  },

	

   draw:function() {

      var ctx = world.ctx;
      var physics = world.physics;

      //ctx.clearRect(0, 0, world.width, world.height);
      //ctx.fillText("Version: " + tag, 0, 0, physicsWidth );

      // Draw shapes
      ctx.strokeStyle = 'black';
      ctx.clearRect(0, 0, world.width, world.height);

      ctx.font = "16px sans-serif";
      ctx.lineCap = 'round';

      world.space.eachShape(function(shape) {
        ctx.fillStyle = shape.style();
        shape.draw( world.ctx, world.scale, world.point2canvas);
        });

      world.update(1/60);
   },

	update:function( dt) {
 	 world.space.step(dt);
	},

	drawBorders: function (){
  		var height = world.height;
  		var width = world.width;
  		var v = world.v;

  		var wall1 = world.space.addShape(new cp.SegmentShape(world.space.staticBody, v(0, 0), v(0, height  ), 0));
  		wall1.setElasticity(1);
  		wall1.setFriction(1);

  		var wall2 = world.space.addShape(new cp.SegmentShape(world.space.staticBody, v(width, 0), v(width, height ), 0));
  		wall2.setElasticity(1);
  		wall2.setFriction(1);

  		var floor = world.space.addShape(new cp.SegmentShape( world.space.staticBody, v( 0, height ), v(width, height ), 0));
  		
      floor.setElasticity(1);
  		floor.setFriction(5);


      var floor2 = world.space.addShape(new cp.SegmentShape( world.space.staticBody, v( 0, 0 ), v(width, 0 ), 0));
      
      floor2.setElasticity(1);
      floor2.setFriction(5);
	}

	
}
