function quickSearch(tabGroup, curWin) {

	var win = Ti.UI.createView({
		width:'100%',
		height:'100%'
	});

	//Create Rows Array

	var rowdata = [];

	//Install the database

	var createDatabase = require('/builders/databaseFunctions/createDatabase'), db = createDatabase('/venuefinder.db', 'venuefinder');

	//Total number of venues

	var row = db.execute('SELECT * FROM Venue'), rowCount = row.rowCount.toString(), rowCount1 = rowCount.substr(0, 2), rowCount2 = rowCount.substr(2, 12);

	//Top search button

	var searchGo = Titanium.UI.createButton({
		title:'Search'
	});

	if (Ti.App.Properties.getString('osname') != 'Android') {
		curWin.setRightNavButton(searchGo);
	}

	//headerView

	var headerView = Titanium.UI.createView({
		height:50
	});

	var headerText = Titanium.UI.createLabel({
		text:'Search our ' + rowCount1 + ',' + rowCount2 + ' UK & International venues',
		color:'#666',
		textAlign:'center',
		font:{
			fontFamily:'Arial',
			fontSize:'14'
		}
	});

	headerView.add(headerText);

	//Side images for iPad

	if (Ti.App.Properties.getString('osname') == 'iPad') {

		var imageBanner = Titanium.UI.createImageView({
			image:'/images/imageBannerRight.png',
			height:'360',
			top:'50',
			right:'0',
			zIndex:'2'
		});

		win.add(imageBanner);

		var imageBanner2 = Titanium.UI.createImageView({
			image:'/images/imageBannerLeft.png',
			height:'360',
			top:'50',
			left:'0',
			zIndex:'2'
		});

		win.add(imageBanner2);
	}

	// Require & Create Fields

	//Get Country & County functions
	var createCountryCountyList = require('/builders/databaseFunctions/createCountryCountyList');
	var countryCountyList = createCountryCountyList(tabGroup, null, null, null, null);

	//Input Boxes
	var createDoubleField = require('/builders/databaseFunctions/createDoubleField');
	var venueName = createDoubleField('Venue Name', 'Example Venue'), 
		venueTown = createDoubleField('Venue Town', 'Example Town'), 
		meetingCapacity = createDoubleField('Meeting Capacity', '250', '60%', true), 
		cateringCapacity = createDoubleField('Catering Capacity (Max)', '250', '60%', true), 
		meetingRooms = createDoubleField('No. of Meeting Rooms', '5', '60%', true), 
		bedRooms = createDoubleField('No. of Bedrooms', '20', '60%', true);

	//Create Forms
	rowdata.push(countryCountyList[0]);
	rowdata.push(venueName[0]);
	rowdata.push(venueTown[0]);
	rowdata.push(countryCountyList[1]);
	rowdata.push(meetingCapacity[0]);
	rowdata.push(cateringCapacity[0]);
	rowdata.push(meetingRooms[0]);
	rowdata.push(bedRooms[0]);

	// Create Submit Button

	var submitButtonStyle = require('/builders/submitButtonStyle');
	var submit = submitButtonStyle();

	searchGo.addEventListener('click', function() {
		submit.fireEvent('click');
	});

	submit.addEventListener('click', function() {

		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		win.setTouchEnabled(false);

		// Retrieve User Inputs

		var venueTextResult = venueName[1].getValue(), townTextResult = venueTown[1].getValue(), peopleTextResult = meetingCapacity[1].getValue(), caterTextResult = cateringCapacity[1].getValue(), roomsTextResult = meetingRooms[1].getValue(), bedroomsTextResult = bedRooms[1].getValue();

		// Set Blank Values

		var sql_country = '';
		var sql_county = '';
		var sql_name = 'SELECT * FROM Venue JOIN VenueCoords ON Venue.VenueID=VenueCoords.VenueID WHERE VenueCoords.Latitude IS NOT NULL';
		var sql_town = '';
		var sql_people = '';
		var sql_cater = '';
		var sql_rooms = '';
		var sql_bedrooms = '';

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
		if (venueTextResult != '') {
			var sql_name = 'SELECT * FROM Venue WHERE VenueSort LIKE "%' + venueTextResult + '%"';
			var hasInput = true;
		};
		if (townTextResult != '') {
			var sql_town = ' AND Town LIKE "%' + townTextResult + '%"';
			var hasInput = true;
		};
		if (peopleTextResult != '') {
			var sql_people = ' AND MaxMeetingCapacity >="' + peopleTextResult + '"';
			var hasInput = true;
		};
		if (caterTextResult != '') {
			var sql_cater = ' AND MaxCateringCapacity >="' + caterTextResult + '"';
			var hasInput = true;
		};
		if (roomsTextResult != '') {
			var sql_rooms = ' AND MeetingRoomsNo >="' + roomsTextResult + '"';
			var hasInput = true;
		};
		if (bedroomsTextResult != '') {
			var sql_bedrooms = ' AND BedroomsNo >="' + bedroomsTextResult + '"';
			var hasInput = true;
		};

		var sqlString = sql_name + sql_country + sql_county + sql_town + sql_people + sql_cater + sql_rooms + sql_bedrooms;

		//Create Results Page
		var createResultsPage = require('/builders/createResultsPage');
		var resultsPage = createResultsPage(win, tabGroup, sqlString, hasInput, null, null, true, false);

		tabGroup.activeTab.open(resultsPage);

		var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		win.setTouchEnabled(true);

	});
	
	// End Submit Listener

	var tableview = Titanium.UI.createTableView({
		headerView:headerView,
		data:rowdata,
		backgroundColor:'#d2e8f5',
		height:'89.5%',
		top:'0',
		footerView:submit,
	});
	
	if (Ti.App.Properties.getString('osname') != 'iPad'){
		tableview.setWidth(300);
	}

	if (Ti.App.Properties.getString('osname') != 'Android') {
		tableview.setStyle(Titanium.UI.iPhone.TableViewStyle.GROUPED);
	}

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		tableview.setWidth(600);
		tableview.setHeight('100%');
		tableview.setScrollable(false);
		tableview.setLayout('horizontal');
		tableview.setHorizontalWrap(true);
	}

	win.add(tableview);

	// Require & Create advert space
	var createAdvert = require('/builders/createAdvert');
	var advert = createAdvert();
	win.add(advert);
	

	return win;

}

module.exports = quickSearch;
