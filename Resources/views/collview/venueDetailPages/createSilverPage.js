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

	var page = createViewBackground(venueObj);

	page.add(createGallery(venueObj));

	var titleLocation = createTitleLocation(venueObj);
	page.add(titleLocation[0]);

	var logoDescText = logoAndDescText(venueObj, titleLocation[1]);
	page.add(logoDescText[0]);
	page.add(logoDescText[1]);

	page.add(side2Gallery(venueObj));

	page.add(createHeaderElements.createFeaturedButtons(venueObj['VenueID'], page));

	page.add(createVenueDetail(venueObj));
	
	//page.add(singleImage());
	
	var offerBtn = createSilverSpeOfferBtn(venueObj);

	if (offerBtn != null) {
		page.add(offerBtn);
	}
	
	page.add(seeMoreInfoButton());
	
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
			currentWin.remove(page);
			currentWin.remove(next);
			currentWin.remove(previous);
			page.parent.remove(page);
			var venueDetailPage = require('/views/collview/venueDetailPages/createGoldPage');
			var goldPage = venueDetailPage.createDetailPage(nextVenueId, loadList, currentWin, windowsArray);
			currentWin.add(goldPage);
		} else if (nextPackage == 'SIL') {
			currentWin.remove(page);
			currentWin.remove(next);
			currentWin.remove(previous);
			page.parent.remove(page);
			var venueDetailPage = require('/views/collview/venueDetailPages/createSilverPage');
			var silverPage = venueDetailPage.createDetailPage(nextVenueId, loadList, currentWin, windowsArray);
			currentWin.add(silverPage);
		} else if (nextPackage == 'PRE') {
			currentWin.remove(page);
			currentWin.remove(next);
			currentWin.remove(previous);
			page.parent.remove(page);
			var venueDetailPage = require('/views/collview/venueDetailPages/createBronzePage');
			var bronzePage = venueDetailPage.createDetailPage(nextVenueId, nextVenueId, previousVenueId, currentWin, windowsArray);
			currentWin.add(bronzePage);
		}
		
	});
	
	previous.addEventListener('click', function(){
		var previousPackage = dbUtil.getVenueForId(previousVenueId)['PackageCode'];
		
		if (previousPackage == 'GLD') {
			currentWin.remove(page);
			currentWin.remove(next);
			currentWin.remove(previous);
			var venueDetailPage = require('/views/collview/venueDetailPages/createGoldPage');
			var goldPage = venueDetailPage.createDetailPage(previousVenueId, loadList, currentWin, windowsArray);
			currentWin.add(goldPage);
		} else if (previousPackage == 'SIL') {
			currentWin.remove(page);
			currentWin.remove(next);
			currentWin.remove(previous);
			var venueDetailPage = require('/views/collview/venueDetailPages/createSilverPage');
			var silverPage = venueDetailPage.createDetailPage(previousVenueId, loadList, currentWin, windowsArray);
			currentWin.add(silverPage);
		} else if (previousPackage == 'PRE') {
			currentWin.remove(page);
			currentWin.remove(next);
			currentWin.remove(previous);
			var venueDetailPage = require('/views/collview/venueDetailPages/createBronzePage');
			var bronzePage = venueDetailPage.createDetailPage(previousVenueId, loadList, currentWin, windowsArray);
			currentWin.add(bronzePage);
		}
		
	});

	return page;
}

module.exports.createDetailPage = createDetailPage;

