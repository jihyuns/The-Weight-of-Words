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
        .attr("class", "track-overlay");
        // .call(d3.drag()
        //     .on("start.interrupt", function() { slider.interrupt(); })
        //     .on("start drag", function() { 
        //         console.log(x.invert(d3.event.x));
        //         hue(x.invert(d3.event.x)); 
        //     }));

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

function hue(h, h_) {
    handle.attr("cx", x(h));
    // div.style("background-color", d3.rgb(h, 0, 100-h, 0.5));
    div.style("background-color", d3.hsl(h_, h*0.01, 0.75));
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

$('#comments').keyup(function() {
    var comment = document.getElementById("comments").value;

    if(comment != '') {
        $.ajax({
            url: 'http://3.134.91.249:8000/estimator',
            type: "POST",
            data: JSON.stringify({'comments': comment}),
            contentType: "application/json",
            success: function(data) {

                if(data.result == 1) {
                    LoadingBgdColor(data.score, 200);
                } else {
                    LoadingBgdColor(data.score, 0);
                }
            },
            error: function() {
                console.log("에러 발생");
            }
        });
    }
});

var cmt_;

$('#comments').keydown(function() {
    cmt_ = document.getElementById("comments").value;
    console.log(cmt_);
})


var referrer = document.referrer;
console.log(referrer);



function input_Comments() {
    LoadingWithMask()

    // var comment = document.getElementById("comment").value;

    $.ajax({
        url: 'http://3.134.91.249:8000/estimator',
        type: "POST",
        data: JSON.stringify({'comments': cmt_}),
        contentType: "application/json",
        success: function(data) {

            if(data.result == 1) {
                LoadingBgdColor(data.score, 200);
            } else {
                LoadingBgdColor(data.score, 0);
            }
            closeLoadingWithMask();

            document.getElementsByClassName("discription")[0].style.visibility = 'hidden';
            document.getElementsByClassName("text")[0].style.visibility = 'visible';

            if(data.result == 1) {
                document.getElementById("predict").innerHTML = "긍정적입니다."
            } else {
                document.getElementById("predict").innerHTML = "부정적입니다."
            }

            document.getElementById("percent").innerHTML = data.score + '%';

            location.href = referrer + '?' + 'true' + ':' + escape(cmt_);    // escape(): 한글깨짐방지
        },
        error: function() {
            console.log("에러 발생");
        }
    })
}

function LoadingBgdColor(n, h_) {
    slider.transition() // Gratuitous intro!
    .duration(750)
    .tween("hue", function() {
        var i = d3.interpolate(0, n);
        return function(t) { hue(i(t), h_); };
    });
}

function LoadingWithMask() {
    // 화면의 너비와 높이를 구한다.
    var maskWidth = window.document.body.clientWidth;
    var maskHeight = $(document).height();

    // 화면에 출력할 마스크를 설정
    var mask       ="<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
    var loadingImg ='';
    loadingImg += "<iframe src='https://giphy.com/embed/3o7bu3XilJ5BOiSGic' width='100' height='100' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>"

    // 화면에 레이어 추가
    $('body').append(mask)

    // 마스크의 너비와 높이를 화면의 것으로 만들어 전체 화면을 채운다.
    $('#mask').css({
        'width': maskWidth,
        'height': maskHeight,
        'opacity': '0.3'
    });

    // 마스크 표시
    $('#mask').show();

    // 로딩중 이미지 표시
    $('#mask').append(loadingImg);
    $('#loadingImg').show();
}

function closeLoadingWithMask() {
    $('#mask, #loadingImg').hide();
    $('#mask, #loadingImg').empty();
}


