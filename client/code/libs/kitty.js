(function(window) {
khoaskitty_instance_1 = function() {
	this.initialize();
}
khoaskitty_instance_1._SpriteSheet = new SpriteSheet({images: ["kitty.png"], frames: [[0,0,219,160,0,20.35,2.85],[219,0,219,160,0,20.35,2.85],[438,0,219,160,0,20.35,2.85],[657,0,219,160,0,20.35,2.85],[0,160,219,160,0,20.35,2.85],[219,160,219,160,0,20.35,2.85],[438,160,219,160,0,20.35,2.85],[657,160,219,160,0,20.35,2.85],[0,320,219,160,0,20.35,2.85],[219,320,219,160,0,20.35,2.85],[438,320,219,160,0,20.35,2.85],[657,320,219,160,0,20.35,2.85],[0,480,219,160,0,20.35,2.85],[219,480,219,160,0,20.35,2.85],[438,480,219,160,0,20.35,2.85],[657,480,219,160,0,20.35,2.85],[0,640,219,160,0,20.35,2.85],[219,640,219,160,0,20.35,2.85],[438,640,219,160,0,20.35,2.85],[657,640,219,160,0,20.35,2.85],[0,800,219,160,0,20.35,2.85],[219,800,219,160,0,20.35,2.85],[438,800,219,160,0,20.35,2.85],[657,800,219,160,0,20.35,2.85],[0,960,219,160,0,20.35,2.85]]});
var khoaskitty_instance_1_p = khoaskitty_instance_1.prototype = new BitmapAnimation();
khoaskitty_instance_1_p.BitmapAnimation_initialize = khoaskitty_instance_1_p.initialize;
khoaskitty_instance_1_p.initialize = function() {
	this.BitmapAnimation_initialize(khoaskitty_instance_1._SpriteSheet);
	this.paused = false;
}
window.khoaskitty_instance_1 = khoaskitty_instance_1;
}(window));

