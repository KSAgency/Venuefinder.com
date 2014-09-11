function createResultsPage(win, tabGroup, sqlString, hasInput, spinView, actInd, showFree, offersLayout, tab, tier1, tier2, tier3, banner, cusLimit) {

	//Setup Array counter

	var calOffset = 0;
	var page = 0;
	var lastOffset = null;

	//Set Limit
	var limit = 10;

	//Change limit for iPad
	if (Ti.App.Properties.getString('osname') == 'iPad') {
		limit = 12;
	}

	if (cusLimit != null) {
		limit = cusLimit;
	}

	//Install the database

	var createDatabase = require('/builders/databaseFunctions/createDatabase'), db = createDatabase('/venuefinder.db', 'venuefinder');

	if (showFree == false) {
		var packageFilter = ' AND PackageCode!="FRE" ';
	} else {
		var packageFilter = '';
	}
	
	//Sort Offers Results
	if (offersLayout == true){
		var sortBy = ' ORDER BY Offers.CreatedDate DESC LIMIT ';
	} else {
		var sortBy = ' ORDER BY PackageOrder ASC, VenueSort ASC LIMIT ';
	}

	// Count Total Results

	var count1 = db.execute(sqlString + packageFilter);
	var countAdded = count1.rowCount;
	
	db.close();

	//check if fields have been filled in!

	if (hasInput == true && countAdded != 0) {

		// Create Array For Table
		var searchData = [];

		function nextPage() {

			//Open ActInd
			var createStartActInd = require('/builders/startActInd');
			var startActInd = createStartActInd(searchResults);
			if (win != null){
				win.setTouchEnabled(false);	
			}

			calOffset = calOffset + limit;
			page = page + 1;

			loadDB();

			if (Ti.App.Properties.getString('osname') != 'iPad') {
				resultsTable.setData(searchData);
			} else {
				resultsTable.removeAllChildren();
				resultsTable.add(searchData);
			}

			//Close ActInd
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(searchResults, startActInd[0], startActInd[1]);
			if (win != null){
				win.setTouchEnabled(true);	
			}
		}

		function previousPage() {

			//Open ActInd
			var createStartActInd = require('/builders/startActInd');
			var startActInd = createStartActInd(searchResults);
			if (win != null){
				win.setTouchEnabled(false);
			}

			calOffset = calOffset - limit;
			page = page - 1;

			loadDB();

			if (Ti.App.Properties.getString('osname') != 'iPad') {
				resultsTable.setData(searchData);
			} else {
				resultsTable.removeAllChildren();
				resultsTable.add(searchData);
			}

			//Close ActInd
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(searchResults, startActInd[0], startActInd[1]);
			if (win != null){
				win.setTouchEnabled(true);
			}

		}

		//Create Free Listings

		function loadDB(freeListings) {

			//Reset data
			searchData = [];

			//Install the database

			var createDatabase = require('/builders/databaseFunctions/createDatabase'), db = createDatabase('/venuefinder.db', 'venuefinder');

			// Load Results From DB
			var row = db.execute(sqlString + packageFilter + sortBy + limit + ' OFFSET ' + calOffset);
			while (row.isValidRow()) {( function() {

						//Retrieve basic info & format for addressLine
						var venueID = row.fieldByName('VenueID');
						var packageCode = row.fieldByName('PackageCode');
						var venueName = row.fieldByName('VenueName');
						var venueTown = row.fieldByName('Town');
						var venueCountry = row.fieldByName('Country');
						if (venueTown.length != 0 && venueTown != null) {
							var venueTown = venueTown + ', ';
						} else {
							var venueTown = '';
						}

						//Retrieve further information

						var meetingAccess = row.fieldByName('MeetingRoomDisabledAccess');
						var bedrooms = row.fieldByName('BedroomsNo');
						var bedroomAccess = row.fieldByName('BedroomDisabledAccess');
						var venuePackage = row.fieldByName('PackageCode');

						//If required get offer specific props

						if (offersLayout == true) {
							var offerName = row.fieldByName('summaryText');

							var offerBody = row.fieldByName('bodyText');

							var validFrom = row.fieldByName('validFromDate');

							validForm = validFrom.toString();

							validFrom = validFrom.substr(0, 10);

							validFrom = validFrom.split('-');

							var validFromYear = validFrom[0].toString();

							var validFromMonth = validFrom[1].toString() - 1;

							var validFromDay = validFrom[2].toString();

							validFrom = new Date(validFromYear, validFromMonth, validFromDay);

							validFrom = validFrom.toString();

							validFrom = validFrom.substr(0, 15);

							var validTo = row.fieldByName('validToDate');

							validTo = validTo.toString();

							validTo = validTo.substr(0, 10);

							validTo = validTo.split('-');

							var validToYear = validTo[0].toString();

							var validToMonth = validTo[1].toString() - 1;

							var validToDay = validTo[2].toString();

							validTo = new Date(validToYear, validToMonth, validToDay);

							validTo = validTo.toString();

							validTo = validTo.substr(0, 15);

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

						// get offers and images
						var getImage = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID="' + venueID + '" AND (OptionCode="TOP" OR OptionCode="PIC")');
						if (getImage.isValidRow()) {
							var imageUrl = getImage.fieldByName('GraphicFileName');
						}

						//Lay template

						if (packageCode == 'FRE') {
							var formatType = 'freeResultsFormat';
						} else {
							var formatType = 'featuredResultsFormat';
						}

						var layoutVariables = [];

						if (offersLayout == true) {
							formatType = 'offersResultsFormat';
							layoutVariables[0] = venueName;
							layoutVariables[1] = venueID;
							layoutVariables[2] = imageUrl;
							layoutVariables[3] = venueTown;
							layoutVariables[4] = venueCountry;
							layoutVariables[5] = offerName;
							layoutVariables[6] = validFrom;
							layoutVariables[7] = validTo;
							layoutVariables[8] = null;
						} else {
							layoutVariables = [];
							layoutVariables[0] = venueName;
							layoutVariables[1] = venueID;
							layoutVariables[2] = imageUrl;
							layoutVariables[3] = bedrooms;
							layoutVariables[4] = bedroomAccess;
							layoutVariables[5] = venueDesc;
							layoutVariables[6] = venueTown;
							layoutVariables[7] = venueCountry;
							if (banner == null) {
								layoutVariables[8] = null;
							} else {
								layoutVariables[8] = banner;
							}

						}

						if (packageCode == 'FRE') {

							var createResultsFormat = require('/builders/' + formatType);
							var resultsFormat = createResultsFormat(venueName, venueID, venueTown, venueCountry);
							searchData.push(resultsFormat);

						} else {

							var createResultsFormat = require('/builders/' + formatType);
							var resultsFormat = createResultsFormat(layoutVariables[0], layoutVariables[1], layoutVariables[2], layoutVariables[3], layoutVariables[4], layoutVariables[5], layoutVariables[6], layoutVariables[7], layoutVariables[8]);
							searchData.push(resultsFormat);

						}

						//create loop
						row.next();

						//Create Table Row Event Listener
						resultsFormat.addEventListener('click', function(e) {

							var createStartActInd = require('/builders/startActInd');
							var startActInd = createStartActInd(searchResults);

							if (Ti.App.Properties.getString('osname') != 'iPad') {
								var propPath = e.rowData;
							} else {
								var propPath = e.source;
							}

							var layoutType = null;

							if (formatType == 'offersResultsFormat') {
								layoutType = 'Offers';
							} else if (tab == 'Videos'){
								layoutType = 'Media';
							}

							if (tier1 == null) {
								tier1 = propPath.uniqueID;
							} else if (tier1 != null && tier2 == null) {
								tier2 = propPath.uniqueID;
							} else if (tier1 != null && tier2 != null && tier3 == null) {
								tier3 = propPath.uniqueID;
							}

							var createApplicationWindow = require('/builders/createApplicationWindow');
							var windowElements = createApplicationWindow(tabGroup, 'children/featuredListing', propPath.venueTitle, '#FFF', tab, tier1, tier2, tier3, propPath.uniqueID, layoutType);

							var createEndActInd = require('/builders/endActInd');
							var endActInd = createEndActInd(searchResults, startActInd[0], startActInd[1]);

						});

					}());

			}

			if (Ti.App.Properties.getString('osname') == 'iPad') {

				var buttonContainer = Titanium.UI.createView({
					height:'60',
					width:'1000',
					left:'10',
					top:'10',
				});

				var loadRows = Titanium.UI.createButton({
					title:'Next Page',
					color:'#999',
					borderRadius:10,
					borderColor:'#999',
					backgroundColor:'#FFF',
					height:50,
					width:327,
					right:0,
					top:0
				});

				var backPage = Titanium.UI.createButton({
					title:'Go Back',
					color:'#999',
					borderRadius:10,
					borderColor:'#999',
					backgroundColor:'#FFF',
					height:50,
					width:327,
					left:0,
					top:0
				});

			} else {

				var buttonContainer = Titanium.UI.createTableViewRow({
					height:70
				});

				var loadRows = Titanium.UI.createButton({
					title:'Next Page',
					color:'#999',
					height:40,
					width:140,
					right:10,
				});

				var backPage = Titanium.UI.createButton({
					title:'Go Back',
					color:'#999',
					height:40,
					width:140,
					left:10,
				});
				
				if (Ti.App.Properties.getString('osname') == 'Android'){
					loadRows.setColor('#333');
					backPage.setColor('#333');
				}

			}

			if (page != 0) {
				buttonContainer.add(backPage);
			}

			if (calOffset + searchData.length < countAdded) {
				buttonContainer.add(loadRows);
			}

			searchData.push(buttonContainer);

			loadRows.addEventListener('click', function() {
				nextPage(buttonContainer);
			});

			backPage.addEventListener('click', function() {
				previousPage();
			});

			// End Function
			
			db.close();

		}
		
		var createApplicationWindow = require('/builders/createApplicationWindow');
		var searchResults = createApplicationWindow(tabGroup, null, 'Search Results (' + countAdded + ')', '#FFF', 'Search', 'Venue Search', 'Search Results', null);

		searchResults.addEventListener('close', function() {
			calOffset = 0;
		});

		loadDB();

		if (Ti.App.Properties.getString('osname') != 'iPad') {

			var resultsTable = Titanium.UI.createTableView({
				data:searchData,
				separatorColor:'#999'
			});

		} else {

			var resultsTable = Titanium.UI.createScrollView({
				layout:'horizontal',
				horizontalWrap:true,
				backgroundColor:'#d2e8f5',
				contentWidth:Ti.UI.FILL,
				height:'100%',
				width:'100%'
			});

			resultsTable.add(searchData);

		}

		if (spinView != null && spinView != '') {
			actInd.hide();
			win.remove(spinView);
			win.setTouchEnabled(true);
		}

		searchResults.add(resultsTable);

	} else {

		var createApplicationWindow = require('/builders/createApplicationWindow');
		var searchResults = createApplicationWindow(tabGroup, null, 'No Search Results', '#d2e8f5', null, null, null, null);

		var noInput = Titanium.UI.createLabel({
			text:'Please fill out one or more of the form fields',
			color:'#999',
			font:{
				fontFamily:'Arial',
				fontSize:18,
			},
			width:290,
			left:15,
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
		});

		if (countAdded == 0) {
			noInput.setText('Your search returned no results, please try again with a different search term.');
		}

		searchResults.add(noInput);

		if (spinView != null && spinView != '') {
			actInd.hide();
			win.remove(spinView);
			win.setTouchEnabled(true);
		}
	}

	return searchResults;

}

module.exports = createResultsPage;
