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
	var middleView1 = Ti.UI.createImageView({
		backgroundColor : '#C0C0C0',
		width:'391',
		height:'540',
		top:'76',
		left:'44',
		image : imagePath,
	});
	
	flipView.add(middleView1);
	return flipView;
}

module.exports = firstSpreadView1;
