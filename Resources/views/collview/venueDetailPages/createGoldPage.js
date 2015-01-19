var createImageGallery = require('views/collview/ImageGallery/createImageGallery');
var createHeaderElements = require('/views/collview/listingElements/createHeaderElementsios');

var createDatabase = require('/builders/databaseFunctions/createDatabase');
var dbUtil = require('/builders/databaseFunctions/dbUtil');

function createDetailPage(thisVenueId, currentWin, windowsArray) {

	var venueObj = dbUtil.getVenueForId(thisVenueId);

	var page1 = createGold1(venueObj, currentWin, windowsArray);
	page1.setTop(0);
	page1.setLeft(0);

	var page2 = createGold2(venueObj, currentWin, windowsArray);
	page2.setTop(0);
	page2.setLeft(0);

	var goldDetailScroll = Ti.UI.createScrollableView({
		width : '938',
		height : '720',
		top : 20,
		layout : 'horizontal',
		showPagingControl : true,
		pagingControlColor : 'transparent',
		views : [page1, page2],
	});
	return goldDetailScroll;
}

module.exports.createDetailPage = createDetailPage;

function createGold1(venueObj, currentWin, windowsArray) {
	var currentCollectionName = Ti.App.Properties.getString('styleName');

	var windowPageView = require('/views/collview/getVenueThumbView');
	var bgView = windowPageView.setWindowPageStyle(currentCollectionName, true);
	var page1 = bgView[0];

	var location = venueObj['Town'];

	if (venueObj['Town'] == 'London') {
		location = location + '  ' + venueObj['Postcode'];
	}

	var townPostcode = Ti.UI.createLabel({
		color : '#000000',
		top : '6',
		right : '18',
		font : {
			fontSize : '14',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : location,
		width : '300',
		height : '35',
		textAlign : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
	});
	page1.add(townPostcode);

	page1.add(createGallery(venueObj['VenueID']));

	//Title
	var titleLbl = Titanium.UI.createLabel({
		text : venueObj['VenueName'],
		ellipsize : true,
		color : '#000000',
		width : "420",
		height : "24",
		top : "465",
		left : "66",
		font : {
			fontSize : "28",
		}
	});
	page1.add(titleLbl);

	//Venue location
	var locationLbl = Titanium.UI.createLabel({
		text : venueObj['Town'] + ", " + venueObj['Country'],
		ellipsize : true,
		color : '#000000',
		width : "370",
		height : "24",
		top : "501",
		left : "66",
		font : {
			fontSize : "24",
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		}
	});
	page1.add(locationLbl);

	//logo
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var logoMedia = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID=' + venueObj['VenueID'] + ' AND (OptionCode = \'LG1\' ) ORDER BY OptionCode DESC');
	var logoUrl;
	while (logoMedia.isValidRow()) {
		logoUrl = logoMedia.fieldByName('GraphicFileName');
		logoMedia.next();
	}
	db.close();

	var logoContainer = Ti.UI.createScrollView({
		width : '372',
		height : '54',
		top : '577',
		left : '64',
		borderRadius : '0',
		contentWidth : Ti.UI.FILL,
		contentHeight : Ti.UI.FILL,
		scrollingEnabled : false,
	});

	var logoImage = Titanium.UI.createImageView({
		image : 'http://www.venuefinder.com/adverts/' + logoUrl,
		defaultImage : '/images/icon.png',
		width : "auto",
		height : Ti.UI.FILL,
		left : 0,
		top : 0,
	});
	logoContainer.add(logoImage);
	page1.add(logoContainer);

	createGoldSide2(page1, venueObj['VenueID']);
	page1.add(createGoldSide2(page1, venueObj['VenueID']));

	return page1;
}

function createGold2(venueObj, currentWin, windowsArray) {
	var currentCollectionName = Ti.App.Properties.getString('styleName');

	var windowPageView = require('/views/collview/getVenueThumbView');
	var bgView = windowPageView.setWindowPageStyle(currentCollectionName, true);
	var page = bgView[0];

	var location = venueObj['Town'];

	if (venueObj['Town'] == 'London') {
		location = location + '  ' + venueObj['Postcode'];
	}

	var townPostcode = Ti.UI.createLabel({
		color : '#000000',
		top : '6',
		//left : '768',
		right : '18',
		font : {
			fontSize : '14',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : location,
		width : '300',
		height : '35',
		textAlign : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
	});
	page.add(townPostcode);

	//Title
	var titleLbl = Titanium.UI.createLabel({
		text : venueObj['VenueName'],
		ellipsize : true,
		color : '#000000',
		width : "420",
		height : "24",
		top : "70",
		left : "66",
		font : {
			fontSize : "28",
		}
	});
	page.add(titleLbl);

	//Venue location
	var locationLbl = Titanium.UI.createLabel({
		text : venueObj['Town'] + ", " + venueObj['Country'],
		ellipsize : true,
		color : '#000000',
		width : "370",
		height : "24",
		top : "106",
		left : "66",
		font : {
			fontSize : "24",
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		}
	});
	page.add(locationLbl);

	page.add(createCateringArea(venueObj['VenueID']));

	page.add(createHeaderElements.createFeaturedButtons(venueObj['VenueID'], page, windowsArray));

	page.add(createVenueDetailSide3(venueObj));

	page.add(createVirtualTour(venueObj));

	page.add(nearByAttraction(venueObj));

	page.add(seeMoreInfoButton());

	page.add(createVenueDetailSide4(venueObj));

	var videoView = videoArea(venueObj);
	if (videoView != null) {
		page.add(videoView);
	}

	db.close();

	return page;
}

function createCateringArea(venueID) {

	var cateringView = Ti.UI.createView({
		width : '232',
		height : '450',
		top : '165',
		left : '0',
		backgroundColor : '#dededc',
	});

	var cateringText = Titanium.UI.createLabel({
		width : '172',
		height : '23',
		top : '19',
		left : '39',
		backgroundColor : 'transparent',
		text : 'Catering',
		font : {
			fontSize : "24",
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		}
	});

	cateringView.add(cateringText);

	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var getMedia = db.execute("SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID='" + venueID + "' AND (OptionCode='MIL' OR OptionCode = 'PIC' ) ORDER BY OrderKey, GraphicFileName DESC");
	while (getMedia.isValidRow()) {
		logoUrl = getMedia.fieldByName('GraphicFileName');
		break;
	}

	var cateringImageContainer = Ti.UI.createScrollView({
		width : '171',
		height : '121',
		top : '48',
		left : '39',
		borderRadius : '0',
		contentWidth : Ti.UI.FILL,
		contentHeight : Ti.UI.FILL,
		scrollingEnabled : false,
		backgroundColor : 'transparent',
	});

	var cateringImage = Titanium.UI.createImageView({
		image : 'http://www.venuefinder.com/adverts/' + logoUrl,
		defaultImage : '/images/icon.png',
		width : "auto",
		height : Ti.UI.FILL,
		left : 0,
		top : 0,
	});
	cateringImageContainer.add(cateringImage);
	cateringView.add(cateringImageContainer);

	var cateringSubtitle = Titanium.UI.createLabel({
		width : '172',
		height : '25',
		top : '181',
		left : '39',
		backgroundColor : 'transparent',
		text : 'Lorem ipsum dolor sit amet',
		font : {
			fontSize : "14",
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		}
	});

	//cateringView.add(cateringSubtitle);

	var desRow = db.execute('SELECT DescriptionText FROM VenueTextForWeb WHERE VenueID="' + venueID + '"');
	var descText;
	while (desRow.isValidRow()) {
		descText = desRow.fieldByName('DescriptionText');
		desRow.next();
	}

	if (descText == null || descText == '') {
		descText = 'No description could be retrieved for this venue.';
	}

	descText.replace('/<(?:.|\n)*?>/gm', '');

	//var descText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
	var descriptionWV = Titanium.UI.createWebView({
		html : '<span style="font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:14px; line-height:20pts; font-size:15px;">' + descText + '</span>',
		top : '0',
		width : '100%',
		left : '0',
		backgroundColor : 'transparent',
		disableBounce : true,
	});

	var descScrollView = Titanium.UI.createScrollView({
		contentWidth : '176',
		contentHeight : 'auto',
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : false,
		width : '172',
		height : '197',
		//top : '234',
		top : '214',
		right : '170',
		left : '35',
		font : {
			fontFamily : Ti.App.Properties.getString('fontFamily'),
			fontSize : '14',
		},
		backgroundColor : 'transparent',
	});
	descScrollView.add(descriptionWV);

	cateringView.add(descScrollView);

	db.close();
	return cateringView;

}

function createVenueDetailSide3(venueObj) {
	var detailView = Ti.UI.createView({
		width : '232',
		height : '450',
		top : '165',
		left : '232',
	});

	var detailTitleText = Titanium.UI.createLabel({
		width : '172',
		height : '23',
		top : '19',
		left : '32',
		backgroundColor : 'transparent',
		text : 'Venue Details',
		font : {
			fontSize : "24",
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		}
	});
	detailView.add(detailTitleText);

	var venueAddress = "<div>" + venueObj['AddressLine1'] + "</div><div>" + venueObj['Town'] + ", " + venueObj['Country'] + ",</div><div>" + venueObj['Postcode'] + "</div><div>Tel: " + venueObj['Tel'] + "</div>";
	var addressWV = Ti.UI.createWebView({
		html : '<div style="text-align:left;font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; line-height:18pts; font-size:14px;">' + venueAddress + '</div>',
		top : '52',
		left : '26',
		width : '200',
		height : '100',
		disableBounce : true,
	});
	detailView.add(addressWV);

	var urlText = 'Visit website';

	var urlLineAttr = Titanium.UI.iOS.createAttributedString({
		text : urlText,
	});

	// Underlines text
	urlLineAttr.addAttribute({
		type : Titanium.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
		value : Titanium.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		range : [0, urlText.length]
	});

	var urlLine = Titanium.UI.createLabel({
		color : '#2195be',
		font : {
			fontSize : '14',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		left : '32',
		top : '162',
		height : '18',
		attributedString : urlLineAttr,
	});

	detailView.add(urlLine);

	urlLine.addEventListener('click', function() {

		var urlWin = Titanium.UI.createWindow({
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

		urlWin.add(close);
		close.addEventListener('click', function(e) {
			urlWin.close();
		});

		var websiteContainer = Ti.UI.createView({
			width : '80%',
			height : '80%',
			top : '10%',
			left : '10%',
		});

		var webview = Titanium.UI.createWebView({
			url : venueObj['URL'],
		});

		websiteContainer.add(webview);

		urlWin.add(websiteContainer);
		urlWin.open();

	});

	var emailText = 'Email this venue';
	var emailLineAttr = Titanium.UI.iOS.createAttributedString({
		text : emailText,
	});

	// Underlines text
	emailLineAttr.addAttribute({
		type : Titanium.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
		value : Titanium.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		range : [0, emailText.length]
	});

	var emailLine = Titanium.UI.createLabel({
		text : emailText,
		color : '#2195be',
		font : {
			fontSize : '14',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		left : '32',
		top : '180',
		height : '18',
		attributedString : emailLineAttr
	});

	detailView.add(emailLine);

	emailLine.addEventListener('click', function() {

		var createEmailer = require('/builders/createEmailer');
		var emailer = createEmailer(null, venueObj['Email'], null, null, venueObj['VenueName'], null, null, null, null);

		//Open window
		var emailerWin = Titanium.UI.createWindow({
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

		emailerWin.add(close);
		close.addEventListener('click', function(e) {
			emailerWin.close();
		});

		var websiteContainer = Ti.UI.createView({
			width : '80%',
			height : '80%',
			top : '10%',
			left : '10%',
		});

		websiteContainer.add(emailer);

		emailerWin.add(websiteContainer);
		emailerWin.open();
	});

	var venueCapcityText = "<div style='width:195px'>Max catering capacity<span style='float:right;font-weight:bold'>" + venueObj['MaxCateringCapacity'] + "</span></div>";
	venueCapcityText += "<div style='width:195px'>Max meeting capacity<span style='float:right;font-weight:bold'>" + venueObj['MaxMeetingCapacity'] + "</span></div>";
	venueCapcityText += "<div style='width:195px'>Number of meeting rooms<span style='float:right;font-weight:bold'>" + venueObj['MeetingRoomsNo'] + "</span></div>";
	venueCapcityText += "<div style='width:195px'>Number of bedrooms<span style='float:right;font-weight:bold'>" + venueObj['BedroomsNo'] + "</span></div>";

	var capacityWV = Ti.UI.createWebView({
		html : '<div style="left:0px;text-align:left;font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:13px; line-height:22pts;">' + venueCapcityText + '</div>',
		top : '208',
		left : '25',
		width : '210',
		height : '100',
		disableBounce : true,
	});
	detailView.add(capacityWV);

	return detailView;
}

function createVirtualTour(venueObj) {
	var virtualTourView = Ti.UI.createView({
		width : '175',
		height : '130',
		top : '483',
		left : '256',
	});

	var virtualText = Titanium.UI.createLabel({
		width : '175',
		height : '20',
		top : '0',
		left : '7',
		text : 'Virtual Tours',
		font : {
			fontSize : "24",
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		}
	});

	virtualTourView.add(virtualText);

	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var virtualImageURL;
	var getMedia = db.execute("SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID='" + venueObj['VenueID'] + "' AND (OptionCode='MIL' OR OptionCode = 'PIC' ) ORDER BY OrderKey, GraphicFileName DESC");
	var picCount = getMedia.rowCount;
	var imgCount = 0;
	while (getMedia.isValidRow()) {
		imgCount++;
		if (picCount > 1) {
			if (imgCount == 2) {
				virtualImageURL = getMedia.fieldByName('GraphicFileName');
				break;
			}
		} else {
			virtualImageURL = getMedia.fieldByName('GraphicFileName');
		}
		getMedia.next();
	}
	db.close();

	var virtualImageContainer = Ti.UI.createScrollView({
		width : '178',
		height : '105',
		top : '38',
		left : '0',
		borderRadius : '0',
		contentWidth : Ti.UI.FILL,
		contentHeight : Ti.UI.FILL,
		scrollingEnabled : false,
		backgroundColor : 'transparent',
	});

	var virtualImage = Titanium.UI.createImageView({
		image : 'http://www.venuefinder.com/adverts/' + virtualImageURL,
		defaultImage : '/images/icon.png',
		width : "auto",
		height : Ti.UI.FILL,
		left : '1',
		top : 0,
	});
	virtualImageContainer.add(virtualImage);
	virtualTourView.add(virtualImageContainer);

	return virtualTourView;
}

function videoArea(venueObj) {

	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var getMedia = db.execute("SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID=" + venueObj['VenueID'] + " AND OptionCode='VID' AND URL IS NOT NULL ORDER BY OrderKey ASC");
	var videoURL;
	while (getMedia.isValidRow()) {
		var videoURL = getMedia.fieldByName('URL');
		var videoImage = getMedia.fieldByName('GraphicFileName');
		break;
	}
	db.close();
	if (videoURL != null) {
		var videoView = Ti.UI.createView({
			width : '248',
			height : '193',
			top : '330',
			left : '512',
		});

		var VideoText = Titanium.UI.createLabel({
			width : '175',
			height : '20',
			top : '0',
			left : '7',
			text : 'Video',
			font : {
				fontSize : "24",
				fontFamily : Ti.App.Properties.getString('fontFamily'),
			}
		});

		videoView.add(VideoText);

		var virtualImage = Titanium.UI.createImageView({
			image : 'http://www.venuefinder.com/adverts/' + videoImage,
			defaultImage : '/images/icon.png',
			width : "auto",
			height : 164,
			top : '29',
			left : '0',
		});
		videoView.add(virtualImage);

		virtualImage.addEventListener('click', function() {
		
		
			//Open window
			var videoWin = Titanium.UI.createWindow({
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

			videoWin.add(close);
			close.addEventListener('click', function(e) {
				videoWin.close();
			});

			var videoContainer = Ti.UI.createView({
				width : '80%',
				height : '80%',
				top : '10%',
				left : '10%',
			});

			var videolWV = Titanium.UI.createWebView({
				url : videoURL,
				//width : 'auto',
				//width : Ti.UI.FILL,
				width : '80%',
				height : '80%',
				top : '10%',
				left : '10%',
			});

			//videoContainer.add(videolWV);

			videoWin.add(videolWV);
			videoWin.open();
		});

		return videoView;

	} else {
		return null;
	}
}

function nearByAttraction(venueObj) {

	var nearByView = Ti.UI.createView({
		width : '120',
		height : '197',
		top : '324',
		left : '786',
	});

	var nearByText = Titanium.UI.createLabel({
		width : '120',
		height : '65',
		top : '0',
		left : '0',
		text : 'Nearby Attractions',
		font : {
			fontSize : "24",
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		}
	});

	nearByView.add(nearByText);

	var attractionDesc = 'Attractions Info 1 Attractions Info 2 Attractions Info 3 Attractions Info 4 Attractions Info 5 Attractions Info 6';
	/*var nearByWV = Ti.UI.createWebView({
	 html : '<div style="left:0px;text-align:left;font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:12px; line-height:20pts;">' + attractionDesc + '</div>',
	 top : '55',
	 left : '0',
	 width : '110',
	 height : '139',
	 disableBounce : true,
	 });
	 */
	var nearByWV = Ti.UI.createScrollView({
		top : '58',
		left : '0',
		width : '120',
		height : '139',
		disableBounce : true,
		contentHeight : 'auto',
		contentWidth : '110',
		layout : 'vertical',
		showVerticalScrollIndicator : true,
	});

	var hasLeisure = true;
	var hasFacility = true;

	if (Ti.Network.online) {

		var createDatabase = require('/builders/databaseFunctions/createDatabase');
		var db = createDatabase('/venuefinder.db', 'venuefinder');
		var getDetails = db.execute('SELECT * FROM Venue WHERE VenueID="' + venueObj['VenueID'] + '"');
		var title = getDetails.fieldByName('VenueName');
		var town = getDetails.fieldByName('Town');
		var country = getDetails.fieldByName('Country');

		if (town != '' && town != null) {
			var town = town + ', ';
		} else {
			var town = '';
		}
		if (county != '' && county != null) {
			var county = county + ', ';
		} else {
			var county = '';
		}

		var data = [];

		var xhr2 = Ti.Network.createHTTPClient();

		xhr2.open("GET", "http://venuefindermobile.live.x-rm.com/webapi-v1/api/venue/" + venueObj['VenueID'] + "/leisurefacilities");
		xhr2.setRequestHeader('Accept', 'application/xml');
		xhr2.onload = function() {
			try {
				var doc = this.responseXML.documentElement;
				var items = doc.getElementsByTagName("LeisureFacility");

				if (items.length == 0) {
					hasLeisure = false;
				} else {

					var x = 0;

					var title_desc = Titanium.UI.createLabel({
						text : 'Leisure Facilities',
						color : '#2195be',
						font : {
							fontSize : '14',
							fontFamily : Ti.App.Properties.getString('fontFamily'),
							fontWeight : 'bold'
						},
						top : '10',
						left : '0',
					});

					nearByWV.add(title_desc);

					for (var c = 0; c < items.length; c++) {
						var item = items.item(c);

						var desc = item.getElementsByTagName("Description").item(0).text;
						var iD = item.getElementsByTagName("ID").item(0).text;
						var nearby = item.getElementsByTagName("Nearby").item(0).text;
						var onSite = item.getElementsByTagName("OnSite").item(0).text;

						var desc_cap = Titanium.UI.createLabel({
							text : desc,
							color : '#666',
							font : {
								fontSize : '12',
								fontFamily : Ti.App.Properties.getString('fontFamily'),
							},
							left : '0',
							//top : '0pts',
							//left : '5%'
						});

						nearByWV.add(desc_cap);
					}

				}

			} catch(E) {
				alert(E);
			}
		};

		xhr2.send();

		var xhr3 = Ti.Network.createHTTPClient();
		xhr3.open("GET", "http://venuefindermobile.live.x-rm.com/webapi-v1/api/venue/" + venueObj['venueID'] + "/hotelfacilities");
		xhr3.setRequestHeader('Accept', 'application/xml');
		xhr3.onload = function() {
			try {
				var doc = this.responseXML.documentElement;
				var items = doc.getElementsByTagName("HotelFacility");
				if (items.length == 0) {
					hasFacility = false;
				} else {

					var x = 0;
					var title_desc = Titanium.UI.createLabel({
						text : 'Venue Facilities',
						color : '#2195be',
						font : {
							fontSize : '14',
							fontFamily : 'Arial',
							fontWeight : 'bold'
						},
						left : '0',
						top : '10pts',
						//left : '5%'
					});

					nearByWV.add(title_desc);

					for (var c = 0; c < items.length; c++) {
						var item = items.item(c);

						var desc = item.getElementsByTagName("Name").item(0).text;

						var desc_cap = Titanium.UI.createLabel({
							text : desc,
							color : '#666',
							font : {
								fontSize : '12',
								fontFamily : Ti.App.Properties.getString('fontFamily'),
							},
							left : '0',
							//top : '0pts',
							//left : '5%'
						});

						nearByWV.add(desc_cap);

					}

				}

				if (hasFacility == false && hasLeisure == false) {

					//nearByWV.removeAllChildren();
					//nearByWV.add(title);
					//nearByWV.add(subTitle);

					var noResults = Titanium.UI.createLabel({
						text : 'Sorry, we could not find any facilities information for this venue',
						color : '#666',
						font : {
							fontSize : '12',
							fontFamily : Ti.App.Properties.getString('fontFamily'),
						},
						left : '0',
						//top : '10pts',
						//left : '5%',
						//width : '905'
					});

					nearByWV.add(noResults);

				}

			} catch(E) {
				alert(E);
			}
		};

		xhr3.send();

	}

	nearByView.add(nearByWV);

	return nearByView;
}

function seeMoreInfoButton() {
	var seeMoreButton = Ti.UI.createButton({
		width : '391',
		height : '61',
		right : '38',
		bottom : '45',
		title : 'See more information on venuefinder.com',
		backgroundColor : '#399ad4',
		color : '#FFFFFF',
		font : {
			fontSize : "18",
		}
	});

	seeMoreButton.addEventListener('click', function() {

		//Open window
		var websiteWin = Titanium.UI.createWindow({
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

		websiteWin.add(close);
		close.addEventListener('click', function(e) {
			websiteWin.close();
		});

		var websiteContainer = Ti.UI.createView({
			width : '80%',
			height : '80%',
			top : '10%',
			left : '10%',
		});

		var websiteWV = Titanium.UI.createWebView({
			url : 'http://www.venuefinder.com',
		});

		websiteContainer.add(websiteWV);

		websiteWin.add(websiteContainer);
		websiteWin.open();
	});

	return seeMoreButton;

}

function createVenueDetailSide4(venueObj) {

	var venueDetail4View = Ti.UI.createView({
		width : '245',
		height : '252',
		top : '53',
		left : '511',
		backgroundColor : '#dededc',
	});

	var venueDetail4Text = Titanium.UI.createLabel({
		width : '245',
		height : '18',
		top : '17',
		left : '14',
		backgroundColor : 'transparent',
		text : 'Venue Details',
		font : {
			fontSize : "24",
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		}
	});

	venueDetail4View.add(venueDetail4Text);

	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var getMedia = db.execute("SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID='" + venueObj['VenueID'] + "' AND (OptionCode='MIL' OR OptionCode = 'PIC' ) ORDER BY OrderKey, GraphicFileName DESC");
	var count = 0;
	var vdImageUrl;
	while (getMedia.isValidRow()) {
		count++;
		if (count > 2) {
			vdImageUrl = getMedia.fieldByName('GraphicFileName');
			break;
		}
		getMedia.next();
	}
	db.close();
	var venueDetail4ImageContainer = Ti.UI.createScrollView({
		width : '216',
		height : '158',
		top : '48',
		left : '14',
		borderRadius : '0',
		contentWidth : Ti.UI.FILL,
		contentHeight : Ti.UI.FILL,
		scrollingEnabled : false,
		backgroundColor : 'transparent',
	});
	var venueDetail4Image = Titanium.UI.createImageView({
		image : 'http://www.venuefinder.com/adverts/' + vdImageUrl,
		defaultImage : '/images/icon.png',
		width : "auto",
		height : Ti.UI.FILL,
		left : 0,
		top : 0,
	});
	venueDetail4ImageContainer.add(venueDetail4Image);
	venueDetail4View.add(venueDetail4ImageContainer);

	var venueDetail4Subtitle = Titanium.UI.createLabel({
		width : '217',
		height : '52',
		top : '200',
		left : '14',
		backgroundColor : 'transparent',
		text : 'Lorem ipsum dolor sit amet',
		font : {
			fontSize : "14",
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		}
	});

	venueDetail4View.add(venueDetail4Subtitle);

	return venueDetail4View;

}

function createGallery(venueID) {

	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var getMedia = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID=' + venueID + ' AND (OptionCode = \'TOP\' OR OptionCode = \'PIC\') ORDER BY OptionCode, OrderKey, GraphicFileName DESC');
	var imageArray = [];

	var galleryView = Ti.UI.createView({
		width : 406,
		height : 348,
		left : 30,
		top : 52,
	});

	var imgCount = 0;
	while (getMedia.isValidRow()) {
		var mediaType = getMedia.fieldByName('OptionCode');
		var mediaURL = getMedia.fieldByName('GraphicFileName');

		if (imgCount == 0) {
			var imgContainer = Ti.UI.createScrollView({
				width : '266',
				height : '230',
				top : '0',
				left : '0',
				borderRadius : '0',
				contentWidth : Ti.UI.FILL,
				contentHeight : Ti.UI.FILL,
				scrollingEnabled : false,
			});
			var topImage = Titanium.UI.createImageView({
				image : 'http://www.venuefinder.com/adverts/' + mediaURL,
				defaultImage : '/images/icon.png',
				index : imgCount,
				width : Ti.UI.FILL,
				height : Ti.UI.FILL,
				left : 0,
				top : 0,
			});

			topImage.addEventListener('click', function(e) {
				var imageGallery = createImageGallery(null, imageArray, e.source.index);
			});

			imgContainer.add(topImage);

			galleryView.add(imgContainer);
		} else {
			var imgTop = 10;
			var imgLeft = 10;
			if (imgCount == 1) {
				imgTop = 0;
				imgLeft = 278;
			} else if (imgCount == 2) {
				imgTop = 118 + 4;
				imgLeft = 278;
			} else if (imgCount == 3) {
				imgTop = 242;
				imgLeft = 0;
			} else if (imgCount == 4) {
				imgTop = 242;
				imgLeft = 140;
			} else if (imgCount == 5) {
				imgTop = 242;
				imgLeft = 280;
			}

			var imgContainer = Ti.UI.createScrollView({
				width : '128',
				height : '106',
				top : imgTop,
				left : imgLeft,
				borderRadius : '0',
				contentWidth : Ti.UI.FILL,
				contentHeight : Ti.UI.FILL,
				scrollingEnabled : false,
			});

			var imageView = Titanium.UI.createImageView({
				image : 'http://www.venuefinder.com/adverts/' + mediaURL,
				defaultImage : '/images/icon.png',
				index : imgCount,
				width : Ti.UI.FILL,
				height : Ti.UI.FILL,
				left : 0,
				top : 0,
			});

			imageView.addEventListener('click', function(e) {
				var imageGallery = createImageGallery(null, imageArray, e.source.index);
			});
			imgContainer.add(imageView);
			galleryView.add(imgContainer);
		}
		imgCount++;
		imageArray.push('http://www.venuefinder.com/adverts/' + mediaURL);
		getMedia.next();
		if (imgCount == 6) {
			break;
		}
	}
	db.close();
	return galleryView;
}

function createGoldSide2(page, venueID) {

	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');

	//Gallery
	var getMedia = db.execute("SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID='" + venueID + "' AND (OptionCode='MIL' OR OptionCode = 'PIC' ) ORDER BY OrderKey, GraphicFileName ASC");
	var picCount = 0;
	var imageArray = [];
	var imgCount = 0;

	var galleryView = Ti.UI.createView({
		width : 270,
		height : 348,
		right : 170,
		top : 52,
		layout : "horizontal",
	});

	while (getMedia.isValidRow()) {

		var mediaType = getMedia.fieldByName('OptionCode');
		var mediaURL = getMedia.fieldByName('GraphicFileName');
		var videoURL = getMedia.fieldByName('URL');

		var imgW, imgH, imgT, imgL;

		if (mediaType == 'MIL' || mediaType == 'PIC') {
			/*if (mediaType == 'PIC') {
			 //Add pic
			 picCount++;
			 if (picCount < 6) {
			 continue;
			 }
			 }
			 */

			if (imgCount == 0) {
				imgW = 128;
				imgH = 106;
				imgL = 0;
				imgT = 0;
			} else if (imgCount == 1) {
				imgW = 128;
				imgH = 106;
				imgL = 14;
				imgT = 0;
			} else if (imgCount == 2) {
				imgW = 270;
				imgH = 230;
				imgL = 0;
				imgT = 17;
			}
			var imgContainer = Ti.UI.createScrollView({
				width : imgW,
				height : imgH,
				top : imgT,
				left : imgL,
				borderRadius : '0',
				contentWidth : Ti.UI.FILL,
				contentHeight : Ti.UI.FILL,
				scrollingEnabled : false,
			});

			var venueImage = Titanium.UI.createImageView({
				image : 'http://www.venuefinder.com/adverts/' + mediaURL,
				defaultImage : '/images/icon.png',
				index : imgCount,
				width : Ti.UI.FILL,
				height : Ti.UI.FILL,
				left : 0,
				top : 0,
			});
			imgContainer.add(venueImage);
			galleryView.add(imgContainer);

			imageArray.push(venueImage.image);

			venueImage.addEventListener('click', function(e) {
				var imageGallery = createImageGallery(null, imageArray, e.source.index);
			});

			imgCount++;
		}
		getMedia.next();
	}

	var desRow = db.execute('SELECT DescriptionText FROM VenueTextForWeb WHERE VenueID="' + venueID + '"');
	var descText;
	while (desRow.isValidRow()) {
		descText = desRow.fieldByName('DescriptionText');
		desRow.next();
	}

	if (descText == null || descText == '') {
		descText = 'No description could be retrieved for this venue.';
	}

	descText.replace('/<(?:.|\n)*?>/gm', '');

	var descriptionWV = Titanium.UI.createWebView({
		html : '<span style="font-family:Arial; color:#000; font-size:14px; line-height:20pts; font-size:15px;">' + descText + '</span>',
		width : '270',
		height : '180',
		bottom : '31',
		right : '170',
	});

	page.add(descriptionWV);

	page.add(createHeaderElements.createFeaturedButtons(venueID, page, windowsArray));

	var offerBtn = createHeaderElements.createSpeOfferBtn(venueID);

	if (offerBtn != null) {
		page.add(offerBtn);
	}

	db.close();
	return galleryView;
}