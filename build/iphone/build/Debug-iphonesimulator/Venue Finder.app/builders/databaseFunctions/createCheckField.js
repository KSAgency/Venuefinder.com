function createCheckField(title){

    var tableRow = Titanium.UI.createTableViewRow({
        color:'#399ad4',
        backgroundColor:'#f7f7f7',
        title:title,
        font: {
            fontFamily:'Arial',
            fontSize:'14',
            fontWeight:'bold'
        },
        hasCheck:false,
        checkValue:0,
        height:'45',
        tintColor:'#2195be'
    });

    tableRow.addEventListener('click', function() {
        if (tableRow.hasCheck==false) {
            tableRow.setHasCheck(true);
            tableRow.checkValue = 1;
        } else {
            tableRow.setHasCheck(false);
            tableRow.checkValue = 0;
        }
    });

    
    return [tableRow];
        
}

module.exports = createCheckField;
