function getUpdateTimestamp(button, infoLine) {

	//Setup Holders
	var dbyear;
	var dbmonth;
	var dbday;

	//Get DB
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var checkDB = createDatabase('/update.db', 'update');
	var queryDB = checkDB.execute('SELECT * FROM dateDB ORDER BY rowid ASC');

	if (queryDB.rowCount == 0) {

		button.dontShow = false;

	} else {
		
		dbyear = queryDB.fieldByName('Year').toString();
		dbmonth = queryDB.fieldByName('Month').toString();
		dbday = queryDB.fieldByName('Day').toString();

		infoLine.setText('Last Updated: ' + dbday + ' ' + dbmonth + ' ' + dbyear);

		if (dbmonth == 'Jan') {
			dbmonth = '01';
		} else if (dbmonth == 'Feb') {
			dbmonth = '02';
		} else if (dbmonth == 'Mar') {
			dbmonth = '03';
		} else if (dbmonth == 'Apr') {
			dbmonth = '04';
		} else if (dbmonth == 'May') {
			dbmonth = '05';
		} else if (dbmonth == 'Jun') {
			dbmonth = '06';
		} else if (dbmonth == 'Jul') {
			dbmonth = '07';
		} else if (dbmonth == 'Aug') {
			dbmonth = '08';
		} else if (dbmonth == 'Sep') {
			dbmonth = '09';
		} else if (dbmonth == 'Oct') {
			dbmonth = '10';
		} else if (dbmonth == 'Nov') {
			dbmonth = '11';
		} else if (dbmonth == 'Dec') {
			dbmonth = '12';
		}

		return dbyear.toString() + dbmonth.toString() + dbday.toString();

	}

	checkDB.close();
	

}

module.exports = getUpdateTimestamp;