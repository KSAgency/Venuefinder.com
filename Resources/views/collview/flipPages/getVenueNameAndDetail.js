function getVenueImage(venueID) {

	var image;
	if (venueID == 39) {
		//image = '/images/collection-cover.png';
		image = '/images/45StarHotels.jpg';
	} else if (venueID == 15) {
		image = '/images/unusualVeneus.jpg';
	} else if (venueID == 3) {
		image = '/images/conferenceVenues.jpg';
	} else if (venueID == 20) {
		image = '/images/castleHistoricVenues.jpg';
	} else if (venueID == 19) {
		image = '/images/AcademicVenues.jpg';
	} else if (venueID == 53) {
		image = '/images/christmasVenues.jpg';
	}
	return image;
}

module.exports.getVenueImage = getVenueImage;

function getVenueAdvert(venueID) {

	var advert;
	var link;
	if (venueID == 39) {
		//image = '/images/collection-cover.png';
		advert = '/images/collectionsAdverts/edwardianGroupLondon.png';
		link = 'http://www.radissonblu-edwardian.com/';
	} else if (venueID == 15) {
		advert = '/images/collectionsAdverts/kewGardens.png';
		link = 'http://www.kew.org/';
	} else if (venueID == 3) {
		advert = '/images/collectionsAdverts/ILEC.png';
		link = 'http://www.ilecconferencecentre.co.uk';
	} else if (venueID == 20) {
		advert = '/images/collectionsAdverts/amazingVenues.png';
		link = 'http://www.amazingvenues.co.uk/';
	} else if (venueID == 19) {
		advert = '/images/collectionsAdverts/imago.png';
		link = 'http://www.welcometoimago.com/';
	} else if (venueID == 53) {
		advert = '/images/collectionsAdverts/mercure.png';
		link = 'http://www.mercure.com/gb/united-kingdom/index.shtml';
	}
	return [advert, link];
}

module.exports.getVenueAdvert = getVenueAdvert;

function getVenueTitle(venueID) {

	var title;
	if (venueID == 39) {
		//image = '/images/collection-cover.png';
		title = '4-5* Hotels in London';
	} else if (venueID == 15) {
		title = 'Unusual Venues in London';
	} else if (venueID == 3) {
		title = 'Conference Centre Venues in London';
	} else if (venueID == 20) {
		title = 'Castles & Historic Houses';
	} else if (venueID == 19) {
		title = 'Academic Venues';
	} else if (venueID == 53) {
		title = 'Christmas Party Venues';
	}
	return title;
}

module.exports.getVenueTitle = getVenueTitle;

