function headerScroll(tabGroup, venueID) {

    var count = -1;
    var lastCount = null;

    //Get venue Type
    var createDatabase = require('/builders/databaseFunctions/createDatabase');
    var db = createDatabase('/venuefinder.db', 'venuefinder');
    var getPackage = db.execute('SELECT * FROM Venue WHERE VenueID = "' + venueID + '"');
    var venuePackage = getPackage.fieldByName('PackageCode');

    if (venuePackage=='FRE') {

        var photoScroll = Titanium.UI.createView({
            width:1026,
            height:200,
            top:-1,
            borderColor:'#999',
            borderWidth:1
        });

        var freeImage = Ti.UI.createImageView({
            image:'/images/logoIpad.png',
            height:150
        });

        photoScroll.add(freeImage);

    } else {

        var photoScroll = Titanium.UI.createScrollView({
            contentWidth:Ti.UI.SIZE,
            contentHeight:200,
            width:1026,
            height:200,
            top:-1,
            layout:'horizontal',
            borderColor:'#999',
            borderWidth:1
        });

    }

    if (venuePackage!='FRE') {

        var imagesArray = [];

        var createDatabase = require('/builders/databaseFunctions/createDatabase');
        var db = createDatabase('/venuefinder.db', 'venuefinder');
        var getMedia = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID="' + venueID + '" ORDER BY OptionCode DESC');
        while (getMedia.isValidRow()) {

            var mediaType = getMedia.fieldByName('OptionCode');
            var mediaURL = getMedia.fieldByName('GraphicFileName');
            var videoURL = getMedia.fieldByName('URL');

            if (mediaType=='TOP' || mediaType=='PIC' || mediaType=='TOP' || mediaType=='MID' || mediaType=='MIL' || mediaType=='MIR') {

                lastCount = count++;

                var imageHolder = Titanium.UI.createView({
                    width:190,
                    height:190,
                    left:10
                });

                var image = Titanium.UI.createImageView({
                    image:'http://www.venuefinder.com/adverts-hd/' + mediaURL,
                    defaultImage:'/images/icon.png',
                    imageCode:mediaURL,
                    index:count,
                    width:1024
                });

                var conversion = image.toImage();

                if (conversion.width>=conversion.height) {
                    image.setWidth(1024);
                } else {
                    image.setHeight(1024);
                }
                
                //push raw image to array for gallery
                imagesArray.push(image.image);

                if (conversion.width>=conversion.height) {
                    image.setWidth(400);
                } else {
                    image.setHeight(400);
                }

                imageHolder.add(image);
                photoScroll.add(imageHolder);

                // IMAGE ENLARGE CODE

                image.addEventListener('click', function(e) {
                    
                    // Clear Scrolls
    
                   var createImageGallery = require('/builders/createImageGallery');
                   var imageGallery = createImageGallery(tabGroup, imagesArray, e.source.index);

                });
            }

            if (mediaType=='VID') {

                var videoHolder = Titanium.UI.createView({
                    width:180,
                    height:180,
                    left:10,
                    video:videoURL
                });

                var videoID = videoURL.substring(29, 60);
                
                var videoImage = Titanium.UI.createImageView({
                    image:'http://www.venuefinder.com/adverts/' + mediaURL,
                    defaultImage:'/images/icon.png',
                    touchEnabled:false,
                    width:370,
                    height:200
                });

                var featuredImage = Titanium.UI.createImageView({
                    image:'/images/videobanner.png',
                    touchEnabled:false,
                    zIndex:5,
                    top:0,
                    left:0
                });

                var playButton = Titanium.UI.createImageView({
                    image:'/images/playButton.png',
                    touchEnabled:false,
                    zIndex:4,
                    top:40,
                    width:100,
                    height:100
                });

                videoHolder.addEventListener('click', function(e) {

					var createApplicationWindow = require('/builders/createApplicationWindow');
					var videoWindow = createApplicationWindow(tabGroup, null, '', '#d2e8f5', null, null, null, null);

                    var videoPlayer = Titanium.UI.createWebView({
                        url:e.source.video,
                        width:Ti.UI.FILL,
                        height:Ti.UI.FILL
                    });
                    
                    videoWindow.add(videoPlayer);
                    tabGroup.activeTab.open(videoWindow);
                    
                });

                videoHolder.add(videoImage);
                videoHolder.add(featuredImage);
                videoHolder.add(playButton);
                photoScroll.add(videoHolder);

            }

            // NEXT!
            getMedia.next();

        }

    }

    return photoScroll;

}

module.exports = headerScroll;
