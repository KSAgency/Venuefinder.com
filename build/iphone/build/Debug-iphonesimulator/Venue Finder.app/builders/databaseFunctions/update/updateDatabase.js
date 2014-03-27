function updateDatabase(fileName, win) {

	if (Ti.Network.online == true) {
		
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.tempDirectory, '/' + fileName + '.zip');
		
		if (win != null && win != '') {

			var spinView = Titanium.UI.createView({
				width:150,
				height:150,
				backgroundColor:'#000',
				opacity:0.75,
				borderRadius:'15%',
				zIndex:20
			});

			var loadingLabel = Titanium.UI.createLabel({
				font:{
					fontSize:11,
					fontFamily:'Arial',
					fontWeight:'bold'
				},
				text:'Checking network status',
				color:'#FFFFFF',
				title:'0%'
			});

			spinView.add(loadingLabel);
			win.add(spinView);

		}

		var xhr = Titanium.Network.createHTTPClient({
			ondatastream:function(e) {
				
				if (win != null && win != ''){
					
					var progress = e.progress;
						progress = progress * 100;
						progress = progress.toString();
						progress = progress.substr(0, 4);

						loadingLabel.setText(progress + '%');	
					
				}

			},
			onload:function() {
				
				file.write(xhr.responseData);

				var compression = require('ti.compression');
				var directory = Titanium.Filesystem.tempDirectory;
				var zipPath = directory + '/' + fileName + '.zip';

				var result = compression.unzip(directory, zipPath, true);

				if (result == 'success') {

					// Get Current DB & Delete
					
					if (Ti.App.Properties.getString('osname') == 'Android'){
    					var oldfile = Ti.Filesystem.getFile('file:///data/data/' + Ti.App.getID() + '/databases/', fileName); 
					} else {
						var createDatabase = require('/builders/databaseFunctions/createDatabase');
						var oldDB = createDatabase('/' + fileName + '.db', fileName);
						var oldfile = oldDB.getFile();
						oldDB.close();
					}
					
					if (oldfile.exists()){
						oldfile.deleteFile();	
					}

					// Install New DB
					
					var createDatabase = require('/builders/databaseFunctions/createDatabase');
					var db = createDatabase(Titanium.Filesystem.tempDirectory + '/' + fileName + '.db', fileName);
					db.close();
					
					//Clean DB
	
					var createDatabase = require('/builders/databaseFunctions/createDatabase');
					var cleanDB = createDatabase('/venuefinder.db', 'venuefinder', true);
					cleanDB.close();
					
					if (spinView!= null && spinView != ''){
						
						win.remove(spinView);
						
					}

					if (fileName == 'specialoffers') {
						Ti.App.Properties.setString('updatedOffers', true);
					}

				} else {

					if (fileName == 'specialoffers') {
						alert("We were unable to get the latest offers, please manually update the offers from the offers tab");
					} else {
						alert("We were unable to download the latest update, please ensure you are connected to a WiFi or 3G Network and try again");
					}
					
					Ti.App.Properties.setString('updatedOffers', false);

				}
				
			},
			timeout:5000
		});

		xhr.open('GET', 'http://venuefindermobile.live.x-rm.com/data/' + fileName + '.zip');
		xhr.send(); 

	}

}

module.exports = updateDatabase; 