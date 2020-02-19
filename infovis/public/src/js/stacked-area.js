import * as d3 from "d3"
import data from "../../../../data/mock_genres.json"

const width = 720;
const height = 520;
const margin = 40;

export default (id) => {
    // Create graph and set margins
    const graph = d3
        .select(id)
        .append("svg")
        .attr("width", width + margin * 2)
        .attr("height", height + margin * 2)
        .append("g")
        .attr("transform", `translate(${margin}, ${margin})`);

    const xAxis = d3
        .scaleTime()
        .domain(d3.extent(data.rock, d => new Date(d.year)))
        .range([0, width]);

    const yAxis = d3.scaleLinear()
        .domain([0, 1000])
        .range([height, 0]);

    graph
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xAxis));

    graph
        .append("g")
        .call(d3.axisLeft(yAxis));

    const area = d3.area()
        .x((d) => xAxis(new Date(d.year))) 
        .y0(yAxis(0))
        .y1((d) => yAxis(d.value));

    graph
        .append("path")
        .datum(data.rock)
        .attr("fill", "#cce5df")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr("d", area);

}