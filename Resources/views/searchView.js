function searchView(tabGroup, title, backgroundColor) {
	var win = Titanium.UI.createWindow({
		backgroundColor : '#FFF',
		title : title,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});

	if (Ti.App.Properties.getString('osname') != 'Android') {
		win.setBarColor('#2195be');
		win.setBackButtonTitle('Back');
		win.setTintColor('#FFF');
		win.setTranslucent(false);
		win.setTitleControl(Ti.UI.createLabel({
			text : title,
			color : '#FFF',
			width : Ti.UI.SIZE
		}));
	}

	// Initial Omniture

	var omniture = Titanium.UI.createWebView({
		opacity : 0,
		width : 0,
		height : 0,
		left : 0,
		right : 0,
		touchEnabled : false
	});

	win.add(omniture);

	// Setup Array counter

	var calOffset = 0;

	var calOffset2 = 0;

	//Toggle Button

	var toggleButton = Titanium.UI.createButton({
		image : '/images/whiteSearch.png',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
		width : 20,
		height : 20
	});

	if (Ti.Platform.osname != 'android') {
		win.setRightNavButton(toggleButton);
	}

	var hidden = true;

	toggleButton.addEventListener('click', function() {
		if (hidden == true) {
			searchBar.show();
			hidden = false;
		} else {
			searchBar.hide();
			hidden = true;
		}
	});

	//Search Bar

	var searchBar = Titanium.UI.createTextField({
		top : 10,
		width : 288,
		height : 30,
		borderRadius : 15,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
		rightButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
		returnKeyType : Titanium.UI.RETURNKEY_DONE,
		borderColor : '#999',
		backgroundColor : '#FFF',
		paddingLeft : 10,
		color : '#666',
		font : {
			fontSize : 10
		},
		hintText : 'Enter a venue name',
		ellipsize : true,
		returnKeyType : Titanium.UI.RETURNKEY_DONE
		//        bubbleParent: false,
	});

	win.add(searchBar);

	win.addEventListener('cancel', function() {
		searchBar.blur();
	});

	searchBar.addEventListener('return', function() {

		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		win.setTouchEnabled(false);

		// Retrieve User Inputs

		var quickSearchResult = searchBar.getValue();
		quickSearchResult = quickSearchResult.replace(' ', '%');
		quickSearchResult = quickSearchResult.replace(' ', '%');
		quickSearchResult = quickSearchResult.replace(' ', '%');

		// Input Checker

		var hasInput = null;

		// Create SQL Query

		if (quickSearchResult != null && quickSearchResult != '') {
			hasInput = true;
		}

		var sqlString = 'SELECT * FROM Venue JOIN VenueCoords ON Venue.VenueID=VenueCoords.VenueID WHERE VenueSort LIKE "%' + quickSearchResult + '%"';

		//Create Results Page
		var createResultsPage = require('/builders/createResultsPage');
		var resultsPage = createResultsPage(win, tabGroup, sqlString, hasInput, null, null, true, false);

		tabGroup.activeTab.open(resultsPage);

		var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		win.setTouchEnabled(true);

	});
	
	//Load Images
	
	var imagesToLoad = [
		{image:'images/searchPage/0219590PIC.jpg', id:'30878', title:'3M Buckley Innovation Center'}, 
		{image:'images/searchPage/0220828PIC.jpg', id:'28851', title:'ArcelorMittal Orbit'},
		{image:'images/searchPage/0220834PIC.jpg', id:'30026', title:'Bounce Ping Pong'}, 
		{image:'images/searchPage/0218631PIC.jpg', id:'1959', title:'Foxhills'}, 
		{image:'images/searchPage/0218254PIC.jpg', id:'9802', title:'HM Tower of London'}, 
		{image:'images/searchPage/0221729PIC.jpg', id:'28570', title:'MSE Meeting Rooms - Oxford Street'},
		{image:'images/searchPage/0222859PIC.jpg', id:'18266', title:'Mythe Barn'},
		{image:'images/searchPage/0222437PIC.jpg', id:'15861', title:'Radisson Blu Edwardian, Free Trade Hall Manchester'},
		{image:'images/searchPage/0218810PIC.jpg', id:'4104', title:'the runnymede-on-thames'},
		{image:'images/searchPage/0219719PIC.jpg', id:'12895', title:'IWM North, part of Imperial War Museums'}];
	
	function imageResize (imageSize){
		if (imageSize.width>=imageSize.height){
			var ratio = imageSize.height/768;
			imageUnderlay.setHeight(768);
			imageUnderlay.setWidth(imageSize.width/ratio);
		} else {
			var ratio = imageSize.width/1024;
			imageUnderlay.setHeight(1024);
			imageUnderlay.setWidth(imageSize.height/ratio);
		}
	}
	
	var currentDisplay = 0;
	
	var imageUnderlay = Ti.UI.createImageView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		opacity:1,
		image:imagesToLoad[0].image,
		isVis:true
	});
	
	var imageUnderlayFade = Ti.UI.createImageView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		image:imagesToLoad[1].image,
		opacity:0,
		isVis:false
	});
	
	win.add(imageUnderlay);
	win.add(imageUnderlayFade);
	
	var labelCont = Ti.UI.createView({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		bottom:15,
		right:15,
		borderRadius:5,
		backgroundColor:backgroundColor,
		clickCall:'',
		vTitle:''
	});
	
	var infoBox = Ti.UI.createLabel({
		color:'#399ad4',
		textAlign:'center',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:'',
		top:10,
		bottom:10,
		left:10,
		right:10,
		touchEnabled:false
	});
	
	labelCont.add(infoBox);
	win.add(labelCont);
	
	labelCont.addEventListener('click', function(e){
		if (e.source.clickCall){
			var createApplicationWindow = require('/builders/createApplicationWindow');
			var windowElements = createApplicationWindow(tabGroup, 'children/featuredListing', e.source.vTitle, '#FFF', 'Search', null, null, null, e.source.clickCall, null);
		}
	});
	
	infoBox.setText(imagesToLoad[0].title);
	labelCont.clickCall = imagesToLoad[0].id;
	labelCont.vTitle = imagesToLoad[0].title;

	setInterval(function(){
		
		currentDisplay = currentDisplay+1;
		
		infoBox.setText(imagesToLoad[currentDisplay].title);
		labelCont.clickCall = imagesToLoad[currentDisplay].id;
		labelCont.vTitle = imagesToLoad[currentDisplay].title;
	
		if (imageUnderlay.isVis){
			
			imageUnderlayFade.animate({
				duration:2000,
				opacity:1
			});
			
			imageUnderlay.animate({
				duration:2000,
				opacity:0
			});
			
			imageUnderlay.isVis = false;
			imageUnderlayFade.isVis = true;
			imageResize(imageUnderlayFade.toImage());
			
			setTimeout(function(){
				if (currentDisplay+1 == 10){
					currentDisplay = 0;
					imageUnderlay.setImage(imagesToLoad[0].image);
				} else {
					imageUnderlay.setImage(imagesToLoad[currentDisplay+1].image);
				}
			}, 2000);
			
		} else {
			
			imageUnderlay.animate({
				duration:2000,
				opacity:1
			});
			
			imageUnderlayFade.animate({
				duration:2000,
				opacity:0
			});
			
			imageUnderlay.isVis = true;
			imageUnderlayFade.isVis = false;
			imageResize(imageUnderlay.toImage());
			
			setTimeout(function(){
				if (currentDisplay+1 == 10){
					currentDisplay = 0;
					imageUnderlayFade.setImage(imagesToLoad[0].image);
				} else {
					imageUnderlayFade.setImage(imagesToLoad[currentDisplay+1].image);
				}
			}, 2000);
		}
		
	}, 10000);
	
	
	//Menu

	var buttonBox = Ti.UI.createView({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		top:100,
		left:20,
		backgroundColor:backgroundColor
	});
	
	var tableData = [{
		title:'Venue Search', 
		toLoad:'children/quickSearch',
		leftImage:'images/searchPage/icons/search.png',
		color : '#2195be',
		font : {
			fontSize : '20',
			fontWeight : 'bold'
		}
	}, {
		title:'Search by Location', 
		toLoad:'children/searchLocation',
		leftImage:'images/searchPage/icons/map.png',
		color : '#2195be',
		font : {
			fontSize : '20',
			fontWeight : 'bold'
		}
	}, {
		title:'Featured Venues', 
		toLoad:'children/azDirectory',
		leftImage:'images/searchPage/icons/favourites.png',
		color : '#2195be',
		font : {
			fontSize : '20',
			fontWeight : 'bold'
		}
	}, {
		title:'Venue Collections', 
		toLoad:null,
		leftImage:'images/searchPage/icons/collectionsIcon.png',
		color : '#2195be',
		font : {
			fontSize : '20',
			fontWeight : 'bold'
		}
	}, {
		title:'Special Offers', 
		toLoad:'children/specialOffers',
		leftImage:'images/searchPage/icons/offers.png',
		color : '#2195be',
		font : {
			fontSize : '20',
			fontWeight : 'bold'
		}
	}, {
		title:'Free Venue Finding Service', 
		toLoad:'children/venueFindingService',
		leftImage:'images/searchPage/icons/freeVenueFindingServiceIcon.png',
		color : '#2195be',
		font : {
			fontSize : '20',
			fontWeight : 'bold'
		}
	}];
	
	var tableView = Ti.UI.createTableView({
		width:'330',
		height:'263',
		data:tableData,
		scrollable:false
	});

	buttonBox.add(tableView);
	win.add(buttonBox);
	buttonBox.setWidth(buttonBox.toImage().width+30);
	buttonBox.setHeight(buttonBox.toImage().height+30);

	//iPad Styling
	// if (Ti.App.Properties.getString('osname') == 'iPad') {
		// //Resize and disable Scroll View
		// buttonScroller.setWidth(600);
		// buttonScroller.setHeight(Titanium.UI.SIZE);
		// searchBar.setWidth(600);
