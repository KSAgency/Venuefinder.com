function facilitiesTab(tabGroup, win, scroll, venueID, tabs) {

    var hasLeisure = true;
    var hasFacility = true;

    if (Ti.Network.online) {

        var createDatabase = require('/builders/databaseFunctions/createDatabase');
        var db = createDatabase('/venuefinder.db', 'venuefinder');
        var getDetails = db.execute('SELECT * FROM Venue WHERE VenueID="' + venueID + '"');
        var title = getDetails.fieldByName('VenueName');
        var town = getDetails.fieldByName('Town');
        var country = getDetails.fieldByName('Country');

        if (town!='' && town!=null) {
            var town = town + ', ';
        } else {
            var town = '';
        }
        if (county!='' && county!=null) {
            var county = county + ', ';
        } else {
            var county = '';
        }

        var title = Titanium.UI.createLabel({
            text:title,
            left:'5%',
            top:'20pts',
            width:'90%',
            ellipsize:true,
            color:'#2195be',
            font: {
                fontSize:'18pts',
                fontWeight:'bold'
            }
        });

        scroll.add(title);

        var subTitle = Titanium.UI.createLabel({
            text:town + country,
            left:'5%',
            width:'90%',
            top:'1pts',
            ellipsize:true,
            color:'#A2BE1C',
            font: {
                fontSize:'16pts'
            },
        });

        scroll.add(subTitle);

        var data = [];

        var xhr2 = Ti.Network.createHTTPClient();

        xhr2.open("GET", "http://venuefindermobile.live.x-rm.com/webapi-v1/api/venue/" + venueID + "/leisurefacilities");
        xhr2.setRequestHeader('Accept', 'application/xml');
        xhr2.onload = function() {
            try {
                var doc = this.responseXML.documentElement;
                var items = doc.getElementsByTagName("LeisureFacility");

                if (items.length==0) {
                    hasLeisure = false;
                } else {

                var x = 0;

                var title_desc = Titanium.UI.createLabel({
                    text:'Leisure Facilities',
                    color:'#2195be',
                    font: {
                        fontSize:'16pts',
                        fontFamily:'Arial',
                        fontWeight:'bold'
                    },
                    top:'10pts',
                    left:'5%'
                });

                scroll.add(title_desc);

                for (var c = 0; c<items.length; c++) {
                    var item = items.item(c);

                    var desc = item.getElementsByTagName("Description").item(0).text;
                    var iD = item.getElementsByTagName("ID").item(0).text;
                    var nearby = item.getElementsByTagName("Nearby").item(0).text;
                    var onSite = item.getElementsByTagName("OnSite").item(0).text;

                    var desc_cap = Titanium.UI.createLabel({
                        text:desc,
                        color:'#666',
                        font: {
                            fontSize:'16pts',
                            fontFamily:'Arial'
                        },
                        top:'0pts',
                        left:'5%'
                    });

                    scroll.add(desc_cap);
                }
                
                }

            } catch(E) {
                alert(E);
            }
        };

        xhr2.send();

        var xhr3 = Ti.Network.createHTTPClient();
        xhr3.open("GET", "http://venuefindermobile.live.x-rm.com/webapi-v1/api/venue/" + venueID + "/hotelfacilities");
        xhr3.setRequestHeader('Accept', 'application/xml');
        xhr3.onload = function() {
            try {
                var doc = this.responseXML.documentElement;
                var items = doc.getElementsByTagName("HotelFacility");
                if (items.length==0) {
                    hasFacility = false;
                } else {

                var x = 0;
                var title_desc = Titanium.UI.createLabel({
                    text:'Venue Facilities',
                    color:'#2195be',
                    font: {
                        fontSize:'16pts',
                        fontFamily:'Arial',
                        fontWeight:'bold'
                    },
                    top:'10pts',
                    left:'5%'
                });

                scroll.add(title_desc);

                for (var c = 0; c<items.length; c++) {
                    var item = items.item(c);

                    var desc = item.getElementsByTagName("Name").item(0).text;

                    var desc_cap = Titanium.UI.createLabel({
                        text:desc,
                        color:'#666',
                        font: {
                            fontSize:'16pts',
                            fontFamily:'Arial'
                        },
                        top:'0pts',
                        left:'5%'
                    });

                    scroll.add(desc_cap);

                }
                
                }

                if (hasFacility==false && hasLeisure==false) {

                    scroll.removeAllChildren();
                    scroll.add(title);
                    scroll.add(subTitle);

                    var noResults = Titanium.UI.createLabel({
                        text:'Sorry, we could not find any facilities information for this venue',
                        color:'#666',
                        font: {
                            fontSize:'16pts',
                            fontFamily:'Arial'
                        },
                        top:'10pts',
                        left:'5%',
                        width:'905'
                    });

                    scroll.add(noResults);

                }

            } catch(E) {
                alert(E);
            }
        };

        xhr3.send();

    } else {

        tab4.setBackgroundImage('/images/venue_facilities_ns.png');

    }

}

module.exports = facilitiesTab;
