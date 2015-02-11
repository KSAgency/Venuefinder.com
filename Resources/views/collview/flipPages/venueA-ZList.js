function venueList(win, windowsArray, venueatozScrollView) {

	var styleID = win.styleID;
	var tableContainer = getVenues('A', styleID, windowsArray);
	
	var atomDict = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
	var ntozDict = ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var dataArray = [];
	
	//A to M Buttons
	
	var atomView = Ti.UI.createView({
		width:'350',
		height:'22',
		top:'0',
		left:'71',
		zIndex:101,
		layout:'horizontal'
	});

	for (var i = 0; i < atomDict.length; i++){

		var letterButton = Ti.UI.createButton({
			width:'20',
			height:'24',
			top:'0',
			left:'5',
			title:atomDict[i],
			font:{
				fontSize:'23',
				fontFamily:Ti.App.Properties.getString('fontFamily'),
			},
			color:'#2195be',
			clickID:i,
		});
		
		atomView.add(letterButton);
		
		//Count Venues
		
		var londonQuery = '';
		
		if (styleID == '3' || styleID == '15' || styleID == '39'){
			londonQuery = 'AND Venue.Town = "London"';
		}
	
		var query;
		if (atomDict[i] == '#') {
			query = 'SELECT * FROM Venue WHERE VenueSort < "A" and VenueID in (select venueid from venuetovenuestyles where venuestyleid = ' + styleID + ') AND PackageCode in ("GLD","SIL","PRE") '+londonQuery+' ORDER BY venuesort ASC';
		} else {
			query = 'SELECT Venue.VenueID FROM Venue JOIN VenueToVenueStyles ON Venue.VenueID = VenueToVenueStyles.VenueID WHERE VenueToVenueStyles.VenueStyleID="'+styleID+'" AND (PackageCode="GLD" OR PackageCode="SIL" OR PackageCode="PRE") AND VenueSort LIKE "'+atomDict[i]+'%" '+londonQuery+' ORDER BY VenueSort ASC';
		}
		
		var rows = db.execute(query);
		if (rows.rowCount <= 0) {
			letterButton.setColor('#999999');
			letterButton.setTouchEnabled(false);
		}
		
	}
	
	var lastClicked = atomView.getChildren()[1];
	
	atomView.addEventListener('click', function(e) {
		if (e.source.title){
			var createStartActInd = require('/builders/startActInd');
			var startActInd = createStartActInd(win);
			if (lastClicked != e.source) {
				e.source.font = {
					fontWeight:'bold',
					fontFamily:'Arial',
					fontSize:'24',
				};
		
				if (lastClicked){
					lastClicked.font = {
						fontWeight:'normal',
						fontFamily:Ti.App.Properties.getString('fontFamily'),
						fontSize:'24',
					};
				} 
		
				lastClicked = e.source;
					
			}
	
			if (tableContainer != undefined) {
				venueatozScrollView.remove(tableContainer);
			}
		
			tableContainer = getVenues(e.source.title, styleID, windowsArray);
				
			if (tableContainer == undefined) {
				var createEndActInd = require('/builders/endActInd');
				var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
				noResultWindow();
			} else {
				venueatozScrollView.add(tableContainer);
				var createEndActInd = require('/builders/endActInd');
				var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			}
			
		}
		
	});

	venueatozScrollView.add(atomView);

	//N to Z Buttons
	
	var ntozView = Ti.UI.createView({
		width:'350',
		height:'22',
		top:'0',
		right:'81',
		zIndex:101,
		layout:'horizontal',
	});
	
	for (var i = 0; i < ntozDict.length; i++){

		var letterButton = Ti.UI.createButton({
			width:'20',
			height:'24',
			top:'0',
			left:'5',
			title:ntozDict[i],
			font:{
				fontSize:'23',
				fontFamily:Ti.App.Properties.getString('fontFamily'),
			},
			color:'#2195be',
			clickID:i,
			backgroundColor:'transparent'
		});
		
		ntozView.add(letterButton);
		
		//Count Venues
	
		var londonQuery = '';
		
		if (styleID == '3' || styleID == '15' || styleID == '39'){
			londonQuery = 'AND Venue.Town = "London"';
		}
	
		var query;
		if (ntozDict[i] == '#') {
			query = 'SELECT * FROM Venue WHERE VenueSort < "A" and VenueID in (select venueid from venuetovenuestyles where venuestyleid = ' + styleID + ') AND PackageCode in ("GLD","SIL","PRE") '+londonQuery+' ORDER BY venuesort ASC';
		} else {
			query = 'SELECT Venue.VenueID FROM Venue JOIN VenueToVenueStyles ON Venue.VenueID = VenueToVenueStyles.VenueID WHERE VenueToVenueStyles.VenueStyleID="'+styleID+'" AND (PackageCode="GLD" OR PackageCode="SIL" OR PackageCode="PRE") AND VenueSort LIKE "'+ntozDict[i]+'%" '+londonQuery+' ORDER BY VenueSort ASC';
		}
		
		var rows = db.execute(query);
		if (rows.rowCount <= 0) {
			letterButton.setColor('#999999');
			letterButton.setTouchEnabled(false);
		}
		
	}
	
	ntozView.addEventListener('click', function(e) {
		if (e.source.title){
			var createStartActInd = require('/builders/startActInd');
			var startActInd = createStartActInd(win);
			if (lastClicked != e.source) {
				e.source.font = {
					fontWeight:'bold',
					fontFamily:'Arial',
					fontSize:'24',
				};
		
				if (lastClicked){
					lastClicked.font = {
						fontWeight:'normal',
						fontFamily:Ti.App.Properties.getString('fontFamily'),
						fontSize:'24',
					};
				}
		
				lastClicked = e.source;
					
			}
	
			if (tableContainer != undefined) {
				venueatozScrollView.remove(tableContainer);
			}
			
			
		
			tableContainer = getVenues(e.source.title, styleID, windowsArray);
				
			if (tableContainer == undefined) {
				var createEndActInd = require('/builders/endActInd');
				var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
				noResultWindow();
			} else {
				venueatozScrollView.add(tableContainer);
				var createEndActInd = require('/builders/endActInd');
				var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			}
		}
	});

	atomView.getChildren()[1].font = {
		fontWeight:'bold',
		fontFamily:'Arial',
		fontSize:'24',
	};

	venueatozScrollView.add(ntozView);

	if (tableContainer == undefined) {
		noResultWindow();
	} else {
		venueatozScrollView.add(tableContainer);
	}
	win.add(venueatozScrollView);

	return venueatozScrollView;

}

