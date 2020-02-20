import * as d3 from "d3"
import barChart from './barchart'

barChart('#barchart-year', '1999');
const body = d3.select("body");
body
    .append("h1")
    .text("Hello from d3")
