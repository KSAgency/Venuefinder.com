function getUpdateTimestamp(e,t){var i,a,n,o=require("/builders/databaseFunctions/createDatabase"),r=o("/update.db","update"),l=r.execute("SELECT * FROM dateDB ORDER BY rowid DESC");return 0!=l.rowCount?(i=l.fieldByName("Year").toString(),a=l.fieldByName("Month").toString(),n=l.fieldByName("Day").toString(),t.setText("Last Updated: "+n+" "+a+" "+i),"Jan"==a?a="01":"Feb"==a?a="02":"Mar"==a?a="03":"Apr"==a?a="04":"May"==a?a="05":"Jun"==a?a="06":"Jul"==a?a="07":"Aug"==a?a="08":"Sep"==a?a="09":"Oct"==a?a="10":"Nov"==a?a="11":"Dec"==a&&(a="12"),i.toString()+a.toString()+n.toString()):(e.dontShow=!1,void r.close())}module.exports=getUpdateTimestamp;