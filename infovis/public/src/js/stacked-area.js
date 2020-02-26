import * as d3 from "d3"

const width = 720;
const height = 520;
const margin = 40;

export default (id, data) => {
    // Create graph and set margins
    const newData = [];
    for (let i = 0; i < 21; i++) { // For each year
        newData[i] = {
            "key": 1999 + i + "",
            "values": []
        }
        Object.keys(data).forEach(key => { // For each genre
            newData[i].values.push({
                "genre": key,
                "value": data[key][i].value
            })
        })
    }

    const stacked = d3
        .stack()
        .keys(Object.keys(data))
        .value((d, key) => {
            for (let i = 0; i < d.values.length; i++) {
                if (d.values[i].genre === key) {
                    return d.values[i].value
                }
            }
        })
        (newData);


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
        .domain([0, 2000])
        .range([height, 0]);

    graph
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xAxis));

    graph
        .append("g")
        .call(d3.axisLeft(yAxis));

    const area = d3.area()
        .x((d) => xAxis(new Date(d.data.key)))
        .y0(d => yAxis(d[0]))
        .y1((d) => yAxis(d[1]));

    graph
        .selectAll("mylayers")
        .data(stacked)
        .enter()
        .append("path")
        .attr("fill", "#cce5df")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr("d", area)
}