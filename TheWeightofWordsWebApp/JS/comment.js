// import * as tf from '@tensorflow/tfjs';

/********** Slider **********/
var div = d3.select("#myApp1")

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

var comment;

$('#comments').keyup(function() {
    comment = document.getElementById("comments").value;

    if(comment != '') {
        $.ajax({
            url: 'http://3.134.91.249:8000/estimator',
            type: "POST",
            data: JSON.stringify({'comments': comment}),
            contentType: "application/json",
            success: function(data) {
                if(data.result == 0 && data.score > 60 && data.score <= 80) {
                    document.getElementById('sirenImg').style.visibility = 'visible';
                    document.getElementById('sirenImg_').style.visibility = 'visible';
                } else {
                    document.getElementById('sirenImg').style.visibility = 'hidden';
                    document.getElementById('sirenImg_').style.visibility = 'hidden';
                }

                if(data.result == 0 && data.score > 80) {
                    document.getElementById('sirenAnim').style.visibility = 'visible';
                    document.getElementById('sirenAnim_').style.visibility = 'visible';
                } else {
                    document.getElementById('sirenAnim').style.visibility = 'hidden';
                    document.getElementById('sirenAnim_').style.visibility = 'hidden';
                }

                console.log(data);
            },
            error: function() {
                console.log("에러 발생");
            }
        });
    }
});

var referrer = document.referrer;
console.log(referrer);

function input_Comments() {
    LoadingWithMask()

    $.ajax({
        url: 'http://3.134.91.249:8000/estimator',
        type: "POST",
        data: JSON.stringify({'comments': comment}),
        contentType: "application/json",
        success: function(data) {
            // escape(): 한글깨짐방지
           location.href = referrer + '?' + data.result + ':' + data.score + ',' + escape(comment);    
        },
        error: function() {
            console.log("에러 발생");
        }
    })
}

function LoadingWithMask() {
    // 화면의 너비와 높이를 구한다.
    var maskWidth = window.document.body.clientWidth;
    var maskHeight = $(document).height();

    // 화면에 출력할 마스크를 설정
    var mask       ="<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
    var loadingImg ='';
    loadingImg += "<iframe id='load' src='https://giphy.com/embed/3o7bu3XilJ5BOiSGic' width='100' height='100' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>"

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


