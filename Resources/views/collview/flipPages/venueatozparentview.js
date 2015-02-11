function venueatozparentview(tabGroup, win, leftView, styleID, rightView, windowsArray) {

	var atozLabel = Ti.UI.createLabel({
		font : {
			fontSize : '14',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		width:'100',
		height:'12',
		top:'17',
		right:'20',
		text : 'Venues A-Z',
	});

	rightView.add(atozLabel);

	var firstView = Ti.UI.createView({
		width: '347',
		height: '593',
		top:'52',
		left:'72',
		
	});

	leftView.add(firstView);

	var secondView = Ti.UI.createView({
		width: '347',
		height: '593',
		top:'52',
		left:'32',
	});

	rightView.add(secondView);

	var Venuesatoz = require('/views/collview/flipPages/a-zVenuesList');
	var venuesatoz = Venuesatoz(win.tabGroup, styleID, win, win.windowsArray);
	
	var atomLabel = Ti.UI.createLabel({
		font : {
			fontSize : '28',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		 width : '348',
		 height : '22',
		 top:'0',
		 left:'6',
		text : 'A B C D E F G H I J K L M',
	});

	firstView.add(atomLabel);

	var ntozLabel = Ti.UI.createLabel({
		font : {
			fontSize : '28',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		 width : '348',
		 height : '22',
		 top:'0',
		 left:'10',
		text : 'N O P Q R S T U V W X Y Z',
	});

	secondView.add(ntozLabel);
	return venuesatoz[0];
}

module.exports = venueatozparentview;
