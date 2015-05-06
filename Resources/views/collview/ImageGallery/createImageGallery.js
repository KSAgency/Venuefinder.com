function createImageGallery(tabGroup, imageList, index) {

	var imageViews = [];

	var winBG = Titanium.UI.createWindow({
		backgroundColor:'rgba(0,0,0,0.8)',
	});

	var close = Titanium.UI.createButton({
		right:'35',
		top:'80',
		height:'20',
		zIndex:1,
		title:"X",
		color:"#FFF",
		font:{
			fontSize:"28",
			fontWeight:"bold"
		},
	});

	winBG.add(close);

	close.addEventListener('click', function(e) {
		winBG.close();
	});

	if (Ti.App.Properties.getString('osname') != 'Android') {
		//Set Orientations
		winBG.orientationModes = [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
		winBG.setOrientation(Titanium.UI.LANDSCAPE_LEFT);
	}
	var x1 = index * (720 + 25);
	var scrollView = Ti.UI.createScrollView({
		maxZoomScale:100,
		minZoomScale:1,
		verticalBounce:false,
		layout:'horizontal',
		contentWidth:Ti.UI.SIZE,
		contentHeight:'60%',
		width:Ti.UI.FILL,
		height:'60%',
		top:'20%',
	});

	for (var i = 0; i < imageList.length; i++) {

		var imageView = Titanium.UI.createImageView({
			image:'http://www.venuefinder.com/adverts/'+imageList[i],
			width:720,
			top:0,
			left:25,
			height:'auto',
			defaultImage:'/images/icon.png',
		});

		scrollView.add(imageView);
	}
	winBG.add(scrollView);
	winBG.open();

	var x2 = index * (imageView.width + imageView.left);
	scrollView.scrollTo(x2 - 150, 0);
}

module.exports = createImageGallery;
