import * as d3 from "d3"

const data = JSON.parse('[{"index": "1999", "danceability": 0.5525879082, "energy": 0.5499389796, "loudness": -10.358044898, "speechiness": 0.0482452551, "tempo": 118.4947479592, "valence": 0.5928712245}, {"index": "2000", "danceability": 0.5556916581, "energy": 0.5821206755, "loudness": -9.9927922211, "speechiness": 0.0484955476, "tempo": 119.3857707267, "valence": 0.6064784545}, {"index": "2001", "danceability": 0.5502218479, "energy": 0.5601336396, "loudness": -10.2014139867, "speechiness": 0.0479523737, "tempo": 118.9083772333, "valence": 0.5842190403}, {"index": "2002", "danceability": 0.546340051, "energy": 0.5605739286, "loudness": -10.1481117347, "speechiness": 0.0473251531, "tempo": 118.5309811224, "valence": 0.5775928571}, {"index": "2003", "danceability": 0.5423736493, "energy": 0.5543700306, "loudness": -10.2153888889, "speechiness": 0.0470439348, "tempo": 118.8671508665, "valence": 0.5694063201}, {"index": "2004", "danceability": 0.5409303662, "energy": 0.5558800102, "loudness": -10.1704074262, "speechiness": 0.0468752289, "tempo": 118.8158957274, "valence": 0.5654483723}, {"index": "2005", "danceability": 0.5339431113, "energy": 0.5517878495, "loudness": -10.1425882054, "speechiness": 0.0462561769, "tempo": 118.8120462633, "valence": 0.5535723945}, {"index": "2006", "danceability": 0.5335038677, "energy": 0.552924631, "loudness": -10.095178626, "speechiness": 0.0468318066, "tempo": 118.7722814249, "valence": 0.5477290585}, {"index": "2007", "danceability": 0.5295341302, "energy": 0.5534807731, "loudness": -10.006819939, "speechiness": 0.0462786877, "tempo": 118.3554384537, "valence": 0.5392541709}, {"index": "2008", "danceability": 0.5312891094, "energy": 0.5524810687, "loudness": -10.0798371501, "speechiness": 0.0466943003, "tempo": 118.6970300254, "valence": 0.5440496692}, {"index": "2009", "danceability": 0.5332651292, "energy": 0.5668930056, "loudness": -9.7664445008, "speechiness": 0.0461115053, "tempo": 119.0007475925, "valence": 0.5309147491}, {"index": "2010", "danceability": 0.5319929114, "energy": 0.5664795949, "loudness": -9.7550248101, "speechiness": 0.04584, "tempo": 119.0724470886, "valence": 0.5328185823}, {"index": "2011", "danceability": 0.5312133536, "energy": 0.5698314112, "loudness": -9.6406828528, "speechiness": 0.0459762772, "tempo": 119.1311370764, "valence": 0.5203982802}, {"index": "2012", "danceability": 0.5321227778, "energy": 0.5731574242, "loudness": -9.5523439394, "speechiness": 0.0461559596, "tempo": 119.1726060606, "valence": 0.5173524242}, {"index": "2013", "danceability": 0.5336011599, "energy": 0.5744226425, "loudness": -9.5010660615, "speechiness": 0.0463019163, "tempo": 118.8398219869, "valence": 0.5149931921}, {"index": "2014", "danceability": 0.532372127, "energy": 0.5783654234, "loudness": -9.3929269153, "speechiness": 0.0468087198, "tempo": 118.7446522177, "valence": 0.506247631}, {"index": "2015", "danceability": 0.5337472306, "energy": 0.5869578046, "loudness": -9.2492220544, "speechiness": 0.0486022155, "tempo": 119.057846425, "valence": 0.5000236153}, {"index": "2016", "danceability": 0.5342004018, "energy": 0.5928183827, "loudness": -9.1765233551, "speechiness": 0.0502109493, "tempo": 119.6862225013, "valence": 0.4975547966}, {"index": "2017", "danceability": 0.5327006529, "energy": 0.5935849824, "loudness": -9.1558789553, "speechiness": 0.0502494726, "tempo": 119.6610728277, "valence": 0.4961919136}, {"index": "2018", "danceability": 0.5346745236, "energy": 0.5974602808, "loudness": -9.0359784353, "speechiness": 0.0513200602, "tempo": 119.7288475426, "valence": 0.4929775326}, {"index": "2019", "danceability": 0.5322982456, "energy": 0.5960896241, "loudness": -9.0446857143, "speechiness": 0.0508534837, "tempo": 119.6198035088, "valence": 0.4906610526}]');

export default class LineChart {
    constructor(selector, onClick) {
        this.selector = selector;
        this.onClick = onClick;
    }

    init() {
        this.margin = {top: 15, right: 35, bottom: 15, left: 35};
        this.width = 850;
        this.height = 410;
        this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        this.colorScale = {
            "valence": "#e91e63",
            "speechiness": "#673ab7",
            "liveness": "#795548",
            "instrumentalness": "#009688",
            "energy": "#cddc39",
            "danceability": "#ffc107",
            "acousticness": "#ff5722",
        };

        this.chart = d3
            .select(this.selector)
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)


        this.line = d3.line()
            .x(d => {
                return this.x(new Date(d.year));
            })
            .y(d => this.y(d.data));

