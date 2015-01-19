function createDoubleField(title, hint, spacing, numberKeys) {

	if (spacing == null) {
		spacing = '40%';
		var width = '58%';
	} else {
		var width = '38%';
	}

	if (numberKeys) {
		numberKeys = Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION;
	} else {
		numberKeys = Ti.UI.KEYBOARD_DEFAULT;
	}

	var tableRow = Titanium.UI.createTableViewRow({
		height:'45',
		color:'#399ad4',
		backgroundColor:'#f7f7f7',
	});

	var textField = Titanium.UI.createTextField({
		color:'#399ad4',
		tintColor:'#399ad4',
		zIndex:5,
		backgroundColor:'#f7f7f7',
		font:{
			fontFamily:'Arial',
			fontSize:'14'
		},
		width:width,
		left:spacing,
		hintText:hint,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
		height:'43',
		clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
		returnKeyType:Titanium.UI.RETURNKEY_DONE,
		keyboardType:numberKeys,
		autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
		bubbleParent:false
	});
	
	if (Ti.App.Properties.getString('osname') == 'Android'){
		textField.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
	}

	textField.addEventListener('focus', function(){
		setTimeout(function() {
			textField.focus();
		}, 500);
	});

	if (Ti.App.Properties.getString('osname') == 'iPad') {
		textField.setLeft('40%');
		textField.setWidth('58%');
	}

	var textLabel = Titanium.UI.createLabel({
		text:title,
		left:15,
		color:'#399ad4',
		backgroundColor:'#f7f7f7',
		font:{
			fontFamily:'Arial',
			fontSize:'14',
			fontWeight:'Bold'
		},
		zIndex:10
	});
	
	/*if (Ti.App.Properties.getString('osname') != 'Android'){
		textLabel.setLeft(15);
	}*/

	tableRow.add(textLabel);
	tableRow.add(textField);

	tableRow.addEventListener('click', function() {
		textField.focus();
	});

	return [tableRow, textField];

}

module.exports = createDoubleField;
