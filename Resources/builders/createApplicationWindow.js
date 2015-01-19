function createApplicationWindow(tabGroup, view, name, backgroundColor, tab, tier1, tier2, tier3, venueID, tabSelect, flipWindow) {
	var win = Titanium.UI.createWindow({
		backgroundColor : backgroundColor,
		title : name,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		zIndex : 0,
	});

	if (Ti.App.Properties.getString('osname') == 'iPhone') {
		win.setBarColor('#2195be');
		win.setBackButtonTitle('Back');
		win.setTintColor('#FFF');
		win.setTranslucent(false);
		win.setTitleControl(Ti.UI.createLabel({
			text : name,
			color : '#FFF',
			width : 160,
			height : 25,
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
		}));
	} else if (Ti.App.Properties.getString('osname') == 'iPad') {

		if (flipWindow != 'forflipwindow') {
			win.setBarColor('#2195be');
			win.setBackButtonTitle('Back');
			win.setTintColor('#FFF');
			win.setTranslucent(false);
			win.setTitleControl(Ti.UI.createLabel({
				text : name,
				color : '#FFF',
				width : 400,
				height : 25,
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
			}));
		}else
		{
			win.setNavBarHidden(true);
			win.setFullscreen(true);
		}
	}

	if (view != null) {
		var viewCheck = view.toString();
		if (viewCheck != '[object TiUIView]' && viewCheck != '[object TiUIWindow]') {
			viewCheck = viewCheck.substring(0, 9);
		}
	}

	if (tabSelect == '' || null) {
		tabSelect = 'info';
	}
	if (venueID != null && venueID != '' && view != null && view != '') {
		var getWinElements = require('/views/' + view);
		var winElements = getWinElements(tabGroup, venueID, tabSelect, win);
		win.add(winElements);
		tabGroup.activeTab.open(win);

	} else if (viewCheck == 'collview/' && view != null) {

		var getWinElements = require('/views/' + view);
		var winElements = getWinElements(tabGroup, win);
		if (winElements != null) {
			win.add(winElements);
		}
		win.open();
	} else if (viewCheck != 'children/' && viewCheck != null) {

		win.add(view);
		tabGroup.activeTab.open(win);

	} else if (view != null) {
		Ti.API.info("view : " + view);
		var getWinElements = require('/views/' + view);
		var winElements = getWinElements(tabGroup, win);
		win.add(winElements);
		tabGroup.activeTab.open(win);
	}

	//Omniture

	var omniture = Titanium.UI.createWebView({
		html : '<html><head><script type="text/javascript" src="s_code.js"></script></head><body><script>' + 's.channel="' + Ti.App.Properties.getString('osname') + '";' + 's.pageName="' + tab + '";' + 's.prop1="' + tier1 + '";' + 's.prop2="' + tier2 + '";' + 's.prop3="' + tier3 + '";' + 's.events="event4";' + 'var s_code=s.t(); if(s_code)document.write(s_code)</script><script>if(navigator.appVersion.indexOf("MSIE")>=0)document.write(unescape("%3C")+"\!-"+"-")</script><noscript><img src="https://cmpi.122.2o7.net/b/ss/cmpivenuefinderappprod/1/H.25.2--NS/0?[AQB]&cdp=3&[AQE]"height="1" width="1" border="0" alt="" /></noscript></body></html>',
		opacity : 0,
		width : 0,
		height : 0,
		left : 0,
		right : 0,
		touchEnabled : false
	});

	win.add(omniture);

	if (view == null) {
		return win;
	}
}

module.exports = createApplicationWindow;
