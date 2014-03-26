function getExportTimestamp(url){

	if (Titanium.Network.online == true) {

		var xhr2 = Ti.Network.createHTTPClient();
		xhr2.open("GET", url);
		xhr2.setRequestHeader('Accept', 'application/xml');
		xhr2.send();
		xhr2.onload = function() {
			try 
			{
			  var unformated = this.responseXML.getElementsByTagName("dateTime").item(0).text;
				unformated = unformated.substr(0, 10);
				unformated = unformated.replace('-', '');
				unformated = unformated.replace('-', '');
				unformated = unformated.replace('-', '');
			}
			catch(e)
			{
				    var date = new Date();
				if(date.getMonth().toString() < 9)
				{
					var month = "0" + (date.getMonth() + 1).toString();
				}
				else
				{
					var month =  (date.getMonth() + 1).toString();
				}
				
				if(date.getDate().toString() < 10)
				{
					var day = "0"+ date.getDate().toString();
				}
				else
				{
					var day =  (date.getDate()).toString();
				}
				var unformated = date.getFullYear().toString()+ month + day;
			}
//				Ti.API.info("unformated date:"+unformated);	
				Ti.App.fireEvent('recievedDate', {date:unformated});
				
		};

	}
	
}

module.exports = getExportTimestamp;