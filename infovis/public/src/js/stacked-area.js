import * as d3 from "d3"
import data from "../../../../data/mock_genres"

const width = 720;
const height = 520;
const margin = 30;

export default (id) => {
    const graph = d3
        .select(id)
        .append("svg")
        .attr("width", width + margin * 2)
        .attr("height", height + margin * 2)
        .append("g")
        .attr("transform", `translate(${margin}, ${margin})`);

    const x = d3
        .scaleTime()
        .domain([new Date("1999"), new Date("2019")])
        .range([0, width])

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([0, height])

    graph
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))

    graph
        .append("g")
        .call(d3.axisLeft(y))

    console.log(data)
    const data = data.rock

    const total = data.reduce((a, b) => a + b);
    graph
        .append("path")
        .data(data)
        .attr("fill", "#cce5df")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr("d", d3.area()
            .x((_, i) => 1999+i)
            .y0(0)
            .y1((d) => d / total * 100)
        )

}