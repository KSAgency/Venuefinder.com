var createImageGallery = require('views/collview/ImageGallery/createImageGallery');
var createHeaderElements = require('/views/collview/listingElements/createHeaderElementsios');

var createDatabase = require('/builders/databaseFunctions/createDatabase');
var dbUtil = require('/builders/databaseFunctions/dbUtil');

function createDetailPage(thisVenueId, loadList, currentWin, windowsArray) {
	var view;

	if(currentWin[2]){
		currentWin = currentWin[2];
		view = 'map';
	}
	
	var venueObj = dbUtil.getVenueForId(thisVenueId);

	var nextVenueId;
	var previousVenueId;
	
	for (var i=0; i < loadList.length; i++) {
		if(thisVenueId == loadList[i]['venueID']){
			if (loadList[i+1]){
				nextVenueId = loadList[i+1]['venueID'];
			} else {
				nextVenueId = '0';
			}
			
			if (loadList[i-1]){
				previousVenueId = loadList[i-1]['venueID'];
			} else {
				previousVenueId = '0';
			}
		}
	};

	var page1 = createGold1(venueObj, currentWin, windowsArray);
	page1.setTop(0);
	page1.setLeft(0);

	var page2 = createGold2(venueObj, currentWin, windowsArray);
	page2.setTop(0);
	page2.setLeft(0);

	var goldDetailScroll = Ti.UI.createScrollableView({
		width:'938',
		height:'720',
		top:20,
		layout:'horizontal',
		showPagingControl:true,
		pagingControlColor:'transparent',
		views:[page1, page2],
	});
	
	//Buttons
	
	var next = Ti.UI.createImageView({
		image:'/images/pageTurnButton',
		width:'34',
		right:'0',
	});

	if (nextVenueId != '0' && view!='map'){
		currentWin.add(next);
	}
	
	var previous = Ti.UI.createImageView({
		image:'/images/pageTurnButton',
		width:'34',
		left:'0',
		transform:Ti.UI.create2DMatrix({rotate:180})
	});

	if (previousVenueId != '0' && view!='map'){
		currentWin.add(previous);
	}
	
	next.addEventListener('click', function(){
		var nextPackage = dbUtil.getVenueForId(nextVenueId)['PackageCode'];
		
		if (goldDetailScroll.currentPage == 0){
			goldDetailScroll.setCurrentPage(1);
		} else {
			if (nextPackage == 'GLD') {
				currentWin.remove(goldDetailScroll);
				currentWin.remove(next);
				currentWin.remove(previous);
				var venueDetailPage = require('/views/collview/venueDetailPages/createGoldPage');
				var goldPage = venueDetailPage.createDetailPage(nextVenueId, loadList, currentWin, windowsArray);
				currentWin.add(goldPage);
			} else if (nextPackage == 'SIL') {
				currentWin.remove(goldDetailScroll);
				currentWin.remove(next);
				currentWin.remove(previous);
				var venueDetailPage = require('/views/collview/venueDetailPages/createSilverPage');
				var silverPage = venueDetailPage.createDetailPage(nextVenueId, loadList, currentWin, windowsArray);
				currentWin.add(silverPage);
			} else if (nextPackage == 'PRE') {
				currentWin.remove(goldDetailScroll);
				currentWin.remove(next);
				currentWin.remove(previous);
				var venueDetailPage = require('/views/collview/venueDetailPages/createBronzePage');
				var bronzePage = venueDetailPage.createDetailPage(nextVenueId, loadList, currentWin, windowsArray);
				currentWin.add(bronzePage);
			}
		}
		
	});
	
	previous.addEventListener('click', function(){
		var previousPackage = dbUtil.getVenueForId(previousVenueId)['PackageCode'];
		
		if (goldDetailScroll.currentPage == 1){
			goldDetailScroll.setCurrentPage(0);
		} else {
			if (previousPackage == 'GLD') {
				currentWin.remove(goldDetailScroll);
				currentWin.remove(next);
				currentWin.remove(previous);
				var venueDetailPage = require('/views/collview/venueDetailPages/createGoldPage');
				var goldPage = venueDetailPage.createDetailPage(previousVenueId, loadList, currentWin, windowsArray);
				currentWin.add(goldPage);
			} else if (previousPackage == 'SIL') {
				currentWin.remove(goldDetailScroll);
				currentWin.remove(next);
				currentWin.remove(previous);
				var venueDetailPage = require('/views/collview/venueDetailPages/createSilverPage');
				var silverPage = venueDetailPage.createDetailPage(previousVenueId, loadList, currentWin, windowsArray);
				currentWin.add(silverPage);
			} else if (previousPackage == 'PRE') {
				currentWin.remove(goldDetailScroll);
				currentWin.remove(next);
				currentWin.remove(previous);
				var venueDetailPage = require('/views/collview/venueDetailPages/createBronzePage');
				var bronzePage = venueDetailPage.createDetailPage(previousVenueId, loadlist, currentWin, windowsArray);
				currentWin.add(bronzePage);
			}
		}
		
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
		var postcode = venueObj['Postcode'];
		postcode = postcode.split(' ');
		location = location + ' ' + postcode[0];
	}

	var townPostcode = Ti.UI.createLabel({
		color:'#000000',
		top:'6',
		right:'18',
		font:{
			fontSize:'14',
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		},
		text:location,
		width:'300',
		height:'35',
		textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT,
	});
	
	page1.add(townPostcode);

	page1.add(createGallery(venueObj['VenueID']));

	//Title & Location
	
	var titleCont = Ti.UI.createView({
		top:'450',
		left:'66',
		width:Ti.UI.SIZE,
		height:Ti.UI.FILL,
		layout:'vertical'
	});

	var titleLbl = Titanium.UI.createLabel({
		text:venueObj['VenueName'],
		ellipsize:true,
		color:'#000000',
		top:0,
		width:400,
		left:0,
		height:Ti.UI.SIZE,
		font:{
			fontSize:'28',
		}
	});

	var locationLbl = Titanium.UI.createLabel({
		text:venueObj['Town'] + ', ' + venueObj['Country'],
		ellipsize:true,
		color:'#000000',
		width:420,
		top:5,
		left:0,
		font:{
			fontSize:'24',
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		}
	});
	
	titleCont.add(titleLbl);
	titleCont.add(locationLbl);

	//logo
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var logoMedia = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID=' + venueObj['VenueID'] + ' AND (OptionCode=\'LG1\' OR OptionCode = \'GR1\') ORDER BY OptionCode DESC');
	
	var logoContainer = Ti.UI.createView({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		top:20,
		left:-10,
		borderRadius:'0',
		layout:'horizontal'
	});
	
	while (logoMedia.isValidRow()) {
		
		var logoImage = Titanium.UI.createImageView({
			image:'http://www.venuefinder.com/adverts/' + logoMedia.fieldByName('GraphicFileName'),
			defaultImage:'/images/icon.png',
			width:100,
			left:10
		});

		logoContainer.add(logoImage);

		logoMedia.next();
	}
	
	db.close();
	
	titleCont.add(logoContainer);
	page1.add(titleCont);

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
		var postcode = venueObj['Postcode'];
		postcode = postcode.split(' ');
		location = location + ' ' + postcode[0];
	}

	var townPostcode = Ti.UI.createLabel({
		color:'#000000',
		top:'6',
		//left:'768',
		right:'18',
		font:{
			fontSize:'14',
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		},
		text:location,
		width:'300',
		height:'35',
		textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT,
	});
	
	page.add(townPostcode);

	//Title
	
	var titleContainer = Ti.UI.createView({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		left:40,
		top:70,
		layout:'vertical'
	});
	
	var titleLbl = Titanium.UI.createLabel({
		text:venueObj['VenueName'],
		ellipsize:true,
		color:'#000000',
		width:420,
		font:{
			fontSize:"28",
		}
	});
	
	page.add(titleLbl);

	//Venue location
	var locationLbl = Titanium.UI.createLabel({
		text:venueObj['Town'] + ", " + venueObj['Country'],
		ellipsize:true,
		color:'#000000',
		width:420,
		top:0,
		font:{
			fontSize:"24",
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		}
	});
	
	titleContainer.add(titleLbl);
	titleContainer.add(locationLbl);
	
	if (titleContainer.toImage().height >= '70'){
		titleContainer.setTop(50);	
	}
	
	page.add(titleContainer);

	page.add(createCateringArea(venueObj['VenueID']));

	page.add(createHeaderElements.createFeaturedButtons(venueObj['VenueID'], page, windowsArray));

	page.add(createVenueDetailSide3(venueObj));

	page.add(nearByAttraction(venueObj));

	page.add(seeMoreInfoButton(venueObj));

	page.add(createVenueDetailSide4(venueObj));

	var videoView = videoArea(venueObj);
	if (videoView != null) {
		page.add(videoView);
	}
	
	page.add(vtArea(venueObj));

	db.close();

	return page;
}

