function imageResize(imageView, imageHolder){

	var imageSize = imageView.toImage();
	
	if (imageSize.width>=imageSize.height){
		var ratio = imageSize.height/imageHolder.height;
		imageView.setHeight(imageHolder.height);
		imageView.setWidth(imageSize.width/ratio);
	} else {
		var ratio = imageSize.width/imageHolder.width;
		imageView.setHeight(imageHolder.width);
		imageView.setWidth(imageSize.height/ratio);
	}

}

module.exports = imageResize; 