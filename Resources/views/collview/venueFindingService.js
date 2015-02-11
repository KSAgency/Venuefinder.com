function venueFindingService(curwWin) {

    var win = Ti.UI.createScrollView({
        width:'80%',
        height:'80%',
        backgroundColor:'#d2e8f5',
        layout:'horizontal'
    });

    var headerView = Titanium.UI.createWebView({
        backgroundColor:'#d2e8f5',
        color:'#fff',
        url:'/text.html',
        width:'50%',
        top:0,
        height:'100%',
    });
    
    win.add(headerView);    

    // Create Loading Icon
	var createStartActInd = require('/builders/startActInd');
	var startActInd = createStartActInd(win);
	win.setTouchEnabled(false);

    headerView.addEventListener('load', function() {
        var createEndActInd = require('/builders/endActInd');
		var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		win.setTouchEnabled(true);
    });

    // Create Rows Array

    var emaildata = [];
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
        width:Ti.UI.FILL,
        hintText:'Name',
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
    });
    
    if (Ti.App.Properties.getString('osname') != 'Android'){
		nameText.setLeft(15);
	}

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
        width:Ti.UI.FILL,
        hintText:'Organisation',
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
    });

	if (Ti.App.Properties.getString('osname') != 'Android'){
		orgText.setLeft(15);
	}

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
        width:Ti.UI.FILL,
        hintText:'Telephone',
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
    });
    
    if (Ti.App.Properties.getString('osname') != 'Android'){
		telText.setLeft(15);
	}

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
        width:Ti.UI.FILL,
        hintText:'Your Email',
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
    });
    
    if (Ti.App.Properties.getString('osname') != 'Android'){
		fromText.setLeft(15);
	}

    emailFrom.add(fromText);

    emaildata.push(emailFrom);

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
        width:Ti.UI.FILL,
        hintText:'Location (Town/Region)',
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
    });

	if (Ti.App.Properties.getString('osname') != 'Android'){
		locText.setLeft(15);
	}

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
        width:Ti.UI.FILL,
        height:Ti.UI.FILL,
        value:'Your Message',
        left:10,
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
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

    var submitView = Titanium.UI.createView({
		height:130
	});

	var submit = Titanium.UI.createImageView({
		image:'/images/send_bar.png',
		width:320,
		height:41,
		top:20
	});
	
	if (Ti.App.Properties.getString('osname') == 'iPad') {
		submit.setWidth(216);
		submit.setRight(0);
		submit.setImage('/images/submit_bar_single.png');
	}

	submitView.add(submit);

    submit.addEventListener('click', function() {

        // Return Values

        var getName = nameText.getValue();
        var getOrg = orgText.getValue();
        var getTel = telText.getValue();
        var getFrom = fromText.getValue();
        var getLoc = locText.getValue();
        var getMessage = messageText.getValue();

        //Compile Send request
        var emailData = {
            Name:getName,
            Organisation:getOrg,
            Telephone:getTel,
            EmailFrom:getFrom,
            Location:getLoc,
            EmailBody:getMessage
        };

        emailData = JSON.stringify(emailData);

        var xhr = Ti.Network.createHTTPClient();
        xhr.open("POST", "http://venuefindermobile.live.x-rm.com/webapi-v1/api/mail/SendVenueFindingRequest");
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.onload = function(e) {

            var success = Titanium.UI.createAlertDialog({
                title:'Email sent',
                message:'Your email has been successfully sent',
            });

            success.show();
            //tabGroup.activeTab.close(win);
            curwWin.close();
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

    // Create Tableview	

    var tableview = Titanium.UI.createTableView({
        style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
        data:emaildata,
        backgroundColor:'#d2e8f5',
        footerView:submitView,
        height:'100%',
        width:'48%',
        right:'2%',
        top:0,
        scrollable:false
    });    

    win.add(tableview);
	
	/*
    // Require & Create advert space
    var createAdvert = require('/builders/createAdvert');
    var advert = createAdvert(true);
    curWin.add(advert);
	*/
	
    return win;

}

module.exports = venueFindingService;
