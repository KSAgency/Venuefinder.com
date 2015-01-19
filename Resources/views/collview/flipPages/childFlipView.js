var win = Ti.UI.currentWindow;

var PageFlip = require('ti.pageflip');
var pages = [];

var windowsArray = win.windowsArray;
windowsArray.push(win);
win.windowsArray = windowsArray;

var venueatozScrollView;
var searchMapView1;

var createDatabase = require('/builders/databaseFunctions/createDatabase');
var db = createDatabase('/venuefinder.db', 'venuefinder');

var row = db.execute('select VenueStyle from VenueStyles where VenueStyleID = ' + win.styleID);

while (row.isValidRow()) {
	var venueStyle = row.fieldByName('VenueStyle');
	row.next();
}
db.close();

for (var i = 0; i < 6; i++) {

	if (i % 2 == 0) {
		var flipView = Ti.UI.createView({
			backgroundColor : '#ffffff',
		});

		var venueCollectionName = Ti.UI.createLabel({
			color : '#000000',
			top : '6',
			left : '18',
			font : {
				fontSize : '14',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
			},
			text : venueStyle,
			width : 400,
			height : 35,
		});

		var horizontalImage = Titanium.UI.createView({
			backgroundColor : Ti.App.Properties.getString('allWindowsBackgroundColor'),
			left : '18',
			top : '38',
			width : '455',
			height : '2',
		});

		flipView.add(horizontalImage);
		flipView.add(venueCollectionName);

		var verticalImage = Titanium.UI.createView({
			backgroundColor : Ti.App.Properties.getString('allWindowsBackgroundColor'),
			right : '0',
			top : '0',
			width : '2',
		});

		flipView.add(verticalImage);

	} else {
		var flipView = Ti.UI.createView({
			backgroundColor : '#ffffff',
		});

		var horizontalImage = Titanium.UI.createImageView({
			backgroundColor : Ti.App.Properties.getString('allWindowsBackgroundColor'),
			right : '18',
			top : '38',
			width : '455',
			height : '2',
		});

		flipView.add(horizontalImage);
	}

	if (i == 0) {
		var FirstSpreadView1 = require('/views/collview/flipPages/firstSpreadView1');
		FirstSpreadView1(flipView,win.styleID);
	} else if (i == 1) {
		var FirstSpreadView2 = require('/views/collview/flipPages/firstSpreadView2');
		FirstSpreadView2(flipView, win.styleID);
	} else if (i == 2) {
		var SearchMap = require('/views/collview/flipPages/searchView1');
		var searchMap = SearchMap(win.tabGroup, win, flipView, win.styleID, win.windowsArray);
	} else if (i == 3) {
		var SearchMapView2 = require('/views/collview/flipPages/searchMapView2');
		var searchMapView2 = SearchMapView2(win.tabGroup, win, flipView, win.styleID, win.windowsArray);
	}else if (i == 5) {
		var atozLabel = Ti.UI.createLabel({
			font : {
				fontSize : '14',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
			},
			width : '100',
			height : '12',
			top : '17',
			right : '20',
			text : 'Venues A-Z',
		});

		flipView.add(atozLabel);
	}
	pages.push(flipView);
}

var SearchView = require('/views/collview/searchView');
var searchView = SearchView(win.tabGroup, win, '', win.styleID, '', win.windowsArray, venueatozScrollView);

win.add(searchView[0]);
win.add(searchView[1]);
win.add(searchView[2]);
win.add(searchView[3]);

var pageflip = PageFlip.createView({
	// All Options: TRANSITION_FLIP [default], TRANSITION_SLIDE, TRANSITION_FADE, TRANSITION_CURL
	transition : PageFlip.TRANSITION_CURL,
	transitionDuration : 15,
	pagingMarginWidth : 10,
	landscapeShowsTwoPages : true,
	pages : pages,
	top : '41',
	width : '938',
	height : '660',
});
win.add(pageflip);

pageflip.addEventListener('flipStarted', function(evt) {
	var createEndActInd = require('/builders/endActInd');
	var endActInd = createEndActInd(win.windowsArray[0], win.startActInd[0], win.startActInd[1]);
});

var i = 1;

var previous = Ti.UI.createButton({
	title : '<',
	font : {
		fontSize : '24',
	},
	color : '#000000',
	backgroundImage : 'none',
});

previous.addEventListener('click', function() {

	if (pageflip.currentPage == 0) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);

		for (var i = 1; i < win.windowsArray.length; i++) {
			win.windowsArray[i].close();
		}
		var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
	} else {
		//venueatozScrollView.setVisible(false);
		searchView[2].hide();
		var offsetLandscape = pageflip.landscapeShowsTwoPages && win.size.width > win.size.height;
		var previousPage = pageflip.currentPage - ( offsetLandscape ? 2 : 1);
		if (offsetLandscape && previousPage < 0 && pageflip.currentPage == 1) {
			return;
		}
		pageflip.changeCurrentPage(previousPage, true);
	}
});

var next = Ti.UI.createButton({
	title : '>',
	font : {
		fontSize : '24',
	},
	color : '#000000',
	backgroundImage : 'none',
});

next.addEventListener('click', function() {
	//venueatozScrollView.setVisible(false);
	searchView[2].hide();
	var offsetLandscape = pageflip.landscapeShowsTwoPages && win.size.width > win.size.height;
	var nextPage = pageflip.currentPage + ( offsetLandscape ? 2 : 1);
	if (offsetLandscape && pageflip.pageCount % 2 == 0 && nextPage >= pageflip.pageCount && pageflip.currentPage == pageflip.pageCount - 2) {
		return;
	}
	pageflip.changeCurrentPage(Math.min(nextPage, pageflip.pageCount - 1), true);
	Ti.App.fireEvent('toolBarButtonClick');
});

var flexSpace = Titanium.UI.createButton({
	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var toolbar = Titanium.UI.iOS.createToolbar({
	items : [previous, flexSpace, next],
	bottom : '0',
	borderTop : true,
	borderBottom : false
});
win.add(toolbar);

pageflip.addEventListener('change', function(evt) {
	if (venueatozScrollView != undefined) {
		win.remove(venueatozScrollView);
		venueatozScrollView = undefined;
	}
	searchView[2].hide();
	toolbar.removeAllChildren();
	if (pageflip.pageCount == pageflip.currentPage + 2) {
		toolbar.setItems([previous, flexSpace]);
	} else {
		toolbar.setItems([previous, flexSpace, next]);
	}

	if (pageflip.currentPage == 4) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);

		venueatozScrollView = Ti.UI.createView({
			top : '92',
			width : '938',
			height : '701',
			zIndex : 101,
			backgroundColor:'transparent',
		});

		var venueList = require('/views/collview/flipPages/venueA-ZList');
		venueAToZList = venueList(win, win.windowsArray, venueatozScrollView);

		var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);

	}
});
