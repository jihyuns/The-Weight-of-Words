var width = window.innerWidth/28;
var height = window.innerHeight/25;

console.log(width);
console.log(height);

// var grid = d3.select("#myApp")
//     .append("svg")
//     .attr({
//         "width": '100%',
//         "height": '100%'
//     });

// CSV data set
d3.csv("data/comments_Entertainment_final.csv", function(error, data) {
    var dataSet = [];
    for(var i=0; i<data.length-47; i++) {
        dataSet.push(data[i]);
    }

    // console.log(dataSet);

    // Drawing Graph
    d3.select("#myApp")
        .selectAll(".block")
        .data(dataSet)
        .enter()
        .append("div")
        .attr("class", "block")
        .attr("id", function(d) {
            return d.index;
        });
        // .style('background-color', d => (d < 5 ? '#FE4A49' : '#CCCCCC'));
})