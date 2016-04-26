//uSED TO LOAD MODULER

var path = require('path');
//used for log  up make more infpormation with log like date 
var util = require('util');

//Get the memory Statistics
var v8 = require('v8');


// we used it before to get the file name
util.log( path.basename(__filename) );

var dirUploads = path.join(__dirname, 'www', 'files', 'uploads');

util.log(dirUploads);

util.log(v8.getHeapStatistics());

