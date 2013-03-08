world = {

	type:"Level1",
	toonFrames:"Level",
	v:null,
	scale:1,
	styles:[], 				  

	start:function( ){
		
		//self.core.cosmos.avatar = {type:'Sun', x:0, y:0 };

		world.physics  = document.getElementById('physics');
		world.height  	= self.core.height;
		world.width 	= self.core.width;

		world.ctx 		= world.physics.getContext('2d');
		
		var v = world.v = cp.v;

		var space = world.space = new cp.Space();
  		space.iterations = 60;
  		space.gravity = v(0, 1);
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

  		world.drawBorders();
		
		var radius = 20;
    	var mass = 3;

    	var body = world.space.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, radius, world.v(0, 0))));
    	body.setPos( world.v( 10, (2 * radius + 5) * 1));
    	
    	var circle = world.space.addShape(new cp.CircleShape( body, radius, world.v(0, 0)));
    	circle.setElasticity(0.8);
    	circle.setFriction(1);
    	//circle.setLayers( NOT_GRABABLE_MASK );

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
  	//var c = point2canvas(c);
  	//ctx.beginPath();
  	//ctx.arc(c.x, c.y, scale * radius, 0, 2*Math.PI, false);
  	//ctx.fill();
  	//ctx.stroke();
},

  canvas2point:function(x, y) {
    return world.v(x / world.scale, world.height - y / world.scale);
  },

	run: function ( ){
		
		self.calcFPS();
		//self.core.cosmos.run();
		self.core.stage.update(); //shouldnt be here

		//NEW
		//avatar.update();
  		///stage.update();

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
  		trace("adding the borders ");

  		var height = world.height;
  		var width = world.width;
  		var v = world.v;

  		var wall1 = world.space.addShape(new cp.SegmentShape(world.space.staticBody, v(0, 0), v(0, height  ), 0));
  		wall1.setElasticity(1);
  		wall1.setFriction(1);

  		var wall2 = world.space.addShape(new cp.SegmentShape(world.space.staticBody, v(width, 0), v(width, height ), 0));
  		wall2.setElasticity(1);
  		wall2.setFriction(1);

  		//var floor = space.floor space.addShape(new cp.SegmentShape(space.staticBody, v( 0, height / 3), v(width, height /2 ), 0));
  		//floor.setElasticity(1);
  		//floor.setFriction(5);
	}

	
}
