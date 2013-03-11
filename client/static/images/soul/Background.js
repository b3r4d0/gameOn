soul = {

	type:"Background",
	toonFrames:"background",

	toons:{ 
		idle:[ 0 ],
		attack:[1,1,1,1,1,1,1,1,1,1,1,1,3,4,2,3,1 ]
	},

	height:200,
	width:500,

	avatar:null,

	kittySoul:null,

	awake:function(  avatar ){
		trace("is the back ground functioning " + avatar.display);
		soul.avatar = avatar;
		//trace("what avatar id is coming in " + avatar.type );
		//trace("have you awakend something !!!");
	},

	onPress:function ( content ){
		window.kitty.display.gotoAndPlay("attack");
		var valueX = window.kitty.display.x + 120;
		var valueY = window.kitty.display.y + 50;

		content.core.cosmos.avatar = {type:'Claw',  x:valueX, y:valueY };
		//soul.action();

		//trace(I need the kitty soul );
		//content.core.cosmos.avatar = {type:'Claw',  x:120, y:140 }; 
		//avatar		//soul.avatar.toon = "attack";
		//trace("that sucks !!!" );
	},

	action:function(  ){
		trace("action rolling ");
		//world.kitty.toon = "attack";
		//trace(" do you have core " + soul.core );
      	//self.core.cosmos.avatar = {type:'Claw',  x:world.kitty.x + 120, y:world.kitty.y + 40 }; 
      
	},

	run:function( avatar){
		//trace("object!!!! " + avatar.core.id );
	}

}
