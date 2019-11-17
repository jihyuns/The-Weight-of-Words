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

    console.log(comment);
}