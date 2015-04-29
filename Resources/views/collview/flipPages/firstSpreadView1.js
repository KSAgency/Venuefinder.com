var venueNameDetail = require('/views/collview/flipPages/getVenueNameAndDetail');

function firstSpreadView1(flipView,venueID) {
	Ti.API.info("** venue detail "+venueNameDetail);
	
	var imagePath = venueNameDetail.getVenueAdvert(venueID);
		
	/*var middleView1 = Ti.UI.createView({
		backgroundColor : '#C0C0C0',
		width:'391',
		height:'540',
		top:'76',
		left:'44',
	});
	*/
	
	var imageHolder = Ti.UI.createView({
		width:'382',
		height:'540',
		top:'76',
		left:'44',
		link:imagePath[1]
	});
	
	var coverImage = Ti.UI.createImageView({
		image:imagePath[0],
		touchEnabled:false
	});
	
	imageHolder.addEventListener('click', function(e){
		
		var urlWin = Titanium.UI.createWindow({
			backgroundColor:'rgba(0,0,0,0.8)',
		});

		var close = Titanium.UI.createButton({
			right:'5%',
			top:'5%',
			height:'20',
			zIndex:1,
			title:"X",
			color:"#FFF",
			font:{
				fontSize:"28",
				fontWeight:"bold"
			},
		});

		urlWin.add(close);
		close.addEventListener('click', function(e) {
			urlWin.close();
		});

		var websiteContainer = Ti.UI.createView({
			width:'80%',
			height:'80%',
			top:'10%',
			left:'10%',
		});

		var webview = Titanium.UI.createWebView({
			url:e.source.link
		});

		websiteContainer.add(webview);

		urlWin.add(websiteContainer);
		urlWin.open();
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
