soul = {

	type:"Bitus",
	toonFrames:"bitus",

	toons:{ 
		idle:[0, 0, 0 , 0, 1, 1 ],
		attack:[ 0]
	},

	height:272,
	width:559,

	radius:10,
	mass:20,
	elastic:0.8,
	friction:1,

	avatar:null,

	kitty:null,

	counter:250,
	flag:false,

	awake:function(  avatar ){
		soul.avatar = avatar;
		trace("have you awakend something !!!");
	},

	onPress:function ( event ){
		trace("Bitus Bites " );

		soul.avatar.toon = "attack";

	},

	action:function( ){
		trace("action rolling ");
		//world.kitty.toon = "attack";
		trace(" do you have core " + soul.core );
      	//self.core.cosmos.avatar = {type:'Claw',  x:world.kitty.x + 120, y:world.kitty.y + 40 }; 
      
	},

	run:function( display ){
		soul.counter -= 1;

		if ( soul.counter > 0 ) return;

		//soul.counter = 1000 * Math.random();
		//if ( soul.flag == true )

		//soul.flag = false;
		// return;

		trace( "applyImpulse ");

		display.core.body.applyImpulse( cp.v ( 0, 100), cp.v(0,0 ) ) ;
		
		if ( soul.counter > -20 ) return

		soul.counter = 1000 * Math.random();


		trace( "looking for soul counter " + soul.counter );
	}

}
