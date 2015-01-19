function venuesatoz(tabGroup, styleID, parentWindow, windowsArray) {

	var azScroll = Ti.UI.createScrollView({
		showVerticalScrollIndicator : true,
		contentHeight : 'auto',
		contentWidth : '694',
		height : '576',
		width : '938',
		top : '125',
		left : '43',
		horizontalBounce : false,
		verticalBounce : true,
		layout : "horizontal",
		zIndex : 101,
		visible : false,
	});

	// Load Results From DB
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var dataArray = [];

	var rows = db.execute('SELECT * FROM Venue WHERE VenueID in (select venueid from venuetovenuestyles where venuestyleid = ' + styleID + ') AND  PackageCode in ("GLD","SIL","BRZ") ORDER BY venuesort ASC');
	while (rows.isValidRow()) {
		if (rows.fieldByName('VenueName') != undefined) {
			var venueArray = [];
			venueArray['venueID'] = rows.fieldByName('VenueID');
			venueArray['venueName'] = rows.fieldByName('VenueName');
			venueArray['venueTown'] = rows.fieldByName('Town');
			venueArray['bedroomsNo'] = rows.fieldByName('BedroomsNo');
			venueArray['postCode'] = rows.fieldByName('Postcode');
			venueArray['meetingRoomsNo'] = rows.fieldByName('MeetingRoomsNo');
			venueArray['packageCode'] = rows.fieldByName('PackageCode');

			var getImage = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID="' + venueArray['venueID'] + '" AND (OptionCode="TOP" OR OptionCode="PIC")');
			var imageUrl = '';
			if (getImage.isValidRow()) {
				imageUrl = getImage.fieldByName('GraphicFileName');
			}
			venueArray['imageUrl'] = imageUrl;

			var location = '';
			if (venueArray['venueTown'] != '') {
				if (venueArray['postCode'] != '') {
					location = venueArray['venueTown'] + ', ' + venueArray['postCode'];
				} else {
					location = venueArray['venueTown'];
				}
			} else if (venueArray['postCode'] != '') {
				location = venueArray['postCode'];
			}
			venueArray['location'] = location;
			dataArray.push(venueArray);
		}
		rows.next();
	}
	db.close();
	var venueThumbView = require('/views/collview/getVenueThumbView');

	var pageViewArray = [];
	var arrayLength = dataArray.length;
	if (arrayLength != 0) {
		var noOfRow = Math.ceil(arrayLength / 4);
		var k = 0;
		var venueCount = 0;
		var top = 0;
		var vMarzin = 11;
		var hMarzin = 11;
		var pageGap = 84;
		for (var i = 0; i < noOfRow; i++) {

			var tableRow = Titanium.UI.createTableViewRow({
				height : 195,
				selectionStyle : 'none',
				backgroundColor : 'rgba(255,255,255,0)',
				zIndex : 101,
				top : '0',
			});

			pageViewArray.push(tableRow);

			var left = 80;
			for (var l = 0; l < 4; l++) {
				var venueDataArray = dataArray[venueCount];
				if (venueDataArray != undefined && venueDataArray['venueName'] != undefined) {
					if (l == 2) {
						left = left + pageGap - hMarzin;
					}
					var nextVenueId = 0;
					//using for BRZ venues

					if (venueDataArray['packageCode'] == 'BRZ') {
						for (var j = venueCount + 1; j < dataArray.length; j++) {
							if (dataArray[j]['packageCode'] != undefined && dataArray[j]['packageCode'] == 'BRZ') {
								nextVenueId = dataArray[j]['venueID'];
								break;
							}
						}
					}
					var venue = venueThumbView.getVenueThumb(dataArray[venueCount], top, left, windowsArray, nextVenueId, false);
					tableRow.add(venue);

					left = left + 168 + hMarzin;
				}
				venueCount++;
			}
		}

	}
	var tableContainer = Ti.UI.createView({
		backgroundColor : 'rgba(255,255,255,0)',
		top : '125',
		width : '938',
		height : '576',
		zIndex : 101,
		visible : false,
	});

	var tableView = Ti.UI.createTableView({
		backgroundColor : 'rgba(255,255,255,0)',
		data : pageViewArray,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		separatorStyle : Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
		separatorColor : 'transparent',
	});
	tableContainer.add(tableView);
	return [tableContainer];
}

module.exports = venuesatoz;
