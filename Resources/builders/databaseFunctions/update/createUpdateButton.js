function createUpdateButton(win, offersButton) {

	if (!offersButton){
	
		// Create Label
		var infoLine = Titanium.UI.createLabel({
			text:'Updated: N/A',
			ellipsize:false,
			font:{fontSize:11, fontFamily:'Arial', fontWeight:'bold'},
			textAlign:'left',
			left:25,
			color:'#666',
			top:30,
			zIndex:'3',
			height:Ti.UI.SIZE
		});
		
		win.add(infoLine);
	
		var button = Titanium.UI.createImageView({
			image:'/images/update.png',
			left:170,
			zIndex:3,
			top:25,
			width:80,
			dontShow:true,
			showCounter:0
		});
		
		if (Ti.App.Properties.getString('osname') == 'iPad') {
			
			button.setLeft(380);
			infoLine.setLeft(210);
			infoLine.setTextAlign('left');
			
		} else if (Ti.App.Properties.getString('osname') == 'Android'){
			
			button.setTop(15);
			infoLine.setTop(20);
			
		}
		
	}
	
	//Requires
	var getExportTimestamp = require('/builders/databaseFunctions/update/getExportTimestamp');
	var getUpdateTimestamp = require('/builders/databaseFunctions/update/getUpdateTimestamp');
	var setUpdateTimestamp = require('/builders/databaseFunctions/update/setUpdateTimestamp');
	
	//Get last update timestamp
	var lastUpdateTimestamp = getUpdateTimestamp(button, infoLine);
	var exportTimestamp = getExportTimestamp("http://venuefindermobile.live.x-rm.com/webapi-v1/api/general/GetMainDatabaseModifiedDate");
		
	//checking loop
	setInterval(function(){
		
		exportTimestamp = getExportTimestamp("http://venuefindermobile.live.x-rm.com/webapi-v1/api/general/GetMainDatabaseModifiedDate");
		lastUpdateTimestamp = getUpdateTimestamp(button, infoLine);

		Ti.App.addEventListener('recievedDate', function(e){
			
			if (parseFloat(e.date) > lastUpdateTimestamp){
				button.dontShow = false;
			}
			
			exportTimestamp = e.date.toString();
		});
		
		if (button.dontShow == false && button.showCounter == 0) {
			
			button.showCounter = ++button.showCounter;
			
			win.add(button);
			button.dontShow = true;

			var updateAv = Titanium.UI.createAlertDialog({
				title:'Update Available',
				message:'Download the latest venues & offers by pressing the blue button at the top of the home screen.'
			});

			updateAv.show();

		}
		
	}, 30000); 

	
	button.addEventListener('click', function() {
		
		if (Ti.Network.online == true){
		
			var updateAlert = Titanium.UI.createAlertDialog({
				title:'Update Information',
				message:'There are over 15,000 venues on our database, so we recommend that you update the listings via a WiFi connection.',
				buttonNames:['Update Later', 'Update Now']
			});
	
			updateAlert.show();
	
			updateAlert.addEventListener('click', function(e) {
				
				if (e.index == 1) {
	
					var updateDatabase = require('/builders/databaseFunctions/update/updateDatabase');
	    			var update = updateDatabase('venuefinder', win);
	    			
	    			setUpdateTimestamp();
	    			getUpdateTimestamp(button, infoLine);
	    			
	    			button.dontShow = true;
	    			button.showCounter = 0;
	    			win.remove(button);
	    		
				}
	
			});
			
		} else {
			
			var updateAlert = Titanium.UI.createAlertDialog({
				title:'Connection Error',
				message:'You do not have any access to the internet, please connect to either Wi-FI or 3G network',
				buttonNames:['Done']
			});
	
			updateAlert.show();
			
		}
		
	});
	
	
}

module.exports = createUpdateButton; 