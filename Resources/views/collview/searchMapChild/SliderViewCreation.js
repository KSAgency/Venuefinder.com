function SliderViewCreation(parentView, arrayLength, limitofVenue, lastView, winData, scroll) {
	var bottom = '10';
	var sliderView = Ti.UI.createView({
		width : '750',
		height : '43',
		left : '41',
		bottom : bottom,
	});

	var pageLabel = Ti.UI.createLabel({
		left : '0',
		bottom : bottom,
		font : {
			fontSize : 20,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : 'Page',
	});
	sliderView.add(pageLabel);

	var numberStartLabel = Ti.UI.createLabel({
		left : '55',
		bottom : bottom,
		font : {
			fontSize : 18,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : arrayLength != 0 ? 1 : 0,
		color : '#fff',
	});
	sliderView.add(numberStartLabel);

	var ofLabel = Ti.UI.createLabel({
		left : '80',
		bottom : bottom,
		font : {
			fontSize : 18,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : 'of',
	});
	sliderView.add(ofLabel);

	var numberEndLabel = Ti.UI.createLabel({
		left : '100',
		bottom : bottom,
		font : {
			fontSize : 18,
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		text : limitofVenue,
		color : '#fff'
	});
	sliderView.add(numberEndLabel);

	var pagingSlider = Titanium.UI.createSlider({
		min : 1,
		max : limitofVenue,
		left : '134',
		focusable : true,
		width : '613',
		height : '18',
		bottom : '6',
		touchEnabled : true
	});
	var lastView;
	var sliderValue;

	pagingSlider.addEventListener('stop', function(e) {
		var formatString = String.format("%3.1f", e.value);
		sliderValue = Math.round(formatString);
		scroll.scrollToView(sliderValue - 1);
		numberStartLabel.setText(sliderValue);
	});

	sliderView.add(pagingSlider);

	scroll.addEventListener('scrollend', function(e) {
		numberStartLabel.setText(e.currentPage + 1);
		pagingSlider.setValue(e.currentPage + 1);
	});

	var currentPage = pageflip.currentPage;

	parentView.add(sliderView);

	return sliderView;
}

module.exports = SliderViewCreation;
