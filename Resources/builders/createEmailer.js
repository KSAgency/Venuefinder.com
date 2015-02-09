function createEmailer(tabGroup, sendTo, bodyText, fromWin, venueName, tab, tier1, tier2, tier3) {

    var win = Ti.UI.createView({
        width:Ti.UI.FILL,
        height:Ti.UI.FILL,
        backgroundColor:'#d2e8f5'
    });

    // Create Rows Array

    var emaildata = [];

    // To
    var createDoubleField = require('/builders/databaseFunctions/createDoubleField');
    var emailTo = createDoubleField('Send To *', ''),
    	emailName = createDoubleField('Name', ''),
    	emailOrg = createDoubleField('Organisation', ''),
    	emailLoc = createDoubleField('Town/Region', '');
    	emailTel = createDoubleField('Telephone', ''),
    	emailFrom = createDoubleField('Your Email *', '');

	emaildata.push(emailTo[0]);
	emaildata.push(emailName[0]);
	emaildata.push(emailOrg[0]);
	emaildata.push(emailTel[0]);
	emaildata.push(emailFrom[0]);
	emaildata.push(emailLoc[0]);

    if (sendTo!=null && sendTo!='') {
        emailTo[1].setValue(sendTo);
    } else {
        emaildata.push(emailTo);
    }

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
            fontSize:14,
            fontWeight:'bold'
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
            fontSize:14,
            fontWeight:'bold'
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
		messageText.setLeft(10);
	}

	emailMessage.addEventListener('click', function() {
		messageText.focus();
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

        var getTo = emailTo[1].getValue();
        var getName = emailName[1].getValue();
        var getOrg = emailOrg[1].getValue();
        var getTel = emailTel[1].getValue();
        var getFrom = emailFrom[1].getValue();
        var getLoc = emailLoc[1].getValue();
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
   /* var createAdvert = require('/builders/createAdvert');
    var advert = createAdvert();
    win.add(advert);
	*/
    return win;

}

module.exports = createEmailer; 