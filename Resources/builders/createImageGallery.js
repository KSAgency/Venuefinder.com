function createImageGallery(tabGroup, imageList, index) {

    var imageViews = [];

    var createApplicationWindow = require('/builders/createApplicationWindow');
	var gallery = createApplicationWindow(tabGroup, null, '', '#000', null, null, null, null);
    
    if (Ti.App.Properties.getString('osname') != 'Android'){
        //Set Orientations
        gallery.orientationModes = [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
    	gallery.setOrientation(Titanium.UI.LANDSCAPE_LEFT);
    	
    }

    for (var i = 0; i<imageList.length; i++) {
        
        var scrollView = Ti.UI.createScrollView({
            maxZoomScale:100,
            minZoomScale:1,
            width:Ti.UI.FILL,
            height:Ti.UI.FILL
        });
        
        var imageView = Titanium.UI.createImageView({
            image:imageList[i],
            defaultImage:'/images/icon.png',
        });
        
        var conversion = imageView.toImage();
        
        if (conversion.width>=conversion.height) {
            imageView.setWidth(Ti.UI.FILL);
            scrollView.setContentWidth(Ti.UI.FILL);
            scrollView.setContentHeight(conversion.height);
        } else {
            imageView.setHeight(Ti.UI.FILL);
            scrollView.setContentHeight(Ti.UI.FILL);
            scrollView.setContentWidth(conversion.width);
        } 
        
        scrollView.add(imageView);
        imageViews.push(scrollView);
        
    }

    var imageScroller = Ti.UI.createScrollableView({
        views:imageViews,
        currentPage:index,
        width:Ti.UI.FILL,
        height:Ti.UI.FILL
    });

    gallery.add(imageScroller);
    tabGroup.activeTab.open(gallery);

}

module.exports = createImageGallery;
