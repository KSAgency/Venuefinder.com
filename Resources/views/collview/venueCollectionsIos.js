function venueCollectionsIos(tabGroup, window) {

	var parentView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		backgroundColor : 'RBRBK7',
	});

	var win = Ti.UI.createScrollView({
		width : '100%',
		height : '600',
		left : '0',
		top : '137',
		backgroundColor : 'rgba(255,255,255,0)',
		showVerticalScrollIndicator : true,
		horizontalBounce : false,
	});

	var venueCollectionLabel = Ti.UI.createLabel({
		text : 'venuefinder.com collections',
		color : '#000000',
		top : '40',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontSize : 42,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
	});
	parentView.add(venueCollectionLabel);

	var homeLabel = Ti.UI.createButton({
		title : 'Home',
		color : '#000000',
		width : Ti.UI.SIZE,
		height : 30,
		top : '2%',
		left : 20,
		font : {
			fontSize : 24,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		backgroundColor : 'rgba(255,255,255,0)',
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	});
	parentView.add(homeLabel);
	homeLabel.addEventListener('click', function(e) {
		window.close();
	});

	var venueDetailArray = [];
	venueDetailArray.push({
		//image : '/images/style-default.png',
		image : '/images/45StarHotels.jpg',
		venueStyle : '39',
		styleName : '4-5* Hotels in London',
	});
	venueDetailArray.push({
		image : '/images/AcademicVenues.jpg',
		venueStyle : '19',
		styleName : 'Academic Venues',
	});
	venueDetailArray.push({
		image : '/images/castleHistoricVenues.jpg',
		venueStyle : '20',
		styleName : 'Castles & Historic Houses',
	});
	venueDetailArray.push({
		image : '/images/christmasVenues.jpg',
		venueStyle : '53',
		styleName : 'Christmas Party Venues',
	});
	venueDetailArray.push({
		image : '/images/conferenceVenues.jpg',
		venueStyle : '3',
		styleName : 'Conference Centre Venues in London',
	});
	venueDetailArray.push({
		image : '/images/unusualVeneus.jpg',
		venueStyle : '15',
		styleName : 'Unusual Venues in London',
	});
	
	var top = 0;
	var imageShow = 4;
	var left;
	var k = 0;
	var hMarzin = 4;
	var vMarzin = 0;
	var limit = Math.ceil(venueDetailArray.length / imageShow);
	for (var i = 0; i < limit; i++) {
		left = 80;
		for (var j = 0; j < imageShow; j++) {
			if (venueDetailArray[k] != undefined) {
				var venueView = Ti.UI.createView({
					width : '171',
					height : '238',
					top : top,
					left : left,
					venueStyle : venueDetailArray[k].venueStyle,
					styleName : venueDetailArray[k].styleName,
					backgroundColor : '#2696BE',
					venueIndex : k,
					collection : 'venue',
				});
				win.add(venueView);
				var venueTitleLabel = Ti.UI.createLabel({
					text : venueDetailArray[k].styleName,
					top : 5,
					left : 9,
					color : '#ffffff',
					width : 163, 
					height : 'auto',
					font : {
						fontSize : 22,
						fontFamily : Ti.App.Properties.getString('fontFamily'),
					},
				});
				venueView.add(venueTitleLabel);
				venueView.addEventListener('click', function(e) {
					var createApplicationWindow = require('/builders/createApplicationWindow');
					var win = createApplicationWindow(tabGroup, null, 'Venue Cover', Ti.App.Properties.getString('allWindowsBackgroundColor'), '/images/loading_page.png', 'Search', 'Venue Collections', '', '', '', 'forflipwindow');
					var createStartActInd = require('/builders/startActInd');
					var startActInd = createStartActInd(win);
					win.open();
					var style = '';
					var name = '';
					if (e.source.getApiName() == 'Ti.UI.View') {
						style = e.source.venueStyle;
						name = e.source.styleName;
					} else {
						style = e.source.parent.venueStyle;
						name = e.source.parent.styleName;
					}

					Ti.App.Properties.setInt('styleId', style);
					var createDatabase = require('/builders/databaseFunctions/createDatabase');
					var db = createDatabase('/venuefinder.db', 'venuefinder');
					var row = db.execute('select VenueStyle from VenueStyles where VenueStyleID = ' + style);
					var venueStyle = '';
					while (row.isValidRow()) {
						venueStyle = row.fieldByName('VenueStyle');
						row.next();
					}
					db.close();
					Ti.App.Properties.setString('styleName', venueStyle);

					var getWinElements = require('/views/collview/venueCover');
					var winElements = getWinElements(tabGroup, style, name, win, window);
					var createEndActInd = require('/builders/endActInd');
					var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);

				});
				left = left + 171 + 60;
				k++;
			}
		}
		var seperatorImage = Titanium.UI.createView({
			width : Ti.UI.FILL,
			height : 24,
			top : top + 238,
			backgroundColor : '#919192',
		});

		win.add(seperatorImage);

		vMarzin = 10;
		top = top + 238 + 24 + 26;
	}
	parentView.add(win);

	window.addEventListener('open', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(window);

		if (win.getChildren() != undefined) {
			var viewArray = win.getChildren();
			var walk = 0;
			for (var i = 0; i < viewArray.length; i++) {

				if (viewArray[i].collection == 'venue') {
					var labelObj = viewArray[i].getChildren();
					var image = Titanium.UI.createImageView({
						image : venueDetailArray[walk].image,
						defaultImage : '/images/icon.png',
						width : Ti.UI.FILL,
						height : viewArray[i].size.height - labelObj[0].size.height - 5, 
						top : labelObj[0].size.height + 10,
						left : 0,
						right : 0,
					});
					viewArray[i].add(image);
										
					walk++;
				}
			}
		}
		var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(window, startActInd[0], startActInd[1]);

	});
	return parentView;
}

module.exports = venueCollectionsIos;
