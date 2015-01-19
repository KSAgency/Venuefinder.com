function newApplicationTabGroup() {

    //Create tabGroup & require views
    //var tabGroup = Ti.UI.createTabGroup(), searchView = require('/views/searchView'), mapView = require('/views/mapView'), mediaView = require('/views/mediaView'), offersView = require('/views/offersView'), favouritesView = require('/views/favouritesView');
    var tabGroup = Ti.UI.createTabGroup({tintColor:'#FFF', tabsTintColor:'#2195be'}), searchView = require('/views/searchView'), mapView = require('/views/mapView'), mediaView = require('/views/mediaView'), offersView = require('/views/offersView'), favouritesView = require('/views/favouritesView');

    //Require dashboard files & reference tabGroup
    var applicationDashboard = require('/builders/applicationDashboard'), home_screen = applicationDashboard(tabGroup);

	var home_button = Titanium.UI.createButton({
			        title:'Home',
			        backgroundColor:'#FFF',
			        tintColor:'#FFF',
		    });

		searchView.home_button =  home_button;
		mapView.home_button =  home_button;
		offersView.home_button =  home_button;
		
    //Create app wins & tabs
    var win1 = searchView(tabGroup, 'Search', '#d2e8f5'), win2 = mapView(tabGroup, 'Map', '#d2e8f5'), win3 = mediaView(tabGroup, 'Videos', '#d2e8f5'), win4 = offersView(tabGroup, 'Offers', '#d2e8f5'), win5 = favouritesView(tabGroup, 'Favourites', '#d2e8f5');

    var tab1 = Ti.UI.createTab({
        title:'Search',
        icon:'/images/search.png',
        window:win1
    });
    tabGroup.tab1 = tab1;

    var tab2 = Ti.UI.createTab({
        title:'Map',
        icon:'/images/map.png',
        window:win2
    });
    tabGroup.tab2 = tab2;

    var tab3 = Ti.UI.createTab({
        title:'Video',
        icon:'/images/media.png',
        window:win3
    });
    tabGroup.tab3 = tab3;

    var tab4 = Ti.UI.createTab({
        title:'Offers',
        icon:'/images/offers.png',
        window:win4
    });
    tabGroup.tab4 = tab4;

    var tab5 = Ti.UI.createTab({
        title:'Favourites',
        icon:'/images/favourites.png',
        window:win5[0],
        bubbleParent:false
    });
    tabGroup.tab5 = tab5;
    
    if (Ti.App.Properties.getString('osname') == 'Android'){
    	tab1.setIcon(null);
    	tab2.setIcon(null);
    	tab3.setIcon(null);
    	tab4.setIcon(null);
    	tab5.setIcon(null);
    }
    
    tabGroup.addTab(tab1);
    tabGroup.addTab(tab2);
    tabGroup.addTab(tab3);
    tabGroup.addTab(tab4);
    tabGroup.addTab(tab5);

    // Add Buttons To Windows
    if (Titanium.App.Properties.getString('osname')!='Android') {

		tabGroup.addEventListener('singletap', function(e){
			win5[1]();
		});

	    
        
        win1.leftNavButton = home_button;
        win2.leftNavButton = home_button;
        win3.leftNavButton = home_button;
        win4.leftNavButton = home_button;
        win5[0].leftNavButton = home_button;
        
        // Setup Listener

	    home_button.addEventListener('click', function(e) {
	          home_screen.show();
	    });
    }
    
    if (Ti.App.Properties.getString('osname') == 'Android'){
    	tabGroup.addEventListener('androidback', function(){
    		tabGroup.activeTab.open(home_screen);
    	});
    	
    	return [tabGroup];
    	
    } else {
    	
    	return [tabGroup, home_screen];
    	
    }

};

module.exports = newApplicationTabGroup;
