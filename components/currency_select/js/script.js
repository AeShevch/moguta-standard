$(document).ready(function () {
    var currBtn = $('#js-currency-select');

    $('body').on('change', currBtn, function () {
        $.ajax({
            type: "GET",
            url: mgBaseDir + "/ajaxrequest",
            data: {
                userCustomCurrency: currBtn.val()
            },
            success: function (response) {
                window.location.reload(true);
            }
        });
    });
});
