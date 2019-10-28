//эмуляция радиокнопок в форме характеристик продукта (страница товара, миникарточка, корзина, страница заказа)
$(document.body).on('change', '.property-form input[type=radio]', function() {
	$(this).parents('p').find('input[type=radio]').prop('checked', false);
	$(this).prop('checked', true);
	$(this).parents('p').find('label').removeClass('active');
	if ($(this).parents('p').length) {
		$(this).parent().addClass('active');
	}
});

//эмуляция радиокнопок в форме характеристик продукта (страница товара, миникарточка, корзина, страница заказа)
$(document.body).on('change', '.property-form input[type=checkbox]', function() {
	$(this).parent().toggleClass('active');
});

//пересчет цены товара аяксом (страница товара, миникарточка, корзина, страница заказа)
$(document.body).on('change', '.property-form input, .property-form select , .product-wrapper .block-variants select, .cart_form .amount_input', function() {
	var request = $('.buy-block form').formSerialize();
	var priceBlock = '.product-status-list .price';
	var productList = $('.product-status');

	if ($(this).parents('.product-wrapper').length) {// для вызова из каталога
		priceBlock = $(this).parents('.product-wrapper').find('.product-price');
		request = $(this).parents('.product-wrapper').find('.property-form').formSerialize();
		productList = $(this).parents('.product-wrapper');
	}

	if ($(this).parents('.mg-compare-product').length) {// для вызова из сравнений		
		priceBlock = $(this).parents('.mg-compare-product').find('.price');
		request = $(this).parents('.mg-compare-product').find('.property-form').formSerialize();
		request += '&remInfo=false';
		productList = $(this).parents('.mg-compare-product');
	}
	var tempThis = $(this);
	// Пересчет цены						
	$.ajax({
		type: "POST",
		url: mgBaseDir + "/product/",
		data: "calcPrice=1&" + request,
		dataType: "json",
		cache: false,
		success: function(response) {

			if(response.data.wholesalesTable != undefined) {
				$('.wholesales-data').html(response.data.wholesalesTable);
			}

			if(response.data.productOpFields != undefined) {
				tempThis.parents('.property-form')
						.parents('.product-details-block,.product-wrapper')
						.find('.product-opfields-data')
						.html(response.data.productOpFields);
			}

			window.actionInCatalog = response.data.actionInCatalog;

			productList.find('.rem-info').hide();
			
			productList.find('.buy-container.product .hidder-element').hide();
			if ($('.buy-block .count').length > 0) {
					$('.buy-container .hidder-element').hide();
			}	
			if ('success' == response.status) {
				if ($(priceBlock).find('.product-default-price').length) {
					$(priceBlock).find('.product-default-price').html(response.data.price);
				} else {
					$(priceBlock).html(response.data.price);
				} 
				$(priceBlock).find('.product-default-price').html(response.data.price);
				productList.find('.code').text(response.data.code);
				var message = '';
				if (response.data.title) {
					message = locale.countMsg1 + response.data.title.replace("'", '"') + locale.countMsg2 + response.data.code + locale.countMsg3;
				}
				productList.find('.rem-info a').attr('href', mgBaseDir + '/feedback?message=' + message);
				productList.find('.code-msg').text(response.data.code);
				var val = response.data.count;
				if (val != 0) {

					$('.depletedLanding').hide();
					$('.addToOrderLanding').show();

					productList.find('.rem-info').hide();
					productList.find('.buy-container .hidder-element').show();
					if ($('.buy-block .count').length >0) {
						$('.buy-container .hidder-element').show();
					}	
					productList.find('.buy-container.product').show();						
					if (!productList.find('.buy-container .hidder-element a:visible').hasClass('addToCart')) {
						if ('false' == window.actionInCatalog) {
							productList.find('.buy-container .hidder-element .product-info').show();
							productList.find('.buy-container .hidder-element .addToCart').hide();
						}
						else{
							productList.find('.buy-container .hidder-element .product-info').hide();
							productList.find('.buy-container .hidder-element .addToCart').show();
						}
						
						productList.find('.buy-container .hidder-element').show();
					}
				} else {
					$('.depletedLanding').show();
					$('.addToOrderLanding').hide();

					productList.find('.rem-info').show();
					if ($('.buy-block .count').length >0) {
						$('.buy-container .hidder-element').hide();
					}	
					productList.find('.buy-container.product').hide();						
					if (productList.find('.buy-container .hidder-element a:visible').hasClass('addToCart')) {
						productList.find('.buy-container .hidder-element .product-info').show();
						productList.find('.buy-container .hidder-element .addToCart').hide();
						// productList.find('.buy-container .hidder-element:first').hide();
					}
				}
				if (response.data.count_layout) {
					if (productList.find('.count').length>0) {
						productList.find('.count').parent().html(response.data.count_layout);
					} else {
						productList.find('.in-stock').parent().html(response.data.count_layout);
					}
				 
				} else {
					if ((val == '\u221E' || val == '' || parseFloat(val) < 0)) {
						val = '<span itemprop="availability" class="count"><span class="sign">&#10004;</span>'+locale.countInStock+'</span>';
						productList.find('.rem-info').hide();
					} else {
						val = locale.remaining+'Остаток: <span itemprop="availability" class="label-black count">'+ val+'</span> '+locale.pcs;
					}
					productList.find('.count').parent().html(val);
				}
			 
				val = response.data.old_price;
				if (val != "0 " + currency && val != ' ' + currency) {
					productList.find('.old-price').parents('li').show();
					productList.find('.old-price').parents('.old').show();
				} else {
					productList.find('.old-price').parents('li').hide();
				}

				if (val != "0 " + currency && val != ' ' + currency) {
					productList.find('.old-price').text(response.data.old_price);
				}

				productList.find('.amount_input').data('max-count', response.data.count);

				productList.find('.weight').text(response.data.weightCalc);

				if (parseFloat(productList.find('.amount_input').val()) > parseFloat(response.data.count)) {
					val = response.data.count;
					if ((val == '\u221E' || val == '' || parseFloat(val) < 0)) {
						val = productList.find('.amount_input').val();
					}
					if (val == 0) {
						val = 1;
					}

					productList.find('.amount_input').val(val);
				}
			}
			if(response.data.storage != undefined) {
				maxStorageCount = 0;
				for(var i in response.data.storage) {
					$('.count-on-storage[data-id='+i+']').html(response.data.storage[i]);
					if(response.data.storage[i] > maxStorageCount) maxStorageCount = response.data.storage[i];
				}
				$('.actionBuy .amount_input').data('max-count', maxStorageCount);
			}
		}
	});

	return false;
});

