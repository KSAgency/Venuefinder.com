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

	var pageView = createViewBackground();

	pageView.add(createBronzeView(venueObj));
	
	var venueObj2 = dbUtil.getVenueForId(nextVenueId);
	alert(venueObj2['VenueID']);
	if(venueObj2['VenueID'] != undefined){
		var bronze2View = createBronzeView(venueObj2);
		bronze2View.setLeft(469);
		pageView.add(bronze2View);
	}
	
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
		
		if (nextPackage == 'GLD') {
			currentWin.remove(pageView);
			currentWin.remove(next);
			currentWin.remove(previous);
			var venueDetailPage = require('/views/collview/venueDetailPages/createGoldPage');
			var goldPage = venueDetailPage.createDetailPage(nextVenueId, loadList, currentWin, windowsArray);
			currentWin.add(goldPage);
		} else if (nextPackage == 'SIL') {
			currentWin.remove(pageView);
			currentWin.remove(next);
			currentWin.remove(previous);
			var venueDetailPage = require('/views/collview/venueDetailPages/createSilverPage');
			var silverPage = venueDetailPage.createDetailPage(nextVenueId, loadList, currentWin, windowsArray);
			currentWin.add(silverPage);
		} else if (nextPackage == 'PRE') {
			currentWin.remove(pageView);
			currentWin.remove(next);
			currentWin.remove(previous);
			var venueDetailPage = require('/views/collview/venueDetailPages/createBronzePage');
			var bronzePage = venueDetailPage.createDetailPage(nextVenueId, nextVenueId, previousVenueId, currentWin, windowsArray);
			currentWin.add(bronzePage);
		}
		
	});
	
	previous.addEventListener('click', function(){
		var previousPackage = dbUtil.getVenueForId(previousVenueId)['PackageCode'];
		
		if (previousPackage == 'GLD') {
			currentWin.remove(pageView);
			currentWin.remove(next);
			currentWin.remove(previous);
			var venueDetailPage = require('/views/collview/venueDetailPages/createGoldPage');
			var goldPage = venueDetailPage.createDetailPage(previousVenueId, loadList, currentWin, windowsArray);
			currentWin.add(goldPage);
		} else if (previousPackage == 'SIL') {
			currentWin.remove(pageView);
			currentWin.remove(next);
			currentWin.remove(previous);
			var venueDetailPage = require('/views/collview/venueDetailPages/createSilverPage');
			var silverPage = venueDetailPage.createDetailPage(previousVenueId, loadList, currentWin, windowsArray);
			currentWin.add(silverPage);
		} else if (previousPackage == 'PRE') {
			currentWin.remove(pageView);
			currentWin.remove(next);
			currentWin.remove(previous);
			var venueDetailPage = require('/views/collview/venueDetailPages/createBronzePage');
			var bronzePage = venueDetailPage.createDetailPage(previousVenueId, loadList, currentWin, windowsArray);
			currentWin.add(bronzePage);
		}
		
	});
	
	return pageView;
}

module.exports.createDetailPage = createDetailPage;

function createViewBackground() {
	var currentCollectionName = Ti.App.Properties.getString('styleName');
	var windowPageView = require('/views/collview/getVenueThumbView');
	var bgView = windowPageView.setWindowPageStyle(currentCollectionName, true);
	var page = bgView[0];
	return page;
}

function createBronzeView(venueObj) {

	var bronzeView = Ti.UI.createView({
		width:'469',
		height:'561',
		top:'74',
		left:'0',
	});

	bronzeView.add(createGallery(venueObj));

	var featuredBtn = createHeaderElements.createFeaturedButtons(venueObj['VenueID'], bronzeView);
	featuredBtn.setTop(0);
	bronzeView.add(featuredBtn);
	bronzeView.add(logo(venueObj));
	bronzeView.add(descText(venueObj));

	var titleLocation = createTitleLocation(venueObj);
	bronzeView.add(titleLocation);
	
	bronzeView.add(createVenueDetail(venueObj));
	
	return bronzeView;
}

