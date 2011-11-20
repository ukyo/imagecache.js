//Not Support IE.
var imagecache = (function(){

var ls = window.localStorage, prefix = "IMAGECACHE";

function set(url, callback){
	var image = new Image(),
		canvas = document.createElement("canvas"),
		type = /(jpeg|jpg|png)$/.test(url) ? (RegExp.$1 === "jpeg" || RegExp.$1 === "jpg") ? "jpeg" : "png" : "png",
		ctx;
	callback = callback || function(){};
	
	try {
		image.src = url;
		image.onload = function(){
			canvas.width = image.width;
			canvas.height = image.height;
			ctx = canvas.getContext("2d");
			ctx.drawImage(image, 0, 0);
			ls[prefix + url] = canvas.toDataURL("image/" + type);
			callback();
		};
	} catch(e) {}
}

function get(url){
	return ls[prefix + url];
}

return {
	set: set,
	get: get
};

})();
