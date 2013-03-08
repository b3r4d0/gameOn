world = {

	type:"Level1",
	toonFrames:"Level",

	start:function(){
		trace("start the show ");
		self.core.cosmos.avatar = {type:'Sun', x:0, y:0 };
		
	},

	run: function ( ){
		//trace("steady believer " ); 
		self.calcFPS();
		self.core.cosmos.run();
		self.core.stage.update(); //shouldnt be here

	 }
}
