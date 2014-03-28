function venueCollections(tabGroup) {

    var win = Ti.UI.createView({
        width:Ti.UI.FILL,
        height:Ti.UI.FILL,
        backgroundColor:'#d2e8f5'
    });

    var rowdata = [];

    //Create Functions

    var calOffset = 0;

    function getVenues(styleID, styleName, styleBanner) {

        //Create Selection Win

        var createApplicationWindow = require('/builders/createApplicationWindow');
		var selectWin = createApplicationWindow(tabGroup, null, 'Venue Collections', '#d2e8f5', null, null, null, null);

        tabGroup.activeTab.open(selectWin);

        selectWin.addEventListener('close', function() {
            rowdata = [];
        });

        var headerView = Titanium.UI.createView({
            width:Ti.UI.FILL,
            height:Ti.UI.SIZE,
            layout:'vertical'
        });
        
        var headerImage = Titanium.UI.createImageView({
            image:styleBanner,
            width:Ti.UI.FILL,
            height:55,
            touchEnabled:false,
            top:0
        });
        
        if (Ti.App.Properties.getString('osname')=='iPad') {
            headerImage.setWidth(600);
            headerImage.setHeight(null);
        }
        
        headerView.add(headerImage);
        
        var space = Ti.UI.createView({
        	height:10,
        	top:0,
        	width:Ti.UI.FILL
        });

		headerView.add(space);

        // Create Fields

        var sqlString = 'SELECT COUNT(Country) AS VenueCount FROM Venue JOIN VenueToVenueStyles ON Venue.VenueID=VenueToVenueStyles.VenueID WHERE (Country="England" OR Country="Wales" OR Country="Scotland" OR Country="Northern Ireland" OR Country="Channel Islands" OR Country="Isle of Man") AND PackageCode!="FRE" AND VenueStyleID="' + styleID + '" AND Country IS NOT NULL AND LTRIM (Country)!=""';
        var sqlString2 = 'SELECT DISTINCT Country, COUNT(Country) AS VenueCount FROM Venue JOIN VenueToVenueStyles ON Venue.VenueID=VenueToVenueStyles.VenueID WHERE PackageCode!="FRE" AND VenueStyleID="' + styleID + '" AND Country IS NOT NULL AND LTRIM (Country)!="" GROUP BY Country';
        var sqlString3 = 'SELECT Venue.County, COUNT(County) AS VenueCount FROM Venue JOIN VenueToVenueStyles ON Venue.VenueID=VenueToVenueStyles.VenueID WHERE PackageCode!="FRE" AND (';
        var sqlString4 = ') AND County IS NOT NULL AND LTRIM(County)!="" AND VenueStyleID="' + styleID + '" GROUP BY County ORDER BY County ASC';

        var createCountryCountyList = require('/builders/databaseFunctions/createCountryCountyList');
        var countryCountyList = createCountryCountyList(tabGroup, sqlString, sqlString2, sqlString3, sqlString4);

        var createDoubleField = require('/builders/databaseFunctions/createDoubleField');
        var townText = createDoubleField('Venue Town', 'Example Town');

        rowdata.push(countryCountyList[0]);
        rowdata.push(countryCountyList[1]);
        rowdata.push(townText[0]);

        // Create Submit Button

        var submitButtonStyle = require('/builders/submitButtonStyle');
		var submit = submitButtonStyle();
        
        submit.addEventListener('click', function() {

            var createStartActInd = require('/builders/startActInd');
            var startActInd = createStartActInd(selectWin);

            // Retrieve User Inputs

            var townTextResult = townText[1].getValue();

            //Create sql statements

            var sql_cntry = '';
            var sql_cnty = '';

            if (countryCountyList[0].title!='Choose a Country' && countryCountyList[0].title!='United Kingdom') {
                var sql_cntry = ' AND Country="' + countryCountyList[0].title + '"';
                var hasInput = true;
            };

            if (countryCountyList[0].title=='United Kingdom') {
                var sql_cntry = ' AND (Country="United Kingdom" OR Country="England" OR Country="Scotland" OR Country="Wales" OR Country="Northern Ireland" OR Country="Channel Islands" OR Country="Isle of Man")';
                var hasInput = true;
            };

            if (countryCountyList[1].title!='Choose a County') {
                var sql_cnty = ' AND County="' + countryCountyList[1].title + '"';
                var hasInput = true;
            };
            
            if (townTextResult!='') {
                var sql_town = ' AND Town LIKE "%' + townTextResult + '%"';
                var hasInput = true;
            } else {
                var sql_town = '';
            };

            var sqlFilter = sql_cntry + sql_cnty + sql_town;

            var sqlString = 'SELECT * FROM VenueToVenueStyles JOIN Venue ON VenueToVenueStyles.VenueID=Venue.VenueID WHERE PackageCode!="FRE" AND VenueStyleID="' + styleID + '"' + sqlFilter;

            //Create Results Page
            var createResultsPage = require('/builders/createResultsPage');
            var resultsPage = createResultsPage(win, tabGroup, sqlString, hasInput, startActInd[0], startActInd[1], false, false);
            tabGroup.activeTab.open(resultsPage);

            var createEndActInd = require('/builders/endActInd');
            var endActInd = createEndActInd(selectWin, startActInd[0], startActInd[1]);

        });

        var tableview = Titanium.UI.createTableView({
            data:rowdata,
            backgroundColor:'#d2e8f5',
            top:0,
            headerView:headerView,
            footerView:submit
        });
        
        if (Ti.App.Properties.getString('osname') != 'iPad'){
	        tableview.setWidth(300);
	    }

        if (Ti.App.Properties.getString('osname')=='iPad') {
            tableview.setWidth(600);
        }
        
        if (Ti.App.Properties.getString('osname')!='Android'){
        	tableview.setStyle(Titanium.UI.iPhone.TableViewStyle.GROUPED);
        }

        selectWin.add(tableview);

    }

    function getMedia(styleName, styleBanner) {

        var createStartActInd = require('/builders/startActInd');
        var startActInd = createStartActInd(win);

        var sqlString = 'SELECT DISTINCT VenueAdvertOptionsForWeb.VenueID, Venue.* FROM VenueAdvertOptionsForWeb JOIN Venue ON VenueAdvertOptionsForWeb.VenueID == Venue.VenueID WHERE VenueAdvertOptionsForWeb.OptionCode="VID" AND VenueAdvertOptionsForWeb.URL IS NOT NULL AND VenueAdvertOptionsForWeb.URL!=""';

        //Create Results Page
        var createResultsPage = require('/builders/createResultsPage');
        var resultsPage = createResultsPage(win, tabGroup, sqlString, true, null, null, false, false, 'Search', 'Venue Collections', 'Venue Videos', null, '/images/videobanner.png');

		tabGroup.activeTab.open(resultsPage);

        var createEndActInd = require('/builders/endActInd');
        var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);

    }

    function getOffers(styleName, styleBanner) {

        // Create New Win
        var createApplicationWindow = require('/builders/createApplicationWindow');
		var selectWin = createApplicationWindow(tabGroup, null, 'Venue Collections', '#d2e8f5', null, null, null, null);

        tabGroup.activeTab.open(selectWin);

        // Create Rows Array

        var rowdata = [];

		var headerView = Titanium.UI.createView({
            width:Ti.UI.FILL,
            height:Ti.UI.SIZE,
            layout:'vertical'
        });

        var headerImage = Titanium.UI.createImageView({
            image:styleBanner,
            width:Ti.UI.FILL,
            height:55,
            touchEnabled:false,
            top:0
        });
        
        headerView.add(headerImage);
        
        if (Ti.App.Properties.getString('osname')=='iPad') {
            headerImage.setWidth('600');
            headerImage.setHeight(null);
        }
        
        var space = Ti.UI.createView({
        	height:10,
        	top:0,
        	width:Ti.UI.FILL
        });

		headerView.add(space);

        // Create Fields

        //get todays date
        var createTodaysDate = require('/builders/todaysDate');
        var today = createTodaysDate();

        //Define Custom Calls
        var sqlString = 'SELECT COUNT(Country) AS VenueCount FROM Venue JOIN Offers ON Venue.VenueID=Offers.EntryID WHERE (Country="England" OR Country="Wales" OR Country="Scotland" OR Country="Northern Ireland" OR Country="Channel Islands" OR Country="Isle of Man") AND Country IS NOT NULL AND LTRIM(Country)!="" AND Offers.ValidToDate>="' + today + '" ORDER BY Country ASC';
        var sqlString2 = 'SELECT Venue.Country, COUNT(Country) AS VenueCount FROM Venue JOIN Offers ON Venue.VenueID=Offers.EntryID WHERE Country IS NOT NULL AND LTRIM(Country)!="" AND Offers.ValidToDate>="' + today + '" GROUP BY Country ORDER BY Country ASC';
        var sqlString3 = 'SELECT Venue.County, COUNT(County) AS VenueCount FROM Venue JOIN Offers ON Venue.VenueID=Offers.EntryID WHERE (';
        var sqlString4 = ') AND County IS NOT NULL AND LTRIM(County)!="" AND validToDate>="' + today + '" AND Venue.PackageCode!="FRE" GROUP BY County ORDER BY County ASC';

        //Require Country/County Menus
        var createCountryCountyList = require('/builders/databaseFunctions/createCountryCountyList');
        var countryCountyList = createCountryCountyList(tabGroup, sqlString, sqlString2, sqlString3, sqlString4);

        //Require Fields
        var createDoubleField = require('/builders/databaseFunctions/createDoubleField'), createCheckField = require('/builders/databaseFunctions/createCheckField'), venueTown = createDoubleField('Venue Town', 'Example Town'), xmasOffers = createCheckField('Christmas Offers'), wedOffers = createCheckField('Wedding Offers');

        rowdata.push(countryCountyList[0]), rowdata.push(countryCountyList[1]), rowdata.push(venueTown[0]), rowdata.push(xmasOffers[0]), rowdata.push(wedOffers[0]);

        // Create Submit Button

        var submitButtonStyle = require('/builders/submitButtonStyle');
		var submit = submitButtonStyle();
        
        submit.addEventListener('click', function() {

            var createStartActInd = require('/builders/startActInd');
            var startActInd = createStartActInd(selectWin);

            // Retrieve User Inputs

            var townTextResult = venueTown[1].getValue();

            // Set Blank Values

            var sql_start = 'SELECT * FROM Venue JOIN Offers ON Venue.VenueID=Offers.EntryID WHERE EntryID IS NOT NULL AND validToDate>="' + today + '"';
            var sql_country = '';
            var sql_county = '';
            var sql_town = '';
            var sql_wed = '';
            var sql_xmas = '';

            if (wedOffers[0].checkValue==1) {
                var hasInput = true;
                isWedOff = '1';
                var sql_wed = ' AND WeddingOffer="' + wedOffers[0].checkValue + '"';
            }

            if (xmasOffers[0].checkValue==1) {
                var hasInput = true;
                isXmasOff = '1';
                var sql_xmas = ' AND ChristmasOffer="' + xmasOffers[0].checkValue + '"';
            }

            // Create SQL Query

            if (countryCountyList[0].title!='Choose a Country' && countryCountyList[0].title!='United Kingdom') {
                var sql_country = ' AND Country="' + countryCountyList[0].title + '"';
                var hasInput = true;
            };

            if (countryCountyList[0].title=='United Kingdom') {
                var sql_country = ' AND (Country="United Kingdom" OR Country="England" OR Country="Scotland" OR Country="Wales" OR Country="Northern Ireland" OR Country="Channel Islands" OR Country="Isle of Man")';
                var hasInput = true;
            };

            if (countryCountyList[1].title!='Choose a County') {
                var sql_county = ' AND County="' + countryCountyList[1].title + '"';
                var hasInput = true;
            };

            if (townTextResult!='') {
                var sql_town = ' AND Town LIKE "%' + townTextResult + '%"';
                var hasInput = true;
            };

            var sqlString = sql_start + sql_country + sql_county + sql_town + sql_wed + sql_xmas;

            //Create Results Page
            var createResultsPage = require('/builders/createResultsPage');
            var resultsPage = createResultsPage(win, tabGroup, sqlString, hasInput, null, null, false, true);
            tabGroup.activeTab.open(resultsPage);

            var createEndActInd = require('/builders/endActInd');
            var endActInd = createEndActInd(selectWin, startActInd[0], startActInd[1]);

        });

        // Create Search Table

        var tableview = Titanium.UI.createTableView({
            data:rowdata,
            backgroundColor:'#d2e8f5',
            headerView:headerView,
            footerView:submit,
            top:0
        });
        
        if (Ti.App.Properties.getString('osname') != 'iPad'){
			tableview.setWidth(300);
		}

        if (Ti.App.Properties.getString('osname')=='iPad') {
            tableview.setWidth(600);
        }
        
        if (Ti.App.Properties.getString('osname')!='Android'){
        	tableview.setStyle(Titanium.UI.iPhone.TableViewStyle.GROUPED);
        }

        selectWin.add(tableview);
    }

    //Create Scroll View + Add Images

    var scroll = Titanium.UI.createScrollView({
        contentWidth:'auto',
        contentHeight:'auto',
        layout:'vertical',
        height:'98%',
        top:'0%',
        backgroundColor:'#FFFFFF'
    });
    
    if (Ti.App.Properties.getString('osname') == 'iPad') {
            scroll.setBackgroundColor('#d2e8f5');
        }

    var image = Titanium.UI.createImageView({
        image:'/images/col-4starhotels.jpg',
        width:320,
        height:55,
        venueStyle:'39',
        styleName:'4 & 5 Star Hotels'
    });

    scroll.add(image);

    var image2 = Titanium.UI.createImageView({
        image:'/images/col-conference.jpg',
        width:320,
        height:55,
        venueStyle:'3',
        styleName:'Conference Centre Venues'
    });

    scroll.add(image2);

    var image3 = Titanium.UI.createImageView({
        image:'/images/col-unusual.jpg',
        width:320,
        height:55,
        venueStyle:'15',
        styleName:'Unusual Venues'
    });

    scroll.add(image3);

    var image4 = Titanium.UI.createImageView({
        image:'/images/col-venueoffers.jpg',
        width:320,
        height:55,
        venueStyle:'',
        styleName:'Venue Offers'
    });

    scroll.add(image4);

    var image5 = Titanium.UI.createImageView({
        image:'/images/col-virtualtours.jpg',
        width:320,
        height:55,
        styleName:'Venue Videos'
    });

    scroll.add(image5);

    var image6 = Titanium.UI.createImageView({
        image:'/images/col-weddings.jpg',
        width:320,
        height:55,
        venueStyle:'34',
        styleName:'Wedding Venues'
    });

    scroll.add(image6);

    if (Ti.App.Properties.getString('osname')=='iPad') {
        image.setWidth('600');
        image.setHeight('95');
        image2.setWidth('600');
        image2.setHeight('95');
        image3.setWidth('600');
        image3.setHeight('95');
        image4.setWidth('600');
        image4.setHeight('95');
        image5.setWidth('600');
        image5.setHeight('95');
        image6.setWidth('600');
        image6.setHeight('95');
    }

    win.add(scroll);

    image.addEventListener('click', function(e) {
        var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		win.setTouchEnabled(false);

        var style = image.venueStyle;
        var name = image.styleName;
        var banner = image.getImage();
        getVenues(style, name, banner);

        var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		win.setTouchEnabled(true);

    });

    image2.addEventListener('click', function(e) {
        var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		win.setTouchEnabled(false);

        var style = image2.venueStyle;
        var name = image2.styleName;
        var banner = image2.getImage();
        getVenues(style, name, banner);

        var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		win.setTouchEnabled(true);

    });

    image3.addEventListener('click', function(e) {
        var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		win.setTouchEnabled(false);

        var style = image3.venueStyle;
        var name = image3.styleName;
        var banner = image3.getImage();
        getVenues(style, name, banner);

        var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		win.setTouchEnabled(true);

    });

    image4.addEventListener('click', function(e) {
        var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		win.setTouchEnabled(false);

        var name = image4.styleName;
        var banner = image4.getImage();
        getOffers(name, banner);

        var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		win.setTouchEnabled(true);

    });

    image5.addEventListener('click', function(e) {
        var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		win.setTouchEnabled(false);

        var name = image5.styleName;
        var banner = image5.getImage();

        var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		win.setTouchEnabled(true);

        getMedia(name, banner);

    });

    image6.addEventListener('click', function(e) {
        var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		win.setTouchEnabled(false);

        var style = image6.venueStyle;
        var name = image6.styleName;
        var banner = image6.getImage();
        getVenues(style, name, banner);

        var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		win.setTouchEnabled(true);

    });

    // Require & Create advert space
    var createAdvert = require('/builders/createAdvert');
    var advert = createAdvert(true);
    win.add(advert);

    return win;

}

module.exports = venueCollections;
