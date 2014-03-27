function roomsTab(tabGroup, win, scroll, venueID, tabs) {

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
        left:10,
        top:15,
        width:300,
        ellipsize:true,
        color:'#2195be',
        font: {
            fontSize:18,
            fontWeight:'bold'
        }
    });

    var subTitle = Titanium.UI.createLabel({
        text:town + country,
        left:10,
        width:300,
        top:0,
        ellipsize:true,
        color:'#A2BE1C',
        font: {
            fontSize:16
        }
    });

    var infoLine = Titanium.UI.createLabel({
        text:'For detailed meeting room information, including room sizes and facilities, please visit ',
        left:10,
        width:300,
        top:0,
        ellipsize:true,
        color:'#666666',
        font: {
            fontSize:16
        }
    });

    var infoLink = Titanium.UI.createLabel({
        text:'venuefinder.com',
        left:100,
        width:Ti.UI.SIZE,
        top:-20,
        ellipsize:true,
        color:'#A2BE1C',
        font: {
            fontSize:16
        }
    });
    
    if (Ti.App.Properties.getString('osname') != 'Android'){
		title.setLeft(15);
		title.setWidth(290);
		
		subTitle.setLeft(15);
		subTitle.setWidth(290);
		
		infoLine.setLeft(15);
		infoLine.setWidth(290);
		
		infoLink.setLeft(100);
	}
	
    scroll.add(title);
    scroll.add(subTitle);
	scroll.add(infoLine);
	scroll.add(infoLink);

    infoLine.addEventListener('click', function() {
        Titanium.Platform.openURL('http://www.venuefinder.com/');
    });

    var data = [];

    var xhr = Ti.Network.createHTTPClient();
    xhr.open("GET", "http://venuefindermobile.live.x-rm.com/webapi-v1/api/venue/" + venueID + "/meetingrooms");
    xhr.setRequestHeader('Accept', 'application/xml');
    xhr.onload = function() {
        try {
            var doc = this.responseXML.documentElement;
            var items = doc.getElementsByTagName("MeetingRoom");
            var serveAmt = 0;
            if (items.length>=5) {
                serveAmt = 5;
            } else {
                serveAmt = items.length;
            }

                for (var c = 0; c<serveAmt; c++) {
                    var item = items.item(c);

                    var capBoard = item.getElementsByTagName("CapacityBoardroom").item(0).text;
                    var capCab = item.getElementsByTagName("CapacityCabaret").item(0).text;
                    var capClass = item.getElementsByTagName("CapacityClass").item(0).text;
                    var capDance = item.getElementsByTagName("CapacityDance").item(0).text;
                    var capDin = item.getElementsByTagName("CapacityDining").item(0).text;
                    var capRec = item.getElementsByTagName("CapacityReception").item(0).text;
                    var capThe = item.getElementsByTagName("CapacityTheatre").item(0).text;
                    var capUShape = item.getElementsByTagName("CapacityUShape").item(0).text;
                    var meetRm = item.getElementsByTagName("MeetingRoomID").item(0).text;
                    var name = item.getElementsByTagName("Name").item(0).text;
                    var orderKey = item.getElementsByTagName("OrderKey").item(0).text;

                    var titleName = Titanium.UI.createLabel({
                        text:name,
                        color:'#2195be',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial',
                            fontWeight:'bold',
                            textDecoration:'underline'
                        },
                        top:'10',
                        left:15
                    });

                    scroll.add(titleName);

                    var titleThe = Titanium.UI.createLabel({
                        text:'Theatre Layout',
                        color:'#A3BD0B',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'5',
                        left:15
                    });

                    var theCap = Titanium.UI.createLabel({
                        text:capThe,
                        color:'#666',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'-20',
                        right:15
                    });

                    if (capThe!=null && capThe!=0 && capThe!='0' && capThe!='') {
                        scroll.add(titleThe);
                        scroll.add(theCap);
                    }

                    var titleClass = Titanium.UI.createLabel({
                        text:'Classroom Layout',
                        color:'#A3BD0B',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'5',
                        left:15
                    });

                    var classCap = Titanium.UI.createLabel({
                        text:capClass,
                        color:'#666',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'-20',
                        right:15
                    });

                    if (capClass!=null && capClass!=0 && capClass!='0' && capClass!='') {
                        scroll.add(titleClass);
                        scroll.add(classCap);
                    }

                    var titleBoard = Titanium.UI.createLabel({
                        text:'Boardroom Layout',
                        color:'#A3BD0B',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'5',
                        left:15
                    });

                    var boardsCap = Titanium.UI.createLabel({
                        text:capBoard,
                        color:'#666',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'-20',
                        right:15
                    });

                    if (capBoard!=null && capBoard!=0 && capBoard!='0' && capBoard!='') {
                        scroll.add(titleBoard);
                        scroll.add(boardsCap);
                    }

                    var titleUShape = Titanium.UI.createLabel({
                        text:'U-Shape Layout',
                        color:'#A3BD0B',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'5',
                        left:15
                    });

                    var ushapeCap = Titanium.UI.createLabel({
                        text:capUShape,
                        color:'#666',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'-20',
                        right:15
                    });

                    if (capUShape!=null && capUShape!=0 && capUShape!='0' && capUShape!='') {
                        scroll.add(titleUShape);
                        scroll.add(ushapeCap);
                    }

                    var titleCab = Titanium.UI.createLabel({
                        text:'Cabaret Layout',
                        color:'#A3BD0B',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'5',
                        left:15
                    });

                    var cabCap = Titanium.UI.createLabel({
                        text:capCab,
                        color:'#666',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'-20',
                        right:15
                    });

                    if (capCab!=null && capCab!=0 && capCab!='0' && capCab!='') {
                        scroll.add(titleCab);
                        scroll.add(cabCap);
                    }

                    var titleDin = Titanium.UI.createLabel({
                        text:'Lunch/Dinner',
                        color:'#A3BD0B',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'5',
                        left:15
                    });

                    var dinCap = Titanium.UI.createLabel({
                        text:capDin,
                        color:'#666',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'-20',
                        right:15
                    });

                    if (capDin!=null && capDin!=0 && capDin!='0' && capDin!='') {
                        scroll.add(titleDin);
                        scroll.add(dinCap);
                    }

                    var titleDance = Titanium.UI.createLabel({
                        text:'Dinner/Dance',
                        color:'#A3BD0B',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'5',
                        left:15
                    });
                    var danceCap = Titanium.UI.createLabel({
                        text:capDance,
                        color:'#666',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'-20',
                        right:15
                    });

                    if (capDance!=null && capDance!=0 && capDance!='0' && capDance!='') {
                        scroll.add(titleDance);
                        scroll.add(danceCap);
                    }

                    var titleRec = Titanium.UI.createLabel({
                        text:'Reception',
                        color:'#A3BD0B',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'5',
                        left:15
                    });

                    var recCap = Titanium.UI.createLabel({
                        text:capRec,
                        color:'#666',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial'
                        },
                        top:'-20',
                        right:15
                    });

                    if (capRec!=null && capRec!=0 && capRec!='0' && capRec!='') {
                        scroll.add(titleRec);
                        scroll.add(recCap);
                    }

                }

        } catch(E) {
            alert(E);
        }
    };

    xhr.send();

}

module.exports = roomsTab;
