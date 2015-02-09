function getVenueThumbView(venueObj, top, left, windowsArray, loadList, isPageFlip, isSearchPage) {

	var venueName = '';
	if (venueObj['venueName'] != undefined) {
		venueName = venueObj['venueName'];
	}
	var venueID = venueObj['venueID'];
	var venuePackage = venueObj['packageCode'];
	var venueTown = venueObj['town'];
	var bedRoomsNo = venueObj['bedroomsNo'];
	var postCode = venueObj['postCode'];
	var location = venueObj['location'];
	var meetingRoomsNo = venueObj['meetingRoomsNo'];
	var imageUrl = venueObj['imageUrl'];

	var venueView = Ti.UI.createView({
		width:'168',
		height:'180',
		top:top,
		left:left,
		venueTitle:venueName,
		uniqueID:venueID,
		loadList:loadList,
		backgroundColor:'#E6E8E5',
	});

	if (venuePackage == 'GLD'){
		venueView.setBackgroundColor('#EDE1A7');
	} else if (venuePackage == 'SIL'){
		venueView.setBackgroundColor('#C0C0C0');
	} else if (venuePackage == 'BRZ'){
		venueView.setBackgroundColor('#DEC8AF');
	}

	var venueImageView = Ti.UI.createView({
		width:'168',
		height:'92',
		top:'0',
		left:'0',
		backgroundColor:'#E6E8E5',
		borderRadius:'0',
		touchEnabled:false
	});

	var venueImage = Titanium.UI.createImageView({
		image:'http://www.venuefinder.com/adverts/' + imageUrl,
		defaultImage:'/images/icon.png',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
	});

	var imgW = venueImage.toImage().width;
	var imgH = venueImage.toImage().height;
	var imgLeft = 0;

	if (imgW >= imgH) {
		imgW = (imgW / imgH) * 92;
		imgH = 92;

		if (imgW < 168) {
			imgH = imgH / imgW * 168;
			imgW = 168;
		}
		
	} else {
		imgH = imgH / imgW * 168;
		imgW = 168;

		if (imgH < 92) {
			imgW = imgW / imgH * 92;
			imgH = 92;
		}
		
	}

	venueImage.setWidth(imgW);
	venueImage.setHeight(imgH);
	venueImage.setLeft(imgLeft);

	venueImageView.add(venueImage);
	venueView.add(venueImageView);

	var venueTitleLabel = Ti.UI.createLabel({
		text:venueName,
		top:'98',
		left:'11',
		color:'#000000',
		width:'144',
		height:'35',
		font:{
			fontSize:14,
		},
	});

	venueView.add(venueTitleLabel);

	var venueLocation = Ti.UI.createLabel({
		text:location,
		top:'134',
		left:'11',
		color:'#000000',
		width:'144',
		height:'16',
		font:{
			fontSize:12,
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		},
	});
	venueView.add(venueLocation);

	var bedroomMeetingView = Ti.UI.createView({
		width:'150',
		height:'25',
		top:'154',
		left:'11',
		layout:'horizontal',
	});

	if (bedRoomsNo != null && bedRoomsNo > 0) {
		/*var bedroomImage = Titanium.UI.createImageView({
		 image:'/images/has_bedrooms.png',
		 height:'21',
		 width:'22',
		 left:'11',
		 top:'154',
		 });
		 venueView.add(bedroomImage);

		 var bedroomCount = Ti.UI.createLabel({
		 text:bedRoomsNo,
		 top:'160',
		 left:'38',
		 color:'#000000',
		 width:'28',
		 height:'9',
		 font:{
		 fontSize:12,
		 fontFamily:Ti.App.Properties.getString('fontFamily'),
		 },
		 });

		 venueView.add(bedroomCount);
		 */

		var bedroomImage = Titanium.UI.createImageView({
			image:'/images/has_bedrooms.png',
			height:'21',
			width:'22',
		});
		bedroomMeetingView.add(bedroomImage);

		var bedroomCount = Ti.UI.createLabel({
			text:bedRoomsNo,
			top:'6',
			left:'6',
			color:'#000000',
			width:'28',
			height:'9',
			font:{
				fontSize:12,
				fontFamily:Ti.App.Properties.getString('fontFamily'),
			},
		});

		bedroomMeetingView.add(bedroomCount);
	}

	if (meetingRoomsNo != null && meetingRoomsNo > 0) {

		/*var meetingImage = Titanium.UI.createImageView({
		 image:'/images/meeting_room.png',
		 height:'21',
		 width:'22',
		 left:'69',
		 top:'154',
		 });

		 venueView.add(meetingImage);

		 var meetingRoomCount = Ti.UI.createLabel({
		 text:meetingRoomsNo,
		 top:'160',
		 left:'99',
		 color:'#000000',
		 width:'28',
		 height:'9',
		 font:{
		 fontSize:12,
		 fontFamily:Ti.App.Properties.getString('fontFamily'),
		 },
		 });

		 venueView.add(meetingRoomCount);
		 */

		var meetingRoomCount = Ti.UI.createLabel({
			text:meetingRoomsNo,
			top:'6',
			left:'6',
			color:'#000000',
			width:'28',
			//height:'9',
			font:{
				fontSize:12,
				fontFamily:Ti.App.Properties.getString('fontFamily'),
			},
		});
		var meetingImage;
		
		if ( bedRoomsNo = null || bedRoomsNo <= 0) {
			meetingImage = Titanium.UI.createImageView({
				image:'/images/meeting_room.png',
				width:'22',
				height:'21',
				left:'0',
			});
		} else {
			meetingImage = Titanium.UI.createImageView({
				image:'/images/meeting_room.png',
				width:'22',
				height:'21',
				left:'20',
			});
		}

		bedroomMeetingView.add(meetingImage);
		bedroomMeetingView.add(meetingRoomCount);

		venueView.add(bedroomMeetingView);

	}

	venueView.addEventListener('click', function(e) {

		var currentWin = windowsArray[windowsArray.length-1];

		var createApplicationWindow = require('/builders/createApplicationWindow');
		var newWin = createApplicationWindow(null, null, 'Venue Detail', Ti.App.Properties.getString('allWindowsBackgroundColor'), '/images/loading_page.png', 'Venue Detail', 'Venue Detail', '', '', '', 'forflipwindow');
		windowsArray.push(newWin);

		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(currentWin);

		var SearchView = require('/views/collview/searchView');
		var searchView = SearchView(null, newWin, '', null, '', windowsArray, null, isSearchPage);
		newWin.add(searchView[0]);
		newWin.add(searchView[1]);
		newWin.add(searchView[2]);
		//newWin.add(searchView[3]);
		newWin.add(searchView[4]);

		var venueID;

		if (e.source.uniqueID != undefined) {
			venueID = e.source.uniqueID;
		} else if (e.source.parent.uniqueID != undefined) {
			venueID = e.source.parent.uniqueID;
		} else if (e.source.parent.parent.uniqueID != undefined) {
			venueID = e.source.parent.parent.uniqueID;
		}

		var createDatabase = require('/builders/databaseFunctions/createDatabase');
		var db = createDatabase('/venuefinder.db', 'venuefinder');
		var rows = db.execute('select * from Venue where VenueID = ' + venueID);
		var packageCode;
		while (rows.isValidRow()) {
			packageCode = rows.fieldByName('packageCode');
			rows.next();
		}
		db.close();

		if (packageCode == 'GLD') {
			var venueDetailPage = require('/views/collview/venueDetailPages/createGoldPage');
			var goldPage = venueDetailPage.createDetailPage(venueID, loadList, newWin, windowsArray);
			newWin.add(goldPage);
		} else if (packageCode == 'SIL') {
			var venueDetailPage = require('/views/collview/venueDetailPages/createSilverPage');
			var silverPage = venueDetailPage.createDetailPage(venueID, loadList, newWin, windowsArray);
			newWin.add(silverPage);
		} else if (packageCode == 'BRZ') {
			var venueDetailPage = require('/views/collview/venueDetailPages/createBronzePage');
			var bronzePage = venueDetailPage.createDetailPage(venueID, loadList, newWin, windowsArray);
			newWin.add(bronzePage);
		}
		newWin.open();
		var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(currentWin, startActInd[0], startActInd[1]);
	});

	return venueView;
}

