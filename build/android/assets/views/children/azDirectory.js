function azDirectory(e){for(var t=Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.FILL,backgroundColor:"#d2e8f5"}),i=[],n=[],a="1",r="1",s=0,o=require("/builders/databaseFunctions/createDatabase"),l=o("/venuefinder.db","venuefinder"),d=l.execute('SELECT * FROM Venue WHERE VenueID IS NOT NULL AND PackageCode="GLD" ORDER BY VenueSort ASC');d.isValidRow();){var c=d.fieldByName("VenueName"),u=d.fieldByName("VenueSort"),f=d.fieldByName("VenueID"),p=d.fieldByName("PackageCode"),g=d.fieldByName("Town"),m=d.fieldByName("Country"),h=d.fieldByName("BedroomsNo"),v=d.fieldByName("BedroomDisabledAccess"),b=l.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID="'+f+'" AND (OptionCode="TOP" OR OptionCode="PIC")');if(b.isValidRow())var T=b.fieldByName("GraphicFileName");if(""!=g)var g=g+", ";else var g="";if(""!=m)var m=m+" ";else var m="";var w=null;if("PRE"==p){var I=l.execute('SELECT Text FROM VenueAdvertOptionsForWeb WHERE VenueID="'+f+'" AND OptionCode="SG2"');I.isValidRow()&&(w=I.fieldByName("Text"))}else{var I=l.execute('SELECT DescriptionText FROM VenueTextForWeb WHERE VenueID="'+f+'"');I.isValidRow()&&(w=I.fieldByName("DescriptionText"))}(null==w||""==w)&&(w="No description could be retrieved for this venue."),w.toString(),w=w.replace(/(<([^>]+)>)/gi,""),w=w.replace(/\s+/g," "),w=w.replace(/(&amp;)/g,"&"),w=w.replace(/(&nbsp;)/g," "),w=w.replace(/(&rsquo;)/g,"’"),w=w.replace(/(&hellip;)/g,"…"),w=w.replace(/(&oslash;)/g,"Ø"),w=w.replace(/(&pound;)/g,"£"),w=w.replace(/(&ndash;)/g,"–"),w=w.replace(/(&sup2;)/g,"²"),w=w.replace(/(&ldquo;)/g,"“"),w=w.replace(/(&rdquo;)/g,"”"),w=w.replace(/(&lsquo;)/g,"’");var _=u.charAt(0);("0"==_||"1"==_||"2"==_||"3"==_||"4"==_||"5"==_||"6"==_||"7"==_||"8"==_||"9"==_)&&(_="#"),_.toUpperCase();var x=require("/builders/featuredResultsFormat"),y=x(c,f,T,h,v,w,g,m,null,!0);if(s+=1,a!=_){_.toUpperCase(),y.setHeader(_);var k={title:_,index:s};n.push(k)}a=_,"1"==r&&(r=""),i.push(y),d.next()}l.close();var S=Titanium.UI.createTableView({data:i,filterAttribute:"searchField",searchHidden:!1,index:n,tintColor:"#2195be",backgroundColor:"#FFF"});return S.addEventListener("click",function(t){{var i=require("/builders/createApplicationWindow");i(e,"children/featuredListing",t.rowData.venueTitle,"#FFF","Search","Featured Venues",t.rowData.venueTitle,"",t.rowData.uniqueID)}}),"iPad"==Ti.App.Properties.getString("osname")&&(S.setWidth(400),S.setStyle(Ti.UI.iPhone.TableViewStyle.GROUPED)),t.add(S),t}module.exports=azDirectory;