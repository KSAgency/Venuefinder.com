function searchView(e,t,i){var a=Titanium.UI.createWindow({backgroundColor:i,title:t,width:Ti.UI.FILL,height:Ti.UI.FILL});"Android"!=Ti.App.Properties.getString("osname")&&(a.setBarColor("#2195be"),a.setBackButtonTitle("Back"),a.setTintColor("#FFF"),a.setTranslucent(!1),a.setTitleControl(Ti.UI.createLabel({text:t,color:"#FFF",width:Ti.UI.SIZE})));var n=Titanium.UI.createWebView({opacity:0,width:0,height:0,left:0,right:0,touchEnabled:!1});a.add(n);var r=Titanium.UI.createButton({image:"/images/whiteSearch.png",style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,width:20,height:20});"android"!=Ti.Platform.osname&&a.setRightNavButton(r);var o=!0;r.addEventListener("click",function(){1==o?(s.scrollTo(0,0),o=!1):(s.scrollTo(0,40),o=!0)});var s=Titanium.UI.createScrollView({layout:"vertical",height:"89.5%",top:0}),l=Titanium.UI.createTextField({top:10,width:288,height:30,borderRadius:15,clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS,rightButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS,returnKeyType:Titanium.UI.RETURNKEY_DONE,borderColor:"#999",backgroundColor:"#FFF",paddingLeft:10,color:"#666",font:{fontSize:10},hintText:"Enter a venue name",ellipsize:!0,returnKeyType:Titanium.UI.RETURNKEY_DONE});if(s.add(l),s.addEventListener("cancel",function(){l.blur()}),l.addEventListener("return",function(){var t=require("/builders/startActInd"),i=t(a);a.setTouchEnabled(!1);var n=l.getValue();n=n.replace(" ","%"),n=n.replace(" ","%"),n=n.replace(" ","%");var r=null;null!=n&&""!=n&&(r=!0);var o='SELECT * FROM Venue JOIN VenueCoords ON Venue.VenueID=VenueCoords.VenueID WHERE VenueSort LIKE "%'+n+'%"',s=require("/builders/createResultsPage"),d=s(a,e,o,r,null,null,!0,!1);e.activeTab.open(d);{var u=require("/builders/endActInd");u(a,i[0],i[1])}a.setTouchEnabled(!0)}),"iPad"==Ti.App.Properties.getString("osname")){var d=Titanium.UI.createImageView({image:"/images/imageBanner.png",width:600,top:50});s.add(d)}var u=Titanium.UI.createImageView({image:"/images/button_quick_search.png",width:288,height:52,top:10});s.add(u);var c=Titanium.UI.createImageView({image:"/images/button_search_near.png",width:288,height:52,top:10});s.add(c);var f=Titanium.UI.createImageView({image:"/images/button_az_directory.png",width:288,height:52,top:10});s.add(f);var p=Titanium.UI.createImageView({image:"/images/button_venue_collections.png",width:288,height:52,top:10});s.add(p);var m=Titanium.UI.createImageView({image:"/images/button_special_offers.png",width:288,height:52,top:10});s.add(m);var g=Titanium.UI.createImageView({image:"/images/button_speak_advisor.png",width:288,height:52,top:10});s.add(g);var h=Titanium.UI.createButton({width:288,height:25,top:10,opacity:0});s.add(h),a.add(s),"iPad"==Ti.App.Properties.getString("osname")&&(s.setWidth(600),s.setHeight(Titanium.UI.SIZE),l.setWidth(600),u.setLeft(0),u.setTop(50),c.setLeft(0),f.setLeft(0),p.setRight(0),p.setTop(-175),m.setRight(0),g.setRight(0));var v=require("/builders/createAdvert"),T=v();return a.add(T),u.addEventListener("click",function(){{var t=require("/builders/createApplicationWindow");t(e,"children/quickSearch","Venue Search","#d2e8f5","Search","Venue Search","","")}}),c.addEventListener("click",function(){{var t=require("/builders/createApplicationWindow");t(e,"children/searchLocation","By Location","#d2e8f5","Search","Search By Location","","")}}),f.addEventListener("click",function(){{var t=require("/builders/startActInd"),i=t(a),n=require("/builders/createApplicationWindow"),r=(n(e,"children/azDirectory","Venue Search","#FFF","Search","Featured Venues","",""),require("/builders/endActInd"));r(a,i[0],i[1])}}),p.addEventListener("click",function(){{var t=require("/builders/createApplicationWindow");t(e,"children/venueCollections","Venue Collections","#FFF","/images/loading_page.png","Search","Venue Collections","","")}}),m.addEventListener("click",function(){{var t=require("/builders/createApplicationWindow");t(e,"children/specialOffers","Special Offers","#d2e8f5","Search","Special Offers","","")}}),g.addEventListener("click",function(){{var t=require("/builders/createApplicationWindow");t(e,"children/venueFindingService","Venue Finding Service","#d2e8f5","Search","Free Venue Finding Service","","")}}),a.addEventListener("postlayout",function(){"Android"!=Ti.App.Properties.getString("osname")&&s.scrollTo(0,40)}),a.addEventListener("open",function(){l.blur()}),searchView.home_button.addEventListener("click",function(){l.blur()}),a}module.exports=searchView;