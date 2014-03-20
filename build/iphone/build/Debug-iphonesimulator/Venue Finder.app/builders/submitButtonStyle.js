function submitButtonStyle(altImage) {

	var submitView = Titanium.UI.createView({
		height:80
	});

	var submit = Titanium.UI.createImageView({
		image:'/images/submit_bar.png',
		width:320,
		height:41,
	});
	
	if (altImage != null && altImage != ''){
		submit.setImage(altImage);
	}

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		submit.setWidth(216);
		submit.setLeft(0);
		submit.setImage('/images/submit_bar_single.png');
	}

	submitView.add(submit);

	return submitView;
	
}

module.exports = submitButtonStyle;