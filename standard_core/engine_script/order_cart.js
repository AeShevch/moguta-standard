// проверка складов при попытке оформления заказа (используется на странице заказа)
$(document.body).on('click', '[name=toOrder]', function(e) {
	if(storage.counterToChangeCountProduct > 0) {
		e.stopPropagation();
		e.preventDefault();
	}
});



// делает поля почты и телефона обязательными, если задано в настройках (используется на странице заказа)
if (edition != 'gipermarket') {
	if((requiredFields === 'true' || requiredFields === true) && location.pathname.indexOf('/order') > -1) {
		$('[name=email], [name=phone]').attr('required', true);
	} else {
		$('[name=email], [name=phone]').attr('required', false);
	}
}

// костыль для верстки выбранного чекбокса доставки при перезагрузке страницы (используется на странице заказа)
$('[name="delivery"][checked]').parents('label').addClass('active');

