function applicationRateAlert(){
    
    var rateAlert = Titanium.UI.createAlertDialog({
        title:'Like Our App?',
        message:'Please take a moment to rate us in the app store, your views are important to us',
        buttonNames:['Not Now', 'Rate Now'],
    });

    rateAlert.addEventListener('click', function(e) {
        
        if (e.index==1) {
            if (Titanium.Platform.getOsname('osname') == 'iphone'){
                Titanium.Platform.openURL('https://itunes.apple.com/gb/app/venuefinder.com/id601435429');
            } 
        }
    });

    return rateAlert;
    
}

module.exports = applicationRateAlert;