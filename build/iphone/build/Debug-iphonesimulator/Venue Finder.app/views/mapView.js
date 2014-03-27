function mapView(tabGroup, title, backgroundColor) {

    var win = Titanium.UI.createWindow({
		backgroundColor:backgroundColor,
		title:title,
		width:Ti.UI.FILL,
        height:Ti.UI.FILL
	});
        
    if (Ti.App.Properties.getString('osname') != 'Android'){
            win.setBarColor('#2195be');  
            win.setBackButtonTitle('Back');
            win.setTintColor('#FFF');
            win.setTranslucent(false);
            win.setTitleControl(Ti.UI.createLabel({
				text:title,
	            color:'#FFF',
	            width:Ti.UI.SIZE
	        }));
	}

    // Initial Omniture

    var omniture = Titanium.UI.createWebView({
        html:'<html><head><script type="text/javascript" src="s_code.js"></script></head><body><script>' + 's.channel="' + Ti.App.Properties.getString('osname') + '";' + 's.pageName="Map";' + 'var s_code=s.t(); if(s_code)document.write(s_code)</script> <script>if(navigator.appVersion.indexOf("MSIE")>=0)document.write(unescape("%3C")+"\!-"+"-")</script><noscript><img src="https://cmpi.122.2o7.net/b/ss/cmpivenuefinderappprod/1/H.25.2--NS/0?[AQB]&cdp=3&[AQE]"height="1" width="1" border="0" alt="" /></noscript></body></html>',
        opacity:0,
        width:0,
        height:0,
        left:0,
        right:0,
        touchEnabled:false
    });

    win.add(omniture);

    function loadForm() {

		//Android Top View
		
		if (Ti.App.Properties.getString('osname') == 'Android'){
			
			var buttonView = Titanium.UI.createView({
				width:Ti.UI.FILL,
				height:90,
				top:0
			});
	
			var topButton = Titanium.UI.createImageView({
				image:'/images/button_search_near.png',
				top:10,
				width:300,
				height:54
			});
	
			var subText = Titanium.UI.createLabel({
				text:'or, fill out the form below',
				color:'#666',
				width:300,
				textAlign:'center',
				font:{
					fontFamily:'Arial',
					fontSize:14
				},
				top:70
			});
			
			buttonView.add(topButton);
    		buttonView.add(subText);
			
			buttonView.addEventListener('click', function(){
				
				if (Ti.Network.online==false) {
		            var noNet = Titanium.UI.createAlertDialog({
		                message:'Please connect to the internet to locate yourself on the map',
		                title:'No Internet Connection'
		            });
		
		            noNet.show();
		        } else {
		            nearUser();
		        }
						
			});
		
		}

        // Create Rows Array

        var rowdata = [];

        // Require & Create Fields

        //Get Country & County functions
        var createCountryCountyList = require('/builders/databaseFunctions/createCountryCountyList');
        var countryCountyList = createCountryCountyList(tabGroup);

        //Input Boxes
        var createDoubleField = require('/builders/databaseFunctions/createDoubleField');
        var townText = createDoubleField('Venue Town', 'Example Town');

        rowdata.push(countryCountyList[0]);
        rowdata.push(countryCountyList[1]);
        rowdata.push(townText[0]);

        // Create Submit Button

		var submitButtonStyle = require('/builders/submitButtonStyle');
		var submit = submitButtonStyle();

        submit.addEventListener('click', function() {

            var createApplicationWindow = require('/builders/createApplicationWindow');
			var mapWin = createApplicationWindow(tabGroup, null, 'Venue Map', '#d2e8f5', null, null, null, null);

            var createStartActInd = require('/builders/startActInd');
			var startActInd = createStartActInd(win);
			win.setTouchEnabled(false);

            // Retrieve User Inputs

            var townTextResult = townText[1].getValue();

            // Set Blank Values

            var sql_start = 'SELECT * FROM Venue JOIN VenueCoords ON Venue.VenueID=VenueCoords.VenueID WHERE VenueCoords.Latitude IS NOT NULL';
            var sql_country = '';
            var sql_county = '';
            var sql_town = '';

            // Input Checker

            var hasInput = null;
            var hasCounty = null;
            var ukSelected = null;

            // Create SQL Query

            if (countryCountyList[0].title!='Choose a Country' && countryCountyList[0].title!='United Kingdom') {
                var sql_country = ' AND Country="' + countryCountyList[0].title + '"';
                var hasInput = true;
            };
            if (countryCountyList[0].title=='United Kingdom') {
                var sql_country = ' AND (Country="United Kingdom" OR Country="England" OR Country="Scotland" OR Country="Wales" OR Country="Northern Ireland" OR Country="Channel Islands" OR Country="Isle of Man")';
                var hasInput = false;
                ukSelected = true;
            };
            if (countryCountyList[1].title!='Choose a County') {
                var sql_county = ' AND County="' + countryCountyList[1].title + '"';
                var hasInput = true;
                var hasCounty = true;
            };
            if (townTextResult!='') {
                var sql_town = ' AND Town LIKE "%' + townTextResult + '%"';
                var hasInput = true;
                var hasCounty = true;
            };

            var sqlString = sql_start + sql_country + sql_county + sql_town;
            if (hasInput==true) {

                //Require & Create Map Window
                var createMapView = require('/builders/createMapView');
                var mapView = createMapView(tabGroup, sqlString, 'Venue Map', null, 'Map', 'Form Search', null, null);

                //Open Window
                var createApplicationWindow = require('/builders/createApplicationWindow');
                var windowElements = createApplicationWindow(tabGroup, mapView, 'Venue Map', '#d2e8f5', 'Map', 'Form Search', '', '');

                var createEndActInd = require('/builders/endActInd');
				var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
				win.setTouchEnabled(true);

            } else {
                var noInput = Titanium.UI.createAlertDialog({
                    title:'Error',
                    message:'To search, please fill out one or more fields'
                });

                if (ukSelected==true) {
                    noInput.setTitle('To search, please either choose a county or enter the name of a town');
                }

                noInput.show();

                var createEndActInd = require('/builders/endActInd');
				var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
				win.setTouchEnabled(true);
            }

        });

        var tableview = Titanium.UI.createTableView({
            data:rowdata,
            backgroundColor:'#d2e8f5',
            footerView:submit,
            top:'0%',
            scrollable:false
        });
        
        if (Ti.App.Properties.getString('osname')!= 'iPad'){
			tableview.setWidth(300);
			tableview.setTop(10);
		}
        
        if (Ti.App.Properties.getString('osname')!='Android'){
        	tableview.setStyle(Titanium.UI.iPhone.TableViewStyle.GROUPED);
        } else {
        	tableview.setHeaderView(buttonView);
        }

        if (Ti.App.Properties.getString('osname')=='iPad') {
            tableview.setWidth(600);
            tableview.setHeight('100%');
            tableview.setScrollable(false);
            tableview.setTop(100);
        }

        win.add(tableview);
        
		mapView.home_button.addEventListener('click', function(e) {
		        townText[1].blur();
		    });

    }

    loadForm();

    var omniture = Titanium.UI.createWebView({
        html:'<html><head><script type="text/javascript" src="s_code.js"></script></head><body><script>' + 's.channel="' + Ti.App.Properties.getString('osname') + '";' + 's.pageName="Map";' + 's.events="event4";' + 'var s_code=s.t(); if(s_code)document.write(s_code)</script> <script>if(navigator.appVersion.indexOf("MSIE")>=0)document.write(unescape("%3C")+"\!-"+"-")</script><noscript><img src="https://cmpi.122.2o7.net/b/ss/cmpivenuefinderappprod/1/H.25.2--NS/0?[AQB]&cdp=3&[AQE]"height="1" width="1" border="0" alt="" /></noscript></body></html>',
        opacity:'0',
        width:'0',
        height:'0',
        left:'0',
        right:'0',
        touchEnabled:false
    });

    win.add(omniture);

    // Near Me Function
    function nearUser() {

        var createApplicationWindow = require('/builders/createApplicationWindow');
		var mapWin = createApplicationWindow(tabGroup, null, 'Venue Map', '#d2e8f5', null, null, null, null);

        var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		win.setTouchEnabled(false);

        //Require & Create map window
        var createMapView = require('/builders/createMapView');
        var mapView = createMapView(tabGroup, null, 'Venue Map', true, 'Map', 'Geolocation', null, null);

        //Open Window
        var createApplicationWindow = require('/builders/createApplicationWindow');
        var windowElements = createApplicationWindow(tabGroup, mapView, 'Venue Map', '#d2e8f5', 'Map', 'Geolocation', '', '');

        var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		win.setTouchEnabled(true);

    }

    var locateButton = Titanium.UI.createButton({
        title:'Near You'
    });

    if (Ti.Platform.osname!='android') {
        win.setRightNavButton(locateButton);
    }

    locateButton.addEventListener('click', function() {
        if (Ti.Network.online==false) {
            var noNet = Titanium.UI.createAlertDialog({
                message:'Please connect to the internet to locate yourself on the map',
                title:'No Internet Connection'
            });

            noNet.show();
        } else {
            nearUser();
        }
    });

    // Load Pins From DB

    var createDatabase = require('/builders/databaseFunctions/createDatabase');
    var db = createDatabase('/venuefinder.db', 'venuefinder');

    var data = [];

    var firstGeo = Titanium.UI.createAlertDialog({
        title:'Show Venues Near Me',
        message:'Would you like to see up to 500 venues within a 25 mile radius of your location',
        buttonNames:['No Thanks', 'Yes Please'],
        opened:false
    });

    if (Titanium.Network.online==true) {

        tabGroup.addEventListener('focus', function() {
            if (tabGroup.activeTab.title=='Map' && firstGeo.opened==false) {
                firstGeo.show();
                firstGeo.opened = true;
            }
        });

        var omniture = Titanium.UI.createWebView({
            html:'<html><head><script type="text/javascript" src="s_code.js"></script></head><body><script>' + 's.channel="' + Ti.App.Properties.getString('osname') + '";' + 's.pageName="Map";' + 's.prop1="Near Me";' + 'var s_code=s.t(); if(s_code)document.write(s_code)</script> <script>if(navigator.appVersion.indexOf("MSIE")>=0)document.write(unescape("%3C")+"\!-"+"-")</script><noscript><img src="https://cmpi.122.2o7.net/b/ss/cmpivenuefinderappprod/1/H.25.2--NS/0?[AQB]&cdp=3&[AQE]"height="1" width="1" border="0" alt="" /></noscript></body></html>',
            opacity:'0',
            width:'0pts',
            height:'0pts',
            left:'0pts',
            right:'0pts',
            touchEnabled:false
        });

        win.add(omniture);

    }

    firstGeo.addEventListener('click', function(e) {
        if (e.index==1) {
            loadForm();
            nearUser();
        } else {
            loadForm();
        }

    });

	


    return win;

}

module.exports = mapView;
