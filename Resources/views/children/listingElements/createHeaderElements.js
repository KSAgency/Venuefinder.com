function createHeaderElements(tabGroup, win, scroll, venueID, tabs) {

	var headerElements = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		layout:'vertical'
	});

	// See If Favorited?

	var isFavourited = null;

	function favCheck() {

		var createDatabase = require('/builders/databaseFunctions/createDatabase');
		var favDB = createDatabase('/favourites.db', 'favourites');
		var favRow = favDB.execute('SELECT * FROM Favourites WHERE VenueID="' + venueID + '"');
		if (favRow.isValidRow()) {
			var venueFavID = favRow.fieldByName('VenueID');
		}
		isFavourited = venueFavID;

		favDB.close();
	}

	favCheck();

	//Get Required DB Values

	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
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

	var descText = 'No description could be found for this venue.';

	if (venuePackage == 'PRE') {
		var row2 = db.execute('SELECT Text FROM VenueAdvertOptionsForWeb WHERE VenueID="' + venueID + '" AND OptionCode="SG2"');
		if (row2.isValidRow()) {
			descText = row2.fieldByName('Text');
		}
	} else {
		var row2 = db.execute('SELECT DescriptionText FROM VenueTextForWeb WHERE VenueID="' + venueID + '"');
		if (row2.isValidRow()) {
			descText = row2.fieldByName('DescriptionText');
		}
	}

	if (descText == null || descText == '') {
		descText = 'No description could be retrieved for this venue.';
	}

	descText.replace('/<(?:.|\n)*?>/gm', '');

	var createTodaysDate = require('/builders/todaysDate');
	var today = createTodaysDate();

	var getOffer = db.execute('SELECT * FROM Offers WHERE EntryType="V" AND EntryID="' + venueID + '" AND validToDate>="' + today + '" LIMIT 25');
	if (getOffer.isValidRow()) {
		var venueOffer = getOffer.fieldByName('EntryID');
	}

	db.close();

	//Main Image

	if (Ti.App.Properties.getString('osname') != 'iPad') {

		var createDatabase = require('/builders/databaseFunctions/createDatabase');
		var db = createDatabase('/venuefinder.db', 'venuefinder');
		var getImage = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID="' + venueID + '" AND (OptionCode="TOP" OR OptionCode="PIC")');

		if (getImage.isValidRow()) {
			var imageUrl = getImage.fieldByName('GraphicFileName');
		}

		db.close();

		var image = Titanium.UI.createImageView({
			image:'http://www.venuefinder.com/gallery/' + imageUrl,
			defaultImage:'/images/icon.png',
			hires:true,
			width:'279.5',
			height:'181',
		});

		var imageHolder = Titanium.UI.createView({
			width:125,
			left:10,
			height:125,
			top:20
		});

		imageHolder.add(image);

		var featuredImage = Titanium.UI.createImageView({
			image:'/images/featuredbanner_big.png',
			top:0,
			left:0
		});

		imageHolder.add(featuredImage);
		headerElements.add(imageHolder);

	}

	//Favourites

	var favImage = Titanium.UI.createImageView({
		image:'/images/add_favourites_dslctd.png',
		width:25,
		height:25,
		top:-125,
		left:160,
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		favImage.setTop('20');
		favImage.setLeft('0');
	}

	headerElements.add(favImage);

	var favText = Titanium.UI.createLabel({
		text:'Add to favourites',
		color:'#A2BE1C',
		top:-25,
		height:25,
		font:{
			fontSize:'14'
		},
		left:190
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		favText.setLeft('50');
	}

	headerElements.add(favText);

	if (isFavourited != venueID) {
		favImage.setImage('/images/add_favourites.png');

		function newFavourite() {
			if (isFavourited != venueID) {
				var rateAlert = Titanium.UI.createAlertDialog({
					message:'Would you like to rate this venue?',
					buttonNames:['Not Now', 'Rate']
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
							title:'Please select a rating',
							value:'0'
						});
						pickerData[1] = Ti.UI.createPickerRow({
							title:'5 - Excellent',
							value:'5'
						});
						pickerData[2] = Ti.UI.createPickerRow({
							title:'4 - Very Good',
							value:'4'
						});
						pickerData[3] = Ti.UI.createPickerRow({
							title:'3 - Good',
							value:'3'
						});
						pickerData[4] = Ti.UI.createPickerRow({
							title:'2 - Average',
							value:'2'
						});
						pickerData[5] = Ti.UI.createPickerRow({
							title:'1 - Poor',
							value:'1'
						});

						var picker = Ti.UI.createPicker({
							bottom:0,
							width:Ti.UI.FILL,
							selectionIndicator:true,
							type:Ti.UI.PICKER_TYPE_PLAIN,
							zIndex:20,
							backgroundColor:'#399ad4'
						});

						picker.add(pickerData);
						win.add(picker);
						
						if (Ti.App.Properties.getString('osname') != 'Android'){
						
							var pickerClose = Titanium.UI.createLabel({
								text:'Done',
								color:'#FFF'
							});
	
							var flexSpace = Titanium.UI.createButton({
								systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
							});
	
							var toolbar = Titanium.UI.iOS.createToolbar({
								items:[flexSpace, pickerClose],
								bottom:'215',
								borderTop:true,
								borderBottom:true,
								barColor:'#2195be',
								zIndex:'10'
							});
	
							win.add(toolbar);
	
							pickerClose.addEventListener('click', function(e) {
								var selectedRate = picker.getSelectedRow(0).value;
								var createDatabase = require('/builders/databaseFunctions/createDatabase');
								var favDB = createDatabase('/favourites.db', 'favourites');
								var execute = favDB.execute('INSERT INTO Favourites ("VenueID", "VenueName", "StarRating", "AddressLine1", "AddressLine2", "Town", "County", "Country", "Postcode", "PackageCode") VALUES ("' + venueID + '", "' + venueName + '", "' + selectedRate + '", "' + addressLine1 + '", "' + addressLine2 + '", "' + venueTown + '", "' + venueCounty + '", "' + venueCountry + '", "' + venuePostcode + '", "' + venuePackage + '")');
								favDB.close();
								win.remove(picker);
								favImage.setImage('/images/add_favourites_dslctd.png');
								win.remove(toolbar);
							});
						
						} else {
							
							picker.addEventListener('change', function(e) {
								var selectedRate = picker.getSelectedRow(0).value;
								
								if (selectedRate != '0') {
								
									var createDatabase = require('/builders/databaseFunctions/createDatabase');
									var favDB = createDatabase('/favourites.db', 'favourites');
									var execute = favDB.execute('INSERT INTO Favourites ("VenueID", "VenueName", "StarRating", "AddressLine1", "AddressLine2", "Town", "County", "Country", "Postcode", "PackageCode") VALUES ("' + venueID + '", "' + venueName + '", "' + selectedRate + '", "' + addressLine1 + '", "' + addressLine2 + '", "' + venueTown + '", "' + venueCounty + '", "' + venueCountry + '", "' + venuePostcode + '", "' + venuePackage + '")');
									favDB.close();
									win.remove(picker);
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
		favCheck();
		newFavourite();

	});

	favText.addEventListener('click', function() {
		favImage.fireEvent('click');
	});

	//Map Icon

	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var getCoords = db.execute('SELECT * FROM VenueCoords WHERE VenueID="' + venueID + '"');
	if (getCoords.isValidRow()) {
		var latitude = getCoords.fieldByName('Latitude');
		var longitude = getCoords.fieldByName('Longitude');
	}
	db.close();

	var showMap = Titanium.UI.createImageView({
		image:'/images/show_on_map.png',
		width:25,
		height:25,
		top:7.5,
		left:160,
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		showMap.setLeft('0');
		showMap.setTop('10');
	}

	if (longitude != '' && longitude != null && latitude != '' && latitude != null) {

		function loadMap() {

			var createStartActInd = require('/builders/startActInd');
			var startActInd = createStartActInd(win);
			win.setTouchEnabled(false);

			var sqlString = 'SELECT * FROM Venue JOIN VenueCoords ON Venue.VenueID=VenueCoords.VenueID WHERE VenueCoords.VenueID ="' + venueID + '"';

			//Require & Create map window
			var createMapView = require('/builders/createMapView');
			var mapView = createMapView(tabGroup, sqlString, 'Venue Map', false, 'Venue Listing', 'Show on Map', null, null);

			//Open Window
			var createApplicationWindow = require('/builders/createApplicationWindow');
			var windowElements = createApplicationWindow(tabGroup, mapView, 'Venue Map', '#d2e8f5', 'Venue Listing', 'Show On Map', '', '');

			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			win.setTouchEnabled(true);

		}

	} else {

		showMap.setImage('/images/show_on_map_ns.png');
		showMap.setTouchEnabled(false);

	}

	headerElements.add(showMap);

	var showMapText = Titanium.UI.createLabel({
		text:'Show on map',
		color:'#A2BE1C',
		top:-25,
		height:25,
		font:{
			fontSize:'14'
		},
		left:190
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		showMapText.setLeft('50');
	}

	headerElements.add(showMapText);

	showMap.addEventListener('click', function() {
		loadMap();
	});

	showMapText.addEventListener('click', function() {
		showMap.fireEvent('click');
	});

	//Share Button

	var shareButton = Titanium.UI.createImageView({
		image:'/images/share_button.png',
		width:25,
		height:25,
		top:7.5,
		left:160,
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		shareButton.setLeft('0');
		shareButton.setTop('10');
	}

	headerElements.add(shareButton);

	var shareText = Titanium.UI.createLabel({
		text:'Share',
		color:'#A2BE1C',
		top:-25,
		height:25,
		font:{
			fontSize:'14'
		},
		left:190
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		shareText.setLeft('50');
	}

	headerElements.add(shareText);

	shareButton.addEventListener('click', function() {

		var createEmailer = require('/builders/createEmailer');
		var emailer = createEmailer(tabGroup, null, '<a href="http://www.venuefinder.com/venues/v' + venueID + '">' + venueName + '</a></br>', null, venueName, 'Venue Listing', 'Share Venue', null, null);

		//Open window

		var createApplicationWindow = require('/builders/createApplicationWindow');
		var windowElements = createApplicationWindow(tabGroup, emailer, 'Share Venue', '#d2e8f5', 'Venue Listing', 'Share Venue', null, null, null, null);

	});

	shareText.addEventListener('click', function() {
		shareButton.fireEvent('click');
	});

	var venueAdvice = Titanium.UI.createImageView({
		image:'/images/venue_advice.png',
		width:25,
		height:25,
		top:7.5,
		left:160,
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		venueAdvice.setLeft('0');
		venueAdvice.setTop('10');
	}

	headerElements.add(venueAdvice);

	venueAdvice.addEventListener('click', function(e) {
		var createApplicationWindow = require('/builders/createApplicationWindow');
		var windowElements = createApplicationWindow(tabGroup, 'children/venueFindingService', 'Venue Finding Service', '#d2e8f5', 'Search', 'Free Venue Finding Service', '', '');
	});

	var adviceText = Titanium.UI.createLabel({
		text:'Venue Advice',
		color:'#A2BE1C',
		top:-25,
		height:25,
		font:{
			fontSize:'14'
		},
		left:190,
		bottom:5
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		adviceText.setLeft('50');
	}

	headerElements.add(adviceText);

	adviceText.addEventListener('click', function(e) {
		venueAdvice.fireEvent('click');
	});

	//Big Buttons

	if (venuePackage != 'FRE' && Ti.App.Properties.getString('osname') != 'iPad') {

		var descriptionButton = Titanium.UI.createImageView({
			image:'/images/listing_description.png',
			top:10,
			width:145,
			height:37,
			left:10
		});

		if (Ti.App.Properties.getString('osname') == 'iPad') {
			descriptionButton.setTop('10');
			descriptionButton.setLeft('0');
		}

		if (descText == null && descText == '') {
			descriptionButton.setImage('/images/listing_description_nctv.png');
		}

		headerElements.add(descriptionButton);

		descriptionButton.addEventListener('click', function() {

			scroll.removeAllChildren();

			var descriptionText = Titanium.UI.createWebView({
				html:'<html><body><span style="font-family:Arial; color:#666; font-size:14px; line-height:20pts; font-size:14px;">' + descText + '</span></body></html>',
				top:40,
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE
			});

			scroll.add(descriptionText);

		});

	}

	if (Ti.App.Properties.getString('osname') != 'iPad') {

		var callButton = Titanium.UI.createImageView({
			image:'/images/listing_call.png',
			top:-36,
			width:145,
			height:37
		});
		
		if (venuePackage == 'FRE'){
			callButton.setTop(10);
			callButton.setLeft(10);
		} else {
			callButton.setRight(10);
		}

		callButton.addEventListener('click', function() {

			var omniture = Titanium.UI.createWebView({
				html:'<html><head><script type="text/javascript" src="s_code.js"></script></head><body><script>' + 's.channel="";' + 's.pageName="";' + 's.events="event60";' + 's.prop60="' + venueName + '";' + 's.eVar60="' + venueName + '";' + 'var s_code=s.t(); if(s_code)document.write(s_code)</script> <script>if(navigator.appVersion.indexOf("MSIE")>=0)document.write(unescape("%3C")+"\!-"+"-")</script><noscript><img src="https://cmpi.122.2o7.net/b/ss/cmpivenuefinderappprod/1/H.25.2--NS/0?[AQB]&cdp=3&[AQE]"height="1" width="1" border="0" alt="" /></noscript></body></html>',
				opacity:'0',
				width:'0',
				height:'0',
				left:'0',
				right:'0',
				touchEnabled:false
			});

			win.add(omniture);

			venueTel = venueTel.split(' ').join('');

			Titanium.Platform.openURL('tel:' + venueTel);
			
			alert('Trying to call: '+venueTel+' from venueID: '+venueID);

		});

		if (venueTel != null && venueTel != '') {
			headerElements.add(callButton);
		}
	}

	var offersButton = Titanium.UI.createImageView({
		image:'/images/listing_offers.png',
		top:5,
		width:145,
		height:37,
		left:10
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		offersButton.setTop('10');
		offersButton.setLeft('0');
	}

	offersButton.addEventListener('click', function() {
		if (Ti.App.Properties.getString('osname')!='iPad') {
			tabs.fireEvent('click', {tabName:'Special Offers', contentPath:'createOffersTab', nonSelectedImage:'/images/special_offers.png', selectedImage:'/images/special_offers_s.png', touchEnabled:true});
		} else {
			tabs.fireEvent('click', {tabName:'Special Offers', contentPath:'createOffersTab', nonSelectedImage:'/images/tab5_ipad.png', selectedImage:'/images/tab5_ipad_s.png', touchEnabled:true});
		}
	});

	if (venueOffer != null && venueOffer != '') {
		headerElements.add(offersButton);
	}

	var bookButton = Titanium.UI.createImageView({
		image:'/images/listing_book.png',
		top:'-36',
		width:145,
		height:37,
		right:10
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		bookButton.setTop('10');
		bookButton.setLeft('0');
	}

	if (bookingLink != null && bookingLink != '') {
		headerElements.add(bookButton);
	}

	if (Ti.App.Properties.getString('osname') != 'iPad'){
		scroll.add(headerElements);
	} else {
		return headerElements;
	}
	

}

module.exports = createHeaderElements;
