function applicationDashboard(tabGroup) {

	var home_screen = Titanium.UI.createWindow({
		title:'Dashboard',
		backgroundColor:'#fff',
		zIndex:'5',
		top:'0'
	});
	
	var createUpdateButton = require('/builders/databaseFunctions/update/createUpdateButton');
	var updateButton = createUpdateButton(home_screen, false);

	// Social Media Bar

	var topMenu = Titanium.UI.createView({
		top:-170,
		height:170,
		width:36,
		right:25,
		layout:'vertical',
		backgroundColor:'#666',
		zIndex:20
	});

	var socialflag = Titanium.UI.createButton({
		backgroundImage:'/images/socialflag.png',
		right:25,
		height:60,
		width:37,
		top:0,
		zIndex:20
	});

	var shadowOverlay = Titanium.UI.createImageView({
		image:'/images/shadow_overlay.png',
		top:-20,
		right:25,
		height:60,
		width:37,
		zIndex:20
	});

	home_screen.add(socialflag);
	home_screen.add(shadowOverlay);
	home_screen.add(topMenu);

	var twitter = Titanium.UI.createImageView({
		image:'/images/twitter.png',
		width:26,
		height:26,
		left:5,
		top:10,
	});

	var facebook = Titanium.UI.createImageView({
		image:'/images/facebook.png',
		width:26,
		height:26,
		left:5,
		top:10,
	});

	var linkedin = Titanium.UI.createImageView({
		image:'/images/linkedin.png',
		width:26,
		height:26,
		left:5,
		top:10,
	});

	topMenu.add(facebook);
	topMenu.add(twitter);
	topMenu.add(linkedin);

	var isReady = true;

	socialflag.addEventListener('click', function(e) {
		// create variable to keep track of visibility
		if (isReady == true) {
			socialflag.animate({
				top:170,
				duration:700
			});
			topMenu.animate({
				top:0,
				duration:700
			});
			isReady = false;
		} else {
			socialflag.animate({
				top:0,
				duration:700
			});
			topMenu.animate({
				top:-170,
				duration:700
			});
			isReady = true;
		}
	});

	shadowOverlay.addEventListener('click', function(e) {
		socialflag.fireEvent('click');
	});

	facebook.addEventListener('click', function() {
		Titanium.Platform.openURL('http://www.facebook.com/VenuefinderBlueGreen');
	});

	twitter.addEventListener('click', function() {
		Titanium.Platform.openURL('http://twitter.com/venuefinder_com');
	});

	linkedin.addEventListener('click', function() {
		Titanium.Platform.openURL('http://www.linkedin.com/groups/venuefindercom-blue-green-4081928?gid=4081928&trk=hb_side_g');
	});

	// Create Logo

	var logo = Titanium.UI.createImageView({
		image:'/images/logo.png',
		top:'35',
		width:'100%'
	});

	home_screen.add(logo);

	// Add the data

	var data = [{
		height:44,
		title:'Venue Search',
		hasChild:true,
		index:0,
		color:'#2195be',
		font:{
			fontSize:'20',
			fontWeight:'bold'
		}
	}, {
		height:44,
		title:'Map',
		hasChild:true,
		index:1,
		color:'#2195be',
		font:{
			fontSize:'20',
			fontWeight:'bold'
		}
	}, {
		height:44,
		title:'Videos',
		hasChild:true,
		index:2,
		color:'#2195be',
		font:{
			fontSize:'20',
			fontWeight:'bold'
		}
	}, {
		height:44,
		title:'Special Offers',
		hasChild:true,
		index:3,
		color:'#2195be',
		font:{
			fontSize:'20',
			fontWeight:'bold'
		}
	}, {
		height:44,
		title:'My Favourites',
		hasChild:true,
		index:4,
		color:'#2195be',
		font:{
			fontSize:'20',
			fontWeight:'bold'
		}
	}, {
		height:44,
		title:'About venuefinder.com',
		hasChild:true,
		index:5,
		color:'#2195be',
		font:{
			fontSize:'20',
			fontWeight:'bold'
		}
	}];

	if (Ti.App.Properties.getString('osname') != 'iPad') {

		var blankRow = Titanium.UI.createTableViewRow({
			touchEnabled:false,
			height:'200',
			color:'#2195be',
			font:{
				fontSize:'20',
				fontWeight:'bold',
				selectedColor:'#FFF'
			}
		});

		data.push(blankRow);

	}

	// Add to window

	var tableview = Titanium.UI.createTableView({
		data:data,
		color:'#2195be',
		font:{
			fontSize:'20'
		},
		backgroundColor:'transparent',
		rowBackgroundColor:'#fff',
		height:'200%',
		top:'28%',
		width:'101%',
		scrollable:false
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {

		//Resize Logo
		logo.setWidth('600');
		logo.setTop('110');
		logo.setImage('/images/logoIpad.png');

		//Adjust Table View
		tableview.setWidth('600');
		tableview.setBorderRadius('10');
		tableview.setHeight(Titanium.UI.SIZE);
		tableview.setTop('300');

		//Reposition Social Bar
		topMenu.setRight('220');
		socialflag.setRight('220');

	} else if (Ti.App.Properties.getString('osname') == 'Android'){
		tableview.setWidth(275);
	}

	home_screen.add(tableview);

	var about_us = Titanium.UI.createWebView({
		background:'#d2e8f5',
		color:'#fff',
		top:44.5,
		url:'/about_us.html',
		height:Ti.UI.FILL,
		width:Ti.UI.FILL,
		zIndex:'10'
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		about_us.setUrl('/about_us_iPad.html');
	} else if (Ti.App.Properties.getString('osname') == 'Android'){
		about_us.setScalesPageToFit(true);
		about_us.setTop(0);
	
		var aboutWin = Titanium.UI.createWindow({
			title:'About venuefinder.com',
			backgroundColor:'#fff',
			zIndex:10,
			top:0
		});
		
		aboutWin.addEventListener('androidback', function(e) {
	
			if (about_us.canGoBack() == 1) {
	
				about_us.goBack();
	
			} else {
	
				aboutWin.close();

			}
		});
		
	} 

	if (Ti.Platform.osname != 'android') {

		var home_button = Titanium.UI.createButton({
			style:Titanium.UI.iPhone.SystemButtonStyle.DONE,
			backButtonTitle:'Back',
			title:'Back'
		});

		var toolbar = Titanium.UI.iOS.createToolbar({
			items:[home_button],
			text:'About Venue Finder',
			barColor:'#2195be',
			backButtonTitle:'Back',
			backgroundColor:'#FFF',
			width:'100%',
			height:'20%',
			top:'0%'
		});
	
		home_button.addEventListener('click', function(e) {
	
			if (about_us.canGoBack() == 1) {
	
				about_us.goBack();
	
			} else {
	
				home_screen.remove(about_us);
	
				if (Ti.Platform.osname != 'android') {
					home_screen.remove(toolbar);
					home_screen.remove(home_button);
				}
	
			}
		});

	}

	//Create click listeners

	tableview.addEventListener('click', function(e) {
		if (e.rowData.index == 5) {

			if (Ti.Platform.osname != 'android') {
				home_screen.add(toolbar);
				home_screen.add(about_us);
			} else {
				aboutWin.add(about_us);
				aboutWin.open();
			}

			

		} else {

			if (Ti.Platform.osname == 'android'){
			
				tabGroup.setActiveTab(e.rowData.index);
				home_screen.close();
				
			} else {
			
				tabGroup.setActiveTab(e.rowData.index);
				home_screen.hide();
				
			}

		}
	});

	// Require & Create advert space
	var createAdvert = require('/builders/createAdvert');
	var advert = createAdvert();
	home_screen.add(advert);

	return home_screen;

}

module.exports = applicationDashboard;