function createViewBackground(venueObj) {

	var currentCollectionName = Ti.App.Properties.getString('styleName');
	var windowPageView = require('/views/collview/getVenueThumbView');
	var bgView = windowPageView.setWindowPageStyle(currentCollectionName, true);
	var page = bgView[0];

	var location = venueObj['Town'];

	if (venueObj['Town'] == 'London') {
		location = location + '  ' + venueObj['Postcode'];
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
	page.add(townPostcode);
	return page;
}

function createGallery(venueObj) {

	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var getMedia = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID=' + venueObj['VenueID'] + ' AND (OptionCode=\'TOP\' OR OptionCode = \'PIC\' OR OptionCode=\'MID\' OR OptionCode=\'MIL\' OR OptionCode=\'MIR\') ORDER BY OptionCode ASC LIMIT 3');
	var imageArray = [];

	var galleryView = Ti.UI.createView({
		width:410,
		height:214,
		left:36,
		top:70,
	});

	var imgCount = 0;
	while (getMedia.isValidRow()) {
		var mediaType = getMedia.fieldByName('OptionCode');
		var mediaURL = getMedia.fieldByName('GraphicFileName');

		if (imgCount == 0) {
			var imgContainer = Ti.UI.createScrollView({
				width:'265',
				height:'214',
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

			imgContainer.add(topImage);

			galleryView.add(imgContainer);
		} else {
			var imgTop = 10;
			var imgLeft = 15;
			if (imgCount == 1) {
				imgTop = 0;
				imgLeft = 280;
			} else if (imgCount == 2) {
				imgTop = 106 + 10;
				imgLeft = 265 + 15;
			}

			var imgContainer = Ti.UI.createScrollView({
				width:'130',
				height:'102',
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

			imgContainer.add(imageView);
			galleryView.add(imgContainer);
		}
		imgCount++;
		imageArray.push('http://www.venuefinder.com/adverts/' + mediaURL);
		getMedia.next();
		if (imgCount == 3) {
			break;
		}
	}
	db.close();
	return galleryView;
}

function createTitleLocation(venueObj) {

	var titleCont = Ti.UI.createView({
		top:'326',
		left:'98',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		layout:'vertical'
	});

	var titleLbl = Titanium.UI.createLabel({
		text:venueObj['VenueName'],
		ellipsize:true,
		color:'#000000',
		top:0,
		width:360,
		left:0,
		height:Ti.UI.SIZE,
		font:{
			fontSize:'28',
		}
	});

	//Venue location
	var locationLbl = Titanium.UI.createLabel({
		text:venueObj['Town'] + ', ' + venueObj['Country'],
		ellipsize:true,
		color:'#000000',
		width:'380',
		top:'0',
		left:0,
		font:{
			fontSize:'24',
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		}
	});
	
	titleCont.add(titleLbl);
	titleCont.add(locationLbl);
	
	//Measure View
	var viewHeight = (titleCont.toImage().height + parseInt(titleCont.getTop()))+20;

	return [titleCont, viewHeight];
	
}

function logoAndDescText(venueObj, titleHeight) {
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var desRow = db.execute('SELECT DescriptionText FROM VenueTextForWeb WHERE VenueID="' + venueObj['VenueID'] + '"');
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
		width:'225',
		height:Ti.UI.FILL,
		top:titleHeight,
		left:'240',
		bottom:20
	});

	//logo
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var logoMedia = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID=' + venueObj['VenueID'] + ' AND (OptionCode=\'LG1\' OR OptionCode = \'GR1\' OR OptionCode=\'AS1\') ORDER BY OptionCode DESC');
	
	var logoContainer = Ti.UI.createView({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		bottom:'50',
		left:'30',
		borderRadius:'0',
		layout:'horizontal'
	});
	
	while (logoMedia.isValidRow()) {
		
		var logoImage = Titanium.UI.createImageView({
			image:'http://www.venuefinder.com/adverts/' + logoMedia.fieldByName('GraphicFileName'),
			defaultImage:'/images/icon.png',
			width:125,
		});
		
		if (logoMedia.rowCount > 1){
			logoImage.setWidth((logoImage.width-(logoImage.width/3)).toString());
			logoImage.setLeft(10);
		}

		logoContainer.add(logoImage);

		logoMedia.next();
	}
	
	db.close();

	return [logoContainer, descriptionWV];
}

function side2Gallery(venueObj) {

	var db = createDatabase('/venuefinder.db', 'venuefinder');

	//Gallery
	
	var getMedia = db.execute("SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID='" + venueObj['VenueID'] + "' AND (OptionCode=\'TOP\' OR OptionCode = \'PIC\' OR OptionCode=\'MID\' OR OptionCode=\'MIL\' OR OptionCode=\'MIR\') ORDER BY OptionCode ASC LIMIT 4 OFFSET 3");
	var picCount = 0;
	var imageArray = [];
	var imgCount = 0;

	var galleryView = Ti.UI.createView({
		width:265,
		height:214,
		left:506,
		top:70,
		layout:"horizontal",
	});

	while (getMedia.isValidRow()) {

		var mediaType = getMedia.fieldByName('OptionCode');
		var mediaURL = getMedia.fieldByName('GraphicFileName');
		var videoURL = getMedia.fieldByName('URL');

		var imgW, imgH, imgT, imgL;
		imgW = 130;
		imgH = 102;

		if (mediaType == 'MIL' || mediaType == 'PIC') {
			if (mediaType == 'PIC') {
				//Add pic
				picCount++;
				if (picCount < 3) {
					continue;
				}
			}

			if (imgCount == 0) {
				imgL = 0;
				imgT = 0;
			} else if (imgCount == 1) {
				imgL = 5;
				imgT = 0;
			} else if (imgCount == 2) {
				imgL = 0;
				imgT = 10;
			} else if (imgCount == 3) {
				imgL = 5;
				imgT = 10;
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

			imgCount++;
			if (imgCount == 4) {
				break;
			}
		}
		getMedia.next();
	}

	db.close();
	return galleryView;
}

function createVenueDetail(venueObj) {
	var detailView = Ti.UI.createView({
		width:'230',
		height:'300',
		bottom:'20',
		right:'192',
	});

	var detailTitleText = Titanium.UI.createLabel({
		width:'172',
		height:'23',
		top:'0',
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
		top:'33',
		left:'28',
		width:'200',
		height:'100',
		disableBounce:true,
	});
	detailView.add(addressWV);
	
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
		left:'38',
		top:'143',
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
		left:'38',
		top:'171',
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

	var venueCapcityText = "<div style='width:195px'>Max catering capacity<span style='float:right;font-weight:bold'>" + venueObj['MaxCateringCapacity'] + "</span></div>";
	venueCapcityText += "<div style='width:195px'>Max meeting capacity<span style='float:right;font-weight:bold'>" + venueObj['MaxMeetingCapacity'] + "</span></div>";
	venueCapcityText += "<div style='width:195px'>Number of meeting rooms<span style='float:right;font-weight:bold'>" + venueObj['MeetingRoomsNo'] + "</span></div>";
	venueCapcityText += "<div style='width:195px'>Number of bedrooms<span style='float:right;font-weight:bold'>" + venueObj['BedroomsNo'] + "</span></div>";

	var capacityWV = Ti.UI.createWebView({
		html:'<div style="left:0px;text-align:left;font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:13px; line-height:22pts;">' + venueCapcityText + '</div>',
		top:'199',
		left:'28',
		width:'230',
		height:'100',
		disableBounce:true,
	});
	detailView.add(capacityWV);

	return detailView;
}

function seeMoreInfoButton() {
	var moreContainer = Ti.UI.createView({
		width:130,
		height:64,
		bottom:20,
		right:12,
		backgroundColor:'#FFFFFF',
	});

	var seeMoreButton = Ti.UI.createLabel({
		width:'102',
		height:'54',
		left:'14',
		bottom:'5',
		backgroundColor:'#399ad4',
		color:'#FFFFFF',
		font:{
			fontSize:"12",
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		}
	});
	
	var seeMoreTextLabel = Ti.UI.createLabel({
		width:'86',
		height:'44',
		left:'8',
		text:'See more information on venuefinder.com',
		bottom:'5',
		backgroundColor:'tranparent',
		color:'#FFFFFF',
		font:{
			fontSize:"11",
		}
	});
	
	seeMoreTextLabel.addEventListener('click', function(){
		seeMoreButton.fireEvent('click');
	});
	
	seeMoreButton.add(seeMoreTextLabel);
	
	moreContainer.add(seeMoreButton);
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
			url:'http://www.venuefinder.com',
		});

		websiteContainer.add(websiteWV);

		websiteWin.add(websiteContainer);
		websiteWin.open();
	});

	return moreContainer;

}

