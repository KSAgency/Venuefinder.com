function searchLocation(tabGroup, curWin) {

	var win = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});

	// Create Result Counter

	var calOffset = 0;
	var calOffset2 = 0;

	// Set Geolocation Attribs

	Titanium.Geolocation.purpose = "Pinpoint you on the map";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.frequency = 5000;

	//Top Button

	if (Ti.App.Properties.getString('osname') != 'Android') {

		var topButton = Titanium.UI.createButton({
			title:'Near Me'
		});

		curWin.setRightNavButton(topButton);

	} else {
		
		var buttonView = Titanium.UI.createView({
			width:Ti.UI.FILL,
			height:90,
			top:0
		});

		var topButton = Titanium.UI.createImageView({
			image:'/images/button_search_near.png',
			top:10,
			width:300,
			height:54
		});

		var subText = Titanium.UI.createLabel({
			text:'or, fill out the form below',
			color:'#666',
			width:300,
			textAlign:'center',
			font:{
				fontFamily:'Arial',
				fontSize:14
			},
			top:70
		});
		
		buttonView.add(topButton);
    	buttonView.add(subText);
		
	}

	topButton.addEventListener('click', function() {
		
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);

		if (Ti.Network.online == true) {

			// Load Pins From DB
			var createDatabase = require('/builders/databaseFunctions/createDatabase');
			var db = createDatabase('/venuefinder.db', 'venuefinder');

			var data = [];

			//Require & Create map window
			var createMapView = require('/builders/createMapView');
			var mapView = createMapView(tabGroup, null, 'Venue Map', true, 'Search', 'Search by Location', 'Geolocation', null);

			//Open Window
			var createApplicationWindow = require('/builders/createApplicationWindow');
			var windowElements = createApplicationWindow(tabGroup, mapView, 'Venue Map', '#d2e8f5', 'Map', 'Geolocation', '', '');

			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);

		} else {

			var noInt = Titanium.UI.createAlertDialog({
				title:'No Internet Connection',
				message:'Due to the fact that your internet is currently offline, we could not recieve your location. Please use the form below to view venues based on their location.'
			});

			noInt.show();

			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);

		}

	});

	//headerView

	var headerView = Titanium.UI.createView({
		height:Ti.UI.SIZE,
		width:Ti.UI.FILL
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {

		var imageBanner = Titanium.UI.createImageView({
			image:'/images/imageBanner.png',
			width:'600',
			top:'50',
			zIndex:'2'
		});

		var space = Titanium.UI.createView({
			height:'0'
		});

		headerView.add(imageBanner), headerView.add(space);

	} else {

		headerView.setHeight(10);

	}

	// Create Rows Array

	var rowdata = [];

	// Require & Create Fields

	//Get Country & County functions
	var createCountryCountyList = require('/builders/databaseFunctions/createCountryCountyList');
	var countryCountyList = createCountryCountyList(tabGroup);

	//Input Boxes
	var createDoubleField = require('/builders/databaseFunctions/createDoubleField');
	var venueTown = createDoubleField('Venue Town', 'Example Town');

	rowdata.push(countryCountyList[0]);
	rowdata.push(countryCountyList[1]);
	rowdata.push(venueTown[0]);

	// Create Submit Button

	var submitButtonStyle = require('/builders/submitButtonStyle');
	var submit = submitButtonStyle();

	submit.addEventListener('click', function() {

		var spinView = Titanium.UI.createView({
			width:'40%',
			height:'30%',
			backgroundColor:'#000',
			opacity:'0.75',
			borderRadius:'15%',
			zIndex:'20'
		});

		var actInd = Titanium.UI.createActivityIndicator({
			style:Titanium.UI.iPhone.ActivityIndicatorStyle.DEFAULT
		});

		win.add(spinView);
		spinView.add(actInd);
		actInd.show();
		win.setTouchEnabled(false);

		// Retrieve User Inputs

		var townTextResult = venueTown[1].getValue();

		// Set Blank Values

		var sql_start = 'SELECT * FROM Venue JOIN VenueCoords ON Venue.VenueID=VenueCoords.VenueID WHERE VenueCoords.Latitude IS NOT NULL';
		var sql_country = '';
		var sql_county = '';
		var sql_town = '';

		// Input Checker

		var hasInput = null;

		// Create SQL Query

		if (countryCountyList[0].title != 'Choose a Country' && countryCountyList[0].title != 'United Kingdom') {
			var sql_country = ' AND Country="' + countryCountyList[0].title + '"';
			var hasInput = true;
		};
		if (countryCountyList[0].title == 'United Kingdom') {
			var sql_country = ' AND (Country="United Kingdom" OR Country="England" OR Country="Scotland" OR Country="Wales" OR Country="Northern Ireland" OR Country="Channel Islands" OR Country="Isle of Man")';
			var hasInput = true;
		};
		if (countryCountyList[1].title != 'Choose a County') {
			var sql_county = ' AND County="' + countryCountyList[1].title + '"';
			var hasInput = true;
		};
		if (townTextResult != '') {
			var sql_town = ' AND Town LIKE "%' + townTextResult + '%"';
			var hasInput = true;
		};

		var sqlString = sql_start + sql_country + sql_county + sql_town;

		//Create Results Page
		var createResultsPage = require('/builders/createResultsPage');
		var resultsPage = createResultsPage(win, tabGroup, sqlString, hasInput, spinView, actInd, true, false);
		tabGroup.activeTab.open(resultsPage);

	});

	// Create Search Table

	var tableview = Titanium.UI.createTableView({
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		data:rowdata,
		backgroundColor:'#d2e8f5',
		headerView:headerView,
		footerView:submit,
		top:0,
		scrollable:true
	});

	if (Ti.App.Properties.getString('osname') == 'iPhone') {
		tableview.setWidth(300);
	}

	if (Ti.App.Properties.getString('osname') == 'Android') {
		tableview.setWidth(300);
		tableview.setTop(10);
		tableview.setHeaderView(buttonView);
	}

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		tableview.setWidth(600);
		tableview.setScrollable(false);
		tableview.setHeight('100%');
	}

	win.add(tableview);

	// Require & Create advert space
	var createAdvert = require('/builders/createAdvert');
	var advert = createAdvert();
	win.add(advert);

	return win;

}

module.exports = searchLocation;
