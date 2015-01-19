function specialOffers(e){var t=Ti.UI.createView({width:"100%",height:"100%"});Titanium.Geolocation.purpose="Pinpoint you on the map",Titanium.Geolocation.accuracy=Titanium.Geolocation.ACCURACY_BEST,Titanium.Geolocation.frequency=5e3;var i=Titanium.UI.createView({width:Ti.UI.FILL,height:90,top:0}),a=Titanium.UI.createImageView({image:"/images/offers_near_me.png",top:10,width:300,height:54}),n=Titanium.UI.createLabel({text:"or, fill out the form below",color:"#666",width:300,textAlign:"center",font:{fontFamily:"Arial",fontSize:14},top:70});"iPad"==Ti.App.Properties.getString("osname")&&(a.setWidth(216),a.setHeight(39),a.setLeft(0),a.setTop(10),n.setTop(20)),i.add(a),i.add(n),a.addEventListener("click",function(){var i=require("/builders/startActInd"),a=i(t);if(t.setTouchEnabled(!1),1==Ti.Network.online){{var n=require("/builders/createMapView"),r=n(e,null,"Venue Map",!0,"Search","Special Offers","Geolocation",null,!0),o=require("/builders/createApplicationWindow"),s=(o(e,r,"Venue Map","#d2e8f5","Map","Geolocation","",""),require("/builders/endActInd"));s(t,a[0],a[1])}t.setTouchEnabled(!0)}else{var l=Titanium.UI.createAlertDialog({title:"No Internet Connection",message:"Due to the fact that your internet is currently offline, we could not recieve your location. Please use the form below to view venues based on their location."});l.show();{var s=require("/builders/endActInd");s(t,a[0],a[1])}t.setTouchEnabled(!0)}});var r=[],o=require("/builders/todaysDate"),s=o(),l='SELECT COUNT(Country) AS VenueCount FROM Venue JOIN Offers ON Venue.VenueID=Offers.EntryID WHERE (Country="England" OR Country="Wales" OR Country="Scotland" OR Country="Northern Ireland" OR Country="Channel Islands" OR Country="Isle of Man") AND Country IS NOT NULL AND LTRIM(Country)!="" AND Offers.ValidToDate>="'+s+'" ORDER BY Country ASC',d='SELECT Venue.Country, COUNT(Country) AS VenueCount FROM Venue JOIN Offers ON Venue.VenueID=Offers.EntryID WHERE Country IS NOT NULL AND LTRIM(Country)!="" AND Offers.ValidToDate>="'+s+'" GROUP BY Country ORDER BY Country ASC',c="SELECT Venue.County, COUNT(County) AS VenueCount FROM Venue JOIN Offers ON Venue.VenueID=Offers.EntryID WHERE (",u=') AND County IS NOT NULL AND LTRIM(County)!="" AND validToDate>="'+s+'" AND Venue.PackageCode!="FRE" GROUP BY County ORDER BY County ASC',f=require("/builders/databaseFunctions/createCountryCountyList"),p=f(e,l,d,c,u),m=require("/builders/databaseFunctions/createDoubleField"),g=require("/builders/databaseFunctions/createCheckField"),h=m("Venue Town","Example Town"),v=g("Christmas Offers"),b=g("Wedding Offers");r.push(p[0]),r.push(p[1]),r.push(h[0]),r.push(v[0]),r.push(b[0]);var T=require("/builders/submitButtonStyle"),I=T();I.addEventListener("click",function(){var i=require("/builders/startActInd"),a=i(t),n=h[1].getValue(),r='SELECT * FROM Venue JOIN Offers ON Venue.VenueID=Offers.EntryID WHERE EntryID IS NOT NULL AND validToDate>="'+s+'"',o="",l="",d="",c="",u="";if(1==b[0].checkValue){var f=!0;isWedOff="1";var c=' AND WeddingOffer="'+b[0].checkValue+'"'}if(1==v[0].checkValue){var f=!0;isXmasOff="1";var u=' AND ChristmasOffer="'+v[0].checkValue+'"'}if("Choose a Country"!=p[0].title&&"United Kingdom"!=p[0].title)var o=' AND Country="'+p[0].title+'"',f=!0;if("United Kingdom"==p[0].title)var o=' AND (Country="United Kingdom" OR Country="England" OR Country="Scotland" OR Country="Wales" OR Country="Northern Ireland" OR Country="Channel Islands" OR Country="Isle of Man")',f=!0;if("Choose a County"!=p[1].title)var l=' AND County="'+p[1].title+'"',f=!0;if(""!=n)var d=' AND Town LIKE "%'+n+'%"',f=!0;var m=r+o+l+d+c+u,g=require("/builders/createResultsPage"),T=g(t,e,m,f,null,null,!1,!0);e.activeTab.open(T);{var I=require("/builders/endActInd");I(t,a[0],a[1])}});var w=Titanium.UI.createTableView({style:Titanium.UI.iPhone.TableViewStyle.GROUPED,data:r,backgroundColor:"#d2e8f5",headerView:i,footerView:I,top:0,height:"89.5%"});"iPad"==Ti.App.Properties.getString("osname")?(w.setWidth(600),w.setScrollable(!1),w.setTop("100")):w.setWidth(300),t.add(w);var y=require("/builders/createAdvert"),E=y();return t.add(E),t}module.exports=specialOffers;