function createCateringArea(venueID) {

	var cateringView = Ti.UI.createView({
		width:'232',
		height:'450',
		top:'165',
		left:'0',
		backgroundColor:'#dededc',
		layout:'vertical'
	});
	
	var cateringText = Titanium.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		top:20,
		left:40,
		backgroundColor:'transparent',
		text:'Catering',
		font:{
			fontSize:"24",
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		}
	});

	cateringView.add(cateringText);

	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var getMedia = db.execute("SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID='" + venueID + "' AND (OptionCode='TOP' OR OptionCode='PIC') ORDER BY OrderKey, GraphicFileName DESC");
	if (getMedia.isValidRow()) {
		
		var cateringImageContainer = Ti.UI.createView({
			width:170,
			height:120,
			left:40,
			top:10,
		});
	
		var cateringImage = Titanium.UI.createImageView({
			image:'http://www.venuefinder.com/adverts/' + getMedia.fieldByName('GraphicFileName'),
			defaultImage:'/images/icon.png'
		});
		
		var imageResize = require('/builders/imageResize');
		imageResize(cateringImage, cateringImageContainer);
		
		cateringImageContainer.add(cateringImage);
		cateringView.add(cateringImageContainer);
		
	}

	var desRow = db.execute('SELECT Restaurants FROM Venue WHERE VenueID="' + venueID + '"');
	var descText;
	while (desRow.isValidRow()) {
		descText = desRow.fieldByName('Restaurants');
		desRow.next();
	}

	if (descText == null || descText == '') {
		descText = 'No catering information has been received for this venue.';
	}

	descText.replace('/<(?:.|\n)*?>/gm', '');

	//var descText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
	var descriptionWV = Titanium.UI.createWebView({
		html:'<span style="font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:14px; line-height:20pts; font-size:15px;">' + descText + '</span>',
		top:10,
		width:176,
		left:35,
		backgroundColor:'transparent',
		disableBounce:true,
	});

	cateringView.add(descriptionWV);

	db.close();
	
	return cateringView;
	
}

