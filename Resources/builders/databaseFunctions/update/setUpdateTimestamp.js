function setUpdateTimestamp() {

	var newTimeStamp = new Date();
	newTimeStamp = newTimeStamp.toDateString();

	var day = newTimeStamp.substring(8, 10);
	var month = newTimeStamp.substring(4, 7);
	var year = newTimeStamp.substring(11, 15);

	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var dateDB = createDatabase('/update.db', 'update');
	var setdateDB = dateDB.execute('INSERT INTO dateDB ("Year", "Month", "Day") VALUES ("' + year + '", "' + month + '", "' + day + '")');

	dateDB.close();

}

module.exports = setUpdateTimestamp;
