// проверка складов при попытке оформления заказа (используется на странице заказа)
$(document.body).on('click', '[name=toOrder]', function(e) {
	if(storage.counterToChangeCountProduct > 0) {
		e.stopPropagation();
		e.preventDefault();
	}
});

// Пересчет цены и количества (используется в корзине и странице заказа)
$(document.body).on('click', '.product-cart .cart_form .amount_change .up, .product-cart .cart_form .amount_change .down', function() {
	var request =	$(this).parents('.cart-wrapper').find('form').formSerialize();
	updateCartCount(request);
	$(this).parents('.cart-wrapper').find('form .amount_change .up').prop('disabled', true).addClass('disabled');
	$(this).parents('.cart-wrapper').find('form .amount_change .down').prop('disabled', true).addClass('disabled');
	return false;
});

// ввод количества покупаемого товара в корзине, пересчет корзины (используется в корзине и странице заказа)
$(document.body).on('blur', '.product-cart .amount_input', function() {
	var count = $(this).val();
	if (count == 0) {
		$(this).parents('tr').find('.price-cell .deleteItemFromCart').trigger('click');
	} else {
		var request =	$(this).parents('.cart-wrapper').find('form').formSerialize();
		updateCartCount(request);
	}
	$(this).parents('.cart-wrapper').find('form .amount_change .up').prop('disabled', true).addClass('disabled');
	$(this).parents('.cart-wrapper').find('form .amount_change .down').prop('disabled', true).addClass('disabled');
	return false;
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

// функция пересчёта корзины при изменении количества товаров (используется в корзине и странице заказа)
function updateCartCount(request) {
	if (typeof storage == 'undefined') {
		window.storage = {
			counterToChangeCountProduct: 0,
			changeNameButtonOrder: false,
		};
	}
	storage.counterToChangeCountProduct++;
	storage.changeNameButtonOrder = true;
	setTimeout(function() {
		if(storage.changeNameButtonOrder) {
			$('[name=toOrder]').val(locale.waitCalc);
			storage.changeNameButtonOrder = false;
		}
	}, 500);

	$.ajax({
	type: "POST",
		url: mgBaseDir + "/cart",
		data: "refresh=1&count_change=1&" + request,
		dataType: "json",
		cache: false,
		success: function(response) {
			if (response.deliv && response.curr) {
				var i = 0;
				response.deliv.forEach(function(element, index, arr) {
					$('.delivery-details-list li:eq('+i+') .deliveryPrice').html('&nbsp;'+element);
					if ($('.delivery-details-list input[type=radio]:eq('+i+')').is(':checked')) {
						if (element == 0) {
							$('.summ-info .delivery-summ').html('');
						}
						else{
							$('.summ-info .delivery-summ').html(locale.delivery+'<span class="order-delivery-summ">'+element+' '+response.curr+'</span>');
						}
					}
					i++;
				});
			}
			storage.counterToChangeCountProduct--;
			if(storage.counterToChangeCountProduct == 0) {
				$('[name=toOrder]').val(locale.checkout);
				storage.changeNameButtonOrder = false;
			}
			if (response.data) {
				var dataSmalCart = '';
				response.data.dataCart.forEach(function(element, index, arr) {
					if (parseInt(element.variantId) < 1) {var varBlock = '';} else{var varBlock = '[data-variant=' + (element.variantId)+ ']';}
					var tr = $('.cart-wrapper .cart-table td .deleteItemFromCart[data-delete-item-id='+element.id+'][data-property='+element.property+']'+varBlock).parents('tr');
					var prod = $('.cart-wrapper .cart-table input[name="property_'+element.id+'[]"][value='+element.property+']');
					
						dataSmalCart += '<tr>\
						<td class="small-cart-img">\
							<a href="' + mgBaseDir + '/' + (element.category_url ? element.category_url : 'catalog') + '/'
							+ element.product_url + '"><img src="' + element.image_url_new + '" alt="'
							+ element.title + '" alt="" /></a>\
						</td>\
							<td class="small-cart-name">\
								<ul class="small-cart-list">\
									<li><a href="' + mgBaseDir + '/' + (element.category_url ? element.category_url : 'catalog') + '/'
									+ element.product_url + '">' + element.title + '</a><span class="property">'
									+ element.property_html + '</span></li>\
									<li class="qty">x' + element.countInCart + ' <span>'
									+ element.priceInCart + '</span></li>\
								</ul>\
							</td>\
							<td class="small-cart-remove"><a href="#" class="deleteItemFromCart" title="Удалить" data-delete-item-id="' + element.id
						+ '" data-property="' + element.property
						+ '" data-variant="' + element.variantId
						+ '">&#215;</a></td>\
						</tr>';			
					if(tr.find('.cart_form input[name="item_'+element.id+'[]"]').val() > element.countInCart) {
						tr.find('.cart_form .maxCount').detach();
						tr.find('.cart_form').append('<span class="maxCount" style="display:block;text-align:center;">'+locale.MAX+': '+element.countInCart+'</span>');
					} else {
						tr.find('.cart_form .maxCount').detach();
					}	
					tr.find('.cart_form .up, .cart_form .down').prop('disabled', false).removeClass('disabled');
					tr.find('.cart_form input[name="item_'+element.id+'[]"]').val(element.countInCart);
					tr.find('.price-cell').html(element.priceInCart);
				 
			});
			if ($('.small-cart-table tbody').length) {
				$('.small-cart-table tbody').html(dataSmalCart);
			}
			else{
				$('.small-cart-table').html(dataSmalCart);
			}
			$('.total .total-sum span').text(response.data.cart_price_wc);
			$('.pricesht').text(response.data.cart_price);
			$('.countsht').text(response.data.cart_count);
			$('.cart-wrapper .total-sum strong').text(response.data.cart_price_wc);
		}
		}
	});
}