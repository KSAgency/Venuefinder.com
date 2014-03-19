function freeResultsFormat(venueName, venueID, venueTown, venueCountry){

    if (Ti.App.Properties.getString('osname') != 'iPad'){
    
        var tableRow = Titanium.UI.createTableViewRow({
            height:85,
            venueTitle:venueName,
            uniqueID:venueID,
            selectedBackgroundColor:'#FFF',
			backgroundColor:'#FFF'
        });
      
      
    } else {
        
        var tableRow = Titanium.UI.createLabel({
            height:77,
            width:327,
            left:10,
            top:10,
            venueTitle:venueName,
            uniqueID:venueID
        });
        
    }

    var title = Titanium.UI.createLabel({
		text:venueName,
		left:10,
		width:300,
		height:45,
		top:5,
		ellipsize:true,
		color:'#2195be',
		font:{
			fontSize:18,
			fontWeight:'bold'
		},
		touchEnabled:false
	});

	var subTitle = Titanium.UI.createLabel({
		text:venueTown + venueCountry,
		left:10,
		width:300,
		height:30,
		top:50,
		ellipsize:true,
		color:'#A2BE1C',
		font:{
			fontSize:16
		},
		touchEnabled:false
	});

	if (Ti.App.Properties.getString('osname') != 'Android'){
		title.setLeft(15);
		subTitle.setLeft(15);
	}
	
	if (venueName.length < 20){
		title.setHeight(20);
		title.setTop(20);
		subTitle.setTop(40);
	}

    tableRow.add(title);
    tableRow.add(subTitle);
    
    return tableRow;

}

module.exports = freeResultsFormat; 