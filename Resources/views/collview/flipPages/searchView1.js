function SearchView1(tabGroup, win, leftView, styleID, windowsArray) {

	var nameSearch = Ti.UI.createView({
		backgroundColor : '#DCDADA',
		width : '381',
		height : '107',
		top : '75',
		left : '34',
	});

	leftView.add(nameSearch);

	var nameSearchLabel = Ti.UI.createLabel({
		font : {
			fontSize : '32',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : 'Name Search',
		width : '224',
		height : '30',
		left : '27',
		top : '21',
	});

	nameSearch.add(nameSearchLabel);

	var nameSearchField = Ti.UI.createTextField({
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		tintColor : 'black',
		color : '#000000',
		backgroundColor : '#ffffff',
		width : '245',
		height : '25',
		left : '25',
		top : '68',
		paddingLeft:'5',
		paddingRight:'5'
	});

	nameSearch.add(nameSearchField);

	var goButton = Titanium.UI.createButton({
		title : 'Go',
		color : '#ffffff',
		backgroundColor : '#A6BB39',
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		width : '67',
		height : '43',
		top : '52',
		left : '296',
	});

	nameSearch.add(goButton);

	goButton.addEventListener('click', function() {
		nameSearchField.enabled = false;
		if (nameSearchField.value != null && nameSearchField.value != '') {
			var createStartActInd = require('/builders/startActInd');
			var startActInd = createStartActInd(win);

			var SearchResults = require('/views/collview/searchMapChild/SearchResults');
			
			var londonQuery = '';
		
			if (styleID == '3' || styleID == '15' || styleID == '39'){
				londonQuery = 'AND Venue.Town = "London"';
			}
			
			Ti.API.info('SELECT * FROM Venue JOIN VenueToVenueStyles ON Venue.VenueID = VenueToVenueStyles.VenueID WHERE VenueName LIKE "%'+nameSearchField.value+'%" AND VenueStyleID="'+styleID+'" AND (PackageCode="GLD" OR PackageCode="SIL" OR PackageCode="PRE") '+londonQuery+' ORDER BY VenueID ASC');
			
			var sql = 'SELECT * FROM Venue JOIN VenueToVenueStyles ON Venue.VenueID = VenueToVenueStyles.VenueID WHERE VenueName LIKE "%'+nameSearchField.value+'%" AND VenueStyleID="'+styleID+'" AND (PackageCode="GLD" OR PackageCode="SIL" OR PackageCode="PRE") '+londonQuery+' ORDER BY VenueID ASC';
			var createApplicationWindow = require('/builders/createApplicationWindow');
			var winView = createApplicationWindow(tabGroup, null, 'Venue Result', Ti.App.Properties.getString('allWindowsBackgroundColor'), '/images/loading_page.png', 'Search', 'Venue Collections', '', '', '', 'forflipwindow');
			windowsArray.push(winView);
			var searchResults = SearchResults(tabGroup, winView, sql, styleID, windowsArray);

			var SearchView = require('/views/collview/searchView');
			var searchView = SearchView(tabGroup, winView, '', styleID, '', windowsArray);
			winView.add(searchView[0]);
			winView.add(searchView[1]);
			winView.add(searchView[2]);
			winView.add(searchView[3]);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			if (searchResults == 'NoRecord') {
				//alert("No Record Found ! ");

				var noInput = Titanium.UI.createLabel({
					text : 'Your search returned no results, please try again with a different search term.',
					color : '#999',
					font : {
						fontFamily : 'Arial',
						fontSize : 18,
					}
				});

				var noResultWin = Titanium.UI.createWindow({
					backgroundColor : 'rgba(0,0,0,0.8)',
				});

				var close = Titanium.UI.createButton({
					right : '5%',
					top : '5%',
					height : '20',
					zIndex : 1,
					title : "X",
					color : "#FFF",
					font : {
						fontSize : "28",
						fontWeight : "bold"
					},
				});

				noResultWin.add(close);
				close.addEventListener('click', function(e) {
					noResultWin.close();
				});

				var messageContainer = Ti.UI.createView({
					width : '80%',
					height : '80%',
					top : '10%',
					left : '10%',
					backgroundColor: '#d2e8f5',
				});

				messageContainer.add(noInput);

				noResultWin.add(messageContainer);
				noResultWin.open();

			} else {
				winView.open();
			}
		}
		nameSearchField.enabled = true;
	});

	var slideSearch = Ti.UI.createView({
		backgroundColor : '#DCDADA',
		width : '381',
		height : '400',
		top : '210',
		left : '34',
	});

	leftView.add(slideSearch);

	var venueSearchLabel = Ti.UI.createLabel({
		font : {
			fontSize : '32',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		width : '224',
		height : '30',
		left : '27',
		top : '21',
		text : 'Venue Search',
	});

	slideSearch.add(venueSearchLabel);

	var meetCapacityLabel = Ti.UI.createLabel({
		width : '210',
		height : '24',
		top : '68',
		left : '25',
		font : {
			fontSize : 18,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : 'Meeting capacity',
		color : '#000000',
	});

	slideSearch.add(meetCapacityLabel);

	var meetCapacityRightLabel = Ti.UI.createTextField({
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		tintColor : 'black',
		color : '#000000',
		backgroundColor : '#ffffff',
		width : '118',
		height : '24',
		left : '244',
		top : '68',
		paddingLeft:'5',
		paddingRight:'5'
	});

	slideSearch.add(meetCapacityRightLabel);

	var cateringCapacityLabel = Ti.UI.createLabel({
		width : '210',
		height : '24',
		top : '116',
		left : '25',
		font : {
			fontSize : 18,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : 'Catering capacity',
		color : '#000000',
	});

	slideSearch.add(cateringCapacityLabel);

	var cateringCapacityRightLabel = Ti.UI.createTextField({
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		tintColor : 'black',
		color : '#000000',
		backgroundColor : '#ffffff',
		width : '118',
		height : '24',
		left : '244',
		top : '116',
		paddingLeft:'5',
		paddingRight:'5'
	});
	slideSearch.add(cateringCapacityRightLabel);

	var meetroomCapacityLabel = Ti.UI.createLabel({
		width : '240',
		height : '24',
		top : '164',
		left : '25',
		font : {
			fontSize : 18,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : 'Number of meeting rooms',
		color : '#000000',
	});

	slideSearch.add(meetroomCapacityLabel);

	var meetroomCapacityRightLabel = Ti.UI.createTextField({
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		tintColor : 'black',
		color : '#000000',
		backgroundColor : '#ffffff',
		width : '118',
		height : '24',
		left : '244',
		top : '164',
		paddingLeft:'5',
		paddingRight:'5'
	});
	slideSearch.add(meetroomCapacityRightLabel);

	var bedroomCapacityLabel = Ti.UI.createLabel({
		width : '210',
		height : '24',
		top : '212',
		left : '25',
		font : {
			fontSize : 18,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : 'Number of bedrooms',
		color : '#000000',//'#9D9A9D',
	});

	slideSearch.add(bedroomCapacityLabel);

	var bedroomCapacityRightLabel = Ti.UI.createTextField({
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		tintColor : 'black', // This make visible the cursor
		color : '#000000', //b4b4b4
		backgroundColor : '#ffffff',
		width : '118',
		height : '24',
		left : '244',
		top : '212',
		paddingLeft:'5',
		paddingRight:'5'
	});
	slideSearch.add(bedroomCapacityRightLabel);

	var showVenuesButton = Titanium.UI.createButton({
		title : 'Show venues',
		color : '#ffffff',
		backgroundColor : '#A6BB39',
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		width : '163',
		height : '44',
		top : '322',
		left : '101',

	});
	slideSearch.add(showVenuesButton);

	showVenuesButton.addEventListener('click', function() {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		var meetingCapecity = 0;
		var catering = 0;
		var meetingRoom = 0;
		var bedroom = 0;

		var input = meetCapacityRightLabel.value.replace(/[^0-9]+/g, "");
		if (input != undefined && input != '' && Number(input) != NaN) {
			meetingCapecity = Number(input);
		}

		input = cateringCapacityRightLabel.value.replace(/[^0-9]+/g, "");
		if (input != undefined && input != '' && Number(input) != NaN) {
			catering = Number(input);
		}

		input = meetroomCapacityRightLabel.value.replace(/[^0-9]+/g, "");
		if (input != undefined && input != '' && Number(input) != NaN) {
			meetingRoom = Number(input);
		}

		input = bedroomCapacityRightLabel.value.replace(/[^0-9]+/g, "");
		if (input != undefined && input != '' && Number(input) != NaN) {
			bedroom = Number(input);
		}

		var londonQuery = '';
		
		if (styleID == '3' || styleID == '15' || styleID == '39'){
			londonQuery = 'AND Venue.Town = "London"';
		}
		
		var sql = 'SELECT * FROM Venue JOIN VenueToVenueStyles ON Venue.VenueID = VenueToVenueStyles.VenueID WHERE VenueName LIKE "%'+nameSearchField.value+'%" AND VenueStyleID="'+styleID+'" AND (PackageCode="GLD" OR PackageCode="SIL" OR PackageCode="PRE") '+londonQuery+' ORDER BY VenueID ASC';

		var createApplicationWindow = require('/builders/createApplicationWindow');
		var winView = createApplicationWindow(tabGroup, null, 'Venue Result', Ti.App.Properties.getString('allWindowsBackgroundColor'), '/images/loading_page.png', 'Search', 'Venue Collections', '', '', '', 'forflipwindow');

		windowsArray.push(winView);
		var SearchResults = require('/views/collview/searchMapChild/SearchResults');
		var searchResults = SearchResults(tabGroup, winView, sql, styleID, windowsArray);

		var SearchView = require('/views/collview/searchView');
		var searchView = SearchView(tabGroup, winView, '', styleID, '', windowsArray);
		winView.add(searchView[0]);
		winView.add(searchView[1]);
		winView.add(searchView[2]);
		winView.add(searchView[3]);
		var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		if (searchResults == 'NoRecord') {
			alert("No Record Found ! ");
		} else {
			winView.open();
		}

	});

}

module.exports = SearchView1;