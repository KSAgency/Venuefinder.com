function searchMapView2(tabGroup, win, flipView, styleID, win) {
	var mapAndView = Ti.UI.createView({
		backgroundColor : '#DCDADA',
		width:'381',
		height:'535',
		top:'75',
		left:'49',
	});

	flipView.add(mapAndView);

	var venuesMapLabel = Ti.UI.createLabel({
		text : 'Venues Map',
		font : {
			fontSize : '32',
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		},
		width:'224',
		height:'30',
		left:'27',
		top:'21',
	});

	mapAndView.add(venuesMapLabel);
	var flag = false;
	var venueIds = '';
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');

	var londonFilter = ''; 
	
	if (styleID == '3' || styleID == '15' || styleID == '39'){
		londonFilter = 'AND Town="London"';
	}

	var getCoords = db.execute('SELECT VenueCoords.VenueID, VenueCoords.Latitude, VenueCoords.Longitude FROM VenueCoords JOIN VenueToVenueStyles ON VenueCoords.VenueID=VenueToVenueStyles.VenueID JOIN Venue ON VenueCoords.VenueID=Venue.VenueID WHERE VenueStyleID="'+styleID+'" '+londonFilter);
	while (getCoords.isValidRow()) {
		var latitude = getCoords.fieldByName('Latitude');
		var longitude = getCoords.fieldByName('Longitude');
		var venueID = getCoords.fieldByName('VenueID');
		if (longitude != '' && longitude != null && latitude != '' && latitude != null) {
			if (flag) {
				venueIds = venueIds + ',';
			}

			flag = true;
			venueIds = venueIds + venueID;
		}

		getCoords.next();
	}
	db.close();

	var sqlString = 'SELECT * FROM Venue JOIN VenueCoords ON Venue.VenueID=VenueCoords.VenueID WHERE VenueCoords.Latitude IS NOT NULL and VenueCoords.VenueID in (' + venueIds + ') and Venue.packagecode in (\'gld\', \'sil\', \'brz\')';
	var createMapView = require('/views/collview/map/createMapView');		
	var mapView = createMapView(sqlString, 'Venue Map', false, 'Venue Listing', null, null, null, false, false, windowsArray);
	mapAndView.add(mapView);

}

module.exports = searchMapView2;