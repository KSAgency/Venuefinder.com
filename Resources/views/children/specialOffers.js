function specialOffers(tabGroup) {

    var win = Ti.UI.createView({
        width:'100%',
        height:'100%'
    });

    var calOffset = 0;

    // Set Geolocation Attribs

    Titanium.Geolocation.purpose = "Pinpoint you on the map";
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Titanium.Geolocation.frequency = 5000;

    //Top View

    var textView = Titanium.UI.createView({
        width:Ti.UI.FILL,
        height:90,
        top:0
    });

    var topButton = Titanium.UI.createImageView({
        image:'/images/offers_near_me.png',
        top:10,
        width:300,
        height:54
    });

    var subText = Titanium.UI.createLabel({
        text:'or, fill out the form below',
        color:'#666',
        width:300,
        textAlign:'center',
        font: {
            fontFamily:'Arial',
            fontSize:14
        },
        top:70
    });
    
    if (Ti.App.Properties.getString('osname')=='iPad') {
        topButton.setWidth(216);
        topButton.setHeight(39);
        topButton.setLeft(0);
        topButton.setTop(10);
        subText.setTop(20);
    }

    textView.add(topButton);
    textView.add(subText);

    topButton.addEventListener('click', function() {
        
        var createStartActInd = require('/builders/startActInd');
        var startActInd = createStartActInd(win);
        win.setTouchEnabled(false);

        if (Ti.Network.online==true) {

            //Require & Create map window
            var createMapView = require('/builders/createMapView');
            var mapView = createMapView(tabGroup, null, 'Venue Map', true, 'Search', 'Special Offers', 'Geolocation', null, true);

            //Open Window
            var createApplicationWindow = require('/builders/createApplicationWindow');
            var windowElements = createApplicationWindow(tabGroup, mapView, 'Venue Map', '#d2e8f5', 'Map', 'Geolocation', '', '');

            var createEndActInd = require('/builders/endActInd');
            var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
            win.setTouchEnabled(true);

        } else {

            var noInt = Titanium.UI.createAlertDialog({
                title:'No Internet Connection',
                message:'Due to the fact that your internet is currently offline, we could not recieve your location. Please use the form below to view venues based on their location.'
            });

            noInt.show();
            
            var createEndActInd = require('/builders/endActInd');
            var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
            win.setTouchEnabled(true);

        }
    });

    // Create Rows Array

    var rowdata = [];

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
        var startActInd = createStartActInd(win);

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
        var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);

    });

    // Create Search Table

    var tableview = Titanium.UI.createTableView({
        style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
        data:rowdata,
        backgroundColor:'#d2e8f5',
        headerView:textView,
        footerView:submit,
        top:0,
        height:'89.5%'
    });

    if (Ti.App.Properties.getString('osname')=='iPad') {
        tableview.setWidth(600);
        tableview.setScrollable(false);
        tableview.setTop('100');
    } else {
    	tableview.setWidth(300);
    }

    win.add(tableview);

    // Require & Create advert space
    var createAdvert = require('/builders/createAdvert');
    var advert = createAdvert();
    win.add(advert);

    return win;

}

module.exports = specialOffers;

