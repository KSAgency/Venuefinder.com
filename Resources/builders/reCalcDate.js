function reCalcDate(dateString){

	var date = dateString.substr(0, 10);
	
	date = date.split('-');
	
	var year = date[0].toString();
	
	var month = date[1].toString() - 1;
	
	var day = date[2].toString();
	
	var calcDate = new Date(year, month, day);
	
	calcDate = calcDate.toString().substr(0, 15);
	
	return calcDate;

}

module.exports = reCalcDate; 