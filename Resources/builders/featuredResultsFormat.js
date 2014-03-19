function featuredResultsFormat(venueName, venueID, imageUrl, bedrooms, bedroomAccess, venueDesc, venueTown, venueCountry, banner, featuredVenues){

	if (featuredVenues != null || Ti.App.Properties.getString('osname') != 'iPad') {

		var tableRow = Titanium.UI.createTableViewRow({
			height:150,
			venueTitle:venueName,
			uniqueID:venueID,
			selectedBackgroundColor:'#FFF',
			backgroundColor:'#FFF'
		});

	} else {

		var tableRow = Titanium.UI.createView({
			height:150,
			width:327,
			left:10,
			top:10,
			venueTitle:venueName,
			uniqueID:venueID,
			backgroundColor:'#FFF',
			borderRadius:10,
			borderColor:'#999'
		});

	}
	
	//Image
	
	var imageHolder = Titanium.UI.createView({
		width:96,
		left:5,
		height:87,
		top:10,
		touchEnabled:false
	});
	
	if (Ti.App.Properties.getString('osname') != 'Android'){
		imageHolder.setLeft(15);
	}

	var image = Titanium.UI.createImageView({
		image:'http://www.venuefinder.com/adverts/' + imageUrl,
		defaultImage:'/images/icon.png',
		hires:true,
		width:140,
		touchEnabled:false
	});

	if (imageUrl == null) {
		image.setImage('/images/icon.png');
	}

	var imageLoading = Titanium.UI.createActivityIndicator();

	if (Ti.App.Properties.getString('osname') != 'Android') {
		imageLoading.setStyle(Titanium.UI.iPhone.ActivityIndicatorStyle.DARK);
	}

	imageHolder.add(imageLoading);
	imageLoading.show();

	image.addEventListener('load', function(e) {
		image.setWidth(280);
		imageLoading.hide();
	});

	var featuredImage = Titanium.UI.createImageView({
		image:'/images/featuredbanner.png',
		touchEnabled:false,
		top:0,
		left:0
	});

	if (banner != null && banner != '') {
		featuredImage.setImage(banner);
	}
	
	imageHolder.add(image);
	imageHolder.add(featuredImage);
	tableRow.add(imageHolder);
	
	//Labels
	
	var titleBox = Titanium.UI.createView({
		width:190,
		left:120,
		height:45,
		top:5,
		touchEnabled:false
	});
	
	var title = Titanium.UI.createLabel({
		text:venueName,
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		top:0,
		left:0,
		ellipsize:true,
		color:'#2195be',
		font:{
			fontSize:18,
			fontWeight:'bold'
		},
		touchEnabled:false
	});
	
	if (Ti.App.Properties.getString('osname') != 'Android'){
		titleBox.setLeft(125);
		titleBox.setWidth(180);
	}

	var subTitle = Titanium.UI.createLabel({
		text:venueTown + venueCountry,
		left:120,
		width:190,
		height:30,
		top:43,
		ellipsize:true,
		color:'#A2BE1C',
		font:{
			fontSize:16
		},
		touchEnabled:false
	});
	
	if (Ti.App.Properties.getString('osname') != 'Android'){
		subTitle.setLeft(125);
		subTitle.setWidth(180);
	}

	if (venueDesc == null || venueDesc == '') {
		venueDesc = 'No description could be retrieved for this venue.';
	}

	var venueDescLabel = Titanium.UI.createLabel({
		text:venueDesc,
		left:120,
		width:190,
		height:35,
		top:65,
		touchEnabled:false,
		color:'#666',
		font:{
			fontSize:14
		},
		touchEnabled:false
	});
	
	if (Ti.App.Properties.getString('osname') != 'Android'){
		venueDescLabel.setLeft(125);
		venueDescLabel.setWidth(180);
	}
	
	if (venueName.length < 20){
		title.setHeight(20);
		subTitle.setTop(20);
		venueDescLabel.setTop(43);
		venueDescLabel.setHeight(55);
	}

	titleBox.add(title);
	tableRow.add(titleBox);
	tableRow.add(subTitle);
	tableRow.add(venueDescLabel);
	
	//Banners

	var bannerView = Ti.UI.createView({
		height:25,
		width:Ti.UI.SIZE,
		top:110,
		left:0,
		layout:'horizontal',
		touchEnabled:false
	});
	
	if (Ti.App.Properties.getString('osname') != 'Android'){
		bannerView.setLeft(10);
	}

	if (bedrooms != null && bedrooms >= 0) {

		var hasBed = Titanium.UI.createImageView({
			image:'/images/has_bedrooms.png',
			height:25,
			width:25,
			left:5,
			touchEnabled:false
		});

		bannerView.add(hasBed);

	}

	if (bedroomAccess == 1) {

		var hasAccess = Titanium.UI.createImageView({
			image:'/images/has_access.png',
			height:25,
			width:25,
			left:5,
			touchEnabled:false
		});

		bannerView.add(hasAccess);

	}

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	//January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	today = yyyy + '-' + mm + '-' + dd;

	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var getVenueOffers = db.execute('SELECT * FROM Offers WHERE EntryID="' + venueID + '" AND validToDate>="' + today + '"');

	if (getVenueOffers.rowCount != 0) {

		var hasOffer = Titanium.UI.createImageView({
			image:'/images/has_offers.png',
			height:25,
			width:73,
			left:5,
			touchEnabled:false
		});

		bannerView.add(hasOffer);

	}

	db.close();
	
	tableRow.add(bannerView);

	return tableRow;

}

module.exports = featuredResultsFormat;
