



// добавление в избранное
$('body').on('click', '.mg-add-to-favorites', function() {
	obj = $(this);
	$.ajax({
		type: "POST",
		url: mgBaseDir + "/favorites/",
		data: {'addFav':'1','id':$(this).data('item-id')},
		dataType: "json",
		cache: false,
		success: function(response) {
			obj.hide();
			obj.parent().find('.mg-remove-to-favorites').show();
			$('.favourite .favourite__count').html('('+response+')');

			$('.j-favourite').removeClass('j-favourite--open');
			setTimeout(function() {
				$('.j-favourite').addClass('j-favourite--open');
			},0);
		}
	});
});

// удаление из избранного
$('body').on('click', '.mg-remove-to-favorites', function() {
	obj = $(this);
	$.ajax({
		type: "POST",
		url: mgBaseDir + "/favorites/",
		data: {'delFav':'1','id':$(this).data('item-id')},
		dataType: "json",
		cache: false,
		success: function(response) {
			obj.hide();
			obj.parent().find('.mg-add-to-favorites').show();
			$('.favourite .favourite__count').html('('+response+')');
		}
	});
});

// сброс фильтров (используется в каталоге в форме фильтров)
$('body').on('click', '.refreshFilter', function() {
    location.href = $(this).data('url');
});