function getVenueText(venueID) {

	var venueText;// = '<span style="font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:14px; line-height:20pts; font-size:15px;"><b>Welcome to our brand new Christmas Party Venues Collection.</b> Christmas parties are the one time of the year that a company can come together and celebrate hard work and loyalty while boosting staff morale. So what should you look for in a venue? </span>';
	var boldText;
	var signatureText = '</br></br>Best</br>Toni Walsh</br>Head of Digital Content</br>Venuefinder.com</br><a href="mailto:toni.walsh@ubm.com">toni.walsh@ubm.com</a>';
	if (venueID == 39) {
		//image = '/images/collection-cover.png';
		boldText = '<b>Welcome to our brand new 4-5* hotels in London Collection.The venuefinder.com app is available both on and offline; so you will be able to carry out venue sourcing regardless of whether you are on the internet or not.</b>';
		var para1 = '</br></br>If you’re looking for high quality, professional venues for events and conferences, venuefinder.com offers a range of 4-5 Star Hotels. Our hotels provide your event with flexible, personal and practical venues that are committed to making the occasion as memorable as possible, whether it is a company training day or annual general meeting. Ranging from primarily business focused hotels to familiar brand names like Hilton and Mercure, these venues regularly host corporate functions and offer quality accommodation for delegates. Many of our 4-5 Star Hotels have elegant bars for a drink reception and quality restaurants, and can offer special attractions such as a gym, leisure facilities or a swimming pool.';
		var para2 = '</br></br>Our 4-5 Star Hotels are ideal for corporate away days or residential conference events, offering main suites for a large number of delegates to meeting rooms for smaller groups, with reasonable room hire and 24-hour delegate rates. These meeting rooms can be used as break out areas to facilitate networking and relationship building, or as an informal space where your delegates can have some relaxing private time, creating a positive ambience after a hard morning of seminars. If you are planning a board meeting or all day training seminar, many of our venues will provide flexible seating to encourage spontaneous discussion and brainstorming, along with audio visual facilities and other conference equipment to aid the visual accessibility of your presentations, with complimentary refreshments and dedicated staff. Many provide a conference lobby or foyer area where you can host your reception, perfect for team building exercises and brainstorming sessions, and are able to provide exquisite dining rooms for an evening function, luncheon or formal banqueting.';
		var para3 = '</br></br>Our 4-5 Star Hotels are also perfect for planning your ideal wedding reception or civil ceremony, with luxury accommodation for your guests. High-speed Wi-Fi internet is available at most of our hotel venues.';
		var para4 = '</br></br>As always here at venuefinder.com we are here to help you find that perfect venue, so let us know if we can help you at all. I am responsible for the developments on the website and app, so if you have any ideas or suggestions please let me know.';
		venueText = '<html><body style="margin:0px;"><span style="font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:14px; line-height:20pts; font-size:15px;">'+boldText+para1+para2+para3+para4+signatureText+'</span></body></html>';
	} else if (venueID == 15) {
		boldText='<b>Welcome to our brand new Unusual Venues in London Collection.The venuefinder.com app is available both on and offline; so you will be able to carry out venue sourcing regardless of whether you are on the internet or not.</b>';
		var para1 = '</br></br>Choosing an unusual venue can lend an extra dimension and pull to your event, attracting delegates that may otherwise have declined the invitation whilst guaranteeing to leave a lasting impression. Whether it is a royal yacht, zoo, steam train or vineyard, choosing an unusual venue will stand you apart from the crowd.';
		var para2 = '</br></br>Venuefinder.com lists more than 15,000 event spaces, so it is no wonder that many meeting venues are quick to claim the moniker “unique” in a bid to catch event planners’ eyes.';
		var para3 = '</br></br>In a tough market place, it is vital for a venue to differentiate itself from its competitors. But what really makes a venue unique? Well, by its definition, unique means it doesn’t exist anywhere else – and that is the key. You’re providing your guests with a meeting, party, conference or event experience that they’re unlikely to have sampled before. By staging an event in unique surroundings, you’ll tick the wow box and create long-lasting memories.';
		var para4 = '</br></br>Many unique and unusual spaces have dedicated in-house event teams as well as technical AV suppliers and preferred caterers. Base your decision to hire an unusual space on the unique appeal of the venue. Does it have an amazing view, offer inspirational surroundings or a money-can’t-buy experience? If you ask yourself what makes your choice unique, you’ll guarantee a magical guest experience.';
		var para5 = '</br></br>As always here at venuefinder.com we are here to help you find that perfect venue, so let us know if we can help you at all. I am responsible for the developments on the website and app, so if you have any ideas or suggestions please let me know.';
		venueText = '<html><body style="margin:0px;"><span style="font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:14px; line-height:20pts; font-size:15px;">'+boldText+para1+para2+para3+para4+para5+signatureText+'</span></body></html>';
	} else if (venueID == 3) {
		boldText = '<b>Welcome to our brand new Conference Centre Venues in London Collection.The venuefinder.com app is available both on and offline; so you will be able to carry out venue sourcing regardless of whether you are on the internet or not. </b>';
		var para1='</br></br>There can be no more appropriate working environment for your delegates than a dedicated conference centre. As you would expect, these venues are operated by meetings professionals with extensive knowledge of the industry. This enables them to better advise you to create the perfect event.';
		var para2='</br></br>State-of-the art AV equipment, professional teams and top-class catering are a matter of course. Rates are competitive, be it room hire prices or day delegate rates. Flexibility and versatility of space are paramount and the meeting rooms offered vary in size, from private boardrooms to exhibition halls. Some can accommodate residential conferences, others work with local accommodation partners.';
		var para3='</br></br>Conference centres are not necessarily stand-alone buildings. Hotels, museums, universities, and sporting venues are among the venue types that have realised the importance of having dedicated meetings space and have invested in building conference centres onsite.';
		var para4='</br></br>And Conference centres are far from being staid, soulless spaces. Instead, they are designed to be inspirational, creative business venues. They can be the perfect blank canvas to dress for themed dinners or product launches but unlike empty shells of buildings, you have all mod cons and the facilities you would expect, such as toilets and power supplies, in situ.';
		var para5='</br></br>As always here at venuefinder.com we are here to help you find that perfect venue, so let us know if we can help you at all. I am responsible for the developments on the website and app, so if you have any ideas or suggestions please let me know.';
		venueText = '<html><body style="margin:0px;"><span style="font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:14px; line-height:20pts; font-size:15px;">'+boldText+para1+para2+para3+para4+para5+signatureText+'</span></body></html>';
	} else if (venueID == 20) {
		boldText='<b>Welcome to our brand new Castles & Historic Houses Collection. The venuefinder.com app is available both on and offline; so you will be able to carry out venue sourcing regardless of whether you are on the internet or not. </b>';
		var para1 = '</br></br>The UK has a wealth of castles and historic houses and venuefinder.com has more than 750 stunning locations to choose from. From medieval castles to breathtakingly beautiful historic settings, this style of venue is sure to make your event stand out.';
		var para2 = '</br></br>There can be few event spaces as inspiring to be in as a castle or historic house. They are suitable for motivational and educational seminars and the perfect setting for your dream wedding. They are also a popular choice for TV and film locations.';
		var para3='</br></br>Many of the country house estates listed have ample space and the added benefit of privacy that makes them ideal for product launches. And the grounds lend themselves perfectly to country pursuits and team-building activities, from clay pigeon shooting to off-road driving.';
		var para4='</br></br>Some of these beautiful properties have been painstakingly and lovingly converted into full service hotels, complete with all mod-cons and a variety of accommodation options. Others give you the perfect backdrop to theme your event your way and can be hired exclusively. ';
		var para5='</br></br>Groups can also live the life of the landed gentry by calling on the services of butlers, housekeepers and chefs to ensure their celebration is a raging success.';
		var para6='</br></br>As always here at venuefinder.com we are here to help you find that perfect venue, so let us know if we can help you at all. I am responsible for the developments on the website and app, so if you have any ideas or suggestions please let me know.';
		venueText = '<html><body style="margin:0px;"><span style="font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:14px; line-height:20pts; font-size:15px;">'+boldText+para1+para2+para3+para4+para5+para6+signatureText+'</span></body></html>';
	} else if (venueID == 19) {
		boldText='<b>Welcome to our brand new Academic Venues Collection. The venuefinder.com app is available both on and offline; so you will be able to carry out venue sourcing regardless of whether you are on the internet or not. </b>';
		var para1='</br></br>Academic venues were once a niche proposition. Limited to being booked out of term-time and offering basic accommodation and large meeting rooms, they were considered a budget-friendly option for big groups. However, over the last few years academic venues have raised their profile and now sit comfortably alongside conventional event spaces such as conference centres and hotels.';
		var para2='</br></br>New developments are plentiful with millions being invested in facilities. Many universities and colleges have recognised the commercial advantage of investing in conference facilities, resulting in dedicated meeting rooms and accommodation of outstanding quality – in some instances halls of residence have been replaced by boutique hotel-style accommodation. AV equipment, catering options and service standards are enviable.';
		var para3='</br></br>Many academic venues offer dedicated residential conference facilities that are available year-round. They boast executive boardrooms, business lounges, large numbers of breakout spaces, big capacity auditoria and flexible exhibition space. And, many still offer exceptional value, with day delegate rates as low as £25 a person.';
		var para4='</br></br>“Academic venues offer some of Britain’s best meeting and accommodation facilities. With over 80 venues across the UK, organisers have a fantastic choice of city centre, rural and coastal locations,” adds Terry Billingham, CEO of academic venues consortium Venuemasters.';
		var para5='</br></br>As always here at venuefinder.com we are here to help you find that perfect venue, so let us know if we can help you at all. I am responsible for the developments on the website and app, so if you have any ideas or suggestions please let me know.';
		venueText = '<html><body style="margin:0px;"><span style="font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:14px; line-height:20pts; font-size:15px;">'+boldText+para1+para2+para3+para4+para5+signatureText+'</span></body></html>';
	} else if (venueID == 53) {
		boldText='<b>Welcome to our brand new Christmas Party Venues Collection. The venuefinder.com app is available both on and offline; so you will be able to carry out venue sourcing regardless of whether you are on the internet or not.</b>';
		var para1='</br></br>Christmas parties are the one time of the year that a company can come together and celebrate hard work and loyalty while boosting staff morale. So what should you look for in a venue? ';
		var para2='</br></br>Location is important. Is it near the office or transport links to make it easy for everyone to get home? Is it going to wow guests on entry and leave them talking about it for months to come?';
		var para3='</br></br>The quality, style and amount of food will be a talking point at any Christmas event and the venues listed on Venuefinder.com Blue&Green offer a variety of dining options, from formal dinners to buffets or bowl food. ';
		var para4='</br></br>Some Christmas party venues can be hired exclusively and are blank canvas spaces that can be themed or dressed by you. Others operate shared party nights to help keep costs down whilst maintaining a buzz around your event. Bars, restaurants and nightclubs are also popular choices.';
		var para5='</br></br>Book early to get the best Christmas party venues, prices and dates – the most popular are Thursdays and Fridays in the first two weeks of December. Or consider following the trend for holding your celebration early in January to start the new year in style.';
		var para6='</br></br>As always here at venuefinder.com we are here to help you find that perfect venue, so let us know if we can help you at all. I am responsible for the developments on the website and app, so if you have any ideas or suggestions please let me know.';
		venueText = '<html><body style="margin:0px;"><span style="font-family:' + Ti.App.Properties.getString('fontFamily') + '; color:#000; font-size:14px; line-height:20pts; font-size:15px;">'+boldText+para1+para2+para3+para4+para5+para6+signatureText+'</span></body></html>';
	}
	
	
	return venueText;
	
	
}

module.exports.getVenueText = getVenueText;
