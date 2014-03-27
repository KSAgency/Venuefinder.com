//Main load

(function() {
	
	//Get Properties
    var osname = Ti.Platform.osname;

    //Format Name for Analytics Input
    if (osname=='iphone') {
        osname = 'iPhone';
    } else if (osname=='ipad') {
        osname = 'iPad';
    } else if (osname=='android') {
        osname = 'Android';
    }

    //Set Globally
    Ti.App.Properties.setString('osname', osname);
	
	var createDatabase = require('/builders/databaseFunctions/createDatabase'), 
	db = createDatabase('/venuefinder.db', 'venuefinder');

	
    //Update DB
    setTimeout(function(){
		var updateDatabase = require('/builders/databaseFunctions/update/updateDatabase');
    	var update = updateDatabase('specialoffers', null);
	}, 5000);

    // Requires
    var applicationTabGroup = require('/builders/newApplicationTabGroup');
    var tabGroup = applicationTabGroup();

    var applicationRateAlert = require('/builders/applicationRateAlert');
    var rateAlert = applicationRateAlert();

    // Openers
    tabGroup[0].open();
    
    if (osname!='Android'){
    	tabGroup[1].open();	
    } else {
    	tabGroup[0].fireEvent('androidback');
    }
    
    if (osname == 'iPhone') {
        rateAlert.show();
    }

})();
