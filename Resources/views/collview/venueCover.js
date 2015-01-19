function venueCover(tabGroup, style, name, coverWindow, collectionWindow) {

	var win = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		backgroundColor : 'rgba(255,255,255,0)',
	});

	var backLabel = Ti.UI.createButton({
		title : 'Back',
		color : '#000000',
		width : Ti.UI.SIZE,
		height : 30,
		top : '2%',
		left : 20,
		font : {
			fontSize : 24,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		backgroundColor : 'rgba(255,255,255,0)',
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	});
	win.add(backLabel);
	backLabel.addEventListener('click', function(e) {
		coverWindow.close();
	});


	var image;
	if (style == 39) {
		//image = '/images/collection-cover.png';
		image = '/images/45StarHotels.jpg';
	} else if (style == 15) {
		image = '/images/unusualVeneus.jpg';
	} else if (style == 3) {
		image = '/images/conferenceVenues.jpg';
	} else if (style == 20) {
		image = '/images/castleHistoricVenues.jpg';
	} else if (style == 19) {
		image = '/images/AcademicVenues.jpg';
	} else if (style == 53) {
		image = '/images/christmasVenues.jpg';
	}

	var venueView = Ti.UI.createView({
		width : '464',
		height : '656',
		top : '48',
		left : '285',
		backgroundColor : '#2696BE',
	});
	win.add(venueView);

	var venueTitleLabel = Ti.UI.createLabel({
		text : name,
		top : '29',
		color : '#ffffff',
		left : '8%',
		width : '84%', 
		height : 'auto',
		font : {
			fontSize : 53,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
	});
	venueView.add(venueTitleLabel);

	venueView.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(coverWindow);
		var windowsArray = [];
		windowsArray.push(coverWindow);
		var createFlipWindow = require('/views/collview/createFlipWindow');
		var win2 = createFlipWindow(tabGroup, '/views/collview/flipPages/childFlipView.js', 'Venue Collections', Ti.App.Properties.getString('allWindowsBackgroundColor'), '/images/loading_page.png', 'Search', 'Venue Collections', '', '', null, style, windowsArray, startActInd);
		win2.open();
	});
	
	coverWindow.add(win);
	
	var next = Ti.UI.createButton({
		title : '>',
		font : {
			fontSize : '24',
		},
		color : '#000000',
		backgroundImage : 'none',

	});

	next.addEventListener('click', function() {
		venueView.fireEvent('click');
	});

	var flexSpace = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var toolbar = Titanium.UI.iOS.createToolbar({
		items : [flexSpace, next],
		bottom : '0',
		borderTop : true,
		borderBottom : false
	});
	win.add(toolbar);

	var viewChildren = win.getChildren();
	var labelObj;

	if (viewChildren.length == 1) {
		labelObj = viewChildren[0].getChildren();
		viewChildren = viewChildren[0];
	} else {
		labelObj = viewChildren[1].getChildren();
		viewChildren = viewChildren[1];
	}
	var image = Titanium.UI.createImageView({
		image : image,
		defaultImage : '/images/icon.png',
		width : Ti.UI.FILL,
		height : viewChildren.size.height - labelObj[0].size.height - 10, 
		venueStyle : style,
		styleName : name,
		top : labelObj[0].size.height + 63 ,
	});

	viewChildren.add(image);
}

module.exports = venueCover;
