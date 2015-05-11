var venueNameDetail = require('/views/collview/flipPages/getVenueNameAndDetail');
function firstSpreadView2(flipView, venueID) {

	/*var middleView1 = Ti.UI.createView({
		backgroundColor:'#C0C0C0',
		width:'85',
		height:'94',
		top:'166',
		left:'112',
	});
	flipView.add(middleView1);
	*/
	
	var venueName = venueNameDetail.getVenueTitle(venueID);
	
	var venueNameLabel = Ti.UI.createLabel({
		width:'400',
		height:'52',
		top:'91',
		left:'62',
		font:{
			fontSize:32,
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		},
		text:venueName,
	});

	flipView.add(venueNameLabel);
	
	var venueText = venueNameDetail.getVenueText(venueID); 
	
	/*var textLabel = Ti.UI.createLabel({
		width:'198',
		height:'450',
		top:'156',
		left:'215',
		font:{
			fontSize:18,
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		},
		text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	});*/
	
	var editorImage = Ti.UI.createImageView({
		image:'/images/Toni Walsh.jpg',
		backgroundColor:'#999',
		width:'80',
		height:'106',
		top:'156',
		left:'62'
	});
	
	flipView.add(editorImage);
	
	var topScrollIndicator = Ti.UI.createView({
		width:'238',
		height:'50',
		top:'156',
		left:'175',
		backgroundGradient:{
			type:'linear',
			startPoint:{x:'0%', y:'0%'},
			endPoint:{x:'0%', y:'100%'},
			colors:[{color:'#999999', offset:0.0}, {color:'#FFFFFF', offset:1}]
		},
		opacity:'0',
		touchEnabled:false
	});
	
	flipView.add(topScrollIndicator);
	
	var bottomScrollIndicator = Ti.UI.createView({
		width:'238',
		height:'50',
		top:'556',
		left:'175',
		backgroundGradient:{
			type:'linear',
			startPoint:{x:'0%', y:'0%'},
			endPoint:{x:'0%', y:'100%'},
			colors:[{color:'#FFFFFF', offset:0.0}, {color:'#999999', offset:1}]
		},
		opacity:'0.3',
		touchEnabled:false
	});

	flipView.add(bottomScrollIndicator);
	
	var textScroll = Ti.UI.createScrollView({
		width:'238',
		height:'450',
		contentHeight:Ti.UI.SIZE,
		contentWidth:Ti.UI.FILL,
		top:'156',
		left:'175',
		layout:'vertical'
	});
	
	var textView = Ti.UI.createWebView({
		top:'0',
		left:'0',
		width:'235',
		html:venueText,
		font:{
			fontSize:18,
			fontFamily:Ti.App.Properties.getString('fontFamily'),
		},
		backgroundColor:'transparent',
		willHandleTouches:true
	});

	textView.setHtml(venueText, {mimeType:'text/html'});
	textView.setHeight(Ti.UI.SIZE);
	textScroll.add(textView);
	flipView.add(textScroll);
	
	textScroll.addEventListener('scroll', function(e){
		var scrollHeight = textView.rect.height - textScroll.rect.height;
		Ti.API.info(scrollHeight);
		
		Ti.API.info(e.y);
		
		if (e.y=='-0'){
			
			topScrollIndicator.animate({
				opacity:0,
				duration:500
			});
			
			bottomScrollIndicator.animate({
				opacity:0.3,
				duration:500
			});
			
		} else if (e.y >= scrollHeight){
			
			topScrollIndicator.animate({
				opacity:0.3,
				duration:500
			});
			
			bottomScrollIndicator.animate({
				opacity:0,
				duration:500
			});
			
		} else {
			
			topScrollIndicator.animate({
				opacity:0.3,
				duration:500
			});
			
			bottomScrollIndicator.animate({
				opacity:0.3,
				duration:500
			});
		}
		
		
	});

	return flipView;
}

module.exports = firstSpreadView2;
