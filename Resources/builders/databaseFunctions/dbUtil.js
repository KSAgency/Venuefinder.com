var createDatabase = require('/builders/databaseFunctions/createDatabase');

function getVenueForId(venueID){
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var venueRows = db.execute('select * from Venue where VenueID = "' + venueID +'"');
	var venueObj = [];
	
	while (venueRows.isValidRow()) {		
		venueObj['VenueID'] = venueRows.fieldByName('VenueID');
		venueObj['VenueName'] = venueRows.fieldByName('VenueName');
		venueObj['Town'] = venueRows.fieldByName('Town');
		venueObj['BedroomsNo'] = venueRows.fieldByName('BedroomsNo') == null ?0 :venueRows.fieldByName('BedroomsNo');			
		venueObj['Postcode'] = venueRows.fieldByName('Postcode');
		venueObj['MeetingRoomsNo'] = venueRows.fieldByName('MeetingRoomsNo') == null ?0 :venueRows.fieldByName('MeetingRoomsNo');
		venueObj['PackageCode'] = venueRows.fieldByName('PackageCode');
		venueObj['AddressLine1'] = venueRows.fieldByName('AddressLine1');
		venueObj['AddressLine2'] = venueRows.fieldByName('AddressLine2');
		venueObj['County'] = venueRows.fieldByName('County');
		venueObj['Country'] = venueRows.fieldByName('Country');
		venueObj['Tel'] = venueRows.fieldByName('Tel');
		venueObj['Fax'] = venueRows.fieldByName('Fax');
		venueObj['Email'] = venueRows.fieldByName('Email');
		venueObj['URL'] = venueRows.fieldByName('URL');
		venueObj['BookingURL'] = venueRows.fieldByName('BookingURL');
		venueObj['MaxCateringCapacity'] = venueRows.fieldByName('MaxCateringCapacity') == null ?0 :venueRows.fieldByName('MaxCateringCapacity');
		venueObj['MaxMeetingCapacity'] = venueRows.fieldByName('MaxMeetingCapacity') == null ?0 :venueRows.fieldByName('MaxMeetingCapacity');
		venueObj['Latitude'] = venueRows.fieldByName('Latitude');
		venueObj['Longitude'] = venueRows.fieldByName('Longitude');
		//venueObj['MetaDescription'] = venueRows.fieldByName('MetaDescription');
		
		venueRows.next();
	}
	db.close();
	return venueObj;
}
module.exports.getVenueForId = getVenueForId;