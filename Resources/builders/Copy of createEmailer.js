function createEmailer(tabGroup, sendTo, bodyText, fromWin, venueName, tab, tier1, tier2, tier3) {

    var win = Ti.UI.createView({
        width:Ti.UI.FILL,
        height:Ti.UI.FILL,
        backgroundColor:'#d2e8f5'
    });

    // Create Rows Array

    var emaildata = [];

    // To

    var emailTo = Titanium.UI.createTableViewRow({
        height:45,
        color:'#399ad4',
        backgroundColor:'#f7f7f7'
    });

    var toText = Titanium.UI.createTextField({
        color:'#399ad4',
        backgroundColor:'#f7f7f7',
        font: {
            fontFamily:'Arial',
            fontSize:14
        },
        width:Ti.UI.SIZE,
        left:0,
        hintText:'Send To*',
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
    });

    emailTo.add(toText);
    
    if (Ti.App.Properties.getString('osname') == 'Android'){
		toText.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
	} else {
		toText.setLeft(15);
	}

	toText.addEventListener('focus', function() {
		setTimeout(function() {
			toText.focus();
		}, 500);
	});

    if (sendTo!=null && sendTo!='') {
        toText.setValue(sendTo);
    } else {
        emaildata.push(emailTo);
    }

    // Name

    var emailName = Titanium.UI.createTableViewRow({
        height:45,
        color:'#399ad4',
        backgroundColor:'#f7f7f7'
    });

    var nameText = Titanium.UI.createTextField({
        color:'#399ad4',
        backgroundColor:'#f7f7f7',
        font: {
            fontFamily:'Arial',
            fontSize:14
        },
        width:Ti.UI.SIZE,
        left:0,
        hintText:'Name',
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
    });
    
    if (Ti.App.Properties.getString('osname') == 'Android'){
		nameText.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
	} else {
		nameText.setLeft(15);
	}

	nameText.addEventListener('focus', function() {
		setTimeout(function() {
			nameText.focus();
		}, 500);
	});

    emailName.add(nameText);

    emaildata.push(emailName);

    // Orgnaisation

    var emailOrg = Titanium.UI.createTableViewRow({
        height:45,
        color:'#399ad4',
        backgroundColor:'#f7f7f7'
    });

    var orgText = Titanium.UI.createTextField({
        color:'#399ad4',
        backgroundColor:'#f7f7f7',
        font: {
            fontFamily:'Arial',
            fontSize:14
        },
        width:Ti.UI.SIZE,
        left:0,
        hintText:'Organisation',
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
    });
    
    if (Ti.App.Properties.getString('osname') == 'Android'){
		orgText.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
	} else {
		orgText.setLeft(15);
	}

	orgText.addEventListener('focus', function() {
		setTimeout(function() {
			orgText.focus();
		}, 500);
	});

    emailOrg.add(orgText);

    emaildata.push(emailOrg);

    // Telephone

    var emailTel = Titanium.UI.createTableViewRow({
        height:45,
        color:'#399ad4',
        backgroundColor:'#f7f7f7'
    });

    var telText = Titanium.UI.createTextField({
        color:'#399ad4',
        backgroundColor:'#f7f7f7',
        font: {
            fontFamily:'Arial',
            fontSize:14
        },
        width:Ti.UI.SIZE,
        left:0,
        hintText:'Telephone',
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
    });
    
    if (Ti.App.Properties.getString('osname') == 'Android'){
		telText.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
	} else {
		telText.setLeft(15);
	}

	telText.addEventListener('focus', function() {
		setTimeout(function() {
			telText.focus();
		}, 500);
	});

    emailTel.add(telText);

    emaildata.push(emailTel);

    // From

    var emailFrom = Titanium.UI.createTableViewRow({
        height:45,
        color:'#399ad4',
        backgroundColor:'#f7f7f7'
    });

    var fromText = Titanium.UI.createTextField({
        color:'#399ad4',
        backgroundColor:'#f7f7f7',
        font: {
            fontFamily:'Arial',
            fontSize:14
        },
        width:Ti.UI.SIZE,
        left:0,
        hintText:'Your Email*',
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
    });
    
    if (Ti.App.Properties.getString('osname') == 'Android'){
		fromText.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
	} else {
		fromText.setLeft(15);
	}

	fromText.addEventListener('focus', function() {
		setTimeout(function() {
			fromText.focus();
		}, 500);
	});

    emailFrom.add(fromText);

    emaildata.push(emailFrom);

    // Include a copy to me

    var includeMe = false;

    var ccToggle = Titanium.UI.createTableViewRow({
        height:45,
        color:'#399ad4',
        tintColor:'#399ad4',
        backgroundColor:'#f7f7f7',
        hasCheck:false,
        title:'Click to send me a copy',
        font: {
            fontFamily:'Arial',
            fontSize:14
        },
        color:'#399ad4',
    });

    ccToggle.addEventListener('click', function() {
        if (includeMe==0) {
            includeMe = true;
            ccToggle.setHasCheck(true);
        } else {
            includeMe = false;
            ccToggle.setHasCheck(false);
        }
    });

    emaildata.push(ccToggle);

    // Location

    var emailLoc = Titanium.UI.createTableViewRow({
        height:45,
        color:'#399ad4',
        backgroundColor:'#f7f7f7'
    });

    var locText = Titanium.UI.createTextField({
        color:'#399ad4',
        backgroundColor:'#f7f7f7',
        font: {
            fontFamily:'Arial',
            fontSize:14
        },
        width:Ti.UI.SIZE,
        left:0,
        hintText:'Location (Town/Region)',
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
    });
    
    if (Ti.App.Properties.getString('osname') == 'Android'){
		locText.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
	} else {
		locText.setLeft(15);
	}

	locText.addEventListener('focus', function() {
		setTimeout(function() {
			locText.focus();
		}, 500);
	});

    emailLoc.add(locText);

    emaildata.push(emailLoc);

    // Message

    var emailMessage = Titanium.UI.createTableViewRow({
        height:90,
        color:'#399ad4',
        backgroundColor:'#f7f7f7'
    });

    var messageText = Titanium.UI.createTextArea({
        color:'#399ad4',
        backgroundColor:'#f7f7f7',
        font: {
            fontFamily:'Arial',
            fontSize:14
        },
        width:Ti.UI.SIZE,
        left:0,
        height:Ti.UI.FILL,
        value:'Your Message',
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
    });
   
   if (Ti.App.Properties.getString('osname') == 'Android'){
		messageText.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
	} else {
		messageText.setLeft(15);
	}

	messageText.addEventListener('focus', function() {
		setTimeout(function() {
			messageText.focus();
		}, 500);
	});

    emailMessage.add(messageText);

    emaildata.push(emailMessage);

    messageText.addEventListener('focus', function() {
        if (messageText.value=='Your Message') {
            messageText.setValue('');
        }
    });

    messageText.addEventListener('blur', function() {
        if (messageText.value=='') {
            messageText.setValue('Your Message');
        }
    });

    // Create Submit Button

    var submitButtonStyle = require('/builders/submitButtonStyle');
	var submit = submitButtonStyle();

    submit.addEventListener('click', function() {

        // Return Values

        var getTo = toText.getValue();
        var getName = nameText.getValue();
        var getOrg = orgText.getValue();
        var getTel = telText.getValue();
        var getFrom = fromText.getValue();
        var getLoc = locText.getValue();
        var getMessage = messageText.getValue();

        if (bodyText!='' && bodyText!=null) {
            getMessage = getMessage + '</br></br>' + bodyText + '</br></br>This venue was shared with you via the <a href="http://www.venuefinder.com/app">Venuefinder.com App</a>'; 
        }

        if (fromWin=='shareAll') {
            venueName = getTo;
        }

        //Compile Send request
        var emailData = {
            EmailTo:getTo,
            Name:getName,
            Organisation:getOrg,
            Telephone:getTel,
            EmailFrom:getFrom,
            Location:getLoc,
            EmailBody:getMessage,
            CCSender:includeMe
        };

        emailData = JSON.stringify(emailData);

        var xhr = Ti.Network.createHTTPClient();
        xhr.open("POST", "http://venuefindermobile.live.x-rm.com/webapi-v1/api/mail/SendVenueRecommendation");
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.onload = function(e) {

            var success = Titanium.UI.createAlertDialog({
                title:'Email sent',
                message:'Your email has been successfully sent to ' + venueName,
            });

            if (sendTo==null || sendTo=='') {
                success.setMessage('Your email has been successfully sent to ' + getTo);
            }

            success.show();
            tabGroup.activeTab.close(win);
        };
        xhr.onerror = function(e) {
            var error = Titanium.UI.createAlertDialog({
                title:'Message Not Sent',
                message:'Please check required fields are filled out and you are connected to the internet',
            });

            error.show();
        };
        xhr.send(emailData);
    });

    var textView = Titanium.UI.createView({
        width:Ti.UI.FILL,
        height:60
    });

    var subText = Titanium.UI.createLabel({
        text:'The fields marked with an asterisk must be filled out in order to send your email.',
        color:'#666',
        textAlign:'center',
        font: {
            fontFamily:'Arial',
            fontSize:14
        },
        left:10,
    });

    textView.add(subText);

    var tableview = Titanium.UI.createTableView({
        style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
        data:emaildata,
        backgroundColor:'#d2e8f5',
        headerView:textView,
        footerView:submit,
        top:0,
        height:'89.5%',
        width:300
    });

    if (Ti.App.Properties.getString('osname')=='iPad') {
        tableview.setWidth(600);
    }

    win.add(tableview);

    // Require & Create advert space
    var createAdvert = require('/builders/createAdvert');
    var advert = createAdvert();
    win.add(advert);

    return win;

}

module.exports = createEmailer; 