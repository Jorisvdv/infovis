import * as d3 from "d3"
import lineChartData from "../../../../data/data/lineplot"

import LineChart from "./line_chart";

const lineChart = new LineChart("#line-chart", null);

lineChart.init()
lineChart.update(lineChartData)

