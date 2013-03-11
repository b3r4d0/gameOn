soul = {

	type:"Kitty",
	toonFrames:"kitty",

	toons:{ 
		idle:[5,6,7,8,8,8,8,8,7,6,5,9,10,10,10,10,10,10,10],
		attack:[0, 1,2,3,4,5,6,7,8 ]
	},

	height:150,
	width:134,

	radius:20,
	mass:18,
	elastic:0.8,
	friction:1,

	core:null,

	awake:function( core ){
		window.kittySoul = soul;
	},

	action:function( content ){
		//trace("action rolling ");
		//world.kitty.toon = "attack";
		trace(" do you have core " + soul.core );
      	//self.core.cosmos.avatar = {type:'Claw',  x:world.kitty.x + 120, y:world.kitty.y + 40 }; 
      
	},

	onPress:function ( content ){
		
	content.core.body.applyImpulse( cp.v ( 0, 1000), cp.v(0,0 ) ) ;
		//avatar.display.gotoAndPlay("attack");
		//avatar		//soul.avatar.toon = "attack";
		//trace("that sucks !!!" );
	},

}
