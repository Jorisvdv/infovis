import lineChartData from "../../../../data/data/lineplot_object"

import LineChart from "./line_chart";

// only show the features selected
function updateLineChart() {
    const data = Array.from(lineChartData).filter(item => {
        const checkbox = document.getElementById(item.key)
        return checkbox ? checkbox.checked : false;
    })

    lineChart.update(data)
}

Array.from(document.getElementsByClassName("line-chart-inputs")[0].children).forEach(element => {
    element.children[0].addEventListener("click", updateLineChart)
})


const lineChart = new LineChart("#line-chart", null);
lineChart.init()
updateLineChart()

