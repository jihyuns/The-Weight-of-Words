var hue, sat, light;

a = document.getElementById("myApp").style.width
console.log(window.innerWidth);

// CSV data set
d3.csv("./data/sortingData/comments_Entertainment(sort).csv", function(error, data) {
    var click = 0;
    var dataSet = [];
    for(var i=0; i<data.length; i++) {
    // for(var i=0; i<data.length; i++) {
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
        .attr("blink", function(d) {
            if(d.index == 387 || d.index==500 || d.index==589) {
                return d.wholelike;
            }
        })
        .style("width", window.innerWidth/36)
        .style("height", window.innerHeight/20)
        .style("border", function(d) {
            if(d.index == 387 || d.index==500 || d.index==589) {
                return '3px solid yellow';
            } 
            else {
                return '0.1px solid black';
            }
        })
        .style("cursor", function(d) {
            if(d.index == 387 || d.index==500 || d.index==589) {
                return 'pointer';
            }
        })
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

    $('#500').click(function(e) {

        var sWidth = window.innerWidth;
        var sHeight = window.innerHeight;
        
        var oWidth = $('#popupLayer_1').width();
        var oHeight = $('#popupLayer_1').height();

        // 레이어가 나타날 위치를 셋팅한다.
        var divLeft = e.clientX + 10;
        var divTop = e.clientY + 5;

        // 레이어가 화면 크기를 벗어나면 위치를 바꾸어 배치한다.
        if( divLeft + oWidth > sWidth ) divLeft -= oWidth;
        if( divTop + oHeight > sHeight ) divTop -= oHeight;

        // 레이어 위치를 바꾸었더니 상단기준점(0,0) 밖으로 벗어난다면 상단기준점(0,0)에 배치하자.
        if( divLeft < 0 ) divLeft = 0;
        if( divTop < 0 ) divTop = 0;

        $('#popupLayer_1').css({
            "top": divTop,
            "left": divLeft,
            "position": "absolute"
        }).show();
    });

    $('#387').click(function(e) {

        var sWidth = window.innerWidth;
        var sHeight = window.innerHeight;
        
        var oWidth = $('#popupLayer_2').width();
        var oHeight = $('#popupLayer_2').height();

        // 레이어가 나타날 위치를 셋팅한다.
        var divLeft = e.clientX + 10;
        var divTop = e.clientY + 5;

        // 레이어가 화면 크기를 벗어나면 위치를 바꾸어 배치한다.
        if( divLeft + oWidth > sWidth ) divLeft -= oWidth;
        if( divTop + oHeight > sHeight ) divTop -= oHeight;

        // 레이어 위치를 바꾸었더니 상단기준점(0,0) 밖으로 벗어난다면 상단기준점(0,0)에 배치하자.
        if( divLeft < 0 ) divLeft = 0;
        if( divTop < 0 ) divTop = 0;

        $('#popupLayer_2').css({
            "top": divTop,
            "left": divLeft,
            "position": "absolute"
        }).show();
    });

    $('#589').click(function(e) {

        var sWidth = window.innerWidth;
        var sHeight = window.innerHeight;
        
        var oWidth = $('#popupLayer_3').width();
        var oHeight = $('#popupLayer_3').height();

        // 레이어가 나타날 위치를 셋팅한다.
        var divLeft = e.clientX + 10;
        var divTop = e.clientY + 5;

        // 레이어가 화면 크기를 벗어나면 위치를 바꾸어 배치한다.
        if( divLeft + oWidth > sWidth ) divLeft -= oWidth;
        if( divTop + oHeight > sHeight ) divTop -= oHeight;

        // 레이어 위치를 바꾸었더니 상단기준점(0,0) 밖으로 벗어난다면 상단기준점(0,0)에 배치하자.
        if( divLeft < 0 ) divLeft = 0;
        if( divTop < 0 ) divTop = 0;

        $('#popupLayer_3').css({
            "top": divTop,
            "left": divLeft,
            "position": "absolute"
        }).show();
    });
})

function closeLayer( obj ) {
	$(obj).parent().parent().hide();
}
