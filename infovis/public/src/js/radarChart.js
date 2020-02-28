import * as d3 from "d3"

function fakeData() {
	let data = [];
	let features = ["A","B","C","D","E","F"];
	//generate the data
	for (var i = 0; i < 10; i++){
	    var point = {}
	    //each feature will be a random number from 0 - 1
	    features.forEach(f => point[f] = Math.random() );
	    data.push(point);
	}
	return data
}

function realData() {
	let data = [{"titel":"Bohemian Rhapsody",
	"artiest":"Queen","jaar":1975,"id":"7tFiyTwD0nx5a1eklYtX2J",
	"1999":1.0,"2000":1.0,"2001":1.0,"2002":1.0,"2003":1.0,
	"2004":1.0,"2005":2.0,"2006":1.0,"2007":1.0,"2008":1.0,
	"2009":1.0,"2010":2.0,"2011":1.0,"2012":1.0,"2013":1.0,
	"2014":2.0,"2015":2.0,"2016":1.0,"2017":1.0,"2018":1.0,
	"2019":1.0,"artist_id":"spotify:artist:1dfeR4HaWDbWqFHLkxsg1d",
	"album_id":"spotify:album:6X9k3hSsvQck2OfKYdBbXr",
	"image_640":"https:\\/\\/i.scdn.co\\/image\\/ab67616d0000b273ce4f1737bc8a646c8c4bd25a",
	"image_64":"https:\\/\\/i.scdn.co\\/image\\/ab67616d00004851ce4f1737bc8a646c8c4bd25a",
	"popularity":74,"duration":354320,"preview_url":null,
	"acousticness":0.288,"danceability":0.392,"energy":0.402,
	"instrumentalness":0.0,"liveness":0.243,"loudness":-9.961,
	"speechiness":0.0536,"tempo":143.883,"valence":0.228,
	"genre":["glam rock","rock"]}, {"titel":"Hotel California",
	"artiest":"Eagles","jaar":1977,"id":"40riOy7x9W7GXjyGp4pjAv",
	"1999":2.0,"2000":4.0,"2001":3.0,"2002":3.0,"2003":2.0,
	"2004":2.0,"2005":3.0,"2006":3.0,"2007":3.0,"2008":2.0,
	"2009":2.0,"2010":1.0,"2011":2.0,"2012":2.0,"2013":2.0,
	"2014":1.0,"2015":3.0,"2016":2.0,"2017":2.0,"2018":2.0,
	"2019":2.0,"artist_id":"spotify:artist:0ECwFtbIWEVNwjlrfc6xoL",
	"album_id":"spotify:album:2widuo17g5CEC66IbzveRu",
	"image_640":"https:\/\/i.scdn.co\/image\/ab67616d0000b2734637341b9f507521afa9a778",
	"image_64":"https:\/\/i.scdn.co\/image\/ab67616d000048514637341b9f507521afa9a778",
	"popularity":81,"duration":391376,
	"preview_url":"https:\/\/p.scdn.co\/mp3-preview\/50e82c99c20ffa4223e82250605bbd8500cb3928?cid=1a316693f32b4bd4acee870703d5338b",
	"acousticness":0.00574,"danceability":0.579,"energy":0.508,
	"instrumentalness":0.000494,"liveness":0.0575,"loudness":-9.484,
	"speechiness":0.027,"tempo":147.125,"valence":0.609,
	"genre":["album rock","classic rock","country rock",
	"folk rock","heartland rock","mellow gold","rock",
	"singer-songwriter","soft rock","yacht rock"]}, {"titel":"Child In Time",
	"artiest":"Deep Purple","jaar":1972,"id":"5TrfusgKC1BYic5LaWCoKm",
	"1999":3.0,"2000":2.0,"2001":2.0,"2002":2.0,"2003":3.0,"2004":3.0,"2005":4.0,
	"2006":4.0,"2007":4.0,"2008":4.0,"2009":5.0,"2010":4.0,"2011":3.0,"2012":4.0,
	"2013":4.0,"2014":4.0,"2015":8.0,"2016":5.0,"2017":5.0,"2018":6.0,"2019":12.0,
	"artist_id":"spotify:artist:568ZhdwyaiCyOGJRtNYhWf","album_id":"spotify:album:3llL1qaL2RvtyQAthAuRFS",
	"image_640":"https:\/\/i.scdn.co\/image\/ab67616d0000b273c093f46ed58856808fef4c8d",
	"image_64":"https:\/\/i.scdn.co\/image\/ab67616d00004851c093f46ed58856808fef4c8d",
	"popularity":44,"duration":620373,
	"preview_url":"https:\/\/p.scdn.co\/mp3-preview\/9c5b8bf85a3d429ab3b81aae97f480497eefe47e?cid=1a316693f32b4bd4acee870703d5338b",
	"acousticness":0.17,"danceability":0.338,"energy":0.461,"instrumentalness":0.564,
	"liveness":0.0927,"loudness":-10.74,"speechiness":0.0396,"tempo":126.698,
	"valence":0.351,"genre":["album rock","blues rock","classic rock",
	"hard rock","metal","psychedelic rock","rock"]}]

	let features = ["acousticness", "danceability", "energy",
	 "instrumentalness", "liveness", "valence", "speechiness"];
	let result = [];

	for (let i=0; i < data.length; i++) {
		let dict = {};
		for (let j=0; j < features.length; j++) {
			dict[features[j]] = data[i][features[j]]
		}
		result.push(dict)
	}
	console.log(result)
	return result
}

