var hue, sat, light;

// CSV data set
d3.csv("../data/sortingData/comments_Politics(sort).csv", function(error, data) {
    var click = 0;
    var dataSet = [];
    for(var i=0; i<data.length; i++) {
        dataSet.push(data[i]);
    }

    /********  Drawing Comment Graph ********/
    var grid = d3.select("#politicsApp")
        .selectAll(".block")
        .data(dataSet)
        .enter()
        .append("div")
        .attr("class", "block")
        .attr("id", function(d) {
            return d.index;
        })
        .attr("comment-Txt", function(d) {
            if(d.predict == 1 || d.percent <= 50 || d.truelike >= 0) {
                return d.comments;
            }
        })
        .attr("comment-Txt-1", function(d) {
            if(d.predict==0 && d.percent > 50 && d.truelike < 0) {
                return d.comments;
            }
        })
        .attr("blink", function(d) {
            if(d.wholelike > 1000 && d.truelike > 100) {
                return d.wholelike;
            }
        })
        .style("border", "0.1px solid black")
        .style("background-color", function(d) {
            
            if(d.predict == 1) {
                // hue값 범위 100 ~ 200
                hue = Math.floor(d.percent) + 100;
                // console.log(hue);
            } else if(d.predict == 0) {
                console.log(d.percent);
                // hue값 범위 0 ~ 100
                hue = 100 - Math.floor(d.percent);
            }

            sat = Math.floor(d.percent) * 0.01;

            var oldRange = 3035;
            var newRange = 0.5;
            var oldMin = 0;
            var newMin = 0.6;
            var _oldRange = 20;
            var _newRange = 0.15;
            var _oldMin = -20;
            var _newMin = 0.3;

            if(d.truelike > 0) {
                // light값 범위 0.5 ~ 1
                light = (((d.truelike - oldMin)*newRange)/oldRange) + newMin;
            } else {
                // light값 범위 0 ~ 0.5
                light = ((((d.truelike - _oldMin)*_newRange*(-1))/_oldRange) + _newMin);
            }

            return d3.hsl(hue, sat, light);
        });

    /********  Drawing Slider for sorting with time ********/
    var div = d3.select("#slider")
                    // .style("height", window.innerHeight)
                    .style("background-color", 'red');

    var svg = d3.select("svg"),
        margin = {right: 0, left: 8},
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var y = d3.scaleLinear()
                .domain([0, 100])
                .range([0, window.innerHeight])
                .clamp(true);

    var slider = svg.append("g")
            .attr("class", "slider_")
            .attr("transform", "translate(" + margin.left + "," + 10 + ")");

    slider.append("line")
            .attr("class", "track")
            .attr("y1", y.range()[0])
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

function addData() {
    var data;

    var tmp = location.href.split("?");
    var tmp_ = tmp[1].split(":");
    var pre = tmp_[0];

    var tmp_1 = tmp_[1].split(",");
    var per = tmp_1[0];
    var cmt = unescape(tmp_1[1]);    // 한글 깨짐 방지

    if(pre == 0) {

        data = "<div class='block' id='new' comment-Txt='" + cmt + "'\
            style='border: 0.1px solid black; background-color: " + d3.hsl(100 - (Math.floor(per)), Math.floor(per)*0.01, 0.5) + ";'></div>";
    } else {
        data = "<div class='block' id='new' comment-Txt='" + cmt + "'\
                style='border: 0.1px solid black; background-color: " + d3.hsl(100 + (Math.floor(per)), Math.floor(per)*0.01, 0.5) + ";'></div>";
    }

    $('#politicsApp').append(data);
}

addData();
