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
	return data
}

// Inspired by https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart
function drawRadar(location, data, size=1, features=["A","B","C","D","E","F"]) {
	let width = 300;
	let height = 300;
	let basicSize = width / 2;

	// Functions
	function angleToCoordinate(angle, value) {
		let x = Math.cos(angle) * radialScale(value);
		let y = Math.sin(angle) * radialScale(value);
		return {"x": basicSize * size + x, "y": basicSize * size - y};
	}

	// Creating the graph
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
		.attr("cx", size * basicSize)
		.attr("cy", size * basicSize)
		.attr("fill", "none")
		.attr("stroke", "gray")
		.attr("r", radialScale(t))
	);

	// Adding the text labels with a small offset
	ticks.forEach(t =>
		svg.append("text")
		.attr("x", size * (basicSize + 5))
		.attr("y", size * (basicSize - 2) - radialScale(t))
		.text(t)
		.attr("font-size", size * 10)
	);


	// Draw the straight lines, each representing a feature
	for (var i = 0; i < features.length; i++) {
	    let ft_name = features[i];
	    let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
	    let line_coordinate = angleToCoordinate(angle, 1);
	    let label_coordinate = angleToCoordinate(angle, 1.2);

	    //draw axis line
	    svg.append("line")
	    .attr("x1", size * basicSize)
	    .attr("y1", size * basicSize)
	    .attr("x2", line_coordinate.x)
	    .attr("y2", line_coordinate.y)
	    .attr("stroke","black");

	    //draw axis label
	    svg.append("text")
	    .attr("x", label_coordinate.x - 3)
	    .attr("y", label_coordinate.y + 4)
	    .text(ft_name)
	    .attr("font-size", size * 12);
	}


	// Plotting the data
	let line = d3.line()
		.x(d => d.x)
		.y(d => d.y);
	let colors = ["darkorange", "gray", "navy", "green"];

	console.log(data)

	function getPathCoordinates(data_point){
	    let coordinates = [];
	    for (var i = 0; i < features.length; i++){
	        let ft_name = features[i];
	        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
	        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
	    }
	    return coordinates;
	}

	let t = d3.transition().delay(200).duration(700);

	 for (var i = 0; i < data.length; i ++){
		    let d = data[i];
		    let color = colors[i];
		    let coordinates = getPathCoordinates(d);

		    //draw the path element
		    svg.append("path")
			    .datum(coordinates)
			    .attr("stroke", color)
			    .attr("stroke-opacity", 1)
			    .attr("stroke", color)
			    .transition(t)
			    	.attr("d", line)
			    	.attr("stroke-width", 3)
			    	.attr("opacity", 0.5)
			    	.attr("stroke", color)
				    .attr("fill", color)
	}
}

drawRadar("#radarchart", fakeData(), 1, ["A", "B", "C"]);