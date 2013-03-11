soul = {

	type:"Claw",
	toonFrames:"claw",

	toons:{ 
		idle:[3]
	},

	height:27,
	width:24,

	radius:10,
	mass:10,
	elastic:0.8,
	friction:1,

	run:function ( content ){
		
	content.core.body.applyImpulse( cp.v ( 1000, -100), cp.v(0,0 ) ) ;
		//avatar.display.gotoAndPlay("attack");
		//avatar		//soul.avatar.toon = "attack";
		//trace("that sucks !!!" );
	},


}