function createVenueDetailSide3(venueObj) {
	var detailView = Ti.UI.createView({
		width:'232',
		height:'450',
		top:'165',
		left:'232',
	});

	var detailTitleText = Titanium.UI.createLabel({
		width:'172',
		height:'23',
		top:'19',
		left:'32',
		backgroundColor:'transparent',
		text:'Venue Details',
		font:{
			fontSize:"24",
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		}
	});
	detailView.add(detailTitleText);
	
	var telNum;

	if (venueObj['Country'] == 'England' || venueObj['Country'] == 'Scotland' || venueObj['Country'] == 'Northern Ireland' || venueObj['Country'] == 'Wales'){
		telNum = venueObj['Tel'];
	} else {
		telNum = '+44 (0)1780 484498';
	}

	var venueAddress = "<div>" + venueObj['AddressLine1'] + "</div><div>" + venueObj['Town'] + ", " + venueObj['Country'] + ",</div><div>" + venueObj['Postcode'] + "</div><div>Tel: " + telNum + "</div>";
	var addressWV = Ti.UI.createWebView({
		html:'<div style="text-align:left;font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; line-height:18pts; font-size:14px;">' + venueAddress + '</div>',
		top:'52',
		left:'26',
		width:'200',
		height:'100',
		disableBounce:true,
	});
	detailView.add(addressWV);

	var urlText = 'Visit website';

	var urlLineAttr = Titanium.UI.iOS.createAttributedString({
		text:urlText,
	});

	// Underlines text
	urlLineAttr.addAttribute({
		type:Titanium.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
		value:Titanium.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		range:[0, urlText.length]
	});

	var urlLine = Titanium.UI.createLabel({
		color:'#2195be',
		font:{
			fontSize:'14',
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		},
		left:'32',
		top:'180',
		height:'18',
		attributedString:urlLineAttr,
	});

	detailView.add(urlLine);

	urlLine.addEventListener('click', function() {

		var urlWin = Titanium.UI.createWindow({
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

		urlWin.add(close);
		close.addEventListener('click', function(e) {
			urlWin.close();
		});

		var websiteContainer = Ti.UI.createView({
			width:'80%',
			height:'80%',
			top:'10%',
			left:'10%',
		});

		var webview = Titanium.UI.createWebView({
			url:venueObj['URL'],
		});

		websiteContainer.add(webview);

		urlWin.add(websiteContainer);
		urlWin.open();

	});

	var emailText = 'Email this venue';
	var emailLineAttr = Titanium.UI.iOS.createAttributedString({
		text:emailText,
	});

	// Underlines text
	emailLineAttr.addAttribute({
		type:Titanium.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
		value:Titanium.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		range:[0, emailText.length]
	});

	var emailLine = Titanium.UI.createLabel({
		text:emailText,
		color:'#2195be',
		font:{
			fontSize:'14',
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		},
		left:'32',
		top:'152',
		height:'18',
		attributedString:emailLineAttr
	});

	detailView.add(emailLine);

	emailLine.addEventListener('click', function() {

		var emailLink;

		if (venueObj['Country'] == 'England' || venueObj['Country'] == 'Scotland' || venueObj['Country'] == 'Northern Ireland' || venueObj['Country'] == 'Wales'){
			emailLink = venueObj['Email'];
		} else {
			emailLink = 'VenueFinder@trinityconferences.co.uk';
		}

		var createEmailer = require('/builders/createEmailer');
		var emailer = createEmailer(null, emailLink, null, null, venueObj['VenueName'], null, null, null, null);

		//Open window
		var emailerWin = Titanium.UI.createWindow({
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

		emailerWin.add(close);
		close.addEventListener('click', function(e) {
			emailerWin.close();
		});

		var websiteContainer = Ti.UI.createView({
			width:'80%',
			height:'80%',
			top:'10%',
			left:'10%',
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
		html:'<div style="left:0px;text-align:left;font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:13px; line-height:22pts;">' + venueCapcityText + '</div>',
		top:'208',
		left:'25',
		width:'210',
		height:'100',
		disableBounce:true,
	});
	detailView.add(capacityWV);

	return detailView;
}

function videoArea(venueObj) {

	var videoView = Ti.UI.createView({
		width:'248',
		height:'193',
		top:'330',
		left:'512',
		layout:'horizontal',
		horizontalWrap:true,
	});

	var VideoText = Titanium.UI.createLabel({
		width:Ti.UI.FILL,
		height:'20',
		top:'0',
		left:'7',
		text:'Video',
		touchEnabled:false,
		font:{
			fontSize:"24",
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		}
	});
	
	var videoArray = [];

	var imageResize = require('/builders/imageResize');
	
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var getMedia = db.execute("SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID=" + venueObj['VenueID'] + " AND OptionCode='VID' AND URL IS NOT NULL ORDER BY OrderKey ASC");
	while (getMedia.isValidRow()) {

		var videoCont = Ti.UI.createView({
			height:'248',
			width:'248',
			top:'29',
			left:'0',
			videoURL:getMedia.fieldByName('URL')
		});

		var virtualImage = Titanium.UI.createImageView({
			image:'http://www.venuefinder.com/adverts/' + getMedia.fieldByName('GraphicFileName'),
			defaultImage:'/images/icon.png',
			width:Ti.UI.SIZE,
			height:Ti.UI.SIZE,
			touchEnabled:false
		});
		
		var playIcon = Ti.UI.createImageView({
			image:'/images/play_video.png',
			width:'25%',
			opacity:0.75,
			top:'15%',
			touchEnabled:false
		});
		
		imageResize(virtualImage, videoCont);
		
		videoCont.add(virtualImage);
		videoCont.add(playIcon);
		videoArray.push(videoCont);
		
		getMedia.next();
		
	}
	
	db.close();

	if (videoArray.length > 0){
		videoView.add(VideoText);
	}

	if (videoArray.length > 1){
		
		VideoText.setText('Videos');
		
		for (var i=0; i < videoArray.length; i++) {
			
			if (i == 1 || i == 3){
				videoArray[i].setLeft(20);
			}

			videoArray[i].setWidth(videoArray[i].width/2-20);
			videoArray[i].setHeight(videoArray[i].height/2-20);
			
			imageResize(videoArray[i].children[0], videoArray[i]);
			
			videoArray[i].children[1].setTop('30%');
			
			videoView.add(videoArray[i]);

		};
	} else if (videoArray.length == 1) {
		videoView.add(videoArray[0]);
	}

	videoView.addEventListener('click', function(e) {
	
		//Open window
		var videoWin = Titanium.UI.createWindow({
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

		videoWin.add(close);
		
		close.addEventListener('click', function(e) {
			videoWin.close();
		});

		var videoContainer = Ti.UI.createView({
			width:'80%',
			height:'80%',
			top:'10%',
			left:'10%',
		});

		var videolWV = Titanium.UI.createWebView({
			url:e.source.videoURL,
			//width:'auto',
			//width:Ti.UI.FILL,
			width:'80%',
			height:'80%',
			top:'10%',
			left:'10%',
		});

		//videoContainer.add(videolWV);

		videoWin.add(videolWV);
		videoWin.open();
		
	});

	return videoView;

}

function vtArea(venueObj) {
	
	var vtView = Ti.UI.createView({
		width:'175',
		height:'130',
		top:'483',
		left:'256'
	});

    var checker = Ti.Network.createHTTPClient();

    checker.open('GET', 'http://venuefindermobile.live.x-rm.com/webapi-v1/api/venue/'+venueObj['VenueID']);
    checker.setRequestHeader('Accept', 'application/xml');
    checker.onload = function() {
        try {
            var doc = this.responseXML.documentElement;
            var items = doc.getElementsByTagName("HasVRTours").item(0).text;
            if (items == 'true'){
            	
            	var tourText = Titanium.UI.createLabel({
					width:'175',
					height:'20',
					top:'0',
					left:'7',
					text:'Virtual Tour',
					font:{
						fontSize:"24",
						fontFamily:Ti.App.Properties.getString('fontFamily'),
					}
				});
		
				vtView.add(tourText);
				
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
			
				var virtualTourPreview = Ti.UI.createImageView({
					image:'http://www.venuefinder.com/adverts/'+virtualImageURL,
					width:175,
					top:32,
					touchEnabled:false
				});
				
				vtView.add(virtualTourPreview);
		
				vtView.addEventListener('click', function() {		
					
					//Open window
					var virtualTourWin = Titanium.UI.createWindow({
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
		
					virtualTourWin.add(close);
					close.addEventListener('click', function(e) {
						virtualTourWin.close();
					});
		
					var virtualTourView = Titanium.UI.createWebView({
						url:'http://www.venuefinder.com/venues/vale_resort/v'+venueObj['VenueID']+'/virtual-tours-mobile/',
						width:'80%',
						height:'80%',
						top:'10%',
						left:'10%',
					});
			
					virtualTourWin.add(virtualTourView);
					virtualTourWin.open();
				});
            } 

        } catch(E) {
            alert(E);
        }
    };

    checker.send();
	
	return vtView;
	
}

function nearByAttraction(venueObj) {

	var nearByView = Ti.UI.createView({
		width:'120',
		height:'220',
		top:'324',
		left:'786',
	});

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

		xhr2.open("GET", "http://venuefindermobile.live.x-rm.com/webapi-v1/api/venue/" + venueObj['VenueID'] + "/attractions");
		xhr2.setRequestHeader('Accept', 'application/xml');
		xhr2.onload = function() {
			try {
				var doc = this.responseXML.documentElement;
				var items = doc.getElementsByTagName("Attraction");
				
				var nearByText = Titanium.UI.createLabel({
					width:'120',
					height:'65',
					top:'0',
					left:'0',
					text:'Nearby Attractions',
					font:{
						fontSize:"24",
						fontFamily:Ti.App.Properties.getString('fontFamily'),
					}
				});
				
				var nearByWV = Ti.UI.createScrollView({
					top:'64',
					left:'0',
					width:'120',
					height:'140',
					disableBounce:true,
					contentHeight:Ti.UI.SIZE,
					contentWidth:Ti.UI.SIZE,
					layout:'vertical',
					showVerticalScrollIndicator:true
				});

				if (items.length != 0) {

					for (var c = 0; c < items.length; c++) {
						var item = items.item(c);

						var desc = item.getElementsByTagName("Name").item(0).text;

						var desc_cap = Titanium.UI.createLabel({
							text:desc,
							color:'#666',
							font:{
								fontSize:'12',
								fontFamily:Ti.App.Properties.getString('fontFamily'),
							},
							left:'0',
							//top:'0pts',
							//left:'5%'
						});

						nearByWV.add(desc_cap);
						
					}
					
					if (nearByWV.children.length != 0){
						nearByView.add(nearByText);
						nearByView.add(nearByWV);
					}
					

				}

			} catch(E) {
				alert(E);
			}
		};

		xhr2.send();

	}

	return nearByView;
}

function seeMoreInfoButton(venueObj) {
	var seeMoreButton = Ti.UI.createButton({
		width:'391',
		height:'61',
		right:'38',
		bottom:'45',
		title:'See more information on venuefinder.com',
		backgroundColor:'#399ad4',
		color:'#FFFFFF',
		font:{
			fontSize:"18",
		}
	});

	seeMoreButton.addEventListener('click', function() {

		//Open window
		var websiteWin = Titanium.UI.createWindow({
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

		websiteWin.add(close);
		close.addEventListener('click', function(e) {
			websiteWin.close();
		});

		var websiteContainer = Ti.UI.createView({
			width:'80%',
			height:'80%',
			top:'10%',
			left:'10%',
		});

		var websiteWV = Titanium.UI.createWebView({
			url:'http://www.venuefinder.com/venues/venue_name/v'+venueObj['VenueID'],
		});

		websiteContainer.add(websiteWV);

		websiteWin.add(websiteContainer);
		websiteWin.open();
	});

	return seeMoreButton;

}

function createVenueDetailSide4(venueObj) {

	var venueImageView = Ti.UI.createView({
		width:'245',
		height:'252',
		top:'80',
		left:'511',
		layout:'vertical'
	});

	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var getMedia = db.execute("SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID='" + venueObj['VenueID'] + "' AND (OptionCode='MIL' OR OptionCode = 'PIC' ) ORDER BY Text DESC");
	var count = 0;
	var vdImageUrl;
	var altText;
	if (getMedia.isValidRow()) {
			vdImageUrl = getMedia.fieldByName('GraphicFileName');
			altText = getMedia.fieldByName('Text');
	}
	db.close();
	var venueImageContainer = Ti.UI.createView({
		width:'245',
		height:'158',
		top:'0'
	});
	var venueImage = Titanium.UI.createImageView({
		image:'http://www.venuefinder.com/adverts/' + vdImageUrl,
		defaultImage:'/images/icon.png',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
	});
	
	var imageResize = require('/builders/imageResize');
		imageResize(venueImage, venueImageContainer);
	
	venueImageContainer.add(venueImage);
	venueImageView.add(venueImageContainer);

	var venueImageSubtitle = Titanium.UI.createLabel({
		width:'245',
		height:Ti.UI.SIZE,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		top:'10',
		color:'#000',
		text:altText,
		font:{
			fontSize:"14",
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		},
	});

	venueImageView.add(venueImageSubtitle);

	return venueImageView;

}

function createGallery(venueID) {

	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var getMedia = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID=' + venueID + ' AND (OptionCode = \'TOP\' OR OptionCode = \'PIC\') ORDER BY OptionCode, OrderKey, GraphicFileName DESC LIMIT 6');
	var imageArray = [];

	var galleryView = Ti.UI.createView({
		width:406,
		height:348,
		left:30,
		top:52,
	});

	var imgCount = 0;
	while (getMedia.isValidRow()) {
		var mediaType = getMedia.fieldByName('OptionCode');
		var mediaURL = getMedia.fieldByName('GraphicFileName');

		if (imgCount == 0) {
			var imgContainer = Ti.UI.createScrollView({
				width:'266',
				height:'230',
				top:'0',
				left:'0',
				borderRadius:'0',
				contentWidth:Ti.UI.FILL,
				contentHeight:Ti.UI.FILL,
				scrollingEnabled:false,
			});
			var topImage = Titanium.UI.createImageView({
				image:'http://www.venuefinder.com/adverts/' + mediaURL,
				defaultImage:'/images/icon.png',
				index:imgCount,
				width:Ti.UI.FILL,
				height:Ti.UI.FILL,
				left:0,
				top:0,
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
				width:'128',
				height:'106',
				top:imgTop,
				left:imgLeft,
				borderRadius:'0',
				contentWidth:Ti.UI.FILL,
				contentHeight:Ti.UI.FILL,
				scrollingEnabled:false,
			});

			var imageView = Titanium.UI.createImageView({
				image:'http://www.venuefinder.com/adverts/' + mediaURL,
				defaultImage:'/images/icon.png',
				index:imgCount,
				width:Ti.UI.FILL,
				height:Ti.UI.FILL,
				left:0,
				top:0,
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
	var getMedia = db.execute("SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID='" + venueID + "' AND (OptionCode='MIL' OR OptionCode = 'PIC' ) ORDER BY OrderKey, GraphicFileName ASC LIMIT 6 OFFSET 6");
	var picCount = 0;
	var imageArray = [];
	var imgCount = 0;

	var galleryView = Ti.UI.createView({
		width:270,
		height:348,
		right:170,
		top:52,
		layout:"horizontal",
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
				width:imgW,
				height:imgH,
				top:imgT,
				left:imgL,
				borderRadius:'0',
				contentWidth:Ti.UI.FILL,
				contentHeight:Ti.UI.FILL,
				scrollingEnabled:false,
			});

			var venueImage = Titanium.UI.createImageView({
				image:'http://www.venuefinder.com/adverts/' + mediaURL,
				defaultImage:'/images/icon.png',
				index:imgCount,
				width:Ti.UI.FILL,
				height:Ti.UI.FILL,
				left:0,
				top:0,
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
		html:'<span style="font-family:Arial; color:#000; font-size:14px; line-height:20pts; font-size:15px;">' + descText + '</span>',
		width:'270',
		height:'180',
		bottom:'31',
		right:'170',
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