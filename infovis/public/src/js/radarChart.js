import * as d3 from "d3"

function fakeData() {
	let data = [];
	let features = ["A","B","C","D","E","F"];
	//generate the data
	for (var i = 0; i < 3; i++){
	    var point = {}
	    //each feature will be a random number from 0 - 1
	    features.forEach(f => point[f] = Math.random() );
	    data.push(point);
	}
	console.log(data);
	return data
}

fakeData()

function drawRadar(location, width, height, size=1) {



	let svg = d3.select(location)
		.append("svg")
		.attr("width", size * width)
		.attr("height", size * height);

	// Plotting gridlines. Domain represents the range of the data.
	// Range represents the amount of pixels used to display the range of
	// data.
	let radialScale = d3.scaleLinear()
		.domain([0, 1])
		.range([0, size * 100]);

	let ticks = [0.2,0.4,0.6,0.8,1.0];

	ticks.forEach(t =>
		svg.append("circle")
		.attr("cx", size * 150)
		.attr("cy", size * 150)
		.attr("fill", "none")
		.attr("stroke", "gray")
		.attr("r", radialScale(t))
	);

	// Adding the text labels
	ticks.forEach(t =>
		svg.append("text")
		.attr("x", size * 145)
		.attr("y", size * 148 - radialScale(t))
		.text(t)
		.attr("font-size", size * 10)
	);
}

drawRadar("#radarchart", 300, 300);