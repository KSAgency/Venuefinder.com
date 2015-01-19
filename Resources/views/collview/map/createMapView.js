function createMapView(sqlString, venueName, geoLocation, tab, tier1, tier2, tier3, showOffers, isVenueDeatil, windowsArray) {

	if (venueName == null || venueName == '') {
		venueName = 'Venue Map';
	}
	var win;
	if (isVenueDeatil) {
		win = Titanium.UI.createView({
			backgroundColor : '#FFF',
			title : venueName,
			height : Ti.UI.FILL,
			width : Ti.UI.FILL
		});
	} else {
		win = Titanium.UI.createView({
			title : venueName,
			width : '340',
			height : '440',
			top : '77',
			left : '20',
			clipMode : Titanium.UI.iOS.CLIP_MODE_ENABLED ,
		});
	}

	//get todays date
	var createTodaysDate = require('/builders/todaysDate');
	var today = createTodaysDate();

	//Create Array
	var data = [];

	//Create Query
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');

	var lastLat = 0;
	var lastLon = 0;
	var Map = require('ti.map');
	var row = db.execute(sqlString);

	while (row.isValidRow()) {

		var id = row.fieldByName('VenueID');

		var latitude = row.fieldByName('Latitude');

		var longitude = row.fieldByName('Longitude');

		var venueClass = row.fieldByName('PackageCode');

		var name = row.fieldByName('VenueName');

		var address = row.fieldByName('AddressLine1');

		var town = row.fieldByName('Town');

		var county = row.fieldByName('County');

		var postcode = row.fieldByName('Postcode');

		if (address != '' && address != null) {
			var address = address + ', ';
		} else {
			var address = '';
		}
		if (town != '' && town != null) {
			var town = town + ', ';
		} else {
			var town = '';
		}
		if (county != '' && county != null) {
			var county = county + ', ';
		} else {
			var county = '';
		}
		if (postcode != '' && postcode != null) {
			var postcode = postcode;
		} else {
			var postcode = '';
		}

		var annotation = Map.createAnnotation({
			latitude : latitude,
			longitude : longitude,
			title : name,
			subtitle : address + town + county + postcode,
			myid : id,
			packageCode : venueClass,
		});

		annotation.setRightButton(Titanium.UI.iPhone.SystemButton.DISCLOSURE);

		if (venueClass != "FRE") {
			annotation.setPincolor(Map.ANNOTATION_RED);
		} else {
			annotation.setPincolor(Map.ANNOTATION_GREEN);
		}

		data.push(annotation);

		lastLat = latitude.toString();
		lastLon = longitude.toString();

		row.next();

	}

	var mapview = Map.createView({
		mapType : Map.NORMAL_TYPE,
		animate : true,
		userLocation : true,
		zIndex : 1,
		annotations : data,
	});

	mapview.addEventListener('complete', function() {
		mapview.setRegion({
			latitude : lastLat,
			longitude : lastLon,
			latitudeDelta : 20.11,
			longitudeDelta : 20.11,
		});
		

		mapview.removeEventListener('complete', function() {
		});

	});

	mapview.addEventListener('click', function(e) {

		if (e.clicksource == 'rightButton' || e.clicksource == 'title' || e.clicksource == 'subtitle') {

			if (tier1 == null) {
				tier1 = e.annotation.myid;
			} else if (tier1 != null && tier2 == null) {
				tier2 = e.annotation.myid;
			} else if (tier1 != null && tier2 != null && tier3 == null) {
				tier3 = e.annotation.myid;
			}

			if (!isVenueDeatil) {
				var createApplicationWindow = require('/builders/createApplicationWindow');
				var currentWin = createApplicationWindow(null, null, 'Venue Detail', Ti.App.Properties.getString('allWindowsBackgroundColor'), '/images/loading_page.png', 'Venue Detail', 'Venue Detail', '', '', '', 'forflipwindow');
				windowsArray.push(currentWin);

				var createStartActInd = require('/builders/startActInd');
				var startActInd = createStartActInd(currentWin);

				var SearchView = require('/views/collview/searchView');
				var searchView = SearchView(null, currentWin, '', null, '', windowsArray);
				currentWin.add(searchView[0]);
				currentWin.add(searchView[1]);
				currentWin.add(searchView[2]);
				//currentWin.add(searchView[3]);
				currentWin.add(searchView[4]);

				//set global background

				var venueID = e.annotation.myid;
				var packageCode = e.annotation.packageCode;

				if (packageCode == 'GLD') {
					var venueDetailPage = require('/views/collview/venueDetailPages/createGoldPage');
					var goldPage = venueDetailPage.createDetailPage(venueID, currentWin, windowsArray);
					currentWin.add(goldPage);
				} else if (packageCode == 'SIL') {
					var venueDetailPage = require('/views/collview/venueDetailPages/createSilverPage');
					var silverPage = venueDetailPage.createDetailPage(venueID, currentWin, windowsArray);
					currentWin.add(silverPage);
				} else if (packageCode == 'BRZ') {
					var venueDetailPage = require('/views/collview/venueDetailPages/createSilverPage');
					var silverPage = venueDetailPage.createDetailPage(venueID, currentWin, windowsArray);
					currentWin.add(silverPage);
				}

				currentWin.open();

				var createEndActInd = require('/builders/endActInd');
				var endActInd = createEndActInd(currentWin, startActInd[0], startActInd[1]);
			}
		}
	});

	win.add(mapview);

	if (isVenueDeatil) {
		var leftMenu = Ti.UI.createView({
			left : -250,
			bottom : 40,
			width : 250,
			height : 233,
			backgroundColor : '#000',
			opacity : 0.8,
			zIndex : 2
		});

		if (isVenueDeatil) {
			win.add(leftMenu);
		}

		var key = Ti.UI.createImageView({
			image : '/images/map_key.png',
			color : '#666',
			opacity : 1,
			width : 250,
			height : 233,
			zIndex : 1
		});

		leftMenu.add(key);

		var mapMode = Titanium.UI.createView({
			width : '45%',
			height : '10%',
			top : '60%',
			left : '5%',
			zIndex : '3'
		});

		mapMode.addEventListener('click', function() {
			mapview.setMapType(Map.NORMAL_TYPE);
		});

		leftMenu.add(mapMode);

		var satelliteMode = Titanium.UI.createView({
			width : '55%',
			height : '10%',
			top : '72%',
			left : '5%',
			zIndex : 3
		});

		satelliteMode.addEventListener('click', function() {
			mapview.setMapType(Map.SATELLITE_TYPE);
		});

		leftMenu.add(satelliteMode);

		var hybridMode = Titanium.UI.createView({
			width : '50%',
			height : '10%',
			top : '85%',
			left : '5%',
			zIndex : 3
		});

		hybridMode.addEventListener('click', function() {
			mapview.setMapType(Map.HYBRID_TYPE);
		});

		leftMenu.add(hybridMode);

		// Add Map Key Button
		var mapKeyView = Ti.UI.createView({
			left : 0,
			bottom : 40,
			width : 50,
			height : 38,
			backgroundColor : 'transparent',
			opacity : 0.8,
			zIndex : 2,
		});

		var mapkey = Ti.UI.createImageView({
			image : '/images/mapkey.png',
			color : '#666',
			opacity : 1,
			width : 50,
			height : 38,
			zIndex : 100,
			left : "0",
			top : "0",
			_left : false,
		});

		mapkey.addEventListener('click', function(e) {
			if (mapkey._left == true) {
				leftMenu.animate({
					left : -250,
					duration : 775
				});
				mapKeyView.animate({
					left : 0,
					duration : 775
				});

				mapkey._left = false;
			} else {
				mapKeyView.animate({
					left : 250,
					duration : 775
				});

				mapkey._left = true;

				leftMenu.animate({
					left : 0,
					duration : 775
				});
			}
		});

		mapKeyView.add(mapkey);
		win.add(mapKeyView);
	}

	db.close();
	return win;
}

module.exports = createMapView;
