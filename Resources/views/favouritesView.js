function favouritesView(tabGroup, title, backgroundColor, tab5) {

    var win = Titanium.UI.createWindow({
		backgroundColor:backgroundColor,
		title:title,
		width:Ti.UI.FILL,
        height:Ti.UI.FILL
	});
	
	win.addEventListener('click', function(e){
//		alert(e.source);		
	});
        
    if (Ti.App.Properties.getString('osname') != 'Android'){
            win.setBarColor('#2195be');  
            win.setBackButtonTitle('Back');
            win.setTintColor('#FFF');
            win.setTranslucent(false);
            win.setTitleControl(Ti.UI.createLabel({
				text:title,
	            color:'#FFF',
	            width:Ti.UI.SIZE
	        }));
	}

    var omniture = Titanium.UI.createWebView({
        html:'<html><head><script type="text/javascript" src="s_code.js"></script></head><body><script>' + 's.channel="iPhone";' + 's.pageName="Favourites";' + 'var s_code=s.t(); if(s_code)document.write(s_code)</script> <script>if(navigator.appVersion.indexOf("MSIE")>=0)document.write(unescape("%3C")+"\!-"+"-")</script><noscript><img src="https://cmpi.122.2o7.net/b/ss/cmpivenuefinderappprod/1/H.25.2--NS/0?[AQB]&cdp=3&[AQE]"height="1" width="1" border="0" alt="" /></noscript></body></html>',
        opacity:'0',
        width:'0',
        height:'0',
        left:'0',
        right:'0',
        touchEnabled:false
    });

    win.add(omniture);

    var favData = [];

    var orderBy = 'StarRating';

    var orderType = 'DESC';

    var selectedRow = '';

    var emailBody = [];

    var createDatabase = require('/builders/databaseFunctions/createDatabase');
    var db = createDatabase('/favourites.db', 'favourites');

    function getSorting() {

        var sortedBy = 'Your Rating';

        if (orderBy=='StarRating') {
            sortedBy = 'Your Rating';
        }

        if (orderBy=='DateAdded') {
            sortedBy = 'Date Added';
        }

        if (orderBy=='VenueName') {
            sortedBy = 'Venue Name';
        }

        var styleNameRow = Titanium.UI.createTableViewRow({
            hasChild:true,
            height:50
        });
        
        var styleNameLabel = Ti.UI.createLabel({
        	text:'Sorted By: '+sortedBy,
        	color:'#2195be',
            font: {
                fontSize:'16',
                fontFamily:'Arial',
                fontWeight:'bold'
            },
            left:15,
            touchEnabled:false
        });
        
        if (Ti.App.Properties.getString('osname') == 'Android'){
        	styleNameLabel.setLeft(0);
        }

		styleNameRow.add(styleNameLabel);
        favData.push(styleNameRow);

        styleNameRow.addEventListener('click', function(e) {

            var sortData = [];

			sortData[0] = Titanium.UI.createPickerRow({
                title:'Please select a sorting option',
                sortValue:'0',
            });

            sortData[1] = Titanium.UI.createPickerRow({
                title:'Your Rating',
                sortValue:'StarRating',
                orderType:'DESC'
            });

            sortData[2] = Titanium.UI.createPickerRow({
                title:'Date Added',
                sortValue:'DateAdded',
                orderType:'DESC'
            });

            sortData[3] = Titanium.UI.createPickerRow({
                title:'Venue Name',
                sortValue:'VenueName',
                orderType:'ASC'
            });

            var picker = Titanium.UI.createPicker({
                bottom:0,
                width:Ti.UI.FILL,
                selectionIndicator:true,
                zIndex:10,
                backgroundColor:'#399ad4'
            });

            picker.add(sortData);
            win.add(picker);

            picker.addEventListener('change', function(e) {
            	
                if (Ti.App.Properties.getString('osname') == 'Android'){
                
                	orderBy = picker.getSelectedRow(0).sortValue;
                	orderType = picker.getSelectedRow(0).orderType;
                
                	if (orderBy != '0'){
                	
                		favData = [];
	
				        getSorting();
				        getData();
				        tableview.setData(favData);	
				        
				        win.remove(picker);
                		
                	}

				} else {
					
					orderBy = picker.getSelectedRow(0).sortValue;
                	orderType = picker.getSelectedRow(0).orderType;
					
				}
                
            });

			if (Ti.App.Properties.getString('osname') != 'Android'){

	            var pickerClose = Titanium.UI.createButton({
	                title:'Done',
	                color:'#FFF'
	            });
	
	            var flexSpace = Titanium.UI.createButton({
	                systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	            });
	
	            var toolbar = Titanium.UI.iOS.createToolbar({
	                items:[flexSpace, pickerClose],
	                bottom:'215',
	                borderTop:true,
	                borderBottom:true,
	                barColor:'#2195be'
	            });
	
	            win.add(toolbar);
	
	            pickerClose.addEventListener('click', function() {
	                win.remove(picker);
	                win.remove(toolbar);
	                favData = [];
	
			        getSorting();
			        getData();
			        tableview.setData(favData);
	            });
            
           }

        });

    }

    getSorting();

    function getData() {

        // Create Repeat Timer

        if (Ti.Platform.osname != 'android') {
        	
        	var shareButton = Titanium.UI.createButton({
	            title:'Share All'
	        });
	
	        shareButton.addEventListener('click', function() {
	            getPrint();
	        });
        	
            win.setRightNavButton(shareButton);
            
        }
        
        var execute = db.execute('SELECT * FROM Favourites ORDER BY ' + orderBy + ' ' + orderType);
        while (execute.isValidRow()) {

            var venueID = execute.fieldByName('VenueID');
            var venueName = execute.fieldByName('VenueName');
            var venuePackage = execute.fieldByName('PackageCode');
            var starRating = execute.fieldByName('StarRating');
            var addressLine1 = execute.fieldByName('AddressLine1');
            var addressLine2 = execute.fieldByName('AddressLine2');
            var venueTown = execute.fieldByName('Town');
            var venueCounty = execute.fieldByName('County');
            var venueCountry = execute.fieldByName('Country');
            var venuePostcode = execute.fieldByName('Postcode');

            if (addressLine1!='' && addressLine1!=null) {
                var addressLine1 = addressLine1 + ', ';
            } else {
                var addressLine1 = '';
            }
            if (addressLine2!='' && addressLine2!=null) {
                var addressLine2 = addressLine2 + ', ';
            } else {
                var addressLine2 = '';
            }
            if (venueTown!='' && venueTown!=null) {
                var venueTown = venueTown + ', ';
            } else {
                var venueTown = '';
            }
            if (venueCounty!='' && venueCounty!=null) {
                var venueCounty = venueCounty + ', ';
            } else {
                var venueCounty = '';
            }
            if (venueCountry!='' && venueCountry!=null) {
                var venueCountry = venueCountry;
            } else {
                var venueCountry = '';
            }
            if (venuePostcode!='' && venuePostcode!=null) {
                var venuePostcode = venuePostcode + ', ';
            } else {
                var venuePostcode = '';
            }

            var favRow = Titanium.UI.createTableViewRow({
                height:110,
                selectedBackgroundColor:'#FFF',
                uniqueID:venueID,
                venueName:venueName,
                venuePackage:venuePackage,
                bubbleParent:false
            });

            var rightButton = Titanium.UI.createImageView({
                image:'/images/rateButton.png',
                right:10,
                top:10,
                height:29,
                width:50,
                goDetail:true
            });

            favRow.add(rightButton);

            var deleteButton = Titanium.UI.createImageView({
                image:'/images/deleteButton.png',
                right:10,
                bottom:10,
                height:29,
                width:50,
                goDelete:true
            });

            favRow.add(deleteButton);

            var title = Titanium.UI.createLabel({
                text:venueName,
                left:10,
                width:250,
                height:30,
                top:0,
                ellipsize:true,
                color:'#2195be',
                font: {
                    fontSize:18,
                    fontWeight:'Bold'
                },
                touchEnabled:false,
                bubbleParent:false
            });

            var emailPart = title.text + '\n';

            var address = Titanium.UI.createLabel({
                text:addressLine1 + addressLine2 + venueTown + venueCounty + venuePostcode + venueCountry,
                left:10,
                top:30,
                width:240,
                height:40,
                ellipsize:true,
                color:'#A2BE1C',
                font: {
                    fontSize:16
                },
                touchEnabled:false,
                bubbleParent:false
            });
            
            if (Ti.App.Properties.getString('osname') != 'Android'){
            	title.setLeft(15);
            	address.setLeft(15);
            }

            favRow.add(address);

            var emailPart2 = address.text + '\n \n';

            emailBody = +emailPart + emailPart2;

            if (starRating!=null) {

                var starImage = Titanium.UI.createButton({
                    backgroundImage:'/images/' + starRating + 'star.png',
                    left:10,
                    height:27,
                    width:138,
                    bottom:10,
                    touchEnabled:false,
                    selectedColor:'transparent',
                	touchEnabled:false,
                	bubbleParent:false
                });

				if (Ti.App.Properties.getString('osname') != 'Android'){
            		starImage.setLeft(15);
            	}

                favRow.add(starImage);
                
            } else {

                var noRating = Titanium.UI.createLabel({
                    text:'',
                    left:8,
                    width:120,
                    height:75,
                    bottom:10,
                    ellipsize:true,
                    color:'#666',
                    font: {
                        fontSize:16
                    },
                	touchEnabled:false,
                	bubbleParent:false
                });
                
                if (Ti.App.Properties.getString('osname') != 'Android'){
            		noRating.setLeft(15);
            	}

                favRow.add(noRating);

            }

            favRow.add(title);

			function getDelete(e) {
				var confirm = Titanium.UI.createAlertDialog({
                        title:'Confirmation',
                        message:'Please confirm that you would like to delete ' + e.rowData.venueName + ' from your favourites',
                        buttonNames:['Cancel', 'Delete']
                    });

                    confirm.show();

                    var vID = e.rowData.uniqueID;

                    confirm.addEventListener('click', function(e) {

                        if (e.index==1) {

                            favRow.remove(rightButton);
                            favRow.remove(deleteButton);
                            var createDatabase = require('/builders/databaseFunctions/createDatabase');
                            var db = createDatabase('/favourites.db', 'favourites');
                            db.execute('DELETE FROM Favourites WHERE VenueID="' + vID + '"');
                            db.close();
                            refreshData();
                        }

                    });

			}
			
			function getRating(e) {
				selectedRow = e.rowData.uniqueID;

                    var createApplicationWindow = require('/builders/createApplicationWindow');
					var childWin = createApplicationWindow(tabGroup, null, 'Edit Favourite', '#d2e8f5', null, null, null, null);

                    tabGroup.activeTab.open(childWin);

                    var childData = [];

                    var childRow = Ti.UI.createTableViewRow({
                        title:'Rate This Venue',
                        hasChild:true,
                        backgroundColor:'#FFF',
                        font: {
                            fontFamily:'Arial',
                            fontSize:14
                        },
                        height:50,
                        color:'#399ad4'
                    });

                    childData.push(childRow);

                    var tableView = Titanium.UI.createTableView({
                        style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
                        backgroundColor:'#d2e8f5',
                        data:childData,
                        height:100,
                        top:10,
                        width:290
                    });

                    childWin.add(tableView);

                    tableView.addEventListener('click', function() {

                        var pickerData = [];
						pickerData[0] = Ti.UI.createPickerRow({
							title:'Please select a rating',
							value:'0'
						});
						pickerData[1] = Ti.UI.createPickerRow({
							title:'5 - Excellent',
							value:'5'
						});
						pickerData[2] = Ti.UI.createPickerRow({
							title:'4 - Very Good',
							value:'4'
						});
						pickerData[3] = Ti.UI.createPickerRow({
							title:'3 - Good',
							value:'3'
						});
						pickerData[4] = Ti.UI.createPickerRow({
							title:'2 - Average',
							value:'2'
						});
						pickerData[5] = Ti.UI.createPickerRow({
							title:'1 - Poor',
							value:'1'
						});

                        var picker = Ti.UI.createPicker({
                            bottom:0,
                            width:Ti.UI.FILL,
                            selectionIndicator:true,
                            zIndex:10,
                            backgroundColor:'#399ad4'
                        });

                        picker.add(pickerData);
                        childWin.add(picker);
                        
                        if (Ti.App.Properties.getString('osname') != 'Android') {

	                        var done = Titanium.UI.createButton({
	                            title:'Done',
	                            color:'#FFF'
	                        });
	
	                        childWin.setRightNavButton(done);
	                        
	                        done.addEventListener('click', function(e) {
	                            var createDatabase = require('/builders/databaseFunctions/createDatabase');
	                            var db = createDatabase('/favourites.db', 'favourites');
	                            var selectedRate = picker.getSelectedRow(0).value;
	                            var selectedTitle = picker.getSelectedRow(0).title;
	                            var update = db.execute('UPDATE Favourites SET StarRating="' + selectedRate + '" WHERE venueID="' + selectedRow + '"');
	                            db.close();
	                            
	                            childWin.setRightNavButton(null);
	                            childWin.remove(picker);
	                            childRow.setTitle(selectedTitle);
	                            favData = [];
	
	                            getSorting();
	                            getData();
	                            tableview.setData(favData);
	                        });
	                        
						} else {
								
							picker.addEventListener('change', function(){
								
								var selectedRate = picker.getSelectedRow(0).value;
								var selectedTitle = picker.getSelectedRow(0).title;
								
								if (selectedRate != '0'){
								
									var createDatabase = require('/builders/databaseFunctions/createDatabase');
		                            var db = createDatabase('/favourites.db', 'favourites');
		                            var update = db.execute('UPDATE Favourites SET StarRating="' + selectedRate + '" WHERE venueID="' + selectedRow + '"');
		                            db.close();
	
		                            childWin.remove(picker);
		                            childRow.setTitle(selectedTitle);
		                            favData = [];
		
		                            getSorting();
		                            getData();
		                            tableview.setData(favData);
		                            
	                           	}
							});
							
						}

                    });
			}
			
			function getFavRow(e) {
	            var createApplicationWindow = require('/builders/createApplicationWindow');
		        var windowElements = createApplicationWindow(tabGroup, 'children/featuredListing', e.rowData.venueName, '#FFF', 'Favourites', e.rowData.venueName, null, null, e.rowData.uniqueID, null);
			}	
			
			deleteButton.addEventListener('click', function(e) {
				    if (Ti.App.Properties.getString('osname') != 'Android'){
						getDelete(e);
					}
					
			});	
			
			rightButton.addEventListener('click', function(e) {
					    if (Ti.App.Properties.getString('osname') != 'Android'){
							getRating(e);
						}
			});
			
            favRow.addEventListener('click', function(e) {

                if (Ti.App.Properties.getString('osname') == 'Android'){
                   	if (e.source.goDetail==true) {
           	        		getRating(e);
                   		}
                   		else if (e.source.goDelete==true)
                   		{
                   			getDelete(e);
                   		}
                   		else{
                   			getFavRow(e);
                   		}
                   }
                   else
                   {
                   	 if(e.source.goDetail != true && e.source.goDelete != true) {
						getFavRow(e);
                	}
                  }

            });

            favData.push(favRow);

            // Loop it!
            execute.next();
        }

        var itemLength = favData.length - 1;

        win.setTitle('Favourites (' + itemLength + ')');

    }

    getData();

    function getPrint() {

        var createDatabase = require('/builders/databaseFunctions/createDatabase');
        var db = createDatabase('/favourites.db', 'favourites');
        var execute = db.execute('SELECT * FROM Favourites');
        while (execute.isValidRow()) {

            var venueID = execute.fieldByName('VenueID');
            var venueName = execute.fieldByName('VenueName');
            var addressLine = execute.fieldByName('AddressLine1');
            var addressLine2 = execute.fieldByName('AddressLine2');
            var venueTown = execute.fieldByName('Town');
            var venueCounty = execute.fieldByName('County');
            var venuePostcode = execute.fieldByName('Postcode');
                            
            var emailPart = '<a href="http://www.venuefinder.com/venues/v' + venueID + '">' + venueName + '</a> </br>';

            var emailPart2 = addressLine + ', ' + venueTown + ', ' + venueCounty + ', ' + venuePostcode + '</br></br>';

            var curMessage = emailPart.toString() + emailPart2.toString();

            var prevMessage = '';

            prevMessage = prevMessage + curMessage;

            // Loop it!
            execute.next();

        }

        var createEmailer = require('/builders/createEmailer');
        var emailer = createEmailer(tabGroup, null, prevMessage, 'shareAll', null, 'Favourites', 'Share All', null, null);

        //Open window

        var createApplicationWindow = require('/builders/createApplicationWindow');
        var windowElements = createApplicationWindow(tabGroup, emailer, 'Share All', '#d2e8f5', 'Favourites', 'Share All', null, null, null, null);

    }

    // create table view
    var tableview = Titanium.UI.createTableView({
        data:favData,
        editing:false,
        editable:false,
        backgroundColor:'#FFF',
        top:0,
        bubbleParent:false
    });
    
    
    if (Ti.App.Properties.getString('osname') == 'iPad'){
        tableview.setWidth(600);
    }

    // add table view to the window
    win.add(tableview);

	function refreshData (){
        favData = [];
        getSorting();
        getData();
        tableview.setData(favData);
	}

    return [win, refreshData];

}

module.exports = favouritesView;
