function offersTab(tabGroup, win, scroll, venueID, tabs) {

    var createTodaysDate = require('/builders/todaysDate');
    var today = createTodaysDate();
    
    var reCalcDate = require('/builders/reCalcDate');

    var createDatabase = require('/builders/databaseFunctions/createDatabase');
    var db = createDatabase('/venuefinder.db', 'venuefinder');
    var row = db.execute('SELECT * FROM Offers WHERE EntryID="' + venueID + '" AND validToDate>="' + today + '" ORDER BY CreatedDate DESC');

    var venueInfo = db.execute('SELECT * FROM Venue WHERE VenueID="' + venueID + '"');
    var venueName = venueInfo.fieldByName('VenueName');
    var venueTown = venueInfo.fieldByName('Town');
    var venueCountry = venueInfo.fieldByName('Country');

    var venueTitle = Titanium.UI.createLabel({
        text:venueName,
        left:'15',
        width:'90%',
        top:'20',
        ellipsize:true,
        color:'#2195be',
        font: {
            fontSize:'18',
            fontWeight:'bold'
        }
    });

    var venueLocation = Titanium.UI.createLabel({
        text:venueTown + ', ' + venueCountry,
        left:'15',
        width:'90%',
        top:'0',
        ellipsize:true,
        color:'#A2BE1C',
        font: {
            fontSize:'16'
        },
    });
    
    scroll.add(venueTitle);
    scroll.add(venueLocation);

    while (row.isValidRow()) {
    	
        var offerVenue = row.fieldByName('EntryID');

        var secondData = db.execute('SELECT * FROM Venue WHERE VenueID="' + offerVenue + '"');

        var venueName = secondData.fieldByName('VenueName');

        var venueTown = secondData.fieldByName('Town');

        var venueCountry = secondData.fieldByName('Country');

        var offerName = row.fieldByName('summaryText');

        var offerBody = row.fieldByName('bodyText');

        var validFrom = row.fieldByName('validFromDate');
        validFrom = reCalcDate(validFrom);
        
        var validTo = row.fieldByName('validToDate');
		validTo = reCalcDate(validTo);
		
		var dayRate = row.fieldByName('dayRate');

		var tfHrRate = row.fieldByName('tfHrRate');

        if (Ti.App.Properties.getString('osname')!='iPad') {

            var getImage = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID="' + offerVenue + '" AND (OptionCode="TOP" OR OptionCode="PIC")');

            var imageUrl = getImage.fieldByName('GraphicFileName');

            var image = Titanium.UI.createImageView({
                image:'http://www.venuefinder.com/gallery/' + imageUrl,
                defaultImage:'/images/icon.png',
                hires:true,
                width:'279',
                height:'181',
            });

            if (imageUrl==null) {
                image.setImage('/images/icon.png');
                image.setWidth('280');
                image.setHeight('181');
            }

            var imageHolder = Titanium.UI.createView({
                width:'40%',
                left:'15',
                height:'125',
                top:'20',
            });

            var featuredImage = Titanium.UI.createImageView({
                image:'/images/offerbanner_big.png',
            });

            imageHolder.add(image);
            imageHolder.add(featuredImage);
            scroll.add(imageHolder);
        }

        var offerTitle = Titanium.UI.createLabel({
            text:offerName,
            left:'15',
            width:'90%',
            top:'10',
            ellipsize:true,
            color:'orange',
            font: {
                fontSize:'18',
                fontWeight:'bold'
            }
        });

        var offerDate = Titanium.UI.createLabel({
            text:'From ' + validFrom,
            left:'15',
            width:'90%',
            top:'10',
            ellipsize:true,
            color:'orange',
            font: {
                fontSize:'14'
            }
        });

        var offertoDate = Titanium.UI.createLabel({
            text:'To ' + validTo,
            left:'15',
            width:'90%',
            top:'0',
            ellipsize:true,
            color:'orange',
            font: {
                fontSize:'14'
            }
        });

        var offerDesc = Titanium.UI.createLabel({
            text:offerBody,
            left:'15',
            width:'90%',
            top:'10',
            ellipsize:true,
            color:'#666666',
            font: {
                fontSize:'14'
            }
        });
        
        var footerLine = Titanium.UI.createLabel({
        	text:'Delegate rates are net of discount and exclusive of sales tax',
            left:'15',
            width:'90%',
            top:'10',
            ellipsize:true,
            color:'#666666',
            font: {
                fontSize:'14'
            }
        });
        
        scroll.add(offerTitle);
        scroll.add(offerDate);
        scroll.add(offertoDate);
        scroll.add(offerDesc);
        scroll.add(footerLine);
        
        if (dayRate != null && dayRate != '0'){
			
			//Remove points in string
			
			dayRate = dayRate.toString().split('.');
			dayRate = dayRate[0];
			
			//Label
			
			var delegateRate = Titanium.UI.createLabel({
            	text:'Daily Delegate Rate: £'+dayRate,
	            left:'15',
	            width:'90%',
	            top:'10',
	            ellipsize:true,
	            color:'#666666',
	            font: {
	                fontSize:'14'
	            }
	        });
	        
	        scroll.add(delegateRate);
			
		}
		
		if (tfHrRate != null && tfHrRate != '0'){
			
			//Remove points in string
			
			tfHrRate = tfHrRate.toString().split('.');
			tfHrRate = tfHrRate[0];
			
			//Label
			
			var delegateRate = Titanium.UI.createLabel({
            	text:'24 Hour Delegate Rate: £'+tfHrRate,
	            left:'15',
	            width:'90%',
	            top:'10',
	            ellipsize:true,
	            color:'#666666',
	            font: {
	                fontSize:'14'
	            }
	        });
	        
	        scroll.add(delegateRate);
			
		}

        // Loop
        row.next();

    }
    
    db.close();

}

module.exports = offersTab;
