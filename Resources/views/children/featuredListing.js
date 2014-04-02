function featuredListing(tabGroup, venueID, tabSelect, curWin) {

    var win = Ti.UI.createView({
        width:Ti.UI.FILL,
        height:Ti.UI.FILL
    });

    if (Ti.App.Properties.getString('osname')!='iPad') {
        curWin.setTitle('Venue Info');
    }

    //get todays date
    var createTodaysDate = require('/builders/todaysDate');
    var today = createTodaysDate();

    //check offers
    var hasOffer = false;

    var createDatabase = require('/builders/databaseFunctions/createDatabase');
    var db = createDatabase('/venuefinder.db', 'venuefinder');
    var row = db.execute('SELECT * FROM Offers WHERE EntryID="' + venueID + '" AND validToDate>="' + today + '"');

    if (row.rowCount!=0) {
        hasOffer = true;
    }

    //Get venue Type

    var getPackage = db.execute('SELECT * FROM Venue WHERE VenueID = "' + venueID + '"');
    var venuePackage = getPackage.fieldByName('PackageCode');
    db.close();

    //Load Tabs

    var createTabs = require('/views/children/listingElements/createTabs');
    var tabs = createTabs(win);

    //Specify Tabs

    var tab1 = tabs.children[0], tab2 = tabs.children[1], tab3 = tabs.children[2], tab4 = tabs.children[3], tab5 = tabs.children[4];

    if (venuePackage!='FRE') {
        win.add(tabs);
    }else{
    	var tabs = Ti.UI.createView({
	        width:'325',
	        height:Ti.UI.SIZE,
	        layout:'horizontal',
	        top:'0',
	        left:'0',
	        zIndex:'7',
	        backgroundColor:'#FFF'
         });
    
    	win.add(tabs);
    }

    //Listings Listeners
    var hasFacility = true;
    var hasLeisure = true;

    // See If Favorited?

    var isFavourited = null;

    // Create Scroll

    var scroll = Titanium.UI.createScrollView({
        width:320,
        height:Ti.UI.FILL,
        top:40,
        zIndex:5,
        layout:'vertical',
        backgroundColor:'#FFF'
    });
    
    win.add(scroll);
    
    if (venuePackage=='FRE') {
    	scroll.setTop(0);	
    }
    
    if (Ti.App.Properties.getString('osname')=='iPad') {

        scroll.setTop('200');
        
        if (venuePackage=='FRE') {
            scroll.setLeft(80);
            scroll.setWidth(765);
        } else {
            scroll.setLeft(255);
            scroll.setWidth(510);
        }

        scroll.setHeight(454);

    }

    // add extra iPad Elements

    if (Ti.App.Properties.getString('osname')=='iPad') {

        var barExists = false;

        var createHeaderScroll = require('/views/children/listingElements/createHeaderScroll');
        var headerScroll = createHeaderScroll(tabGroup, venueID);
        win.add(headerScroll);

        //Create sidebar
        var sideBar = Titanium.UI.createScrollView({
            width:255,
            height:255,
            contentHeight:'auto',
            top:200,
            right:0,
            layout:'vertical',
            zIndex:6
        });

        //for Fre Listings

        if (venuePackage=='FRE') {
            sideBar.setRight(80);
        }

        //Pull content for sidebar
        var createHeaderElements = require('/views/children/listingElements/createHeaderElements');
        var headerElements = createHeaderElements(tabGroup, win, scroll, venueID, tab1, tab2, tab3, tab4, tab5);
        sideBar.add(headerElements);

        win.add(sideBar);
    }

    tabs.addEventListener('click', function(e) {

		var tabName;
		var contentPath;
		var nonSelectedImage;
		var selectedImage;
		var touchEnabled;

		if (e.tabName != null){
			tabName = e.tabName;
			contentPath = e.contentPath;
			nonSelectedImage = e.nonSelectedImage;
			selectedImage = e.selectedImage;
			touchEnabled = e.touchEnabled;
		} else {
			tabName = e.source.name;
			contentPath = e.source.contentPath;
			nonSelectedImage = e.source.nonSelectedImage;
			selectedImage = e.source.selectedImage;
			touchEnabled = e.source.touchEnabled;
		}

        if (touchEnabled==true && tabName!=null) {
	
            //Clear View
            scroll.removeAllChildren();

            //Reset Buttons
            for (var i = 0; i<tabs.children.length; i++) {

                if (tabs.children[i].touchEnabled==true) {

                    if (tabs.children[i].name!=tabName) {
                        tabs.children[i].setImage(tabs.children[i].nonSelectedImage);
                    } else {
                        tabs.children[i].setImage(selectedImage);
                    }

                }

            }

            //Network Offline Notifier

            if (Titanium.Network.online==false && Ti.App.Properties.getString('osname')!='Android') {
                var noConnectionLabel = Titanium.UI.createLabel({
                    text:'No Internet Connection',
                    color:'#FFF',
                    font: {
                        fontWeight:'bold',
                        fontFamily:'Arial',
                        fontSize:18
                    },
                    zIndex:'25'
                });

                var noConnection = Titanium.UI.iOS.createToolbar({
                    barColor:'orange',
                    top:37.5,
                    zIndex:'20',
                    opacity:'0.9'
                });

                if (Ti.App.Properties.getString('osname')=='iPad') {
                    noConnection.setTop(200);
                    scroll.setTop(240);
                    sideBar.setTop(240);
                    tabs.setTop(240);
                    scroll.setHeight(414);
                } else {
                	
                	scroll.setTop(80);
                	
                }

                noConnection.add(noConnectionLabel);
                win.add(noConnection);
            }

            // Deactivate tabs depending on network status

            if (Ti.Network.online==false) {
                if (Ti.App.Properties.getString('osname')!='iPad') {
                    tab2.setImage('/images/photos_media_ns.png');
                    tab2.setTouchEnabled(false);
                }

                if (Ti.App.Properties.getString('osname')=='iPad') {
                    tab3.setImage('/images/tab3_ipad_ns.png');
                    tab3.setTouchEnabled(false);
                    tab4.setImage('/images/tab4_ipad_ns.png');
                    tab4.setTouchEnabled(false);
                } else {
                    tab3.setImage('/images/meeting_rooms_ns.png');
                    tab3.setTouchEnabled(false);
                    tab4.setImage('/images/venue_facilities_ns.png');
                    tab4.setTouchEnabled(false);
                }

            }

            //Deactivate Offers Tab if no offer is found
            if (hasOffer==false) {
                if (Ti.App.Properties.getString('osname')=='iPad') {
                    tab5.setImage('/images/tab5_ipad_ns.png');
                    tab5.setTouchEnabled(false);
                } else {
                    tab5.setImage('/images/special_offers_ns.png');
                    tab5.setTouchEnabled(false);
                }
            }

            //Load New Tab
            var createTab = require('/views/children/listingElements/' + contentPath);
            createTab(tabGroup, win, scroll, venueID, tabs);

            //Set window title
            curWin.setTitle(tabName);
        }
    });

    //Choose tab to open on
    if (tabSelect=='Media' && Ti.App.Properties.getString('osname')!='iPad' && Ti.Network.online == true) {
        tabs.fireEvent('click', {tabName:'Photos & Media', contentPath:'createMediaTab', nonSelectedImage:'/images/photos_media.png', selectedImage:'/images/photos_media_s.png', touchEnabled:true});
    } else if (tabSelect=='Offers' && Ti.App.Properties.getString('osname')!='iPad') {
        tabs.fireEvent('click', {tabName:'Special Offers', contentPath:'createOffersTab', nonSelectedImage:'/images/special_offers.png', selectedImage:'/images/special_offers_s.png', touchEnabled:true});
    } else if (Ti.App.Properties.getString('osname')!='iPad' && tabSelect == null || tabSelect == '') {
        tabs.fireEvent('click', {tabName:'Venue Info', contentPath:'createInfoTab', nonSelectedImage:'/images/venue_info.png', selectedImage:'/images/venue_info_s.png', touchEnabled:true});
    }
  
  	if (tabSelect=='Offers' && Ti.App.Properties.getString('osname')=='iPad') {
        tabs.fireEvent('click', {tabName:'Special Offers', contentPath:'createOffersTab', nonSelectedImage:'/images/tab5_ipad.png', selectedImage:'/images/tab5_ipad_s.png', touchEnabled:true});
    } else if (tabSelect=='Media' && Ti.App.Properties.getString('osname')=='iPad'){
    	tabs.fireEvent('click', {tabName:'Venue Info', contentPath:'createInfoTab', nonSelectedImage:'/images/tab1_ipad.png', selectedImage:'/images/tab1_ipad_s.png', touchEnabled:true});
    } else if (Ti.App.Properties.getString('osname')=='iPad' && tabSelect == null || tabSelect == '') {
        tabs.fireEvent('click', {tabName:'Venue Info', contentPath:'createInfoTab', nonSelectedImage:'/images/tab1_ipad.png', selectedImage:'/images/tab1_ipad_s.png', touchEnabled:true});
    }
  
    return win;

}

module.exports = featuredListing;