module.exports = venueList;

function getVenues(venueStarts, styleID, windowsArray) {

	// Load Results From DB
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var dataArray = [];

	var londonQuery = '';
		
	if (styleID == '3' || styleID == '15' || styleID == '39'){
		londonQuery = 'AND Venue.Town = "London"';
	}

	var query;
	if (venueStarts == '#') {
		query = 'SELECT * FROM Venue WHERE VenueSort < "A" and VenueID in (select venueid from venuetovenuestyles where venuestyleid = ' + styleID + ') AND PackageCode in ("GLD","SIL","PRE") '+londonQuery+' ORDER BY venuesort ASC';
	} else {
		query = 'SELECT * FROM Venue JOIN VenueToVenueStyles ON Venue.VenueID = VenueToVenueStyles.VenueID WHERE VenueToVenueStyles.VenueStyleID="'+styleID+'" AND (PackageCode="GLD" OR PackageCode="SIL" OR PackageCode="PRE") AND VenueSort LIKE "'+venueStarts+'%" '+londonQuery+' ORDER BY VenueSort ASC';
	}

	var rows = db.execute(query);
	if (rows.rowCount <= 0) {
		return undefined;
	}
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
				height:191,
				selectionStyle:'none',
				backgroundColor:'rgba(255,255,255,0)',
				zIndex:101,
				top:'0',
			});

			var left = 80;
			for (var l = 0; l < 4; l++) {
				var venueDataArray = dataArray[venueCount];
				if (venueDataArray != undefined && venueDataArray['venueName'] != undefined) {
					if (l == 2) {
						left = left + pageGap - hMarzin;
					}
					var loadList = dataArray;

					
						// for (var j = venueCount + 1; j < dataArray.length; j++) {
							// if (dataArray[j]['packageCode'] != undefined) {
								// nextVenueId = dataArray[j]['venueID'];
								// break;
							// }
// 							
							// if (j!=1){
								// previousVenueId = dataArray[j]['venueID'];
								// break;
							// }
						// }
					
					var venue = venueThumbView.getVenueThumb(dataArray[venueCount], top, left, windowsArray, loadList, false);
					tableRow.add(venue);

					left = left + 168 + hMarzin;
				}
				venueCount++;
			}

			pageViewArray.push(tableRow);
		}
	}
	var tableContainer = Ti.UI.createView({
		backgroundColor:'rgba(255,255,255,0)',
		top:'30',
		width:'938',
		height:'573',
		zIndex:101,
		visible:true,
	});
	var tableView = Ti.UI.createTableView({
		backgroundColor:'rgba(255,255,255,0)',
		data:pageViewArray,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		separatorColor:'transparent',
	});

	tableContainer.add(tableView);
	return tableContainer;
}

function noResultWindow() {
	var noInput = Titanium.UI.createLabel({
		text:'Your search returned no results, please try again with a different search term.',
		color:'#999',
		font:{
			fontFamily:'Arial',
			fontSize:18,
		}
	});

	var noResultWin = Titanium.UI.createWindow({
		backgroundColor:'rgba(0,0,0,0.8)',
	});

	var close = Titanium.UI.createButton({
		right:'5%',
		top:'5%',
		height:'20',
		zIndex:1,
		title:"X",
		color:"#FFF",
		font:{
			fontSize:"28",
			fontWeight:"bold"
		},
	});

	noResultWin.add(close);
	close.addEventListener('click', function(e) {
		noResultWin.close();
	});

	var messageContainer = Ti.UI.createView({
		width:'80%',
		height:'80%',
		top:'10%',
		left:'10%',
		backgroundColor:'#d2e8f5',
	});

	messageContainer.add(noInput);

	noResultWin.add(messageContainer);
	noResultWin.open();
	
	db.close();
}