//подстановка картинки варианта вместо картинки товара (страница товара и миникарточка)
$(document.body).on('change', '.block-variants input[type=radio]', function(e) {
	var linkDefaultPreview = '';
	var variantId = '';
	var linkInPreview = '';
	var src = '';
	$(this).parents('tbody').find('tr label').removeClass('active');
	$(this).parents('tr').find('label').addClass('active');
	// обработчик подстановки картинки варианта для страницы с карточкой товара
	if ($('.mg-product-slides').length) {
		// текущая ссылка на главную картинку продукта	
		linkInPreview = $('.mg-product-slides .main-product-slide li a').eq(0).attr('href');
		if (linkDefaultPreview == "") {
			// запоминаем стоящую поумолчанию ссылку на картинку товара
			linkDefaultPreview = linkInPreview;
		}
		// получаем новую ссылку на продукт из картинки варианта
		src = $(this).parents('tr').find('img').attr('src');
		// если она оличается от той что уже установлена в качестве главной
		if (src != linkInPreview) {
			// проверяем есть ли в варианте ссылка на картинку, еси нет то показываем картинку продукта по умолчанию	
			if (!src) {
				src = linkDefaultPreview;
			}
			// меняем ссылку на картинку в модалке, для увеличенного просмотра	
			$('.mg-product-slides .main-product-slide li a').eq(0).attr('href', src.replace('thumbs/30_', ''));
			// меняем главную картинку товара в просмотрщике
			$('.mg-product-slides .main-product-slide li').eq(0).find('.mg-product-image').attr('src', src.replace('thumbs/30_', 'thumbs/70_')).attr('data-magnify-src',src.replace('thumbs/30_', ''));
			// меняем первую картинку товара в ленте просмотрщика
			$('.slides-inner a[data-slide-index=0]').find('img').attr('src', src.replace('thumbs/30_', 'thumbs/70_'));
			// кликаем по первому элементу, чтобы показать картинку в просмотрщике.
			$('.mg-product-slides a[data-slide-index="0"]').click();
			e.stopPropagation();
			e.stopImmediatePropagation();
		}
	} else {
		var obj = $(this).parents('.product-wrapper');
		var count = $(this).data('count');
		if (!obj.length) {
			obj = $(this).parents('.mg-compare-product');
		}
		if (obj.length) {// для вызова из каталога

			//Обнуление дефолтной картинки, если перешли к вариантам другого товара 
			if(!variantId) {
				variantId = $(this).data('id');
			}else{
				var newVariantId = $(this).data('id');
				if(newVariantId != variantId) {
					linkDefaultPreview = "";
					variantId = newVariantId;
				}
			}
			
			// текущая ссылка на главную картинку продукта	
			linkInPreview = obj.find('img[data-transfer="true"]').eq(0).attr('src');
			
			if (linkDefaultPreview == "") {
				// запоминаем стоящую по умолчанию ссылку на картинку товара
				linkDefaultPreview = linkInPreview;
			}
			// получаем новую ссылку на продукт из картинки варианта
			src = $(this).parents('tr').find('img').attr('src');
			// если она отличается от той, что уже установлена в качестве главной
			if (src != linkInPreview) {
				// проверяем есть ли в варианте ссылка на картинку, еси нет то показываем картинку продукта по умолчанию	
				if (!src) {
					src = linkDefaultPreview;
				}
				// меняем ссылку на картинку в модалке, для увеличенного просмотра	
				// $('.mg-product-slides .main-product-slide li a').eq(0).attr('href',src.replace('thumbs/30_', ''));
				// меняем главную картинку товара в просмотрщике		
				obj.find('img[data-transfer="true"]').eq(0).attr('src', src.replace('thumbs/30_', 'thumbs/70_'));
				// меняем первую картинку товара в ленте просмотрщика
				//$('.slides-inner a[data-slide-index=0]').find('img').attr('src',src.replace('thumbs/70_', ''));			
				// кликаем по первому элементу, чтобы показать картинку в просмотрщике.
				//$('.mg-product-slides a[data-slide-index="0"]').click();
			}
		}	 
		var form = $(this).parents('form');
	
		if(form.hasClass('actionView')) {
			return false;
		}
		
		var buttonbuy = $(obj).find('.buy-container .hidder-element a:visible').hasClass('addToCart');
		
		if (count != '0' && !buttonbuy) {
			if ('false' == window.actionInCatalog) {
				$(obj).find('.buy-container .hidder-element .product-info').show();
				$(obj).find('.buy-container .hidder-element .addToCart').hide();
			}
			else{
				$(obj).find('.buy-container .hidder-element .product-info').hide();
				$(obj).find('.buy-container .hidder-element .addToCart').show();
			}
		} else if (count == '0' && buttonbuy == true) {
			$(obj).find('.buy-container .hidder-element .product-info').show();
			$(obj).find('.buy-container .hidder-element .addToCart').hide();
		}
	}
});

