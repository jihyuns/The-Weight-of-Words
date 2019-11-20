// import * as tf from '@tensorflow/tfjs';

/********** Slider **********/
var div = d3.select("#myApp1")

var svg = d3.select("svg"),
    margin = {right: 50, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height");

var x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width])
            .clamp(true);

var slider = svg.append("g")
                .attr("class", "slider")
                .attr("transform", "translate(" + margin.left + "," + height/2 + ")");

slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() { hue(x.invert(d3.event.x)); }));

slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + -10 + ")")
        .selectAll("text")
        .data(x.ticks(10))
        .enter().append("text")
        .attr("x", x)
        .attr("text-anchor", "middle")
        .text(function(d) { return d + "%"; });

var handle = slider.insert("circle", ".track-overlay")
                    .attr("class", "handle")
                    .attr("r", 5);

// slider.transition() // Gratuitous intro!
//     .duration(750)
//     .tween("hue", function() {
//         var i = d3.interpolate(0, 70);
//         return function(t) { hue(i(t)); };
//     });

function hue(h) {
    handle.attr("cx", x(h));
    div.style("background-color", d3.hsl(h, 0.8, 0.8));
}


$(document).ready(function() {
    var placeholderTarget = $('.commentBox input[type="text"]');

    // Focus On
    placeholderTarget.on('focus', function() {
        $(this).siblings('label').fadeOut('fast');
    });

    // Focus Out
    placeholderTarget.on('focusout', function() {
        if($(this).val() == '') {
            $(this).siblings('label').fadeIn('fast');
        }
    });
});

function input_Comments() {
    var comment = document.getElementById("comment").value;

    $.ajax({
        url: 'http://3.134.91.249:8000/estimator',
        type: "POST",
        data: JSON.stringify({'comments': comment}),
        contentType: "application/json",
        success: function(data) {
            // console.log(commentData.result);
            // console.log(commentData.score);

            document.getElementsByClassName("discription")[0].style.visibility = 'hidden';
            document.getElementsByClassName("text")[0].style.visibility = 'visible';

            if(data.result == 1) {
                document.getElementById("predict").innerHTML = "긍정적입니다."
            } else {
                document.getElementById("predict").innerHTML = "부정적입니다."
            }

            document.getElementById("percent").innerHTML = data.score + '%';
        },
        error: function() {
            console.log("에러 발생");
        }
    })
}


