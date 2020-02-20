import * as d3 from "d3"
import barchartData from "../../../../data/year_distribution_per_edition"


export default (id, year) => {
  const data = barchartData[year];
  console.log(id, year, data);

  const margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  const x = d3.scaleBand()
      .rangeRound([0, width]);

  const y = d3.scaleLinear()
      .range([height, 0]);

  const xAxis = d3.axisBottom(x);
  //
  const yAxis = d3.axisLeft(y);

  const svg = d3
      .select(id)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) {
      return d.year;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d.freq;
    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return x(d.year);
        })
        .attr("width", 40)
        .attr("y", function (d) {
          return y(d.freq);
        })
        .attr("height", function (d) {
          return height - y(d.freq);
        });

      svg.selectAll("text.bar")
          .data(data)
          .enter().append("text")
          .attr("class", "bar")
          .attr("text-anchor", "middle")
          .attr("x", function(d) {return x(d.year) + 20;})
          .attr("y", function(d) {return y(d.freq) - 5;})
          .text(function(d) {return d.freq;});


      // Used to update y axis to new data
    const yAxisHandleForUpdate = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    yAxisHandleForUpdate.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("Value");

    // Dropdown


    const updateBars = function(data) {
        console.log("data", data);
        //y.domain(d3.extent(data.freq));
        //yAxisHandleForUpdate.call(yAxis);

        y.domain([0, d3.max(data, function (d) {
          return d.freq;
        })]);

        //d3.select("y axis").call(y);

        const bars = svg.selectAll(".bar").data(data);

        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.year);
            })
            .attr("width", 40)
            .attr("y", function (d) {
                return y(d.freq);
            })
            .attr("height", function (d) {
                return height - y(d.freq);
            });

        bars.transition()
            .duration(250)
            .attr("y", function (d, i) {
                return y(d.freq);
            })
            .attr("height", function (d, i) {
                return height - y(d.freq);
            });

        const bars_text = svg.selectAll("text.bar").data(data, y);

        bars_text
          .enter().append("text")
          .attr("class", "bar")
          .attr("text-anchor", "middle")
          .attr("x", function(d) {return x(d.year) + 20;})
          .attr("y", function(d) {return y(d.freq) - 5;})
          .text(function(d) {return d.freq;});

        bars_text.transition()
            .duration(250);


        bars_text.exit().remove();
        bars.exit().remove();
    };

    const dropdownChange = function() {
          const newYear = d3.select(this).property('value');
          const newData = barchartData[parseInt(newYear)];
          console.log(newData, newYear);
          updateBars(newData);
    };

    const dropdown = d3
        .select(id)
        .insert("select", "svg")
        .on("change", dropdownChange);

    dropdown.selectAll("option")
        .data(Object.keys(barchartData))
        .enter()
        .append("option")
        .attr("value", function(d) { return d;})
        .text(function (d) {return d});
};