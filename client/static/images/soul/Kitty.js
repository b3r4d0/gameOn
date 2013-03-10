soul = {

	type:"Kitty",
	toonFrames:"kitty",

	toons:{ 
		idle:[5,6,7,8,8,8,8,8,7,6,5],
		attack:[1,2,3,4,5]
	},

	height:150,
	width:134,

	radius:20,
	mass:58,
	elastic:0.8,
	friction:1,

	core:null,

	awake:function( core ){
		soul.core = core;
	},

	action:function( ){
		trace("action rolling ");
		//world.kitty.toon = "attack";
		trace(" do you have core " + soul.core );
      	//self.core.cosmos.avatar = {type:'Claw',  x:world.kitty.x + 120, y:world.kitty.y + 40 }; 
      
	}

}
