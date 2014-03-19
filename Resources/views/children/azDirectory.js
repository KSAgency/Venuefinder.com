function azDirectory(tabGroup) {

	var win = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor:'#d2e8f5'
	});

	//Create Arrays for TableView

	var azData = [];

	var azIndex = [];

	//Section Indicator

	var lastLetter = '1';

	var begin = '1';

	var rowIndex = 0;

	// Load Results From DB

	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');

	var row = db.execute('SELECT * FROM Venue WHERE VenueID IS NOT NULL AND PackageCode="GLD" ORDER BY VenueSort ASC');
	while (row.isValidRow()) {

		var venueName = row.fieldByName('VenueName');
		var venueSort = row.fieldByName('VenueSort');
		var venueID = row.fieldByName('VenueID');
		var venuePackage = row.fieldByName('PackageCode');
		var venueTown = row.fieldByName('Town');
		var venueCountry = row.fieldByName('Country');
		var bedrooms = row.fieldByName('BedroomsNo');
		var bedroomAccess = row.fieldByName('BedroomDisabledAccess');

		var getImage = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID="' + venueID + '" AND (OptionCode="TOP" OR OptionCode="PIC")');
		if (getImage.isValidRow()) {
			var imageUrl = getImage.fieldByName('GraphicFileName');
		}

		if (venueTown != '') {
			var venueTown = venueTown + ', ';
		} else {
			var venueTown = '';
		}

		if (venueCountry != '') {
			var venueCountry = venueCountry + ' ';
		} else {
			var venueCountry = '';
		}

		//Venue Descriptions
		var venueDesc = null;

		if (venuePackage == 'PRE') {
			var row2 = db.execute('SELECT Text FROM VenueAdvertOptionsForWeb WHERE VenueID="' + venueID + '" AND OptionCode="SG2"');
			if (row2.isValidRow()) {
				venueDesc = row2.fieldByName('Text');
			}
		} else {
			var row2 = db.execute('SELECT DescriptionText FROM VenueTextForWeb WHERE VenueID="' + venueID + '"');
			if (row2.isValidRow()) {
				venueDesc = row2.fieldByName('DescriptionText');
			}
		}

		if (venueDesc == null || venueDesc == '') {
			venueDesc = 'No description could be retrieved for this venue.';
		}

		//Format Results
		venueDesc.toString();
		venueDesc = venueDesc.replace(/(<([^>]+)>)/ig, "");
		venueDesc = venueDesc.replace(/\s+/g, ' ');
		venueDesc = venueDesc.replace(/(&amp;)/g, '&');
		venueDesc = venueDesc.replace(/(&nbsp;)/g, ' ');
		venueDesc = venueDesc.replace(/(&rsquo;)/g, '’');
		venueDesc = venueDesc.replace(/(&hellip;)/g, '…');
		venueDesc = venueDesc.replace(/(&oslash;)/g, 'Ø');
		venueDesc = venueDesc.replace(/(&pound;)/g, '£');
		venueDesc = venueDesc.replace(/(&ndash;)/g, '–');
		venueDesc = venueDesc.replace(/(&sup2;)/g, '²');
		venueDesc = venueDesc.replace(/(&ldquo;)/g, '“');
		venueDesc = venueDesc.replace(/(&rdquo;)/g, '”');
		venueDesc = venueDesc.replace(/(&lsquo;)/g, '’');

		var firstLetter = venueSort.charAt(0);

		if (firstLetter == '0' || firstLetter == '1' || firstLetter == '2' || firstLetter == '3' || firstLetter == '4' || firstLetter == '5' || firstLetter == '6' || firstLetter == '7' || firstLetter == '8' || firstLetter == '9') {
			firstLetter = '#';
		}

		firstLetter.toUpperCase();

		var createResultsFormat = require('/builders/featuredResultsFormat');
		var resultsFormat = createResultsFormat(venueName, venueID, imageUrl, bedrooms, bedroomAccess, venueDesc, venueTown, venueCountry, null, true);

		rowIndex = rowIndex + 1;

		if (lastLetter != firstLetter) {
			firstLetter.toUpperCase();
			resultsFormat.setHeader(firstLetter);
			var indexArray = {
				title:firstLetter,
				index:rowIndex
			};
			azIndex.push(indexArray);

		}

		// Indicate the last row

		lastLetter = firstLetter;

		if (begin == '1') {
			begin = '';
		}

		//Push the data

		azData.push(resultsFormat);

		// Create Loop
		row.next();

	}

	db.close();

	// var search = Titanium.UI.createSearchBar({
		// top:0,
		// barColor:'#2195be'
	// });

	var tableView = Titanium.UI.createTableView({
		data:azData,
		filterAttribute:'searchField',
		searchHidden:false,
		index:azIndex,
		tintColor:'#2195be',
		backgroundColor:'#FFF'
	});
	
	tableView.addEventListener('click', function(e) {
		var createApplicationWindow = require('/builders/createApplicationWindow');
		var windowElements = createApplicationWindow(tabGroup, 'children/featuredListing', e.rowData.venueTitle, '#FFF', 'Search', 'Featured Venues', e.rowData.venueTitle, '', e.rowData.myid);
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		tableView.setWidth(400);
		tableView.setStyle(Ti.UI.iPhone.TableViewStyle.GROUPED);
	}

	// if (Ti.App.Properties.getString('osname') != 'Android'){
		// tableView.setSearch(search);
	// }

	win.add(tableView);

	return win;

}

module.exports = azDirectory;