function createSilverSpeOfferBtn(venueObj) {
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	
	var createTodaysDate = require('/builders/todaysDate');
	var today = createTodaysDate();	
	var hasOffer = false;
	
	var row = db.execute('SELECT * FROM Offers WHERE EntryID="' + venueObj['VenueID'] + '" AND validToDate>="' + today + '"');
	if (row.rowCount != 0) {
		hasOffer = true;
	}
	var offerBtnContainer = null;
	if(hasOffer){
		offerBtnContainer = Ti.UI.createView({
			right:12,
			bottom: 94,
			width:130,
			height:50,
			backgroundColor:"#FFFFFF",
		});
				
		var offersButton = Titanium.UI.createImageView({
			image:'/images/listing_offers.png',
			left:12,
			top:10,
			width:102,
			height:'auto',			
		});	
		
		offerBtnContainer.add(offersButton);
		
		offersButton.addEventListener('click', function() {
			
			var offerScroll = Titanium.UI.createScrollView({
				top:'0%',
				zIndex:5,
				layout:'vertical',
				backgroundColor:'#FFF'
			});		
	
			var createTab = require('/views/children/listingElements/createOffersTab');
			createTab(null, null, offerScroll, venueObj['VenueID'], null);
			
			var offerWin = Titanium.UI.createWindow({
				backgroundColor:'rgba(0,0,0,0.8)',
			});
						
			var offerContainer = Ti.UI.createView({
				width:'60%',
				height:'60%',
				top:'10%',
				left:'20%',
				layout:'vertical',
			});
			
			var upperView = Ti.UI.createView({
				top:0,
				left:0,
				height:'15%',
				width:Ti.UI.FILL,
				backgroundColor:'#e6a723',			
			});
			
			var specialOffersLbl = Titanium.UI.createLabel({
				text:'Special Offers',
				left:'15',
				width:'85%',
				height:'40',
				top:'15',
				ellipsize:true,
				color:'#ffffff',
				font:{
					fontSize:'34',
					fontFamily:Ti.App.Properties.getString('fontFamily'),
				}
			});
			
			upperView.add(specialOffersLbl);

			var close = Titanium.UI.createButton({		
				right:'15',
				top:'10',			
				title: "X",
				color:"#FFF",
				font:{fontSize: "28", fontWeight:"bold"},
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


function singleImage(){
	
	var image = Ti.UI.createView({
		width:'130',
		height:'102',
		bottom:'154',
		right:'12',
		backgroundColor:'#dededc',
	});
	
	return image;
}
