(function(window) {
testWalk_instance_1 = function() {
	this.initialize();
}
testWalk_instance_1._SpriteSheet = new SpriteSheet({images: ["testWalk.png"], frames: [[0,0,251,227,0,11.6,31.2],[251,0,251,227,0,11.6,31.2],[502,0,251,227,0,11.6,31.2],[753,0,251,227,0,11.6,31.2],[0,227,251,227,0,11.6,31.2],[0,454,251,227,0,11.6,31.2],[0,681,251,227,0,11.6,31.2],[251,227,251,227,0,11.6,31.2],[502,227,251,227,0,11.6,31.2],[753,227,251,227,0,11.6,31.2],[251,454,251,227,0,11.6,31.2],[251,681,251,227,0,11.6,31.2],[502,454,251,227,0,11.6,31.2],[753,454,251,227,0,11.6,31.2],[502,681,251,227,0,11.6,31.2],[753,681,251,227,0,11.6,31.2]]});
var testWalk_instance_1_p = testWalk_instance_1.prototype = new BitmapAnimation();
testWalk_instance_1_p.BitmapAnimation_initialize = testWalk_instance_1_p.initialize;
testWalk_instance_1_p.initialize = function() {
	this.BitmapAnimation_initialize(testWalk_instance_1._SpriteSheet);
	this.paused = false;
}
window.testWalk_instance_1 = testWalk_instance_1;
}(window));

