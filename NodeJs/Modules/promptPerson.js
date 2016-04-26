

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

var realPerson = {
	name: '',
	sayings: []
};

// make line still running and run the funcation run
rl.question("What is the name of a real person? ", function(answer) {

//answer pramter tj=hat user enter 
	realPerson.name = answer;

	rl.setPrompt(`What would ${realPerson.name} say? `);
 
	rl.prompt();

//when user submit the new answer after Click ENTER
	rl.on('line', function(saying) {

		realPerson.sayings.push(saying.trim());

		if (saying.toLowerCase().trim() === 'exit') {
			rl.close();
		} else {
			rl.setPrompt(`What else would ${realPerson.name} say? ('exit' to leave) `);
		    rl.prompt();
		}

	});

});


rl.on('close', function() {

	console.log("%s is a real person that says %j", realPerson.name, realPerson.sayings);
	process.exit();
	
});