//увеличение количества товара (страница товара, миникарточка, корзина, страница заказа)
$(document.body).on('click','.amount_change .up', function() {
	var obj = $(this).parents('.cart_form').find('.amount_input');
	var val = obj.data('max-count');
	if ((val == '\u221E' || val == '' || parseFloat(val) < 0)) {
		obj.data('max-count', 99999);
	}
	var i = obj.val();
	i++;
	if (i > obj.data('max-count')) {
		i = obj.data('max-count');
	}
	obj.val(i).trigger('change');
	return false;
});

//уменьшение количества товара (страница товара, миникарточка, корзина, страница заказа)
$(document.body).on('click','.amount_change .down', function() { 
	var obj = $(this).parents('.cart_form').find('.amount_input');
	var val = obj.val();
	var i = val;
	i--;
	if (i <= 0) {
		i = 1;
	}
	obj.val(i).trigger('change');
	return false;
});

// Исключение ввода в поле выбора количества недопустимых значений. (страница товара, миникарточка, корзина, страница заказа)
$(document.body).on('keyup', '.amount_input', function() {
	if ($(this).hasClass('zeroToo')) {
		if (isNaN($(this).val()) || $(this).val() < 0) {
			$(this).val('1');
		}
		$(this).val(Math.round($(this).val()));
	} else {
		if (isNaN($(this).val()) || $(this).val() <= 0) {
			$(this).val('1');
		}
		$(this).val($(this).val().replace(/\./g, ''));
	}
	if (parseFloat($(this).val()) > parseFloat($(this).data('max-count')) && parseFloat($(this).data('max-count')) > 0) {
		$(this).val($(this).data('max-count'));
	}
});