function createGallery(venueObj) {

	var db = createDatabase('/venuefinder.db', 'venuefinder');

	//Gallery
	var getMedia = db.execute("SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID='" + venueObj['VenueID'] + "' AND (OptionCode='TOP' OR OptionCode = 'PIC' OR OptionCode='MID' OR OptionCode='MIL' OR OptionCode='MIR') ORDER BY OrderKey, GraphicFileName ASC");
	var picCount = 0;
	var imgCount = 0;

	var galleryView = Ti.UI.createView({
		width:240,
		height:195,
		left:45,
		top:0,
		layout:"horizontal",
	});

	while (getMedia.isValidRow()) {

		var mediaType = getMedia.fieldByName('OptionCode');
		var mediaURL = getMedia.fieldByName('GraphicFileName');
		var videoURL = getMedia.fieldByName('URL');

		var imgW, imgH, imgT, imgL;
		imgW = 115;
		imgH = 95;

		if (imgCount == 0) {
			imgL = 0;
			imgT = 0;
		} else if (imgCount == 1) {
			imgL = 10;
			imgT = 0;
		} else if (imgCount == 2) {
			imgL = 0;
			imgT = 5;
		} else if (imgCount == 3) {
			imgL = 10;
			imgT = 5;
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

		imgCount++;
		if (imgCount == 4) {
			break;
		}
		getMedia.next();
	}

	db.close();
	return galleryView;
}

function logo(venueObj) {
	
	//logo
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var logoMedia = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID=' + venueObj['VenueID'] + ' AND (OptionCode=\'LG1\' OR OptionCode = \'GR1\' OR OptionCode = \'SG2\') ORDER BY OptionCode DESC');
	
	var logoContainer = Ti.UI.createView({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		top:160,
		right:10,
		borderRadius:'0',
		layout:'horizontal'
	});
	
	while (logoMedia.isValidRow()) {
		
		var logoImage = Titanium.UI.createImageView({
			image:'http://www.venuefinder.com/adverts/' + logoMedia.fieldByName('GraphicFileName'),
			defaultImage:'/images/icon.png',
			height:35,
			right:10
		});

		logoContainer.add(logoImage);

		logoMedia.next();
	}
	
	db.close();

	return logoContainer;
	
}

function createTitleLocation(venueObj) {
	
	var titleCont = Ti.UI.createView({
		top:'210',
		left:'45',
		width:400,
		height:Ti.UI.FILL,
		layout:'horizontal'
	});

	var titleLbl = Titanium.UI.createLabel({
		text:venueObj['VenueName'],
		color:'#000000',
		top:0,
		width:Ti.UI.SIZE,
		left:0,
		height:Ti.UI.SIZE,
		font:{
			fontSize:'28',
		}
	});

	var locationLbl = Titanium.UI.createLabel({
		text:venueObj['Town'] + ', ' + venueObj['Country'],
		color:'#000000',
		width:Ti.UI.SIZE,
		top:5,
		left:0,
		font:{
			fontSize:'24',
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		}
	});
	
	titleCont.add(titleLbl);
	titleCont.add(locationLbl);

	return titleCont;
	
}

function descText(venueObj) {
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var desRow = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID="' + venueObj['VenueID'] + '" AND OptionCode="SG2"');
	var descText;
	while (desRow.isValidRow()) {
		descText = desRow.fieldByName('Text');
		desRow.next();
	}

	if (descText == null || descText == '') {
		descText = 'No description could be retrieved for this venue.';
	}

	descText.replace('/<(?:.|\n)*?>/gm', '');

	var descriptionWV = Titanium.UI.createWebView({
		html:'<html><body><span style="font-family:Arial; color:#000; font-size:14px; line-height:20pts; font-size:15px;">' + descText + '</span></body></html>',
		width:185,
		height:Ti.UI.FILL,
		top:320,
		left:'40',
		scrollable:true,
		touchEnabled:true
	});
	
	return descriptionWV;
	
}

function createVenueDetail(venueObj) {
	
	var detailView = Ti.UI.createView({
		width:'205',
		height:'270',
		top:320,
		right:'20',
		layout:'vertical'
	});

	var detailTitleText = Titanium.UI.createLabel({
		width:'172',
		height:'23',
		top:'0',
		left:'0',
		backgroundColor:'transparent',
		text:'Venue Details',
		font:{
			fontSize:"24",
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		}
	});
	
	detailView.add(detailTitleText);

	var venueAddress = "<div>" + venueObj['AddressLine1'] + "</div><div>" + venueObj['Town'] + ", " + venueObj['Country'] + ",</div><div>" + venueObj['Postcode'] + "</div><div>Tel: " + venueObj['Tel'] + "</div>";
	
	var addressWV = Ti.UI.createWebView({
		html:'<html><body style="margin:0px;"><div style="text-align:left;font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; line-height:18pts; font-size:14px;">' + venueAddress + '</div></body></html>',
		top:'10',
		left:'0',
		width:'200',
		height:Ti.UI.SIZE,
		disableBounce:true,
	});
	
	detailView.add(addressWV);

	var urlText = 'Visit website';

	var urlLineAttr = Titanium.UI.iOS.createAttributedString({
		text:urlText
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
		left:'0',
		top:10,
		height:'15',
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
		left:'0',
		top:'5',
		height:'15',
		attributedString:emailLineAttr
	});

	detailView.add(emailLine);

	emailLine.addEventListener('click', function() {

		var createEmailer = require('/builders/createEmailer');
		var emailer = createEmailer(null, venueObj['Email'], null, null, venueObj['VenueName'], null, null, null, null);

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

	var venueCapcityText = "<div style='width:190px'>Max catering capacity<span style='float:right;font-weight:bold'>" + venueObj['MaxCateringCapacity'] + "</span></div>";
	venueCapcityText += "<div style='width:190px'>Max meeting capacity<span style='float:right;font-weight:bold'>" + venueObj['MaxMeetingCapacity'] + "</span></div>";
	venueCapcityText += "<div style='width:190px'>Number of meeting rooms<span style='float:right;font-weight:bold'>" + venueObj['MeetingRoomsNo'] + "</span></div>";
	venueCapcityText += "<div style='width:190px'>Number of bedrooms<span style='float:right;font-weight:bold'>" + venueObj['BedroomsNo'] + "</span></div>";

	var capacityWV = Ti.UI.createWebView({
		html:'<html><body style="margin:0px;"><div style="left:0px;text-align:left;font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:12px; line-height:20pts;">' + venueCapcityText + '</div></body></html>',
		top:'10',
		left:'0',
		width:'200',
		height:'78',
		disableBounce:true
	});
	detailView.add(capacityWV);

	return detailView;
}


