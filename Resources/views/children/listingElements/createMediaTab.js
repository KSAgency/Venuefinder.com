function mediaTab(tabGroup, win, scroll, venueID, tabs) {
    if (Ti.App.Properties.getString('osname')!='iPad') {
        
        var imageArray = [];
        
        var count = -1;
        var lastCount;
        
        if (Ti.Network.online==true) {

            //Pull database
            var createDatabase = require('/builders/databaseFunctions/createDatabase');
            var db = createDatabase('/venuefinder.db', 'venuefinder');

            //Get Title
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
                left:'10',
                top:'20',
                width:'90%',
                ellipsize:true,
                color:'#2195be',
                font: {
                    fontSize:'18',
                    fontWeight:'bold'
                }
            });

            scroll.add(title);

            var subTitle = Titanium.UI.createLabel({
                text:town + country,
                left:10,
                width:Ti.UI.FILL,
                top:1,
                ellipsize:true,
                color:'#A2BE1C',
                font: {
                    fontSize:16
                }
            });

            scroll.add(subTitle);

            var photoLabel = Titanium.UI.createLabel({
                text:'Photos',
                top:10,
                left:10,
                color:'#2195be',
                font: {
                    fontSize:16,
                    fontFamily:'Arial',
                    fontWeight:'bold'
                }
            });

            scroll.add(photoLabel);

            var photoScroll = Titanium.UI.createScrollView({
                height:Ti.UI.SIZE,
                width:320,
                top:5,
                layout:'horizontal',
                horizontalWrap:false,
                showHorizontalScrollIndicator:true,
                scrollType:'horizontal',
                backgroundColor:'#FFF'
            });
            
            if (Ti.App.Properties.getString('osname') != 'Android'){
            	photoScroll.setVerticalBounce(false),
                photoScroll.setHorizontalBounce(false);
            } else {
            	photoScroll.setContentWidth(Ti.UI.FILL);
            }

            scroll.add(photoScroll);

            var createDatabase = require('/builders/databaseFunctions/createDatabase');
            var db = createDatabase('/venuefinder.db', 'venuefinder');
            var getMedia = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID="' + venueID + '" ORDER BY OrderKey ASC');
            while (getMedia.isValidRow()) {

                var mediaType = getMedia.fieldByName('OptionCode');
                var mediaURL = getMedia.fieldByName('GraphicFileName');
                var videoURL = getMedia.fieldByName('URL');

                if (mediaType=='PIC' || mediaType=='TOP' || mediaType=='MID' || mediaType=='MIL' || mediaType=='MIR') {

					lastCount = count++;

                    var imageHolder = Titanium.UI.createView({
                        width:250,
                        height:160,
                        left:10,
                        backgroundColor:'#666'
                    });

                    var image = Titanium.UI.createImageView({
                        image:'http://www.venuefinder.com/gallery/' + mediaURL,
                        defaultImage:'/images/icon.png',
                        imageCode:mediaURL,
                        index:count
                    });

                    imageHolder.add(image);

                    photoScroll.add(imageHolder);

                    photoScroll.imageCode = mediaURL;
                    
                    imageArray.push(image.image);

                    // IMAGE ENLARGE CODE

                    imageHolder.addEventListener('click', function(e) {

						var createImageGallery = require('/builders/createImageGallery');
                   		var imageGallery = createImageGallery(tabGroup, imageArray, e.source.index);
                        
                    });
                }

                // Load Videos

                if (mediaType=='VID' && videoURL!='' && videoURL!=null) {

					var videoURLString = videoURL.toString();
	
                    var videoLabel = Titanium.UI.createLabel({
                        text:'Videos',
                        top:'50',
                        left:'10',
                        color:'#2195be',
                        font: {
                            fontSize:'16',
                            fontFamily:'Arial',
                            fontWeight:'bold'
                        }
                    });

                    scroll.add(videoLabel);

                    var videoScroll = Titanium.UI.createScrollView({
                        contentWidth:320,
                        contentHeight:Ti.UI.FILL,
                        width:Ti.UI.FILL,
                        height:'160',
                        top:'5',
                        verticalBounce:false,
                        horizontalBounce:false,
                        layout:'horizontal',
                        showHorizontalScrollIndicator:true
                    });

                    scroll.add(videoScroll);
                    
                    var clickLabel = Titanium.UI.createLabel({
						text:'Please click here to watch this video',
						backgroundColor:'#A2BE1C',
						color:'#FFF',
						height:30,
						width:300,
						textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
						left:10,
	                    font: {
	                        fontSize:'16',
							fontFamily:'Arial'
						}
					});
					
					clickLabel.addEventListener('click', function(){
						Titanium.Platform.openURL(videoURLString);
					});
	                    
					
                    
                    if (Ti.App.Properties.getString('osname') != 'Android'){
                    	
                    	var video = Titanium.UI.createWebView({
	                        url:videoURLString,
	                        width:300,
	                        left:10,
	                        height:Ti.UI.FILL
	                    });
                    	
                    	videoScroll.add(video);
                    	
                    } else {
                    	videoScroll.add(clickLabel);
                    }

                    

                }

                // NEXT!
                getMedia.next();

            }

        } else {

            tab2.setBackgroundImage('/images/photos_media_ns.png');

        }
        
    } else {

        var createDatabase = require('/builders/databaseFunctions/createDatabase');
        var db = createDatabase('/venuefinder.db', 'venuefinder');
        var row = db.execute('SELECT * FROM Venue WHERE VenueID="' + venueID + '"');
        
        var venuePackage = row.fieldByName('PackageCode');
    
        var descText = 'No description could be found for this venue.';
    
        if (venuePackage=='PRE') {
            var row2 = db.execute('SELECT Text FROM VenueAdvertOptionsForWeb WHERE VenueID="' + venueID + '" AND OptionCode="SG2"');
            descText = row2.fieldByName('Text');
        } else {
            var row2 = db.execute('SELECT DescriptionText FROM VenueTextForWeb WHERE VenueID="' + venueID + '"');
            descText = row2.fieldByName('DescriptionText');
        }
    
        if (descText==null || descText=='') {
            descText = 'No description could be retrieved for this venue.';
        }
    
        descText.replace('/<(?:.|\n)*?>/gm', '');
    
        db.close();

        var descriptionText = Titanium.UI.createWebView({
            html:'<span style="font-family:Arial; color:#666; font-size:14px; line-height:20pts; font-size:15px;">' + descText + '</span>',
            top:'20',
            width:'95%'
        });

        scroll.add(descriptionText);

    }

}

module.exports = mediaTab;