realData()

// Inspired by https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart
function drawRadar(location, data, size=1, features=[]) {

	// Parsing the features
	if (features.length === 0) {
		features.push(Object.keys(data[0]))
		features = features[0]
	}

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
		.attr("opacity", 0.5)
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
	    .attr("stroke","black")
	    .attr("opacity", 0.5);

	    //draw axis label
	    svg.append("text")
	    .attr("x", label_coordinate.x - 3)
	    .attr("y", label_coordinate.y + 4)
	    .text(ft_name)
	    .attr("font-size", size * 12);
	}


	// Plotting the data
	let colors = ["darkorange", "gray", "navy", "green"];


	function getPathCoordinates(data_point){
	    let coordinates = [];
	    for (var i = 0; i < features.length; i++){
	        let ft_name = features[i];
	        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
	        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
	    }
	    return coordinates;
	}



	let tempPoints = [[123, 30], [12, 123], [123, 123], [0,0], [0,0], [0,0]];
	let tempPoints2 = [[{x: 123, y: 30}, {x: 12, y:123}, {x:123, y:123},
					  {x:0, y:0}, {x:0, y:0}, {x:0, y:0}],
					  [{x: 300, y: 200}, {x: 230, y:60}, {x:100, y:140}]]
	let tempPoints3 = [[{x: 300, y: 200}, {x: 230, y:60}, {x:100, y:140}]]
	let tempPoints4 = [[{x: 123, y: 30}, {x: 12, y:123}, {x:123, y:123},
					  {x:0, y:0}, {x:0, y:0}, {x:0, y:0}]]


	    // Rendering of the graph
    const renderRadarChart = (selection, linePaths) => {
		const line = d3.line()
		.x(d => d.x)
		.y(d => d.y);

		const startLine = d3.line()
			.x(d => d.x / 10)
			.y(d => d.y / 10);

		const stopLine = d3.line()
			.x(d => width / 2)
			.y(d => width / 2);

		// Get all the paths:
		const paths = selection.selectAll('path').data(linePaths);

		// Add all paths to svg
		paths.enter()
			.append("path")
			.attr("opacity", 0.5)
			.attr('d', function(d) {return stopLine(d) + 'Z'})

			// Causes the new data to merge with the old data
			.merge(paths)
			.transition().duration(1000)
			.attr('d', function(d) {return line(d) + 'Z'});

		// Remove paths that are no longer in the data.
		paths.exit()
			.transition().duration(1000)
				.attr('d', function(d) {return stopLine(d) + 'Z'})
			.remove()
	}

	function timedExecution(i) {
		setTimeout(() => {
		    let d = data[i];
		    let color = colors[i];
		    let coordinates = getPathCoordinates(d);
			renderRadarChart(svg, [coordinates])
		}, i * 2000)
	}

	
	 for (let i=0; i<data.length; i++){
 		timedExecution(i);

 		if (i === (data.length - 1)) {
 			location.reload(true)
 		}
		    //draw the path element
		    // svg.append("path")
			   //  .datum(coordinates)
			   //  .attr("stroke", color)
			   //  .attr("stroke-opacity", 1)
			   //  .attr("stroke", color)
			   //  .transition(t)
			   //  	.attr("d", line)
			   //  	.attr("stroke-width", 3)
			   //  	.attr("opacity", 0.5)
			   //  	.attr("stroke", color)
				  //   .attr("fill", color)
	}
}

drawRadar("#radarchart", realData(), 1);