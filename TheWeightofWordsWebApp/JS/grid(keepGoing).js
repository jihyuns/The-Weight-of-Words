var width = window.innerWidth/28;
var height = window.innerHeight/25;
var hue, sat, light;

// CSV data set
d3.csv("data/sortingData/comments_Entertainment_sorting.csv", function(error, data) {
    var dataSet = [];
    for(var i=0; i<data.length-82+29+29+2; i++) {
        dataSet.push(data[i]);
    }

    // Drawing Graph
    d3.select("#myApp")
        .selectAll(".block")
        .data(dataSet)
        .enter()
        .append("div")
        .attr("class", "block")
        .attr("id", function(d) {
            return d.index;
        })
        .attr("li", function(d) {
            return d.comments;
        })
        .style("background-color", function(d) {
            if(d.predict == 1) {
                hue = 250;
            } else {
                hue = 10;
            }

            sat = d.percent * 0.015;

            var oldRange = 3035;
            var newRange = 0.4;
            var oldMin = 0;
            var newMin = 0.5
            var _oldRange = 20;
            var _newRange = 0.1;
            var _oldMin = -20;
            var _newMin = 0.35;

            if(d.truelike > 0) {
                // light값 범위 0.5 ~ 1
                light = (((d.truelike - oldMin)*newRange)/oldRange) + newMin;
            } else {
                // light값 범위 0 ~ 0.5
                light = ((((d.truelike - _oldMin)*_newRange*(-1))/_oldRange) + _newMin);
            }

            return d3.hsl(hue, sat, light);
        });

    var svg = d3.select("#slider")
                    .style("height", window.innerHeight);
                    // .style("background-color", 'red');

    var margin = {right: 0.5, left: 7};

    var y = d3.scaleLinear()
                .domain([0, 100])
                .range([0, window.innerHeight])
                .clamp(true);

    var slider = svg.select("svg")
            .append("g")
            .attr("class", "slider_")
            .attr("transform", "translate(" + margin.left + "," + height/2 + ")");

    slider.append("line")
            .attr("class", "track")
            .attr("y1", '0')
            .attr("y2", y.range()[1])
            .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
            .attr("class", "track-inset")
            .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
            .attr("class", "track-overlay")
            .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() { timeArrange(y.invert(d3.event.y)); }));

    var handle = slider.insert("circle", ".track-overlay")
                        .attr("class", "handle")
                        .attr("r", 7);

    function timeArrange(t) {
        handle.attr("cy", y(t));
    }
})