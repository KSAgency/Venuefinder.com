function startActInd(curWin) {

    var spinView = Titanium.UI.createView({
        width:150,
        height:150,
        backgroundColor:'#000',
        opacity:0.75,
        borderRadius:'15%',
        zIndex:20
    });

    var actInd = Titanium.UI.createActivityIndicator();
    
    if (Ti.App.Properties.getString('osname') != 'Android'){
        actInd.setStyle(Titanium.UI.iPhone.ActivityIndicatorStyle.DEFAULT);
    }

    curWin.add(spinView);
    spinView.add(actInd);
    actInd.show();
    curWin.setTouchEnabled(false);

    return [spinView, actInd];

}

module.exports = startActInd;