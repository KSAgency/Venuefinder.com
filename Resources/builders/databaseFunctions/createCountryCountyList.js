function createCountryCountyList(tabGroup, sqlString, sqlString2, sqlString3, sqlString4) {

    var country = Titanium.UI.createTableViewRow({
        title:'Choose a Country',
        color:'#399ad4',
        backgroundColor:'#f7f7f7',
        font: {
            fontFamily:'Arial',
            fontSize:'14',
            fontWeight:'bold'
        },
        hasChild:true,
        height:'45'
    });

    country.addEventListener('click', function() {

		var createApplicationWindow = require('/builders/createApplicationWindow');
		var tableWin = createApplicationWindow(tabGroup, null, 'Choose a Country', '#FFF', null, null, null, null);

        var createStartActInd = require('/builders/startActInd');
        var startActInd = createStartActInd(tableWin);

        tableWin.setBackgroundColor('#d2e8f5');

        tabGroup.activeTab.open(tableWin);

        // Load Database

        var createDatabase = require('/builders/databaseFunctions/createDatabase');
        var db = createDatabase('/venuefinder.db', 'venuefinder');

        var countryList = [];

        var tableRow = Titanium.UI.createTableViewRow({
            backgroundColor:'#f7f7f7',
            height:'45',
            title: 'Clear',
            font: {
                fontFamily:'Arial',
                fontSize:'14',
                fontWeight:'Bold'
            },
            color:'#399ad4',
            action:'Clear'
        });

        countryList.push(tableRow);

        if (sqlString==null || sqlString=='SELECT * FROM Venue WHERE (Country="England" OR Country="Wales" OR Country="Scotland" OR Country="Northern Ireland" OR Country="Channel Islands" OR Country="Isle of Man")') {
            sqlString = 'SELECT * FROM Venue WHERE (Country="England" OR Country="Wales" OR Country="Scotland" OR Country="Northern Ireland" OR Country="Channel Islands" OR Country="Isle of Man")';
            var count = db.execute(sqlString);
            var counted = count.rowCount;
        } else {
            var count = db.execute(sqlString);
            var counted = count.fieldByName('VenueCount');
        }

        var tableRowUK = Titanium.UI.createTableViewRow({
            backgroundColor:'#f7f7f7',
            height:'45',
            action:'United Kingdom'
        });
        
        var tableRowUKTitle = Titanium.UI.createLabel({
        	text: 'United Kingdom',
            font: {
                fontFamily:'Arial',
                fontSize:'14',
                fontWeight:'Bold'
            },
            color:'#399ad4',
            left:5
        });

        var ukFigure = Titanium.UI.createLabel({
            text:' (' + counted + ')',
            right:5,
            font: {
                fontFamily:'Arial',
                fontSize:'14'
            },
            color:'#399ad4'
        });
        
        if (Ti.App.Properties.getString('osname') != 'Android'){
			tableRowUKTitle.setLeft(15);
			ukFigure.setRight(15);
		}
        
        tableRowUK.add(tableRowUKTitle);
        tableRowUK.add(ukFigure);
        countryList.push(tableRowUK);

        if (sqlString2==null || sqlString2=='') {
            sqlString2 = 'SELECT DISTINCT Country, COUNT(Country) AS VenueCount FROM Venue WHERE Country IS NOT NULL AND LTRIM (Country)!="" GROUP BY Country';
        }

        var row = db.execute(sqlString2);
        while (row.isValidRow()) {

            var countryName = row.fieldByName('Country');

            var venueCount = row.fieldByName('VenueCount');

            var tableRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#f7f7f7',
                height:45,
            	action:countryName
            });
            
            var tableRowTitle = Titanium.UI.createLabel({
	        	text:countryName,
	            font:{
	                fontFamily:'Arial',
	                fontSize:'14',
	                fontWeight:'Bold'
	            },
	            color:'#399ad4',
	            left:5
	        });

            var figure = Titanium.UI.createLabel({
                text:' (' + venueCount + ')',
                right:5,
                font: {
                    fontFamily:'Arial',
                    fontSize:'14'
                },
                color:'#399ad4'
            });

			if (Ti.App.Properties.getString('osname') != 'Android'){
				tableRowTitle.setLeft(15);
				figure.setRight(15);
			}

			tableRow.add(tableRowTitle);
            tableRow.add(figure);

            if (countryName!='England' && countryName!='Wales' && countryName!='Scotland' && countryName!='Isle Of Man' && countryName!='Northern Ireland') {
                countryList.push(tableRow);
            }

            // create loop
            row.next();

        }

        row.close();
        db.close();

        var countries = Titanium.UI.createTableView({
            data:countryList,
            backgroundColor:'#d2e8f5'
        });

        if (Ti.App.Properties.getString('osname')!='Android') {
            countries.setStyle(Ti.UI.iPhone.TableViewStyle.GROUPED);
        }

        if (Ti.App.Properties.getString('osname')=='iPad') {
            countries.setWidth(600);
        } else {
        	
        	var spacer = Ti.UI.createView({
        		height:10,
        		width:Ti.UI.FILL
        	});
        	
        	countries.setWidth(300);
        	countries.setHeaderView(spacer);
        	countries.setFooterView(spacer);
        	
        }

        tableWin.add(countries);

        countries.addEventListener('click', function(e) {
            
            if (e.rowData.action=='Clear') {
                country.setTitle('Choose a Country');
                county.setTitle('Choose a County');
                county.color = '#666666';
                county.enabled = false;
            } else {
                country.setTitle(e.rowData.action);
                county.color = '#399ad4';
                county.enabled = false;
                if (e.rowData.action=='United Kingdom' || e.rowData.action=='Republic of Ireland') {
                    county.color = '#399ad4';
                    county.enabled = true;
                }
            }

            tableWin.close();
        });

        var createEndActInd = require('/builders/endActInd');
        var endActInd = createEndActInd(tableWin, startActInd[0], startActInd[1]);

    });

    var county = Titanium.UI.createTableViewRow({
        title:'Choose a County',
        color:'#666',
        backgroundColor:'#f7f7f7',
        font: {
            fontFamily:'Arial',
            fontSize:'14',
            fontWeight:'Bold'
        },
        hasChild:true,
        height:'45',
        enabled:false
    });

    county.addEventListener('click', function() {

        if (county.enabled==true) {

            county.color = '#399ad4';

            var createApplicationWindow = require('/builders/createApplicationWindow');
			var tableWin = createApplicationWindow(tabGroup, null, 'Choose a County', '#FFF', null, null, null, null);
			
			if (Ti.App.Properties.getString('osname') != 'Android'){
				tableWin.setBackgroundColor('#d2e8f5');
			}
			
            var createStartActInd = require('/builders/startActInd');
            var startActInd = createStartActInd(tableWin);

            tabGroup.activeTab.open(tableWin);

            // Load Database

            var createDatabase = require('/builders/databaseFunctions/createDatabase');
            var db = createDatabase('/venuefinder.db', 'venuefinder');

            var countyList = [];

            var tableRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#f7f7f7',
                height:'45',
                title: 'Clear',
                font: {
                    fontFamily:'Arial',
                    fontSize:'14',
                    fontWeight:'Bold'
                },
                color:'#399ad4',
            	action:'Clear'
            });

            countyList.push(tableRow);

            if (country.title=='Republic of Ireland') {
                var countyCountries = 'Country == "Republic of Ireland"';
            } else if (country.title=='United Kingdom') {
                var countyCountries = 'Country == "Scotland" OR Country == "Wales" OR Country == "Channel Islands" OR Country == "England" OR Country == "Isle of Man" OR Country == "Northern Ireland"';
            }

            if (sqlString3==null || sqlString3=='') {
                sqlString3 = 'SELECT County, COUNT(County) AS VenueCount FROM Venue WHERE (';
            }

            if (sqlString4==null || sqlString4=='') {
                sqlString4 = ') AND County IS NOT NULL AND LTRIM(County)!="" GROUP BY County ORDER BY County ASC';
            }

            var countyString = sqlString3 + countyCountries + sqlString4;
            countyString = countyString.toString();

            var row = db.execute(countyString);
            while (row.isValidRow()) {

                var countyName = row.fieldByName('County');

                var countyCount = row.fieldByName('VenueCount');

                if (countyName!='' && countyName!=null) {

                    var tableRow = Titanium.UI.createTableViewRow({
		                backgroundColor:'#f7f7f7',
		                height:45,
		            	action:countyName
		            });
		            
		            var tableRowCountyTitle = Titanium.UI.createLabel({
			        	text:countyName,
			            font:{
			                fontFamily:'Arial',
			                fontSize:'14',
			                fontWeight:'Bold'
			            },
			            color:'#399ad4',
			            left:5
			        });

                    var figure = Titanium.UI.createLabel({
                        text:' (' + countyCount + ')',
                        right:5,
                        font: {
                            fontFamily:'Arial',
                            fontSize:'14'
                        },
                        color:'#399ad4'
                    });

					if (Ti.App.Properties.getString('osname') != 'Android'){
						tableRowCountyTitle.setLeft(15);
						figure.setRight(15);
					}

					tableRow.add(tableRowCountyTitle);
                    tableRow.add(figure);
                    countyList.push(tableRow);

                    // create loop
                    row.next();
                }

            }

            db.close();

            var counties = Titanium.UI.createTableView({
                data:countyList,
                backgroundColor:'#d2e8f5',
            	width:300
            });

            if (Ti.App.Properties.getString('osname')!='Android') {
                counties.setStyle(Ti.UI.iPhone.TableViewStyle.GROUPED);
            }

            if (Ti.App.Properties.getString('osname')=='iPad') {
            	
                counties.setWidth(600);
                
            } else {
            	
            	var spacer = Ti.UI.createView({
	        		height:10,
	        		width:Ti.UI.FILL
	        	});
	        	
	        	counties.setWidth(300);
	        	counties.setHeaderView(spacer);
	        	counties.setFooterView(spacer);
	        	
            }

            tableWin.add(counties);

            counties.addEventListener('click', function(e) {
                if (e.rowData.action=='Clear') {
                    county.setTitle('Choose a County');
                } else {
                    county.setTitle(e.rowData.action);
                }
                tableWin.close();
            });

            var createEndActInd = require('/builders/endActInd');
            var endActInd = createEndActInd(tableWin, startActInd[0], startActInd[1]);

        } else {

            county.color = '#666';
            var countryNS = Titanium.UI.createAlertDialog({
                title:'Error',
                message:'Sorry, counties are only available if the selected country is the United Kingdom or Republic of Ireland'
            });

            countryNS.show();
        }

    });

    return [country, county];

}

module.exports = createCountryCountyList;
