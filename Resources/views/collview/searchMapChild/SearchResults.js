function SearchResults(tabGroup, parentView, sql, styleID, windowsArray) {

	var winData = [];

	var dataArray = [];

	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');

	var row = db.execute(sql);
	while (row.isValidRow()) {
		if (row.fieldByName('VenueName') != undefined) {
			var top = 0;
			var left = 0;

			var venueArray = [];
			venueArray['venueID'] = row.fieldByName('VenueID');
			venueArray['venueName'] = row.fieldByName('VenueName');
			venueArray['venueTown'] = row.fieldByName('Town');
			venueArray['bedroomsNo'] = row.fieldByName('BedroomsNo');
			venueArray['postCode'] = row.fieldByName('Postcode');
			venueArray['meetingRoomsNo'] = row.fieldByName('MeetingRoomsNo');
			venueArray['packageCode'] = row.fieldByName('PackageCode');

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
		row.next();
	}

	db.close();

	var venueView = require('/views/collview/getVenueThumbView');

	if (dataArray.length == 0) {
		return 'NoRecord';
	}
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');

	var row = db.execute('select VenueStyle from VenueStyles where VenueStyleID = ' + styleID);

	var venueStyle;
	while (row.isValidRow()) {
		venueStyle = row.fieldByName('VenueStyle');
		row.next();
	}
	db.close();

	var arrayLength = dataArray.length;
	if (arrayLength != 0) {
		var limitofVenue = Math.ceil(arrayLength / 12);
		var k = 0;
		var venueCount = 0;
		for (var i = 0; i < limitofVenue; i++) {

			var pageView = venueView.setWindowPageStyle(venueStyle, false);

			winData.push(pageView[0]);

			var bedroomImage = Titanium.UI.createImageView({
				image : '/images/has_bedrooms.png',
				height : '21',
				width : '22',
				left : '718',
				top : '12',
			});

			pageView[0].add(bedroomImage);

			var bedroomText = Ti.UI.createLabel({
				text : 'Bedrooms',
				top : '17',
				left : '744',
				color : '#000000',
				width : '60',
				height : '9',
				font : {
					fontSize : 12,
					fontFamily : Ti.App.Properties.getString('fontFamily'),
				},
			});

			pageView[0].add(bedroomText);

			var meetingImage = Titanium.UI.createImageView({
				image : '/images/meeting_room.png',
				height : '21',
				width : '22',
				left : '814',
				top : '12',
			});

			pageView[0].add(meetingImage);

			var meetingRoomText = Ti.UI.createLabel({
				text : 'Meeting rooms',
				top : '17',
				left : '842',
				color : '#000000',
				width : '100',
				height : '9',
				font : {
					fontSize : 12,
					fontFamily : Ti.App.Properties.getString('fontFamily'),
				},
			});

			pageView[0].add(meetingRoomText);

			var top = 80;
			var vMarzin = 11;
			var hMarzin = 11;
			var pageGap = 84;

			for (var j = 0; j < 3; j++) {
				var left = 80;
				for (var l = 0; l < 4; l++) {
					var venueDataArray = dataArray[venueCount];
					if (venueDataArray != undefined && venueDataArray['venueName'] != undefined) {
						if (l == 2) {
							left = left + pageGap - hMarzin;
						}
						var nextVenueId = 0;
						//using for PRE venues

						if (venueDataArray['packageCode'] == 'PRE') {
							for (var j = venueCount + 1; j < dataArray.length; j++) {
								if (dataArray[j]['packageCode'] != undefined && dataArray[j]['packageCode'] == 'PRE') {
									nextVenueId = dataArray[j]['venueID'];
									break;
								}
							}
						}
						var venue = venueView.getVenueThumb(dataArray[venueCount], top, left, windowsArray, nextVenueId, false, true);
						pageView[0].add(venue);

						left = left + 168 + hMarzin;
					}
					venueCount++;
				}
				top = top + 178 + vMarzin;
			}

		}

		var scroll = Ti.UI.createScrollableView({
			views : winData,
			currentPage : 0,
			backgroundColor : '#ffffff',
			top : '41',
			width : '938',
			height : '660',
			cacheSize: 0,
		});
		parentView.add(scroll);

		lastView = winData[0];

		var SliderViewCreation = require('views/collview/searchMapChild/SliderViewCreation');
		var sliderViewCreation = SliderViewCreation(parentView, arrayLength, limitofVenue, lastView, winData, scroll);
	}
}

module.exports = SearchResults;
