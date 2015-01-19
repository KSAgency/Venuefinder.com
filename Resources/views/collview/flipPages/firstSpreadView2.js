var venueNameDetail = require('/views/collview/flipPages/getVenueNameAndDetail');
function firstSpreadView2(flipView, venueID) {

	/*var middleView1 = Ti.UI.createView({
		backgroundColor : '#C0C0C0',
		width : '85',
		height : '94',
		top : '166',
		left : '112',
	});
	flipView.add(middleView1);
	*/
	
	var venueName = venueNameDetail.getVenueTitle(venueID);
	
	var venueNameLabel = Ti.UI.createLabel({
		width : '400',
		height : '52',
		top : '91',
		left : '62',
		font : {
			fontSize : 32,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : venueName,
	});

	flipView.add(venueNameLabel);
	
	var venueText = venueNameDetail.getVenueText(venueID); 
	
	/*var textLabel = Ti.UI.createLabel({
		width : '198',
		height : '450',
		top : '156',
		left : '215',
		font : {
			fontSize : 18,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	});*/
	
	var textView = Ti.UI.createWebView({
		width : '198',
		height : '450',
		top : '156',
		left : '215',
		font : {
			fontSize : 18,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		html :venueText,
		backgroundColor : 'transparent',
		disableBounce : true,
	});
		
	flipView.add(textView);

	return flipView;
}

module.exports = firstSpreadView2;
