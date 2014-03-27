function createAdvert(overRide) {
    if (Ti.Network.online==true) {

        var advert = Titanium.UI.createImageView({
            image:'/images/advert.png',
            bottom:'0',
            width:'320',
            height:'50',
            zIndex:'9'
        });

    } else {
        
        var advert = Titanium.UI.createImageView({
            image:'/images/advert.png',
            bottom:'0',
            width:'320',
            height:'50',
            zIndex:'9'
        });

    }

    if (Ti.App.Properties.getString('osname')=='iPad') {

        if (overRide!=null && overRide!='') {
            advert.setBottom(overRide);
        } else {
            advert.setBottom('50');
        }

        advert.setWidth('600');
        advert.setHeight('94');
    }

    return advert;

}

module.exports = createAdvert;
