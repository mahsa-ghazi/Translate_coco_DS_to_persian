const TranslateService = require('./services/translate')
const mysqlService = require('./services/mysqlConnection');
require('dotenv').config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var pageSize = process.env.PAGE_SIZE;
var query = "SELECT * FROM `data_entries` WHERE `is_translated` = 0  limit 0," +  pageSize;
mysqlService.mysqlConn('image_captioning').then((connetcion) => {
    mysqlService.query(connetcion, query).then((results) => {
        results.forEach((row) => {
            var txt = row.caption;
            TranslateService.translate('A dog is laying next to a woman holding a baby.            ', 'fa').then((translatedTxt) => {
                console.log('translatedTxt', translatedTxt)
                // if(translatedTxt != undefined ) {
                //     var updateQuery = "UPDATE `data_entries` SET `translated_txt`='" +translatedTxt+ "' , is_translated = 1 where id = " + row.id
                //     mysqlService.query(connetcion, updateQuery).then((updateRes) => {
                       
                //     }).catch((err) =>{console.log(err)});
                // }
            }).catch((error) => {
                console.log(error);
            }); 
        });
    }).catch((error) => {
        console.log(error);
    });
});

