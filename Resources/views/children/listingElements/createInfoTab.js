function infoTab(tabGroup, win, scroll, venueID, tabs) {

	//get todays date
	var createTodaysDate = require('/builders/todaysDate');
	var today = createTodaysDate();

	// Load Results From DB

	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var row = db.execute('SELECT * FROM Venue WHERE VenueID="' + venueID + '"');
	while (row.isValidRow()) {

		var venueID = row.fieldByName('VenueID');
		var venuePackage = row.fieldByName('PackageCode');
		var venueName = row.fieldByName('VenueName');
		var addressLine1 = row.fieldByName('AddressLine1');
		var addressLine2 = row.fieldByName('AddressLine2');
		var venueTown = row.fieldByName('Town');
		var venueCounty = row.fieldByName('County');
		var venueCountry = row.fieldByName('Country');
		var venuePostcode = row.fieldByName('Postcode');
		var venueTel = row.fieldByName('Tel');
		var venueEmail = row.fieldByName('Email');
		var venueURL = row.fieldByName('URL');
		var meetingCap = row.fieldByName('MaxMeetingCapacity');
		var cateringCap = row.fieldByName('MaxCateringCapacity');
		var meetingRooms = row.fieldByName('MeetingRoomsNo');
		var bedrooms = row.fieldByName('BedroomsNo');
		var disabledAccess = row.fieldByName('MeetingRoomDisabledAccess');
		var bookingLink = row.fieldByName('BookingURL');

		var venueTelCall = venueTel.trim();
		venueTelCall = venueTel.replace(' ', '');
		venueTelCall = venueTel.replace(' ', '');
		venueTelCall = venueTel.replace(' ', '');
		venueTelCall = venueTel.replace(' ', '');
		venueTelCall = venueTel.replace(' ', '');

		if (addressLine1 != '' && addressLine1 != null) {
			var addressLine1 = addressLine1 + ', \n';
		} else {
			var addressLine1 = '';
		}
		if (addressLine2 != '' && addressLine2 != null) {
			var addressLine2 = addressLine2 + ', \n';
		} else {
			var addressLine2 = '';
		}
		if (venueTown != '' && venueTown != null) {
			var venueTownTitle = venueTown + ', ';
			var venueTown = venueTown + ', \n';
		} else {
			var venueTownTitle = '';
			var venueTown = '';
		}
		if (venueCounty != '' && venueCounty != null) {
			var venueCounty = venueCounty + ', \n';
		} else {
			var venueCounty = '';
		}
		if (venueCountry != '' && venueCountry != null) {
			var venueCountry = venueCountry;
		} else {
			var venueCountry = '';
		}
		if (venuePostcode != '' && venuePostcode != null) {
			var venuePostcode = venuePostcode + ', \n';
		} else {
			var venuePostcode = '';
		}

		var venueURL = venueURL.toString();
		var urlCheck = venueURL.indexOf('http://');

		if (urlCheck != -1) {
			var venueURL = venueURL.substr(7, 200);
		}

		var ratingrow = db.execute('SELECT * FROM Ratings WHERE VenueID="' + venueID + '"');
		if (ratingrow.isValidRow()) {
			var venueRating = ratingrow.fieldByName('Text');

		}

		var getgrouprow = db.execute('SELECT * FROM VenueToGroup WHERE VenueID="' + venueID + '"');
		if (getgrouprow.isValidRow()) {
			var groupID = getgrouprow.fieldByName('GroupCode');
		}

		var grouprow = db.execute('SELECT * FROM Groups WHERE GroupCode="' + groupID + '"');
		if (grouprow.isValidRow()) {
			var groupCode = grouprow.fieldByName('Name');
		}

		var ratesRow = db.execute('SELECT * FROM Rates WHERE VenueID="' + venueID + '"');
		if (ratesRow.isValidRow()) {
			var dailyRate = ratesRow.fieldByName('RateDailyxVat');
			var fullRate = ratesRow.fieldByName('Rate24hrxVat');
			var roomRate = ratesRow.fieldByName('RateMeetingxVat');
			var roomRequest = ratesRow.fieldByName('RateMeetingAvailableOnRequest');
			var fullRequest = ratesRow.fieldByName('Rate24AvailableOnRequest');
			var dailyRequest = ratesRow.fieldByName('RateDailyAvailableOnRequest');
		}

		if (dailyRate != null) {
			var dailyRate = dailyRate.toString();
			var dailyRate = dailyRate.substr(0, 5);
			var dailyAppearance = dailyRate.lastIndexOf('.');
			var dailyLength = dailyRate.length;
			if (dailyAppearance != -1) {
				if (dailyLength - dailyAppearance == 2) {
					dailyRate = dailyRate + '0';
				}
			} else {
				dailyRate = dailyRate + '.00';
			}
		}

		if (fullRate != null) {
			var fullRate = fullRate.toString();
			var fullRate = fullRate.substr(0, 5);
			var fullAppearance = fullRate.lastIndexOf('.');
			var fullLength = fullRate.length;
			if (fullAppearance != -1) {
				if (fullLength - fullAppearance == 2) {
					fullRate = fullRate + '0';
				}
			} else {
				fullRate = fullRate + '.00';
			}
		}

		if (roomRate != null) {
			var roomRate = roomRate.toString();
			var roomRate = roomRate.substr(0, 5);
			var roomAppearance = roomRate.lastIndexOf('.');
			var roomLength = roomRate.length;
			if (roomAppearance != -1) {
				if (roomLength - roomAppearance == 2) {
					roomRate = roomRate + '0';
				}
			} else {
				roomRate = roomRate + '.00';
			}
		}

		//Pull iPhone Header Elements

		if (Ti.App.Properties.getString('osname') != 'iPad') {
			var createHeaderElements = require('/views/children/listingElements/createHeaderElements');
			var headerElements = createHeaderElements(tabGroup, win, scroll, venueID, tabs);
		}

		//Add Elements

		var title = Titanium.UI.createLabel({
			text:venueName,
			left:10,
			top:5,
			width:300,
			ellipsize:true,
			color:'#2195be',
			font:{
				fontSize:'18',
				fontWeight:'bold'
			}
		});

		scroll.add(title);

		var subTitle = Titanium.UI.createLabel({
			text:venueTownTitle + venueCountry,
			left:'10',
			width:'90%',
			ellipsize:true,
			color:'#A2BE1C',
			font:{
				fontSize:'16'
			},

		});

		scroll.add(subTitle);

		var addressTitle = Titanium.UI.createLabel({
			text:'Address',
			color:'#2195be',
			font:{
				fontSize:'16',
				fontFamily:'Arial',
				fontWeight:'bold'
			},
			left:'10',
			top:'10'
		});

		scroll.add(addressTitle);

		var addressLine = Titanium.UI.createLabel({
			text:addressLine1 + addressLine2 + venueTown + venueCounty + venuePostcode + venueCountry,
			color:'#666',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10',
			width:'90%'
		});

		scroll.add(addressLine);

		var telTitle = Titanium.UI.createLabel({
			text:'Telephone',
			color:'#2195be',
			font:{
				fontSize:'16',
				fontFamily:'Arial',
				fontWeight:'bold'
			},
			left:'10',
			top:'10'
		});

		var telLine = Titanium.UI.createLabel({
			text:venueTel,
			color:'#A2BE1C',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		scroll.add(telTitle);
		scroll.add(telLine);

		if (Ti.App.Properties.getString('osname') != 'iPad') {

			telLine.addEventListener('click', function() {
				var omniture = Titanium.UI.createWebView({
					html:'<html><head><script type="text/javascript" src="s_code.js"></script></head><body><script>' + 's.channel="";' + 's.pageName="";' + 's.events="event60";' + 's.prop60="' + venueName + '";' + 's.eVar60="' + venueName + '";' + 'var s_code=s.t(); if(s_code)document.write(s_code)</script> <script>if(navigator.appVersion.indexOf("MSIE")>=0)document.write(unescape("%3C")+"\!-"+"-")</script><noscript><img src="https://cmpi.122.2o7.net/b/ss/cmpivenuefinderappprod/1/H.25.2--NS/0?[AQB]&cdp=3&[AQE]"height="1" width="1" border="0" alt="" /></noscript></body></html>',
					opacity:'0',
					width:'0',
					height:'0',
					left:'0',
					right:'0',
					touchEnabled:false
				});

				win.add(omniture);

				venueTel = venueTel.split(' ').join('');

				Titanium.Platform.openURL('tel:' + venueTel);
			});

			var telMoreButton = Titanium.UI.createButton({
				backgroundImage:'/images/callButton.png',
				height:'19',
				width:'44',
				top:'-21',
				left:'135'
			});

			scroll.add(telMoreButton);

			telMoreButton.addEventListener('click', function() {
				var omniture = Titanium.UI.createWebView({
					html:'<html><head><script type="text/javascript" src="s_code.js"></script></head><body><script>' + 's.channel="";' + 's.pageName="";' + 's.events="event60";' + 's.prop60="' + venueName + '";' + 's.eVar60="' + venueName + '";' + 'var s_code=s.t(); if(s_code)document.write(s_code)</script> <script>if(navigator.appVersion.indexOf("MSIE")>=0)document.write(unescape("%3C")+"\!-"+"-")</script><noscript><img src="https://cmpi.122.2o7.net/b/ss/cmpivenuefinderappprod/1/H.25.2--NS/0?[AQB]&cdp=3&[AQE]"height="1" width="1" border="0" alt="" /></noscript></body></html>',
					opacity:'0',
					width:'0',
					height:'0',
					left:'0',
					right:'0',
					touchEnabled:false
				});

				win.add(omniture);
				
				venueTelCall = venueTel.split(' ').join('');

				Titanium.Platform.openURL('tel:' + venueTelCall);
			});

		}

		var emailTitle = Titanium.UI.createLabel({
			text:'Email',
			color:'#2195be',
			font:{
				fontSize:'16',
				fontFamily:'Arial',
				fontWeight:'bold'
			},
			left:'10',
			top:'10'
		});

		var emailLine = Titanium.UI.createLabel({
			text:'Click here to email',
			color:'#A2BE1C',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		scroll.add(emailTitle);
		scroll.add(emailLine);

		emailLine.addEventListener('click', function() {
			
			var createEmailer = require('/builders/createEmailer');
			var emailer = createEmailer(tabGroup, venueEmail, null, null, venueName, null, null, null, null);

			//Open window

			var createApplicationWindow = require('/builders/createApplicationWindow');
			var windowElements = createApplicationWindow(tabGroup, null, 'Email a Venue', '#d2e8f5', 'Venue Listing', 'Email A Venue', null, null, null, null);

		});

		var urlTitle = Titanium.UI.createLabel({
			text:'Website',
			color:'#2195be',
			font:{
				fontSize:'16',
				fontFamily:'Arial',
				fontWeight:'bold'
			},
			left:'10',
			top:'10'
		});

		scroll.add(urlTitle);

		var urlLine = Titanium.UI.createLabel({
			text:'Click here to visit the website',
			color:'#A2BE1C',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		scroll.add(urlLine);

		urlLine.addEventListener('click', function() {

			var createApplicationWindow = require('/builders/createApplicationWindow');
			var urlWin = createApplicationWindow(tabGroup, null, 'Venue Website', '#FFF', null, null, null, null);

			var webview = Titanium.UI.createWebView({
				url:'http://' + venueURL
			});

			urlWin.add(webview);

			tabGroup.activeTab.open(urlWin);
		});

		var ratingTitle = Titanium.UI.createLabel({
			text:'Rating',
			color:'#2195be',
			font:{
				fontSize:'16',
				fontFamily:'Arial',
				fontWeight:'bold'
			},
			left:'10',
			top:'10'
		});

		var ratingLine = Titanium.UI.createLabel({
			text:venueRating,
			color:'#666',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		if (venueRating != null && venueRating != '') {
			scroll.add(ratingTitle);
			scroll.add(ratingLine);
		}

		var groupTitle = Titanium.UI.createLabel({
			text:'Group',
			color:'#2195be',
			font:{
				fontSize:'16',
				fontFamily:'Arial',
				fontWeight:'bold'
			},
			left:'10',
			top:'10'
		});

		var groupLine = Titanium.UI.createLabel({
			text:groupCode,
			color:'#666',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		if (groupCode != '' && groupCode != null) {
			scroll.add(groupTitle);
			scroll.add(groupLine);
		}

		var delegateTitle = Titanium.UI.createLabel({
			text:'Delegate Rates',
			color:'#2195be',
			font:{
				fontSize:'16',
				fontFamily:'Arial',
				fontWeight:'bold'
			},
			left:'10',
			top:'10'
		});

		var delegateLine = Titanium.UI.createLabel({
			text:'Daily Rate: £' + dailyRate,
			color:'#666',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		if (dailyRequest == 1) {
			delegateLine.setText('Daily Rate: Available on request');
		}

		var delegateLine2 = Titanium.UI.createLabel({
			text:'24hr Rate: £' + fullRate,
			color:'#666',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		if (fullRequest == 1) {
			delegateLine2.setText('24hr Rate: Available on request');
		}

		var delegateLine3 = Titanium.UI.createLabel({
			text:'Rates are exclusive of sales tax (VAT)',
			color:'#666',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		scroll.add(delegateTitle);
		scroll.add(delegateLine);
		scroll.add(delegateLine2);
		scroll.add(delegateLine3);

		var removeCount = 0;

		if (dailyRate === '0.00' || dailyRate === '' || dailyRate === null) {
			scroll.remove(delegateLine);
			removeCount = removeCount + 1;
		}

		if (fullRate === '0.00' || fullRate === '' || fullRate === null) {
			scroll.remove(delegateLine2);
			removeCount = removeCount + 1;
		}

		if (removeCount == 2) {
			scroll.remove(delegateTitle);
			scroll.remove(delegateLine3);
		}

		var roomTitle = Titanium.UI.createLabel({
			text:'Room Hire',
			color:'#2195be',
			font:{
				fontSize:'16',
				fontFamily:'Arial',
				fontWeight:'bold'
			},
			left:'10',
			top:'10'
		});

		var roomLine = Titanium.UI.createLabel({
			text:'From: £' + roomRate,
			color:'#666',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		if (roomRequest == 1) {
			roomLine.setText('Rate: Available on request');
		}

		var roomLine2 = Titanium.UI.createLabel({
			text:'Rates are exclusive of sales tax (VAT)',
			color:'#666',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		if (roomRate !== '' && roomRate !== '0.00' && roomRate !== null) {
			scroll.add(roomTitle);
			scroll.add(roomLine);
			scroll.add(roomLine2);
		}

		if (roomRate == '0.00' && roomRequest == 1) {
			scroll.add(roomTitle);
			scroll.add(roomLine);
			scroll.add(roomLine2);
		}

		var meetingTitle = Titanium.UI.createLabel({
			text:'Meeting Capacity ',
			color:'#2195be',
			font:{
				fontSize:'16',
				fontFamily:'Arial',
				fontWeight:'bold'
			},
			left:'10',
			top:'10'
		});

		var meetingLine = Titanium.UI.createLabel({
			text:meetingCap + ' (Max)',
			color:'#666',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		if (meetingCap != '' && meetingCap != '0' && meetingCap != null) {
			scroll.add(meetingTitle);
			scroll.add(meetingLine);
		}

		var cateringTitle = Titanium.UI.createLabel({
			text:'Catering Capacity ',
			color:'#2195be',
			font:{
				fontSize:'16',
				fontFamily:'Arial',
				fontWeight:'bold'
			},
			left:'10',
			top:'10'
		});

		var cateringLine = Titanium.UI.createLabel({
			text:cateringCap + ' (Max)',
			color:'#666',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		if (cateringCap != '' && cateringCap != '0' && cateringCap != null) {
			scroll.add(cateringTitle);
			scroll.add(cateringLine);
		}

		var meetingNoTitle = Titanium.UI.createLabel({
			text:'No. of Meeting Rooms ',
			color:'#2195be',
			font:{
				fontSize:'16',
				fontFamily:'Arial',
				fontWeight:'bold'
			},
			left:'10',
			top:'10'
		});

		var meetingNoLine = Titanium.UI.createLabel({
			text:meetingRooms,
			color:'#666',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		if (meetingRooms != '' && meetingRooms != '0' && meetingRooms != null) {
			scroll.add(meetingNoTitle);
			scroll.add(meetingNoLine);
		}

		var bedroomNoTitle = Titanium.UI.createLabel({
			text:'No. of Bedrooms ',
			color:'#2195be',
			font:{
				fontSize:'16',
				fontFamily:'Arial',
				fontWeight:'bold'
			},
			left:'10',
			top:'10'
		});

		var bedroomNoLine = Titanium.UI.createLabel({
			text:bedrooms,
			color:'#666',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		if (Ti.Network.online == true) {
			bedroomNoLine.setColor('#A2BE1C');

			bedroomNoLine.addEventListener('click', function() {

				// Bedroom Info
				
				var createApplicationWindow = require('/builders/createApplicationWindow');
				var bedroomInfo = createApplicationWindow(tabGroup, null, 'Bedroom Information', '#FFF', null, null, null, null);

				tabGroup.activeTab.open(bedroomInfo);

				var bedrmScroll = Titanium.UI.createScrollView({
					width:'100%',
					contentHeight:'auto',
					top:'0%',
					layout:'vertical'
				});

				if (Ti.App.Properties.getString('osname') == 'iPad') {
					bedrmScroll.setWidth('600');
				}

				bedroomInfo.add(bedrmScroll);

				var createDatabase = require('/builders/databaseFunctions/createDatabase');
				var db = createDatabase('/venuefinder.db', 'venuefinder');
				var getDetails = db.execute('SELECT * FROM Venue WHERE VenueID="' + venueID + '"');
				var title = getDetails.fieldByName('VenueName');
				var town = getDetails.fieldByName('Town');
				var country = getDetails.fieldByName('Country');

				if (town != '' && town != null) {
					var town = town + ', ';
				} else {
					var town = '';
				}
				if (county != '' && county != null) {
					var county = county + ', ';
				} else {
					var county = '';
				}

				var title = Titanium.UI.createLabel({
					text:title,
					left:'10',
					top:'14',
					width:'90%',
					ellipsize:true,
					color:'#2195be',
					font:{
						fontSize:'18',
						fontWeight:'bold'
					}
				});

				bedrmScroll.add(title);

				var subTitle = Titanium.UI.createLabel({
					text:town + country,
					left:'10',
					width:'90%',
					height:'30',
					top:'-5',
					ellipsize:true,
					color:'#A2BE1C',
					font:{
						fontSize:'16'
					},

				});

				bedrmScroll.add(subTitle);

				var data = [];

				var xhr = Ti.Network.createHTTPClient();
				xhr.open("GET", "http://venuefindermobile.live.x-rm.com/webapi-v1/api/venue/" + venueID + "/bedroomdetails");
				xhr.setRequestHeader('Accept', 'application/xml');
				xhr.onload = function() {
					var doc = this.responseXML.documentElement;
					var posRm = this.responseXML.getElementsByTagName("Bedrooms4Posters").item(0).text;
					var dblRm = this.responseXML.getElementsByTagName("BedroomsDoubles").item(0).text;
					var excRm = this.responseXML.getElementsByTagName("BedroomsExecutive").item(0).text;
					var famRm = this.responseXML.getElementsByTagName("BedroomsFamily").item(0).text;
					var kngRm = this.responseXML.getElementsByTagName("BedroomsKing").item(0).text;
					var offRm = this.responseXML.getElementsByTagName("BedroomsOffsite").item(0).text;
					var sngRm = this.responseXML.getElementsByTagName("BedroomsSingles").item(0).text;
					var stuRm = this.responseXML.getElementsByTagName("BedroomsStudios").item(0).text;
					var swtRm = this.responseXML.getElementsByTagName("BedroomsSuites").item(0).text;
					var trpRm = this.responseXML.getElementsByTagName("BedroomsTriples").item(0).text;
					var twnRm = this.responseXML.getElementsByTagName("BedroomsTwins").item(0).text;

					var titlePos = Titanium.UI.createLabel({
						text:'4 Poster Bedroom',
						color:'#A3BD0B',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'5',
						left:'10',
						top:'10'
					});

					var posCap = Titanium.UI.createLabel({
						text:posRm,
						color:'#666',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'-20',
						right:'10'
					});
					if (posRm != null && posRm != 0 && posRm != '0' && posRm != '') {
						bedrmScroll.add(titlePos);
						bedrmScroll.add(posCap);
					}

					var titleDbl = Titanium.UI.createLabel({
						text:'Double Bedroom',
						color:'#A3BD0B',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'5',
						left:'10',
						top:'10'
					});

					var dblCap = Titanium.UI.createLabel({
						text:dblRm,
						color:'#666',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'-20',
						right:'10'
					});

					if (dblRm != null && dblRm != 0 && dblRm != '0' && dblRm != '') {
						bedrmScroll.add(titleDbl);
						bedrmScroll.add(dblCap);
					}

					var titleExc = Titanium.UI.createLabel({
						text:'Executive Bedroom',
						color:'#A3BD0B',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'5',
						left:'10',
						top:'10'
					});

					var excCap = Titanium.UI.createLabel({
						text:excRm,
						color:'#666',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'-20',
						right:'10'
					});

					if (excRm != null && excRm != 0 && excRm != '0' && excRm != '') {
						bedrmScroll.add(titleExc);
						bedrmScroll.add(excCap);
					}

					var titleFam = Titanium.UI.createLabel({
						text:'Family Bedroom',
						color:'#A3BD0B',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'5',
						left:'10',
						top:'10'
					});

					var famCap = Titanium.UI.createLabel({
						text:famRm,
						color:'#666',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'-20',
						right:'10'
					});

					if (famRm != null && famRm != 0 && famRm != '0' && famRm != '') {
						bedrmScroll.add(titleFam);
						bedrmScroll.add(famCap);
					}

					var titleKng = Titanium.UI.createLabel({
						text:'King Bedroom',
						color:'#A3BD0B',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'5',
						left:'10',
						top:'10'
					});

					var kngCap = Titanium.UI.createLabel({
						text:kngRm,
						color:'#666',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'-20',
						right:'10'
					});

					if (kngRm != null && kngRm != 0 && kngRm != '0' && kngRm != '') {
						bedrmScroll.add(titleKng);
						bedrmScroll.add(kngCap);
					}

					var titleOff = Titanium.UI.createLabel({
						text:'Offsite Bedroom',
						color:'#A3BD0B',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'5',
						left:'10',
						top:'10'
					});

					var offCap = Titanium.UI.createLabel({
						text:offRm,
						color:'#666',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'-20',
						right:'10'
					});

					if (offRm != null && offRm != 0 && offRm != '0' && offRm != '') {
						bedrmScroll.add(titleOff);
						bedrmScroll.add(offCap);
					}

					var titleSng = Titanium.UI.createLabel({
						text:'Single Bedroom',
						color:'#A3BD0B',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'5',
						left:'10',
						top:'10'
					});

					var sngCap = Titanium.UI.createLabel({
						text:sngRm,
						color:'#666',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'-20',
						right:'10'
					});

					if (sngRm != null && sngRm != 0 && sngRm != '0' && sngRm != '') {
						bedrmScroll.add(titleSng);
						bedrmScroll.add(sngCap);
					}

					var titleSwt = Titanium.UI.createLabel({
						text:'Suite Bedroom',
						color:'#A3BD0B',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'5',
						left:'10',
						top:'10'
					});

					var swtCap = Titanium.UI.createLabel({
						text:swtRm,
						color:'#666',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'-20',
						right:'10'
					});

					if (swtRm != null && swtRm != 0 && swtRm != '0' && swtRm != '') {
						bedrmScroll.add(titleSwt);
						bedrmScroll.add(swtCap);
					}

					var titleStu = Titanium.UI.createLabel({
						text:'Studio Bedroom',
						color:'#A3BD0B',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'5',
						left:'10',
						top:'10'
					});

					var stuCap = Titanium.UI.createLabel({
						text:stuRm,
						color:'#666',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'-20',
						right:'10'
					});

					if (stuRm != null && stuRm != 0 && stuRm != '0' && stuRm != '') {
						bedrmScroll.add(titleStu);
						bedrmScroll.add(stuCap);
					}

					var titleTrp = Titanium.UI.createLabel({
						text:'Triple Bedroom',
						color:'#A3BD0B',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'5',
						left:'10',
						top:'10'
					});

					var trpCap = Titanium.UI.createLabel({
						text:trpRm,
						color:'#666',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'-20',
						right:'10'
					});

					if (trpRm != null && trpRm != 0 && trpRm != '0' && trpRm != '') {
						bedrmScroll.add(titleTrp);
						bedrmScroll.add(trpCap);
					}

					var titleTwn = Titanium.UI.createLabel({
						text:'Twin Bedroom',
						color:'#A3BD0B',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'5',
						left:'10',
						top:'10'
					});

					var twnCap = Titanium.UI.createLabel({
						text:twnRm,
						color:'#666',
						font:{
							fontSize:'16',
							fontFamily:'Arial'
						},
						top:'-20',
						right:'10'
					});

					if (twnRm != null && twnRm != 0 && twnRm != '0' && twnRm != '') {
						bedrmScroll.add(titleTwn);
						bedrmScroll.add(twnCap);
					}

				};

				xhr.send();
			});

		}

		if (bedrooms != '' && bedrooms != '0' && bedrooms != null) {
			scroll.add(bedroomNoTitle);
			scroll.add(bedroomNoLine);

			if (Titanium.Network.online == true) {
				var bedroomMoreButton = Titanium.UI.createButton({
					backgroundImage:'/images/moreButton.png',
					height:'19',
					width:'44',
					top:'-21',
					left:'70'
				});

				scroll.add(bedroomMoreButton);

				bedroomMoreButton.addEventListener('click', function() {
					bedroomNoLine.fireEvent('click');
				});
			}
		}

		var meetingaccessTitle = Titanium.UI.createLabel({
			text:'Meeting Room Disabled Access',
			color:'#2195be',
			font:{
				fontSize:'16',
				fontFamily:'Arial',
				fontWeight:'bold'
			},
			left:'10',
			top:'10'
		});

		if (disabledAccess == 1) {
			disabledAccess = 'Yes';
		} else {
			disabledAccess = 'No';
		}

		var meetingAccess = Titanium.UI.createLabel({
			text:disabledAccess,
			color:'#666',
			font:{
				fontSize:'16',
				fontFamily:'Arial'
			},
			left:'10'
		});

		if (disabledAccess != '' && disabledAccess != '0' && disabledAccess != null) {
			scroll.add(meetingaccessTitle);
			scroll.add(meetingAccess);
		}

		row.next();

	}

}

module.exports = infoTab;