        // X Axis
        this.chart
            .append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${this.height-this.margin.top-this.margin.bottom})`);

        // Y Axis
        this.chart
            .append("g")
            .attr("class", "y-axis")
    }

    update(data) {
        this.x = d3
            .scaleTime()
            .domain([new Date("1999"), new Date("2019")])
            .range([0, this.width]);

        this.y = d3
            .scaleLinear()
            .domain([0, 1])
            .range([this.height - this.margin.top - this.margin.bottom, 0]);

        d3.select(".x-axis")
            .call(d3.axisBottom(this.x));

        d3.select(".y-axis")
            .call(d3.axisLeft(this.y));

        const lines = this.chart
            .selectAll(".line")
            .data(Object.values(data));

        lines
            .enter()
            .append("path")
            .merge(lines)
            .attr("class", "line")
            .style("stroke", d => {
                console.log(d)
                return this.colorScale[d.key];
            })
            .style("fill", "none")
            .style("stroke-width", 2)
            // .transition().duration(750)
            .attr("d", d => this.line(d.data))

        lines.exit().remove()
    }
}

// var bisectDate = d3.bisector(d => d.index).left,
//     formatValue = d3.format(",.2f");
//
// var focus = svg.append("g")
//     .attr("class", "focus")
//     .style("display", "none");
//
// focus.append("line").attr("class", "lineHover")
//     .style("stroke", "#999")
//     .attr("stroke-width", 1)
//     .style("shape-rendering", "crispEdges")
//     .style("opacity", 0.5)
//     .attr("y1", -height)
//     .attr("y2", 0);
//
// focus.append("text").attr("class", "lineHoverDate")
//     .attr("text-anchor", "middle")
//     .attr("font-size", 12);
//
// var overlay = svg.append("rect")
//     .attr("class", "overlay")
//     .attr("x", margin.left)
//     .attr("width", width - margin.right - margin.left)
//     .attr("height", height)
//
// update(["danceability", "energy", "speechiness", "valence"], 0);

function update(audio_features, speed) {

    var features = audio_features.map(function (id) {
        return {
            id: id,
            values: data.map(d => {
                return {year: +d.index, feature_value: +d[id]}
            })
        };
    });

    var feature = svg.selectAll(".features")
        .data(features);

    feature.exit().remove();

    feature.enter().insert("g", ".focus").append("path")
        .attr("class", "line features")
        .style("stroke", d => z(d.id))
        .merge(feature)
        .transition().duration(speed)
        .attr("d", d => line(d.values))

    // tooltip(audio_features);
}

//
// function tooltip(audio_features) {
//
//     var labels = focus.selectAll(".lineHoverText")
//         .data(audio_features)
//
//     labels.enter().append("text")
//         .attr("class", "lineHoverText")
//         .style("fill", d => z(d))
//         .attr("text-anchor", "start")
//         .attr("font-size", 12)
//         .attr("dy", (_, i) => 1 + i * 2 + "em")
//         .merge(labels);
//
//     var circles = focus.selectAll(".hoverCircle")
//         .data(audio_features)
//
//     circles.enter().append("circle")
//         .attr("class", "hoverCircle")
//         .style("fill", d => z(d))
//         .attr("r", 2.5)
//         .merge(circles);
//
//     svg.selectAll(".overlay")
//         .on("mouseover", function () {
//             focus.style("display", null);
//         })
//         .on("mouseout", function () {
//             focus.style("display", "none");
//         })
//         .on("mousemove", mousemove);
//
//     function mousemove() {
//
//         // get data of the closest year to the corresponding x value of mouse
//         var x0 = x.invert(d3.mouse(this)[0]),
//             i = bisectDate(data, x0, 1),
//             d0 = data[i - 1],
//             d1 = data[i],
//             d = x0 - d0.index > d1.index - x0 ? d1 : d0;
//
//         focus.select(".lineHover")
//             .attr("transform", "translate(" + x(d.index) + "," + height + ")");
//
//         focus.select(".lineHoverDate")
//             .attr("transform",
//                 "translate(" + x(d.index) + "," + (height + margin.bottom) + ")")
//             .text(d.index);
//         console.log(d.index)
//
//         focus.selectAll(".hoverCircle")
//             .attr("cy", e => y(d[e]))
//             .attr("cx", x(d.index));
//
//         focus.selectAll(".lineHoverText")
//             .attr("transform",
//                 "translate(" + x(d.index) + "," + height / 2.5 + ")")
//             .text(e => e + " " + formatValue(d[e]));
//
//         x(d.index) > (width - width / 4)
//             ? focus.selectAll("text.lineHoverText")
//                 .attr("text-anchor", "end")
//                 .attr("dx", -10)
//             : focus.selectAll("text.lineHoverText")
//                 .attr("text-anchor", "start")
//                 .attr("dx", 10)
//     }
// }
//
// var selectBox = d3.selectAll(".audioFeature")
//     .on("change", function () {
//         var checkedBoxes = Array.from(document.querySelectorAll('input[name=audioFeature]:checked'));
//         let checkedFeatures = []
//         checkedBoxes.forEach(function (entry) {
//             checkedFeatures.push(entry.value)
//         });
//         update(checkedFeatures, 750);
//     })
