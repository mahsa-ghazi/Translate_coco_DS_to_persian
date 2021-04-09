
var mysql = require('mysql');
var fs = require('fs')
var dataset = fs.createWriteStream('farsi_datatset.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "image_captioning"
});

con.connect(function(err) {
  if (err) throw err;
  query = con.query(" SELECT * FROM `data_entries` WHERE `translated_txt`<>'' ");
  query
  .on('error', function(err) {
    // Handle error, an 'end' event will be emitted after this as well
  })
  .on('fields', function(fields) {
    // the field packets for the rows to follow
  })
  .on('result', function(row) {
    dataset.write(row.image_id + "-" + row.translated_txt + "\n") ;
    con.pause();
    con.resume();
  })
  .on('end', function() {
      console.log('end!')
    // all rows have been received
  });
});
