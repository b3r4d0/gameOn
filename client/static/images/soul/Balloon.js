soul = {

	type:"Balloon",

	toonFrames:"balloons",

	toons:{ 
		idle:[0]
	},

	height:150,
	width:174,

	radius:10,
	mass:1,
	elastic:0.8,
	friction:1,

	awake:function(  content ){
		trace( "wehere is the Balloon " +  content.core.type  );

 		var graphics = new createjs.Graphics().beginFill("#000000").drawRect(0, 0, 1, 100);
 		var shape = new createjs.Shape(graphics);

 		content.core.cosmos.stage.addChild( shape );

 	//	trace("do you have a shape " + shape );


		//trace("what avatar id is coming in " + avatar.type );
		//trace("have you awakend something !!!");
	},

	onPress:function ( content ){
		
		 //content.core.body.applyImpulse( cp.v ( 0, 1000), cp.v(0,0 ) ) ;
		//avatar.display.gotoAndPlay("attack");
		//avatar		//soul.avatar.toon = "attack";
		//trace("that sucks !!!" );
	},
}