// делает активной первую картинку товара при изменении варианта (страница товара)
$(document.body).on('change', '.variants-table tr input[type=radio]', function() {
	setTimeout(function() {
		$('.slides-item[data-slide-index=0]').click();
	}, 0);
});

// делает активными нужные элементы размерной сетки при изменении варианта товара (страница товара и миникарточка)
$(document.body).on('click', '.variants-table tr input[type=radio]', function() {
	sizeMapObject = $(this).closest('form');
	sizeMapObject.find('.color').removeClass('active');
	sizeMapObject.find('.size').removeClass('active');

	var tmp = $(this).closest('tr').data('color');
	if (tmp != undefined && tmp != '') {
		sizeMapObject.find('.color[data-id='+$(this).closest('tr').data('color')+']').addClass('active');
	}
	tmp = $(this).closest('tr').data('size');
	if (tmp != undefined && tmp != '') {
		sizeMapObject.find('.size[data-id='+$(this).closest('tr').data('size')+']').addClass('active');
	}
});

// обработчик кликов по размерной сетке (страница товара и миникарточка)
$(document.body).on('click', '.color', function() {
	sizeMapObject = $(this).parents('form');
	if (sizeMapMod != 'size') {
		sizeMapShow($(this).data('id'), 'color');
	}
	sizeMapObject.find('.color').removeClass('active');
	$(this).addClass('active');
	choseVariant();
});

$(document.body).on('click', '.size', function() {
	sizeMapObject = $(this).parents('form');
	if (sizeMapMod == 'size') {
		sizeMapShow($(this).data('id'), 'size');
	}
	sizeMapObject.find('.size').removeClass('active');
	$(this).addClass('active');
	choseVariant();
});

// добавление в миникарточки кнопки купить, если её нет (дропнуть?)
$('.product-wrapper .variants-table').each(function() {
	var form = $(this).closest('form');
	
	if(form.hasClass('actionView') || ('false' == window.actionInCatalog)) {
		return;
	}
	
	if ($(this).find('td input:checked').data('count') != 0 && $(form).find('.buy-container a.addToCart').length==0) {
		var namebutton = $('.addToCart:first').text();
		$(form).find('.buy-container .hidder-element .product-info').hide();
		var id = $(form).find('.buy-container .hidder-element input').val();
		var buttonbuy = '<a href="http://'+mgBaseDir+'/catalog?inCartProductId='+id+'" class="addToCart product-buy" rel="nofollow" data-item-id="'+id+'">'+namebutton+'</a>';
		$(form).find('.buy-container .hidder-element ').append(buttonbuy);
	}
});

// делает активными нужные элементы размерной сетки (страница товара и миникарточка)
$('.variants-table').each(function() {
	var tmp = $(this).find('tr:eq(0)').data('color');
	if (tmp != undefined && tmp != '') {
		$(this).parents('form').find('.color[data-id='+tmp+']').addClass('active');
	} 
	tmp = $(this).find('tr:eq(0)').data('size');
	if (tmp != undefined && tmp != '') {
		$(this).parents('form').find('.size[data-id='+tmp+']').addClass('active');
	}
});

// костыль для выбора первого цвета при загрузке страницы (страница товара и миникарточка)
$('.color-block .color.active').click();

// костыль для верстки чекбокса выбранного варианта в таблице вариантов товара без размерной сетки (страница товара и миникарточка)
$('.c-variant__column input[name=variant][checked=checked]').each(function() {
	$(this).parents('.c-form').addClass('active');
});

