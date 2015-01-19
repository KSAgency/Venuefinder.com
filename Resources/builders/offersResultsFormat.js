function offersResultsFormat(venueName, venueID, imageUrl, venueTown, venueCountry, offerName, validFrom, validTo) {

    if (Ti.App.Properties.getString('osname')!='iPad') {

        var tableRow = Titanium.UI.createTableViewRow({
            height:'150',
            venueTitle:venueName,
            uniqueID:venueID,
            selectedBackgroundColor:'#FFF',
            backgroundColor:'#FFF',
            layout:'vertical'
        });

    } else {

        var tableRow = Titanium.UI.createView({
            height:'150',
            width:'327',
            left:'10',
            top:'10',
            venueTitle:venueName,
            uniqueID:venueID,
            backgroundColor:'#FFF',
            borderRadius:'10',
            borderColor:'#999',
            layout:'vertical'
        });

    }

    var image = Titanium.UI.createImageView({
        image:'http://www.venuefinder.com/gallery/' + imageUrl,
        hires:true,
        width:'280',
        height:'180',
        touchEnabled:false
    });

    if (imageUrl==null) {
        image.setImage('/images/icon.png');
        image.setWidth('140');
        image.setHeight('90');
    }

    var imageHolder = Titanium.UI.createView({
        width:'96',
        left:'5',
        height:'87',
        top:'10',
        touchEnabled:false
    });

    var imageLoading = Titanium.UI.createActivityIndicator();

	if (Ti.App.Properties.getString('osname') != 'Android') {
		imageLoading.setStyle(Titanium.UI.iPhone.ActivityIndicatorStyle.DARK);
	}

    imageHolder.add(imageLoading);
    imageLoading.show();

    image.addEventListener('load', function(e) {
        imageLoading.hide();
    });

    var featuredImage = Titanium.UI.createImageView({
        image:'/images/offerbanner.png',
        touchEnabled:false,
        left:'0',
        top:'0'
    });

    var offerTitle = Titanium.UI.createLabel({
        text:venueName,
        left:'110',
        width:'200',
        top:'-90',
        ellipsize:true,
        color:'#2195be',
        font: {
            fontSize:'18px',
            fontWeight:'bold'
        },
        touchEnabled:false
    });

    var offerLocation = Titanium.UI.createLabel({
        text:venueTown + venueCountry,
        left:'110',
        width:'200',
        top:'0',
        ellipsize:true,
        color:'#A2BE1C',
        font: {
            fontSize:'16px'
        },
        zIndex:'2',
        touchEnabled:false
    });

    var offerDesc = Titanium.UI.createLabel({
        text:offerName,
        left:'110',
        width:'200',
        top:'0',
        ellipsize:true,
        color:'orange',
        font: {
            fontSize:'14px'
        },
        layout:'vertical',
        touchEnabled:false
    });

    var offerDate = Titanium.UI.createLabel({
        text:'From ' + validFrom,
        left:'110',
        width:'200',
        top:'0',
        ellipsize:true,
        color:'orange',
        font: {
            fontSize:'14px'
        },
        zIndex:'2',
        touchEnabled:false
    });

    var offertoDate = Titanium.UI.createLabel({
        text:'To ' + validTo,
        left:'110',
        width:'200',
        top:'0',
        ellipsize:true,
        color:'orange',
        font: {
            fontSize:'14px'
        },
        zIndex:'2',
        touchEnabled:false
    });

    imageHolder.add(image);
    imageHolder.add(featuredImage);
    tableRow.add(imageHolder);
    tableRow.add(offerTitle);
    tableRow.add(offerLocation);
    tableRow.add(offerDesc);
    tableRow.add(offerDate);
    tableRow.add(offertoDate);
    
    return tableRow;

}

module.exports = offersResultsFormat;
