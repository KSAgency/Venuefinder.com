function offersTab(tabGroup, win, scroll, venueID, tabs) {

    var createTodaysDate = require('/builders/todaysDate');
    var today = createTodaysDate();

    var createDatabase = require('/builders/databaseFunctions/createDatabase');
    var db = createDatabase('/venuefinder.db', 'venuefinder');
    var row = db.execute('SELECT * FROM Offers WHERE EntryID="' + venueID + '" AND validToDate>="' + today + '" ORDER BY CreatedDate DESC');

    var venueInfo = db.execute('SELECT * FROM Venue WHERE VenueID="' + venueID + '"');
    var venueName = venueInfo.fieldByName('VenueName');
    var venueTown = venueInfo.fieldByName('Town');
    var venueCountry = venueInfo.fieldByName('Country');

    var venueTitle = Titanium.UI.createLabel({
        text:venueName,
        left:'10',
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
        left:'10',
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

        validForm = validFrom.toString();

        validFrom = validFrom.substr(0, 10);

        validFrom = validFrom.split('-');

        var validFromYear = validFrom[0].toString();

        var validFromMonth = validFrom[1].toString() - 1;

        var validFromDay = validFrom[2].toString();

        validFrom = new Date(validFromYear, validFromMonth, validFromDay);

        validFrom = validFrom.toString();

        validFrom = validFrom.substr(0, 15);

        var validTo = row.fieldByName('validToDate');

        validTo = validTo.toString();

        validTo = validTo.substr(0, 10);

        validTo = validTo.split('-');

        var validToYear = validTo[0].toString();

        var validToMonth = validTo[1].toString() - 1;

        var validToDay = validTo[2].toString();

        validTo = new Date(validToYear, validToMonth, validToDay);

        validTo = validTo.toString();

        validTo = validTo.substr(0, 15);

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
                left:'10',
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
            left:'10',
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
            left:'10',
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
            left:'10',
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
            left:'10',
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

        // Loop
        row.next();

    }

}

module.exports = offersTab;
