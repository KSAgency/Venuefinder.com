function createFlipWindow(tabGroup, url, name, backgroundColor, tab, tier1, tier2, tier3, venueID, tabSelect, styleID, windowsArray, startActInd,venueID, win4) {
	var win = Titanium.UI.createWindow({
		backgroundColor : backgroundColor,
		title : name,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		url : url,
		tabGroup : tabGroup,
		styleID : styleID,
		windowsArray : windowsArray,
		venueID : venueID,
		win : win4,
		startActInd : startActInd,
		fullscreen:true,
	});	
	
	win.setNavBarHidden(true);
	return win;
}

module.exports = createFlipWindow;
