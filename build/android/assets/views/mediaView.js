function mediaView(e){var t='SELECT DISTINCT VenueAdvertOptionsForWeb.VenueID, Venue.* FROM VenueAdvertOptionsForWeb JOIN Venue ON VenueAdvertOptionsForWeb.VenueID == Venue.VenueID WHERE VenueAdvertOptionsForWeb.OptionCode="VID" AND VenueAdvertOptionsForWeb.URL IS NOT NULL AND VenueAdvertOptionsForWeb.URL!=""',i=require("/builders/createResultsPage"),a=i(null,e,t,!0,null,null,null,null,"Videos",null,null,null,"/images/videobanner.png",9);return a}module.exports=mediaView;