function createFeaturedButtons(venueID, currentView, windowsArray){	
	
	var btnContainer = Ti.UI.createView({
		width:136,
		height:120,
		layout:'vertical',
		top:84,
		right:0
	});
	
	btnContainer.add(createFavBtn(venueID, currentView));
	btnContainer.add(createMapBtn(venueID, currentView, windowsArray));
	btnContainer.add(createVenueAdviceBtn());
	btnContainer.add(createShareBtn(venueID, currentView));
	
	return btnContainer;	
}
module.exports.createFeaturedButtons = createFeaturedButtons;

function createFavBtn(venueID, currentView){
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var favdb = createDatabase('/favourites.db', 'favourites');
	
	var row = db.execute('SELECT * FROM Venue WHERE VenueID="' + venueID + '"');

	if (row.isValidRow()) {
		var venueID = row.fieldByName('VenueID');
		var venuePackage = row.fieldByName('PackageCode');
		var venueName = row.fieldByName('VenueName');
		var addressLine1 = row.fieldByName('AddressLine1');
		var addressLine2 = row.fieldByName('AddressLine2');
		var venueTown = row.fieldByName('Town');
		var venueCounty = row.fieldByName('County');
		var venueCountry = row.fieldByName('Country');
		var venuePostcode = row.fieldByName('Postcode');
		var venueTel = row.fieldByName('Tel');
		var bookingLink = row.fieldByName('BookingURL');
	}
	
	var isFavourited = null;
	
	var favContainer = Ti.UI.createView({
		width:136,
		height:24,
		layout:'horizontal',
		top:0,
		right:0,
		
	});
	
	var favRow = favdb.execute('SELECT * FROM Favourites WHERE VenueID="' + venueID + '"');
	if (favRow.isValidRow()) {
		isFavourited = favRow.fieldByName('VenueID');
	}
	
	var favText = Titanium.UI.createLabel({
		text : 'Add to favourites',
		color : '#000000',		
		top : 2,
		height :20,
		width:90,
		font : {
			fontSize : '11',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		left : 0,
		textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, 
	});

	favContainer.add(favText);
	
	var favBtnWrapper = Titanium.UI.createView({
		
		width : 40,
		height :24,
		top : 0,
		left : 6,
		backgroundColor:'#EEEEEE',
	});
	
	
	var favImage = Titanium.UI.createImageView({
		image : '/images/add_favourites_dslctd.png',
		width : 20,
		height :18,
		top : 3,
		left : 10,		
	});	
	favBtnWrapper.add(favImage);
	favContainer.add(favBtnWrapper);

	

	if (isFavourited != venueID) {
		favImage.setImage('/images/add_favourites.png');

		function newFavourite() {
			if (isFavourited != venueID) {
				var rateAlert = Titanium.UI.createAlertDialog({
					message : 'Would you like to rate this venue?',
					buttonNames : ['Not Now', 'Rate']
				});

				rateAlert.show();

				rateAlert.addEventListener('click', function(e) {
					if (e.index == 0) {

						var createDatabase = require('/builders/databaseFunctions/createDatabase');
						var favDB = createDatabase('/favourites.db', 'favourites');
						var execute = favDB.execute('INSERT INTO Favourites ("VenueID", "VenueName", "AddressLine1", "AddressLine2", "Town", "County", "Country", "Postcode", "PackageCode") VALUES ("' + venueID + '", "' + venueName + '", "' + addressLine1 + '", "' + addressLine2 + '", "' + venueTown + '", "' + venueCounty + '", "' + venueCountry + '", "' + venuePostcode + '", "' + venuePackage + '")');
						favDB.close();
						favImage.setImage('/images/add_favourites_dslctd.png');

					} else {

						var pickerData = [];
						pickerData[0] = Ti.UI.createPickerRow({
							title : 'Please select a rating',
							value : '0'
						});
						pickerData[1] = Ti.UI.createPickerRow({
							title : '5 - Excellent',
							value : '5'
						});
						pickerData[2] = Ti.UI.createPickerRow({
							title : '4 - Very Good',
							value : '4'
						});
						pickerData[3] = Ti.UI.createPickerRow({
							title : '3 - Good',
							value : '3'
						});
						pickerData[4] = Ti.UI.createPickerRow({
							title : '2 - Average',
							value : '2'
						});
						pickerData[5] = Ti.UI.createPickerRow({
							title : '1 - Poor',
							value : '1'
						});

						var picker = Ti.UI.createPicker({
							bottom : 0,
							selectionIndicator : true,
							type : Ti.UI.PICKER_TYPE_PLAIN,
							zIndex : 20
						});

						picker.add(pickerData);
						currentView.add(picker);

						if (Ti.App.Properties.getString('osname') != 'Android') {

							var pickerClose = Titanium.UI.createLabel({
								text : 'Done',
								color : '#FFF'
							});

							var flexSpace = Titanium.UI.createButton({
								systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
							});

							var toolbar = Titanium.UI.iOS.createToolbar({
								items : [flexSpace, pickerClose],
								bottom : '215',
								borderTop : true,
								borderBottom : true,
								barColor : '#2195be',
								zIndex : '10'
							});

							if (Ti.App.Properties.getString('osname') == 'iPad') {
								toolbar.setWidth('320');
							}

							currentView.add(toolbar);

							pickerClose.addEventListener('click', function(e) {
								var selectedRate = picker.getSelectedRow(0).value;
								var createDatabase = require('/builders/databaseFunctions/createDatabase');
								var favDB = createDatabase('/favourites.db', 'favourites');
								var execute = favDB.execute('INSERT INTO Favourites ("VenueID", "VenueName", "StarRating", "AddressLine1", "AddressLine2", "Town", "County", "Country", "Postcode", "PackageCode") VALUES ("' + venueID + '", "' + venueName + '", "' + selectedRate + '", "' + addressLine1 + '", "' + addressLine2 + '", "' + venueTown + '", "' + venueCounty + '", "' + venueCountry + '", "' + venuePostcode + '", "' + venuePackage + '")');
								favDB.close();
								currentView.remove(picker);
								favImage.setImage('/images/add_favourites_dslctd.png');
								currentView.remove(toolbar);
							});

						} else {

							picker.addEventListener('change', function(e) {
								var selectedRate = picker.getSelectedRow(0).value;

								if (selectedRate != '0') {

									var createDatabase = require('/builders/databaseFunctions/createDatabase');
									var favDB = createDatabase('/favourites.db', 'favourites');
									var execute = favDB.execute('INSERT INTO Favourites ("VenueID", "VenueName", "StarRating", "AddressLine1", "AddressLine2", "Town", "County", "Country", "Postcode", "PackageCode") VALUES ("' + venueID + '", "' + venueName + '", "' + selectedRate + '", "' + addressLine1 + '", "' + addressLine2 + '", "' + venueTown + '", "' + venueCounty + '", "' + venueCountry + '", "' + venuePostcode + '", "' + venuePackage + '")');
									favDB.close();
									currentView.remove(picker);
									favImage.setImage('/images/add_favourites_dslctd.png');

								}

							});

						}

					}
				});
			}
		}

	}

	favImage.addEventListener('click', function() {
		//favCheck();
		newFavourite();

	});

	favText.addEventListener('click', function() {
		favImage.fireEvent('click');
	});
	
	return favContainer;	
}

function createMapBtn(venueID, currentView, windowsArray){
	
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var getCoords = db.execute('SELECT * FROM VenueCoords WHERE VenueID="' + venueID + '"');
	if (getCoords.isValidRow()) {
		var latitude = getCoords.fieldByName('Latitude');
		var longitude = getCoords.fieldByName('Longitude');
	}
	db.close();

	var mapBtnContainer = Ti.UI.createView({
		width:136,
		height:24,
		layout:'horizontal',
		top:8,
		right:0,
		
	});
	
	var mapText = Titanium.UI.createLabel({
		text : 'Map',
		color : '#000000',		
		top : 2,
		height :20,
		width:90,
		font : {
			fontSize : '11',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		left : 0,
		textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, 
	});

	mapBtnContainer.add(mapText);
	
	var mapBtnWrapper = Titanium.UI.createView({		
		width : 40,
		height :24,
		top : 0,
		left : 6,
		backgroundColor:'#EEEEEE',
	});
	
	
	var mapImage = Titanium.UI.createImageView({
		image : '/images/show_on_map.png',
		width : 20,
		height :18,
		top : 3,
		left : 10,				
	});	
	mapBtnWrapper.add(mapImage);
	mapBtnContainer.add(mapBtnWrapper);

	if (longitude != '' && longitude != null && latitude != '' && latitude != null) {

		function loadMap() {

			var createStartActInd = require('/builders/startActInd');
			var startActInd = createStartActInd(currentView);
			currentView.setTouchEnabled(false);

			var sqlString = 'SELECT * FROM Venue JOIN VenueCoords ON Venue.VenueID=VenueCoords.VenueID WHERE VenueCoords.VenueID ="' + venueID + '"';

			//Require & Create map window
			var createMapView = require('/views/collview/map/createMapView');
			
			//var mapView = createMapView(null, sqlString, 'Venue Map', false, 'Venue Listing', 'Map', null, null);
			
			//var mapView = createMapView(null, sqlString, 'Venue Map', false, 'Venue Listing', 'Show on Map', null, null, null, 'searchMapView2');
			var mapView = createMapView(sqlString, 'Venue Map', false, 'Venue Listing', 'Show on Map', null, null, null, true, windowsArray);
			mapView.setWidth(819);
			mapView.setHeight(614);
			

			//Open Window
			//var createApplicationWindow = require('/builders/createApplicationWindow');
			//var windowElements = createApplicationWindow(null, mapView, 'Venue Map', '#d2e8f5', 'Venue Listing', 'Show On Map', '', '');
			
			var mapWin = Titanium.UI.createWindow({
				backgroundColor : 'rgba(0,0,0,0.8)',
			});	
			
			var close = Titanium.UI.createButton({		
				right : '5%',
				top : '5%',
				height : '20',
				zIndex : 1,
				title: "X",
				color:"#FFF",
				font:{fontSize: "28",fontWeight:"bold"},
			});
			
			mapWin.add(close);
			close.addEventListener('click', function(e) {
				mapWin.close();
			});
			
			var mapContainer = Ti.UI.createView({
				width:'80%',
				height:'80%',
				top:'10%',
				left:'10%',
			});	
			
			mapContainer.add(mapView);
			
			mapWin.add(mapContainer);
			mapWin.open();
			
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(currentView, startActInd[0], startActInd[1]);
			currentView.setTouchEnabled(true);
		}

	} else {

		mapImage.setImage('/images/show_on_map_ns.png');
		mapImage.setTouchEnabled(false);

	}
		
	mapImage.addEventListener('click', function() {
		loadMap();
	});

	mapText.addEventListener('click', function() {
		mapImage.fireEvent('click');
	});

	return mapBtnContainer;
}

function createVenueAdviceBtn(){
	
	var adviceBtnContainer = Ti.UI.createView({
		width:136,
		height:24,
		layout:'horizontal',
		top:8,
		right:0,
		
	});
	
	var adviceText = Titanium.UI.createLabel({
		text : 'Venue Advice',
		color : '#000000',		
		top : 2,
		height :20,
		width:90,
		font : {
			fontSize : '11',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		left : 0,
		textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, 
	});

	adviceBtnContainer.add(adviceText);
	
	var adviceBtnWrapper = Titanium.UI.createView({		
		width : 40,
		height :24,
		top : 0,
		left : 6,
		backgroundColor:'#EEEEEE',
	});
	
	
	var adviceImage = Titanium.UI.createImageView({
		image : '/images/venue_advice.png',
		width : 20,
		height :18,
		top : 3,
		left : 10,			
	});	
	adviceBtnWrapper.add(adviceImage);
	adviceBtnContainer.add(adviceBtnWrapper);

	adviceImage.addEventListener('click', function(e) {
		/*
		var createApplicationWindow = require('/builders/createApplicationWindow');
		var windowElements = createApplicationWindow(null, 'children/venueFindingService', 'Venue Finding Service', '#d2e8f5', 'Search', 'Free Venue Finding Service', '', '');
		*/	
		
		var advWin = Titanium.UI.createWindow({
			backgroundColor : 'rgba(0,0,0,0.8)',
		});	
		
		var close = Titanium.UI.createButton({		
			right : '5%',
			top : '5%',
			height : '20',
			zIndex : 1,
			title: "X",
			color:"#FFF",
			font:{fontSize: "28",fontWeight:"bold"},
		});
		
		advWin.add(close);
		close.addEventListener('click', function(e) {
			advWin.close();
		});
		
		var serviceView = Ti.UI.createView({
			width:'100%',
			height:'100%',
			//top:'10%',
			//bottom:'10%',
			
		});
		var venueFindingService = require('/views/collview/venueFindingService');
		var serviceScrollView = venueFindingService(advWin);
		serviceView.add(serviceScrollView);
		
		//serviceView.setWidth('90%');
		//serviceView.setHeight('90%');
		//serviceView.setTop('5%');
		//serviceView.setLeft('5%');
		
		advWin.add(serviceView);
		advWin.open();
		
		//var windowElements = createApplicationWindow(null, 'children/venueFindingService', 'Venue Finding Service', '#d2e8f5', 'Search', 'Free Venue Finding Service', '', '');
	});	

	adviceText.addEventListener('click', function(e) {
		adviceImage.fireEvent('click');
	});
	
	return adviceBtnContainer;
}

function createShareBtn(venueID, currentView){
	
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var favdb = createDatabase('/favourites.db', 'favourites');
	
	var row = db.execute('SELECT VenueName FROM Venue WHERE VenueID="' + venueID + '"');

	if (row.isValidRow()) {
		var venueName = row.fieldByName('VenueName');		
	}
	
	//Share Button
	var shareBtnContainer = Ti.UI.createView({
		width:136,
		height:24,
		layout:'horizontal',
		top:8,
		right:0,
		
	});
	
	var shareText = Titanium.UI.createLabel({
		text : 'Share',
		color : '#000000',		
		top : 2,
		height :20,
		width:90,
		font : {
			fontSize : '11',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		left : 0,
		textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, 
	});

	shareBtnContainer.add(shareText);
	
	var shareBtnWrapper = Titanium.UI.createView({		
		width : 40,
		height :24,
		top : 0,
		left : 6,
		backgroundColor:'#EEEEEE',
	});
	
	var shareImage = Titanium.UI.createImageView({
		image : '/images/share_button.png',
		width : 20,
		height :18,
		top : 3,
		left : 10,			
	});	
	shareBtnWrapper.add(shareImage);
	shareBtnContainer.add(shareBtnWrapper);
	
	
	shareImage.addEventListener('click', function() {

		var createEmailer = require('/builders/createEmailer');
		var emailer = createEmailer(null, null, '<a href="http://www.venuefinder.com/venues/v' + venueID + '">' + venueName + '</a></br>', null, venueName, 'Venue Listing', 'Share Venue', null, null);

		//Open window
		/*
		var createApplicationWindow = require('/builders/createApplicationWindow');
		var windowElements = createApplicationWindow(null, emailer, 'Share Venue', '#d2e8f5', 'Venue Listing', 'Share Venue', null, null, null, null);
		*/
		
		var shareWin = Titanium.UI.createWindow({
			backgroundColor : 'rgba(0,0,0,0.8)',
		});	
		
		var close = Titanium.UI.createButton({		
			right : '5%',
			top : '5%',
			height : '20',
			zIndex : 1,
			title: "X",
			color:"#FFF",
			font:{fontSize: "28",fontWeight:"bold"},
		});
		
		shareWin.add(close);
		close.addEventListener('click', function(e) {
			shareWin.close();
		});
		
		var shareContainer = Ti.UI.createView({
			width:'80%',
			height:'80%',
			top:'10%',
			left:'10%',
		});	
		
		shareContainer.add(emailer);
		
		shareWin.add(shareContainer);
		shareWin.open();
		
	});

	shareText.addEventListener('click', function() {
		shareImage.fireEvent('click');
	});
	
	return shareBtnContainer;
	
}

function createSpeOfferBtn(venueID) {
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	
	var createTodaysDate = require('/builders/todaysDate');
	var today = createTodaysDate();	
	var hasOffer = false;
	
	var row = db.execute('SELECT * FROM Offers WHERE EntryID="' + venueID + '" AND validToDate>="' + today + '"');
	if (row.rowCount != 0) {
		hasOffer = true;
	}
	var offerBtnContainer = null;
	if(hasOffer){
		
		offerBtnContainer = Ti.UI.createView({
			right : 25,
			bottom: 150,
			width : 130,
			height : 50,
			backgroundColor:"#EEEEEE",
		});
				
		var offersButton = Titanium.UI.createImageView({
			image : '/images/listing_offers.png',
			left : 12,
			top:10,
			width : 102,
			height : 'auto',			
		});	
		
		offerBtnContainer.add(offersButton);
		
		offersButton.addEventListener('click', function() {
			
			var offerScroll = Titanium.UI.createScrollView({
				top : '0%',
				zIndex : 5,
				layout : 'vertical',
				backgroundColor : '#FFF'
			});		
	
			var createTab = require('/views/children/listingElements/createOffersTab');
			createTab(null, null, offerScroll, venueID, null);
			//var parentwindow = Ti.UI.currentWindow;
			
			var offerWin = Titanium.UI.createWindow({
				backgroundColor : 'rgba(0,0,0,0.8)',
			});
						
			var offerContainer = Ti.UI.createView({
				width:'60%',
				height:'60%',
				top:'10%',
				left:'20%',
				layout:'vertical',
			});
			
			var upperView = Ti.UI.createView({
				top : 0,
				left:0,
				height : '15%',
				width : '100%',
				backgroundColor : '#e6a723',
				layout:'horizontal',			
			});
			
			var specialOffersLbl = Titanium.UI.createLabel({
				text : 'Special Offers',
				left : '5%',
				width : '85%',
				height : '40',
				top : '20',
				ellipsize : true,
				color : '#ffffff',
				font : {
					fontSize : '34',
					fontFamily : Ti.App.Properties.getString('fontFamily'),
					//fontWeight : 'bold'
				}
			});
			upperView.add(specialOffersLbl);

			var close = Titanium.UI.createButton({		
				right : '0',
				top : '0',
				height : '80',
				width: '60',				
				title: "X",
				color:"#FFF",
				font:{fontSize: "28",fontWeight:"bold"},
			});
			upperView.add(close);
			
			close.addEventListener('click', function(e) {
				offerWin.close();
			});
						
			offerContainer.add(upperView);			
			offerContainer.add(offerScroll);			
			offerWin.add(offerContainer);
			offerWin.open();			
		});
	}

	db.close();
	return offerBtnContainer;
}
module.exports.createSpeOfferBtn = createSpeOfferBtn;

