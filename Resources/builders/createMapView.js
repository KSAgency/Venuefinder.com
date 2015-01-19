function createMapView(tabGroup, sqlString, venueName, geoLocation, tab, tier1, tier2, tier3, showOffers) {
	if (venueName == null || venueName == '') {
		venueName = 'Venue Map';
	}
	var win = Titanium.UI.createView({
		backgroundColor : '#FFF',
		title : venueName,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL
	});
	//get todays date
	var createTodaysDate = require('/builders/todaysDate');
	var today = createTodaysDate();
	//Create Array
	var data = [];
	//Create Query
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	//Load Maps
	var Map = require('ti.map');
	//Check for Google Play Services
	if (Ti.App.Properties.getString('osname') == 'Android') {
		var rc = Map.isGooglePlayServicesAvailable();
		switch (rc) {
		case Map.SUCCESS:
			Ti.API.info('Google Play services is installed.');
			break;
		case Map.SERVICE_MISSING:
			alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
			break;
		case Map.SERVICE_VERSION_UPDATE_REQUIRED:
			alert('Google Play services is out of date. Please update Google Play services.');
			break;
		case Map.SERVICE_DISABLED:
			alert('Google Play services is disabled. Please enable Google Play services.');
			break;
		case Map.SERVICE_INVALID:
			alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
			break;
		default:
			alert('Unknown error.');
			break;
		}
	}
	if (geoLocation == true) {
		Number.prototype.toDeg = function() {
			return this * 180 / Math.PI;
		};
		Number.prototype.toRad = function() {
			return this * Math.PI / 180;
		};
		function getDistance(lat1, lon1, lat2, lon2) {
			var R = 6371;
			// km
			var dLat = (lat2 - lat1).toRad();
			var dLon = (lon2 - lon1).toRad();
			var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			var d = R * c;
			return d;
		}


		Titanium.Geolocation.getCurrentPosition(function(e) {
			if (e.code != 1 && e.code != '1') {//e.code != 6 && e.code != '6'
				var createDatabase = require('/builders/databaseFunctions/createDatabase');
				var db = createDatabase('/venuefinder.db', 'venuefinder');
				var curLat = e.coords.latitude;
				var curLon = e.coords.longitude;
				var sqlString = 'SELECT * FROM Venue JOIN VenueCoords ON Venue.VenueID=VenueCoords.VenueID';
				if (showOffers == true) {
					sqlString = 'SELECT * FROM Venue JOIN VenueCoords ON Venue.VenueID=VenueCoords.VenueID JOIN Offers ON Venue.VenueID=Offers.EntryID WHERE Offers.EntryType="V" AND Offers.validToDate>="' + today + '" AND Venue.PackageCode!="FRE"';
				}
				var pinCounter = 0;
				var row = db.execute(sqlString);
				while (row.isValidRow() && pinCounter != 500) {
					var id = row.fieldByName('VenueID');
					var latitude = row.fieldByName('Latitude');
					var longitude = row.fieldByName('Longitude');
					if (getDistance(curLat, curLon, latitude, longitude) <= 10) {
						pinCounter = pinCounter + 1;
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
							myid : id
						});
						if (Ti.App.Properties.getString('osname') != 'Android') {
							annotation.setRightButton(Titanium.UI.iPhone.SystemButton.DISCLOSURE);
							if (venueClass != "FRE") {
								annotation.setPincolor(Map.ANNOTATION_RED);
							} else {
								annotation.setPincolor(Map.ANNOTATION_GREEN);
							}
						} else {
							if (venueClass != "FRE") {
								annotation.setImage('/images/redPin.png');
							} else {
								annotation.setImage('/images/greenPin.png');
							}
						}
						data.push(annotation);
					}
					// create loop
					row.next();
				}
				var mapview = Map.createView({
					mapType : Map.NORMAL_TYPE,
					region : {
						latitude : curLat,
						longitude : curLon,
						latitudeDelta : 0.01,
						longitudeDelta : 0.01
					},
					animate : true,
					regionFit : true,
					userLocation : true,
					zIndex : '1',
					annotations : data
				});
				win.add(mapview);
				mapview.addEventListener('click', function(e) {
					if (e.clicksource == 'rightButton' || e.clicksource == 'title' || e.clicksource == 'subtitle') {
						if (tier1 == null) {
							tier1 = e.annotation.myid;
						} else if (tier1 != null && tier2 == null) {
							tier2 = e.annotation.myid;
						} else if (tier1 != null && tier2 != null && tier3 == null) {
							tier3 = e.annotation.myid;
						}
						if (showOffers == false || showOffers == null) {
							var createApplicationWindow = require('/builders/createApplicationWindow');
							var windowElements = createApplicationWindow(tabGroup, 'children/featuredListing', e.annotation.title, '#FFF', tab, tier1, tier2, tier3, e.annotation.myid, null);
						} else {
							var createApplicationWindow = require('/builders/createApplicationWindow');
							var windowElements = createApplicationWindow(tabGroup, 'children/featuredListing', e.annotation.title, '#FFF', tab, tier1, tier2, tier3, e.annotation.myid, 'Offers');
						}
					}
				});
				// Add Map Map Key
				var leftMenu = Ti.UI.createView({
					left : -360,
					bottom : 40,
					width : 250,
					height : 233,
					backgroundColor : '#000',
					opacity : 0.8,
					zIndex : 2
				});
				var mapkey = Ti.UI.createImageView({
					image : '/images/mapkey.png',
					bottom : 40,
					left : 0,
					height : 38,
					width : 60,
					zIndex : 2
				});
				win.add(mapkey);
				win.add(leftMenu);
				var key = Ti.UI.createImageView({
					image : '/images/map_key.png',
					color : '#666',
					opacity : 1,
					width : 250,
					height : 233,
					left : 0,
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
					zIndex : '3'
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
					zIndex : '3'
				});
				hybridMode.addEventListener('click', function() {
					mapview.setMapType(Map.HYBRID_TYPE);
				});
				leftMenu.add(hybridMode);
				mapkey.addEventListener('click', function(e) {
					if (mapkey._left == true) {
						leftMenu.animate({
							left : -250,
							duration : 775
						});
						mapkey.animate({
							left : 0,
							duration : 775
						});
						mapkey._left = false;
					} else {
						mapkey.animate({
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
			} else {
				var noConnectionDialog = Ti.UI.createAlertDialog({
					title : 'Could not connect',
					message : 'We could not determine your current location, please ensure that you are connected to the internet and have location services turned on, in your phone settings'
				});
				noConnectionDialog.show();
			}
		});
	} else {
		var lastLat = 0;
		var lastLon = 0;
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
				myid : id
			});
			if (Ti.App.Properties.getString('osname') != 'Android') {
				annotation.setRightButton(Titanium.UI.iPhone.SystemButton.DISCLOSURE);
				if (venueClass != "FRE") {
					annotation.setPincolor(Map.ANNOTATION_RED);
				} else {
					annotation.setPincolor(Map.ANNOTATION_GREEN);
				}
			} else {
				annotation.setRightButton(Titanium.UI.iPhone.SystemButton.DISCLOSURE);
				if (venueClass != "FRE") {
					annotation.setImage('/images/redPin.png');
				} else {
					annotation.setImage('/images/greenPin.png');
				}
			}
			data.push(annotation);
			//Update Delta Position
			lastLat = latitude.toString();
			lastLon = longitude.toString();
			//Create Loop
			row.next();
		}
		var mapview = Map.createView({
			mapType : Map.NORMAL_TYPE,
			animate : true,
			regionFit : true,
			userLocation : true,
			zIndex : 1,
			annotations : data
		});
		win.add(mapview);
		mapview.addEventListener('complete', function() {
			mapview.setRegion({
				latitude : lastLat,
				longitude : lastLon,
				latitudeDelta : 0.5,
				longitudeDelta : 0.5
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
				var createApplicationWindow = require('/builders/createApplicationWindow');
				var windowElements = createApplicationWindow(tabGroup, 'children/featuredListing', e.annotation.title, '#FFF', tab, tier1, tier2, tier3, e.annotation.myid, null);
			}
		});
		// Add Map Map Key
		var leftMenu = Ti.UI.createView({
			left : -360,
			bottom : 40,
			width : 250,
			height : 233,
			backgroundColor : '#000',
			opacity : 0.8,
			zIndex : 2
		});
		var mapkey = Ti.UI.createImageView({
			image : '/images/mapkey.png',
			bottom : 40,
			left : 0,
			height : 38,
			width : 60,
			zIndex : 2
		});
		win.add(mapkey);
		win.add(leftMenu);
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
		mapkey.addEventListener('click', function(e) {
			if (mapkey._left == true) {
				leftMenu.animate({
					left : -250,
					duration : 775
				});
				mapkey.animate({
					left : 0,
					duration : 775
				});
				mapkey._left = false;
			} else {
				mapkey.animate({
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
	}
	db.close();
	return win;
}

module.exports = createMapView; 