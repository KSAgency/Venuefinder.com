function createDatabase(url, sqlName, cleanDB) {


	if (Ti.App.Properties.getString('osname') != 'Android'){
		var filePath = Ti.Filesystem.applicationDataDirectory;
			filePath = filePath.replace('Documents', 'Library/Private%20Documents');
		var installCheck = Ti.Filesystem.getFile(filePath, sqlName+'.sql');
	} else {
		var filePath = '/data/data/' + Ti.App.getID() + '/databases/';
		var installCheck = Ti.Filesystem.getFile(filePath, sqlName);
	}
	
	if (installCheck.exists()){
		
		var db = Ti.Database.open(sqlName);
		
	} else {
		
		var db = Ti.Database.install(url, sqlName);
		
	}

	if (url == 'venuefinder.db' && Ti.App.Properties.getString('osname') == 'iPhone' || Ti.App.Properties.getString('osname') == 'iPad') {
		db.file.remoteBackup = false;
	}

	if (url == '/venuefinder.db') {

		//Drop Offers Table From DB

		var dbPath = '/data/data/' + Ti.App.getID() + '/databases/specialoffers';
		
		if (Ti.App.Properties.getString('osname') != 'Android'){
			
		    var dbFile = Ti.Filesystem.tempDirectory;
		    dbFile.toString();
		    
			dbPath = dbFile+'specialoffers.db';
			
		}
		
		if (cleanDB == true) {
			
			var update = Ti.Database.install(url, sqlName);
				
				Ti.API.info('ATTACH DATABASE "'+dbPath+'" AS "OffersDB"');
				
				update.execute('DROP TABLE IF EXISTS Offers');
				update.execute('ATTACH DATABASE "'+dbPath+'" AS "OffersDB"');
				update.execute('CREATE TABLE IF NOT EXISTS Offers AS SELECT * FROM OffersDB.Offers');
				
			update.close();
		} 

		// Create PackageOrder Column
		var columnCheck = db.execute('SELECT sql FROM sqlite_master WHERE tbl_name = "Venue" AND sql LIKE "%PackageOrder%"');
		var hasColumn = columnCheck.rowCount;

		if (hasColumn == 0) {
			db.execute('ALTER TABLE "Venue" ADD "PackageOrder" INTEGER DEFAULT "0";');
			db.execute('UPDATE Venue SET PackageOrder="1" WHERE PackageCode="FRE"');
		}

	}

	return db;

}

module.exports = createDatabase;
