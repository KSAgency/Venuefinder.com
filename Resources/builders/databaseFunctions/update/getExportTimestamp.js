function getExportTimestamp(url){

	if (Titanium.Network.online == true) {

		var xhr2 = Ti.Network.createHTTPClient();
		xhr2.open("GET", url);
		xhr2.setRequestHeader('Accept', 'application/xml');
		xhr2.send();
		xhr2.onload = function() {

			var unformated = this.responseXML.getElementsByTagName("dateTime").item(0).text;
				unformated = unformated.substr(0, 10);
				unformated = unformated.replace('-', '');
				unformated = unformated.replace('-', '');
				unformated = unformated.replace('-', '');
				
				Ti.App.fireEvent('recievedDate', {date:unformated});
				
		};

	}
	
}

module.exports = getExportTimestamp;