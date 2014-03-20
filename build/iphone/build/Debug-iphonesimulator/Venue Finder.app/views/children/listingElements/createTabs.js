function createTabs() {

    var tabContainer = Ti.UI.createView({
        width:'325',
        height:Ti.UI.SIZE,
        layout:'horizontal',
        top:'0',
        left:'0',
        zIndex:'7',
        backgroundColor:'#FFF'
    });

    if (Ti.App.Properties.getString('osname') == 'iPad'){
        tabContainer.setLayout('vertical');   
        tabContainer.setLeft('0');
        tabContainer.setTop('210');
        tabContainer.setWidth(Ti.UI.SIZE);
    }

    // Create Tabs

    var tab1 = Titanium.UI.createImageView({
        image:'/images/venue_info.png',
        nonSelectedImage:'/images/venue_info.png',
        selectedImage:'/images/venue_info_s.png',
        width:'55.5',
        height:'40',
        left:'0',
        top:'0%',
        contentPath:'createInfoTab',
        name:'Venue Info',
        touchEnabled:true
    });

    var tab2 = Titanium.UI.createImageView({
        image:'/images/photos_media.png',
        nonSelectedImage:'/images/photos_media.png',
        selectedImage:'/images/photos_media_s.png',
        width:'68',
        height:'40',
        left:'0',
        top:'0%',
        contentPath:'createMediaTab',
        name:'Photos & Media',
        touchEnabled:true,
    });

    var tab3 = Titanium.UI.createImageView({
        image:'/images/meeting_rooms.png',
        nonSelectedImage:'/images/meeting_rooms.png',
        selectedImage:'/images/meeting_rooms_s.png',
        width:'67',
        height:'40',
        left:'0',
        top:'0%',
        contentPath:'createRoomsTab',
        name:'Meeting Rooms',
        touchEnabled:true
    });

    var tab4 = Titanium.UI.createImageView({
        image:'/images/venue_facilities.png',
        nonSelectedImage:'/images/venue_facilities.png',
        selectedImage:'/images/venue_facilities_s.png',
        width:'69',
        height:'40',
        left:'0',
        top:'0%',
        contentPath:'createFacilitiesTab',
        name:'Facilities',
        touchEnabled:true
    });

    var tab5 = Titanium.UI.createImageView({
        image:'/images/special_offers.png',
        nonSelectedImage:'/images/special_offers.png',
        selectedImage:'/images/special_offers_s.png',
        width:'60.5',
        height:'40',
        left:'0',
        top:'0%',
        contentPath:'createOffersTab',
        name:'Special Offers',
        touchEnabled:true
    });
    
    if (Ti.App.Properties.getString('osname') == 'iPad'){ 
        
        tab1.setHeight('49'),
        tab2.setHeight('49'),
        tab3.setHeight('49'),   
        tab4.setHeight('49'),   
        tab5.setHeight('49');  
        
        tab1.setWidth('245'),
        tab2.setWidth('245'),
        tab3.setWidth('245'),   
        tab4.setWidth('245'),   
        tab5.setWidth('245');
        
        tab1.setTop('5'),
        tab2.setTop('10'),
        tab3.setTop('10'),   
        tab4.setTop('10'),   
        tab5.setTop('10');
        
        tab1.setLeft('0'),
        tab2.setLeft('0'),
        tab3.setLeft('0'),   
        tab4.setLeft('0'),   
        tab5.setLeft('0');  
        
        tab1.setImage('/images/tab1_ipad_ns.png'),
        tab2.setImage('/images/tab2_ipad_ns.png'),
        tab3.setImage('/images/tab3_ipad_ns.png'),  
        tab4.setImage('/images/tab4_ipad_ns.png'),   
        tab5.setImage('/images/tab5_ipad_ns.png');  
        
        tab1.nonSelectedImage = '/images/tab1_ipad.png',
        tab2.nonSelectedImage = '/images/tab2_ipad.png',
        tab3.nonSelectedImage = '/images/tab3_ipad.png',  
        tab4.nonSelectedImage = '/images/tab4_ipad.png',   
        tab5.nonSelectedImage = '/images/tab5_ipad.png'; 
        
        tab1.selectedImage = '/images/tab1_ipad_s.png',
        tab2.selectedImage = '/images/tab2_ipad_s.png',
        tab3.selectedImage = '/images/tab3_ipad_s.png',  
        tab4.selectedImage = '/images/tab4_ipad_s.png',   
        tab5.selectedImage = '/images/tab5_ipad_s.png';  
        
    }

    tabContainer.add(tab1);
    tabContainer.add(tab2);
    tabContainer.add(tab3);
    tabContainer.add(tab4);
    tabContainer.add(tab5);

return tabContainer;

} 

module.exports = createTabs;