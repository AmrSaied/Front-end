var path = require("path");

var hello = "Hello World From Nodejs";

var justNode =hello.slice(17);
global.console.log(`New Cot Can used Varible ${justNode}`);
console.log(`Rock on World ${path.basename(__filename)}`);
console.log(__dirname);
console.log(__filename);