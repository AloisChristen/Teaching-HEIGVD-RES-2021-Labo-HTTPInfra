var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send(generateFlats());	
});

app.listen(3000, function () {
	console.log('Accepting HTTP requests on port 3000.');
});

function generateFlats() {
	var numberOfFlats = chance.integer({
		min: 0,
		max: 12
	});
	console.log(numberOfFlats);
	var flats = [];
	
	for (var i = 0; i < numberOfFlats; i++) {	
		
		flats.push({
			street : chance.address(),
			city : chance.city(),
			rent : chance.integer({ min: 800, max: 2500 }),
			nbPieces : chance.integer({ min: 2, max: 13 }) * 0.5
		});
	};
	console.log(flats);
	return flats;		
}			