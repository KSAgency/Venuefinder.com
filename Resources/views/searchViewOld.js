function searchView(tabGroup, title, backgroundColor) {
	var win = Titanium.UI.createWindow({
		backgroundColor : backgroundColor,
		title : title,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});

	var buttonScroller = Ti.UI.createScrollView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout:'vertical'
	});

	if (Ti.App.Properties.getString('osname') != 'Android') {
		win.setBarColor('#2195be');
		win.setBackButtonTitle('Back');
		win.setTintColor('#FFF');
		win.setTranslucent(false);
		win.setTitleControl(Ti.UI.createLabel({
			text : title,
			color : '#FFF',
			width : Ti.UI.SIZE
		}));
	}

	// Initial Omniture

	var omniture = Titanium.UI.createWebView({
		opacity : 0,
		width : 0,
		height : 0,
		left : 0,
		right : 0,
		touchEnabled : false
	});

	win.add(omniture);

	// Setup Array counter

	var calOffset = 0;

	var calOffset2 = 0;

	//Toggle Button

	var toggleButton = Titanium.UI.createButton({
		image : '/images/whiteSearch.png',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
		width : 20,
		height : 20
	});

	if (Ti.Platform.osname != 'android') {
		win.setRightNavButton(toggleButton);
	}

	var hidden = true;

	toggleButton.addEventListener('click', function() {
		if (hidden == true) {
			buttonScroller.scrollTo(0, 0);
			hidden = false;
		} else {
			buttonScroller.scrollTo(0, 40);
			hidden = true;
		}
	});

	//Search Bar

	var searchBar = Titanium.UI.createTextField({
		top : 10,
		width : 288,
		height : 30,
		borderRadius : 15,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
		rightButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
		returnKeyType : Titanium.UI.RETURNKEY_DONE,
		borderColor : '#999',
		backgroundColor : '#FFF',
		paddingLeft : 10,
		color : '#666',
		font : {
			fontSize : 10
		},
		hintText : 'Enter a venue name',
		ellipsize : true,
		returnKeyType : Titanium.UI.RETURNKEY_DONE
		//        bubbleParent: false,
	});

	buttonScroller.add(searchBar);

	buttonScroller.addEventListener('cancel', function() {
		searchBar.blur();
	});

	searchBar.addEventListener('return', function() {

		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		win.setTouchEnabled(false);

		// Retrieve User Inputs

		var quickSearchResult = searchBar.getValue();
		quickSearchResult = quickSearchResult.replace(' ', '%');
		quickSearchResult = quickSearchResult.replace(' ', '%');
		quickSearchResult = quickSearchResult.replace(' ', '%');

		// Input Checker

		var hasInput = null;

		// Create SQL Query

		if (quickSearchResult != null && quickSearchResult != '') {
			hasInput = true;
		}

		var sqlString = 'SELECT * FROM Venue JOIN VenueCoords ON Venue.VenueID=VenueCoords.VenueID WHERE VenueSort LIKE "%' + quickSearchResult + '%"';

		//Create Results Page
		var createResultsPage = require('/builders/createResultsPage');
		var resultsPage = createResultsPage(win, tabGroup, sqlString, hasInput, null, null, true, false);

		tabGroup.activeTab.open(resultsPage);

		var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		win.setTouchEnabled(true);

	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		var imageBanner = Titanium.UI.createImageView({
			image : '/images/imageBanner.png',
			width : 600,
			top : 50,
		});

		buttonScroller.add(imageBanner);
	}

	var button1 = Titanium.UI.createImageView({
		image : '/images/button_quick_search.png',
		width : 288,
		height : 52,
		top : 10
	});

	buttonScroller.add(button1);

	var button2 = Titanium.UI.createImageView({
		image : '/images/button_search_near.png',
		width : 288,
		height : 52,
		top : 10
	});

	buttonScroller.add(button2);

	var button3 = Titanium.UI.createImageView({
		image : '/images/button_az_directory.png',
		width : 288,
		height : 52,
		top : 10
	});

	buttonScroller.add(button3);

	var button4 = Titanium.UI.createImageView({
		image : '/images/button_venue_collections.png',
		width : 288,
		height : 52,
		top : 10
	});

	buttonScroller.add(button4);

	var button5 = Titanium.UI.createImageView({
		image : '/images/button_special_offers.png',
		width : 288,
		height : 52,
		top : 10
	});

	buttonScroller.add(button5);

	var button6 = Titanium.UI.createImageView({
		image : '/images/button_speak_advisor.png',
		width : 288,
		height : 52,
		top : 10
	});

	buttonScroller.add(button6);

	var buttonSpace = Titanium.UI.createButton({
		width : 288,
		height : 25,
		top : 10,
		opacity : 0
	});

	buttonScroller.add(buttonSpace);

	win.add(buttonScroller);

	//iPad Styling
	if (Ti.App.Properties.getString('osname') == 'iPad') {
		//Resize and disable Scroll View
		buttonScroller.setWidth(600);
		buttonScroller.setHeight(Titanium.UI.SIZE);
		searchBar.setWidth(600);

		//Repostion Buttons
		button1.setLeft(0), button1.setTop(50), button2.setLeft(0), button3.setLeft(0), button4.setRight(0), button4.setTop(-175), button5.setRight(0), button6.setRight(0);
	}

	// Require & Create advert space
	var createAdvert = require('/builders/createAdvert');
	var advert = createAdvert();
	win.add(advert);

	button1.addEventListener('click', function() {
		var createApplicationWindow = require('/builders/createApplicationWindow');
		var windowElements = createApplicationWindow(tabGroup, 'children/quickSearch', 'Venue Search', '#d2e8f5', 'Search', 'Venue Search', '', '');
	});

	button2.addEventListener('click', function() {
		var createApplicationWindow = require('/builders/createApplicationWindow');
		var windowElements = createApplicationWindow(tabGroup, 'children/searchLocation', 'By Location', '#d2e8f5', 'Search', 'Search By Location', '', '');
	});

	button3.addEventListener('click', function() {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		var createApplicationWindow = require('/builders/createApplicationWindow');
		var windowElements = createApplicationWindow(tabGroup, 'children/azDirectory', 'Venue Search', '#FFF', 'Search', 'Featured Venues', '', '');

		var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);

	});

	button4.addEventListener('click', function() {
		if (Ti.App.Properties.getString('osname') == 'iPad') {
			var allWindowsBackgroundColor = '#CACACA';
			Ti.App.Properties.setString('allWindowsBackgroundColor', allWindowsBackgroundColor);
			Ti.App.Properties.setString('fontFamily', 'Helvetica-Light');
			var createApplicationWindow = require('/builders/createApplicationWindow');
			var windowElements = createApplicationWindow(tabGroup, 'collview/venueCollectionsIos', 'Venuefinder.com collections', allWindowsBackgroundColor, '/images/loading_page.png', 'Search', 'Venue Collections', '', '', '', 'forflipwindow');
		} else {
			var createApplicationWindow = require('/builders/createApplicationWindow');
			var windowElements = createApplicationWindow(tabGroup, 'children/venueCollections', 'Venue Collections', '#FFF', '/images/loading_page.png', 'Search', 'Venue Collections', '', '');
		}
	});

	button5.addEventListener('click', function() {
		var createApplicationWindow = require('/builders/createApplicationWindow');
		var windowElements = createApplicationWindow(tabGroup, 'children/specialOffers', 'Special Offers', '#d2e8f5', 'Search', 'Special Offers', '', '');
	});

	button6.addEventListener('click', function() {
		var createApplicationWindow = require('/builders/createApplicationWindow');
		var windowElements = createApplicationWindow(tabGroup, 'children/venueFindingService', 'Venue Finding Service', '#d2e8f5', 'Search', 'Free Venue Finding Service', '', '');
	});

	win.addEventListener('postlayout', function() {
		if (Ti.App.Properties.getString('osname') != 'Android') {
			buttonScroller.scrollTo(0, 40);
		}
	});

	win.addEventListener('open', function() {
		searchBar.blur();
	});

	searchView.home_button.addEventListener('click', function(e) {
		searchBar.blur();
	});

	return win;

}

module.exports = searchView;
