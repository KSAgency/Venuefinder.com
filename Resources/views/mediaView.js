function mediaView(tabGroup, title, backgroundColor) {

    // Style & Get Paid Listings

    var sqlString = 'SELECT DISTINCT VenueAdvertOptionsForWeb.VenueID, Venue.* FROM VenueAdvertOptionsForWeb JOIN Venue ON VenueAdvertOptionsForWeb.VenueID == Venue.VenueID WHERE VenueAdvertOptionsForWeb.OptionCode="VID" AND VenueAdvertOptionsForWeb.URL IS NOT NULL AND VenueAdvertOptionsForWeb.URL!=""';

    //Create Results Page
    var createResultsPage = require('/builders/createResultsPage');
    var resultsPage = createResultsPage(null, tabGroup, sqlString, true, null, null, null, null, 'Videos', null, null, null, '/images/videobanner.png', 9);

    // // Require & Create advert space
    // var createAdvert = require('/builders/createAdvert');
    // var advert = createAdvert(true);
    // resultsPage.add(advert);

    return resultsPage;

}

module.exports = mediaView;
