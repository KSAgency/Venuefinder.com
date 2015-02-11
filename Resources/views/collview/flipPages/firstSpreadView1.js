var venueNameDetail = require('/views/collview/flipPages/getVenueNameAndDetail');

function firstSpreadView1(flipView,venueID) {
	Ti.API.info("** venue detail "+venueNameDetail);
	
	var imagePath = venueNameDetail.getVenueImage(venueID);
		
	/*var middleView1 = Ti.UI.createView({
		backgroundColor : '#C0C0C0',
		width:'391',
		height:'540',
		top:'76',
		left:'44',
	});
	*/
	
	var imageHolder = Ti.UI.createView({
		width:'391',
		height:'540',
		top:'76',
		left:'44',
		backgroundColor : '#C0C0C0',
		touchEnabled:false
	});
	
	var coverImage = Ti.UI.createImageView({
		image:imagePath,
	});
	
	var imageSize = coverImage.toImage();
	
	if (imageSize.width>=imageSize.height){
		var ratio = imageSize.height/imageHolder.height;
		coverImage.setHeight(imageHolder.height);
		coverImage.setWidth(imageSize.width/ratio);
	} else {
		var ratio = imageSize.width/imageHolder.width;
		coverImage.setHeight(imageHolder.width);
		coverImage.setWidth(imageSize.height/ratio);
	}
	
	imageHolder.add(coverImage);
	flipView.add(imageHolder);
	return flipView;
	
}

module.exports = firstSpreadView1;
