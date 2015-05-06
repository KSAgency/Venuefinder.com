function createImageGalleryThumbnails(venueID, page, venuePackage, bronzePage) {
	
	// alert(venuePackage);
	
	//Require Image Gallery
	
	var createImageGallery = require('/views/collview/ImageGallery/createImageGallery');
	
	//Set Number of images required
	
	var limit = 4;
	var split = 0;
	
	if (venuePackage == 'GLD' && page == 'left' && bronzePage != true){
		limit = 6;
	} else if (venuePackage == 'GLD' && page == 'right' && bronzePage != true){
		limit = 3;
		split = 6;
	}
	
	if (venuePackage == 'SIL' && page == 'left' && bronzePage != true){
		limit = 3;
	} else if (venuePackage == 'SIL' && page == 'right' && bronzePage != true){
		limit = 4;
		split = 3;
	}
	
	// Create Main Container View
	
	var galleryView = Ti.UI.createView({
		width:450,
		height:Ti.UI.SIZE,
		left:8,
		top:40,
		layout:'horizontal'
	});
	
	if (page === 'right'){
		galleryView.setLeft(470);
		galleryView.setWidth(310);
	} else if (venuePackage === "PRE" || bronzePage === true) {
		galleryView.setWidth(310);
	}
	
	var featuredGalleryView = Ti.UI.createView({
		width:450,
		height:250,
		top:0
	});
	
	//Pull Images from DB
	
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var getMedia = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID=' + venueID + ' AND (OptionCode = \'TOP\' OR OptionCode = \'PIC\' OR OptionCode = \'MIL\' OR OptionCode = \'MIL\' OR OptionCode = \'MIR\') ORDER BY OptionCode DESC LIMIT '+limit+' OFFSET '+split);
	
	var fieldCount = 1;
	while (getMedia.isValidRow()){
		
		//Grab Images

		var mediaType = getMedia.fieldByName('OptionCode');
		var mediaURL = getMedia.fieldByName('GraphicFileName');
		
		// Create Objects
		
		var imageContainer = Ti.UI.createView({
			width:140,
			height:115,
			left:10,
			top:10,
			index:fieldCount-1,
			side:page
		});
		
		var image = Ti.UI.createImageView({
			image:'http://www.venuefinder.com/adverts/' + mediaURL,
			defaultImage:'/images/icon.png',
			touchEnabled:false
		});
		
		// Restyle for specific criterias
		
		if (((venuePackage === "GLD" && bronzePage != true) || (venuePackage === "SIL" && page === 'left' && bronzePage != true)) && fieldCount === 1){
			imageContainer.setWidth(290);
			imageContainer.setHeight(240);
			imageContainer.setTop(10);
			imageContainer.setLeft(10);
		} else if ((venuePackage === "GLD" || venuePackage === "SIL") && bronzePage != true && page === "left" && fieldCount === 2) {
			imageContainer.setLeft(imageContainer.width*2 + 30);
			imageContainer.setTop(10);
		} else if ((venuePackage === "GLD" || venuePackage === "SIL") && bronzePage != true && page === "left" && fieldCount === 3) {
			imageContainer.setLeft(imageContainer.width*2 + 30);
			imageContainer.setBottom(0);
			imageContainer.setTop(null);
		}
		
		//Resize Image to fit container box

		var createImageResize = require('/builders/imageResize');
		createImageResize(image, imageContainer);
		
		if ((venuePackage === "GLD" || venuePackage === "SIL") && bronzePage != true && page === "left" && fieldCount <= 3){
			
			imageContainer.add(image);
			featuredGalleryView.add(imageContainer);
			
			if (fieldCount === 3){
				galleryView.add(featuredGalleryView);
			}
			
		} else {
			imageContainer.add(image);
			galleryView.add(imageContainer);
		}
		
		fieldCount++;

		getMedia.next();

	}
	
	db.close();
	
	galleryView.addEventListener('click', function(e){
		
		var imageList = [];
		var allLimit = 4;
		
		if (venuePackage == 'GLD'){
			allLimit = 9;
		} else if (venuePackage == 'SIL'){
			allLimit = 7;
		} 
		
		var createDatabase = require('/builders/databaseFunctions/createDatabase');
		var db = createDatabase('/venuefinder.db', 'venuefinder');
		var getAllMedia = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID=' + venueID + ' AND (OptionCode = \'TOP\' OR OptionCode = \'PIC\' OR OptionCode = \'MIL\' OR OptionCode = \'MIL\' OR OptionCode = \'MIR\') ORDER BY OptionCode DESC LIMIT '+allLimit);
		
		while (getAllMedia.isValidRow()){
			imageList.push(getAllMedia.fieldByName('GraphicFileName'));
			getAllMedia.next();
		}
		
		db.close();
		
		var index = e.source.index;
		
		if (e.source.side === 'right'){
			index = e.source.index+6;
		}
		
		createImageGallery(null, imageList, index);
		
	});

	return galleryView;

}

module.exports = createImageGalleryThumbnails;