// 
		// //Repostion Buttons
		// button1.setLeft(0), button1.setTop(50), button2.setLeft(0), button3.setLeft(0), button4.setRight(0), button4.setTop(-175), button5.setRight(0), button6.setRight(0);
	// }

	tableView.addEventListener('click', function(e){
		if (e.rowData.toLoad == null){
			if (Ti.App.Properties.getString('osname') == 'iPad') {
				var allWindowsBackgroundColor = '#CACACA';
				Ti.App.Properties.setString('allWindowsBackgroundColor', allWindowsBackgroundColor);
				Ti.App.Properties.setString('fontFamily', 'Helvetica-Light');
				var createApplicationWindow = require('/builders/createApplicationWindow');
				var windowElements = createApplicationWindow(tabGroup, 'collview/venueCollectionsIos', 'Venuefinder.com collections', allWindowsBackgroundColor, '/images/loading_page.png', 'Search', 'Venue Collections', '', '', '', 'forflipwindow');
			} else {
				var createApplicationWindow = require('/builders/createApplicationWindow');
				var windowElements = createApplicationWindow(tabGroup, 'children/venueCollections', 'Venue Collections', '#FFF', '/images/loading_page.png', 'Search', 'Venue Collections', '', '');
			}
		} else {
			var createStartActInd = require('/builders/startActInd');
			var startActInd = createStartActInd(win);
			var createApplicationWindow = require('/builders/createApplicationWindow');
			var windowElements = createApplicationWindow(tabGroup, e.rowData.toLoad, e.rowData.title, '#d2e8f5', 'Search', e.rowData.title, '', '');
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});
	
	tableView.addEventListener('collections', function(){
		if (Ti.App.Properties.getString('osname') == 'iPad') {
			var allWindowsBackgroundColor = '#CACACA';
			Ti.App.Properties.setString('allWindowsBackgroundColor', allWindowsBackgroundColor);
			Ti.App.Properties.setString('fontFamily', 'Helvetica-Light');
			var createApplicationWindow = require('/builders/createApplicationWindow');
			var windowElements = createApplicationWindow(tabGroup, 'collview/venueCollectionsIos', 'Venuefinder.com collections', allWindowsBackgroundColor, '/images/loading_page.png', 'Search', 'Venue Collections', '', '', '', 'forflipwindow');
		} else {
			var createApplicationWindow = require('/builders/createApplicationWindow');
			var windowElements = createApplicationWindow(tabGroup, 'children/venueCollections', 'Venue Collections', '#FFF', '/images/loading_page.png', 'Search', 'Venue Collections', '', '');
		}
	});

	win.addEventListener('postlayout', function() {
		if (Ti.App.Properties.getString('osname') != 'Android') {
			searchBar.hide();
		}
	});

	win.addEventListener('open', function() {
		searchBar.blur();
	});

	searchView.home_button.addEventListener('click', function(e) {
		searchBar.blur();
	});

	return win;

}

module.exports = searchView;