module.exports.getVenueThumb = getVenueThumbView;

function windowBackgroundWithStyle(venueStyle, isDetailPage) {

	if (isDetailPage == undefined) {
		isDetailPage = true;
	}

	var flipView;

	if (isDetailPage) {
		flipView = Ti.UI.createView({
			backgroundColor:'#ffffff',
			top:'41',
			width:'938',
			height:'660',
		});
	} else {
		flipView = Ti.UI.createView({
			backgroundColor:'#ffffff',
			top:'0',
			width:'938',
			height:'660',
		});
	}

	var venueCollectionName = Ti.UI.createLabel({
		color:'#000000',
		top:'6',
		left:'18',
		font:{
			fontSize:'14',
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		},
		text:venueStyle,
		width:400,
		height:35,
	});

	var horizontalImage = Titanium.UI.createView({
		backgroundColor:Ti.App.Properties.getString('allWindowsBackgroundColor'),
		left:'18',
		top:'38',
		width:'910',
		height:'2',
	});

	flipView.add(horizontalImage);
	flipView.add(venueCollectionName);

	var verticalImage = Titanium.UI.createView({
		backgroundColor:Ti.App.Properties.getString('allWindowsBackgroundColor'),
		left:'468',
		top:'0',
		width:'2',
	});

	flipView.add(verticalImage);

	return [flipView];
}

module.exports.setWindowPageStyle = windowBackgroundWithStyle;

