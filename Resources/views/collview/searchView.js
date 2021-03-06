function searchView(tabGroup, win, leftView, styleID, rightView, windowsArray, venueatozScrollView, isSearchPage) {

	var buttonCont = Ti.UI.createView({
		left:18,
		top:0,
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE,
		backgroundColor:'transparent',
		bubbleParent:true
	});

	var collectionLabel = Ti.UI.createButton({
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE,
		color : '#000000',
		backgroundColor:'transparent',
		font : {
			fontSize : 18,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		title:'All collections',
		bubbleParent:true,
		touchEnabled:false
	});
	
	buttonCont.add(collectionLabel);

	buttonCont.setWidth(buttonCont.toImage().width+(buttonCont.toImage().width/10*2));
	buttonCont.setHeight(buttonCont.toImage().height+(buttonCont.toImage().height/10*2+2));

	buttonCont.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		for (var i = 0; i < windowsArray.length; i++) {
			windowsArray[i].close();
		}
		windowsArray.splice(0, windowsArray.length - 1);
		var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
	});

	//Add back button
	
	var backButtonCont = Ti.UI.createView({
		left:18,
		top:0,
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE,
		backgroundColor:'transparent',
		bubbleParent:true
	});
	
	var backButton = Ti.UI.createButton({
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE,
		color : '#000000',
		backgroundColor:'transparent',
		font : {
			fontSize : 18,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		title : 'Back',
		bubbleParent:true,
		touchEnabled:false
	});
	
	backButtonCont.add(backButton);

	backButtonCont.setWidth(backButtonCont.toImage().width+(backButtonCont.toImage().width/10*2));
	backButtonCont.setHeight(backButtonCont.toImage().height+(backButtonCont.toImage().height/10*2+2));

	backButtonCont.addEventListener('click', function(e) {
		var i = 2;
		if (isSearchPage != undefined && isSearchPage) {
			i = 3;
		}
		for (var j = i; j < windowsArray.length; j++) {
			windowsArray[j].close();
		}
		windowsArray.splice(i, windowsArray.length - i);

		/*if (windowsArray.length > 3) {
		 for (var i = 3; i < windowsArray.length; i++) {
		 windowsArray[i].close();
		 }
		 windowsArray.splice(3, windowsArray.length-3);
		 } else {
		 var index = windowsArray.length - 1;
		 windowsArray[index].close();
		 windowsArray.splice(index, 1);
		 }*/
	});

	var searchView = Ti.UI.createView({
		width : '197',
		height : '30',
		top : '0',
		left : '723',
		backgroundColor : '#F0EEEE',
		zIndex : 15
	});

	var searchViewDetail = Ti.UI.createView({
		width : '197',
		height : '186',
		top : '30',
		left : '723',
		backgroundColor : '#F0EEEE',
		zIndex : 201,
	});

	var searchLabel = Ti.UI.createLabel({
		top : '8',
		left : '660',
		font : {
			fontSize : 16,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : 'Search',
	});

	var searchViewGoTo = Ti.UI.createButton({
		left : '10%',
		top : '1%',
		title : 'Go to....',
		color : '#000000',
		backgroundImage : 'none',
		font : {
			fontSize : 17,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	});

	searchView.add(searchViewGoTo);

	var Cover = Ti.UI.createButton({
		left : '10%',
		top : '0',
		title : 'Cover',
		color : '#000000',
		backgroundImage : 'none',
		font : {
			fontSize : 17,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		height:'44'
	});

	Cover.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		for (var i = 1; i < windowsArray.length; i++) {
			windowsArray[i].close();
		}
		windowsArray.splice(1, windowsArray.length - 1);
		var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
	});

	searchViewDetail.add(Cover);

	var eLetter = Ti.UI.createButton({
		left : '10%',
		top : '44',
		title : 'Editors letter',
		color : '#000000',
		backgroundImage : 'none',
		font : {
			fontSize : 17,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		height:'44'
	});

	eLetter.addEventListener('click', function(e) {
		if (venueatozScrollView != undefined) {
			venueatozScrollView.setVisible(false);
		}
		pageflip.changeCurrentPage(0, true);

		if (windowsArray.length >= 3) {
			for (var i = 2; i < windowsArray.length; i++) {
				windowsArray[i].close();
			}
			windowsArray.splice(2, windowsArray.length - 2);
		}

		searchViewDetail.hide();

	});

	searchViewDetail.add(eLetter);

	var sMap = Ti.UI.createButton({
		left : '10%',
		top : '88',
		title : 'Search & Map',
		color : '#000000',
		backgroundImage : 'none',
		font : {
			fontSize : 17,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		height:'44'
	});

	sMap.addEventListener('click', function(e) {
		if (venueatozScrollView != undefined) {
			venueatozScrollView.setVisible(false);
		}
		pageflip.changeCurrentPage(2, true);
		if (windowsArray.length >= 3) {
			for (var i = 2; i < windowsArray.length; i++) {
				windowsArray[i].close();
			}
			windowsArray.splice(2, windowsArray.length - 2);
		}
		searchViewDetail.hide();
	});

	searchViewDetail.add(sMap);

	var venues = Ti.UI.createButton({
		left : '10%',
		top : '134',
		title : 'Venues A-Z',
		color : '#000000',
		backgroundImage : 'none',
		font : {
			fontSize : 17,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		height:'44'
	});

	venues.addEventListener('click', function(e) {
		pageflip.changeCurrentPage(4, true);
		if (windowsArray.length >= 3) {
			for (var i = 2; i < windowsArray.length; i++) {
				windowsArray[i].close();
			}
			windowsArray.splice(2, windowsArray.length - 2);
		}
		searchViewDetail.hide();
	});
	searchViewDetail.add(venues);

	searchView.addEventListener('click', function(e) {
		if (searchViewDetail.visible) {
			searchViewDetail.hide();
		} else {
			searchViewDetail.show();
		}
	});

	searchViewDetail.hide();

	if (Ti.App.Properties.getString('osname') != 'iPad') {
		Cover.setFont({
			fontSize : 10
		});

		eLetter.setFont({
			fontSize : 10
		});

		sMap.setFont({
			fontSize : 10
		});

		venues.setFont({
			fontSize : 10
		});
	}

	return [searchLabel, searchView, searchViewDetail, buttonCont, backButtonCont];
}

module.exports = searchView;