// выбор варианта по якорю (страница товара)
if(varHashProduct === true) {
	if(location.hash != "") {
		code = location.hash.replace('#', '');
		if(sizeMapMod == 'size' && $('[data-code="'+code+'"]:eq(0)').closest('tr[data-size!=\'\']').length) {
			size = $('[data-code="'+code+'"]:eq(0)').closest('tr').data('size');
			$('.size[data-id=' + size + ']').trigger('click');
		} else if($('[data-code="'+code+'"]:eq(0)').closest('tr[data-color!=\'\']').length) {
			color = $('[data-code="'+code+'"]:eq(0)').closest('tr').data('color');
			$('.color[data-id=' + color + ']').trigger('click');
		}
		$('[data-code="'+code+'"]:eq(0)').click();
	} else {
		if($('.variants-table tr input[type=radio]:eq(0)').data('code') != undefined) 
			location.hash = $('.variants-table tr input[type=radio]:eq(0)').data('code');
	}

	// подстановка якоря в url
	$(document.body).on('click', '.variants-table tr input[type=radio]', function() {
		data = $(this).data('code');
		if(data != undefined) location.hash = data;
	});
}

// вызывается в layout.cart.js
// анимация при добавлении в корзину товара (страница товара и миникарточка)
function transferEffect(productId, buttonClick, wrapperClass) {
	var $css = {
		'height': '100%',
		"opacity": 0.5,
		"position": "relative",
		"z-index": 100
	};

	var $transfer = {
		to: $(".small-cart-icon"),
		className: "transfer_class"
	};

	//если кнопка на которую нажали находится внутри нужного контейнера. 
	if (buttonClick.parents(wrapperClass).find('img[data-transfer=true][data-product-id=' + productId + ']').length) {
		// даем способность летать для картинок из слайдера новинок и прочих.
		var tempObj = buttonClick.parents(wrapperClass).find('img[data-transfer=true][data-product-id=' + productId + ']');
		tempObj.effect("transfer", $transfer, 600);
		$('.transfer_class').html(tempObj.clone().css($css));

	} else {
		//Если кнопка находится не в контейнере, проверяем находится ли она на странице карточки товара.
		if ($('.product-details-image').length) {
			// даем способность летать для картинок из галереи в карточке товара.
			$('.product-details-image').each(function() {
				if ($(this).css('display') != 'none') {
					$(this).find('.mg-product-image').effect("transfer", $transfer, 600);
					$('.transfer_class').html($(this).find('img').clone().css($css));
				}
			});

		} else {
			// даем способность летать для всех картинок.
			var tempObj = $('img[data-transfer=true][data-product-id=' + productId + ']');
			tempObj.effect("transfer", $transfer, 600);
		}
	}

	if (tempObj) {
		$('.transfer_class').html(tempObj.clone().css($css));
	}
}

// функция кликов по размерной сетке (страница товара и миникарточка)
function sizeMapShow(id, search) {
	if(sizeMapObject == undefined) return false;

	var show = 'color';
	if (search == 'color') {
		show = 'size';
	}

	sizeMapObject.find('.'+show).hide();
	var toCheck = '';
	sizeMapObject.find('.variants-table .variant-tr').each(function() {	 
		if($(this).data(search) == id) {
			if(sizeMapObject.find(this).data('size') != '') {
				sizeMapObject.find('.'+show+'[data-id='+sizeMapObject.find(this).data(show)+']').show();
				if($(this).data('count') == 0) {
					sizeMapObject.find('.'+show+'[data-id='+sizeMapObject.find(this).data(show)+']').addClass('inactive');
				} else {
					sizeMapObject.find('.'+show+'[data-id='+sizeMapObject.find(this).data(show)+']').removeClass('inactive');
				}
				if(toCheck == '') {
					toCheck = sizeMapObject.find('.'+show+'[data-id='+sizeMapObject.find(this).data(show)+']');
				}
			}
		}
	});
	if(toCheck != '') {
		toCheck.click();
	}
}

// функция выбора варианта после клика по размерной сетке (страница товара и миникарточка)
function choseVariant() {
	if(sizeMapObject == undefined) return false;
	var color = '';
	var size = '';
	if(sizeMapObject.find('.color').length != 0) {
		color = '[data-color='+sizeMapObject.find('.color.active').data('id')+']';
	}
	if(sizeMapObject.find('.size').length != 0) {
		size = '[data-size='+sizeMapObject.find('.size.active').data('id')+']';
	}
	sizeMapObject.find('.variants-table .variant-tr'+color+size+' input[type=radio]').click();
}