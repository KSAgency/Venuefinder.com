function reCalcDate(dateString){

	var date = dateString.substr(0, 10);
	
	date = date.split('-');
	
	var year = date[0].toString();
	
	var month = date[1].toString();
	
	var day = date[2].toString();
	
	var calcDate = day+'/'+month+'/'+year;
	
	calcDate = calcDate.toString();
	
	return calcDate;

}

module.exports = reCalcDate; 