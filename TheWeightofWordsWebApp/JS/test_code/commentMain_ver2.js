/******** With Popup code ********/

var hue, sat, light;

// CSV data set
d3.csv("../data/sortingData/comments_Entertainment_sorting.csv", function(error, data) {
    var click = 0;
    var dataSet = [];
    for(var i=0; i<data.length-82+29+29+2; i++) {
        dataSet.push(data[i]);
    }

    /********  Drawing Comment Graph ********/
    var grid = d3.select("#myApp")
        .selectAll(".block")
        .data(dataSet)
        .enter()
        .append("div")
        .attr("class", "block")
        .attr("id", function(d) {
            return d.index;
        })
        // .attr("li", function(d) {
        //     return d.comments;
        // })
        .style("background-color", function(d) {
            if(d.predict == 1) {
                hue = 250;
            } else {
                hue = 10;
            }

            sat = d.percent * 0.01;

            var oldRange = 3035;
            var newRange = 0.4;
            var oldMin = 0;
            var newMin = 0.6;
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

    $('.block').hover(function(e) {
        console.log('test success');

        var sWidth = window.innerWidth;
        var sHeight = window.innerHeight;
        
        var oWidth = $('#popupLayer').width();
		var oHeight = $('#popupLayer').height();

        // 레이어가 나타날 위치를 셋팅한다.
		var divLeft = e.clientX + 10;
        var divTop = e.clientY + 5;

        // 레이어가 화면 크기를 벗어나면 위치를 바꾸어 배치한다.
		if( divLeft + oWidth > sWidth ) divLeft -= oWidth;
		if( divTop + oHeight > sHeight ) divTop -= oHeight;

		// 레이어 위치를 바꾸었더니 상단기준점(0,0) 밖으로 벗어난다면 상단기준점(0,0)에 배치하자.
		if( divLeft < 0 ) divLeft = 0;
		if( divTop < 0 ) divTop = 0;
        
        console.log(divLeft, divTop);

        $('#popupLayer').css({
			"top": divTop,
			"left": divLeft,
			"position": "absolute"
		}).show();
    });
})

function addData() {
    var tmp = location.href.split("?");
    var tmp_ = tmp[1];

    // 한글 깨짐 방지
    var data = unescape(tmp_)
    
    console.log(data);

    var data = "<div class='block' id='1' li='" + data + "'></div>";

    $('#myApp').append(data);
}

// addData();