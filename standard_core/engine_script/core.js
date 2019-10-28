// открытие модалки с соглашением на обработку пользовательских данных
$(document.body).on('click', '.show-more-agreement-data', function () {
	if ($('.more-agreement-data-container').length < 1) {
		$.ajax({
			type: "GET",
			url: mgBaseDir+"/ajaxrequest",
			data: {
				layoutAgreement: 'agreement'
			},
			dataType: "HTML",
			success: function(response) {
				$('body').append(response);
			}
		});
	} else {
		$('.more-agreement-data-overlay').show();
		$('.more-agreement-data-container').show();
	}
});

// закрытие модалки с соглашением на обработку пользовательских данных
$(document.body).on('click', '.close-more-agreement-data, .more-agreement-data-overlay', function () {
	$('.more-agreement-data-overlay').hide();
	$('.more-agreement-data-container').hide();
});

// жс переменные из движка
document.cookie.split(/; */).forEach(function(cookieraw){
	if(cookieraw.indexOf('mg_to_script') === 0) {
		var cookie = cookieraw.split('=');
		var name = cookie[0].substr(13);
		var value = decodeURIComponent(cookie[1]);
		window[name] = tryJsonParse(value.replace(/&nbsp;/g, ' '));
	}
});

// продление пхп сессии
if (sessionLifeTime > 0 && window.sessionUpdateActive !== true) {
	window.sessionUpdateActive = true;
	setInterval(function() {
		$.ajax({
			type: "POST",
			url: mgBaseDir+"/ajaxrequest",
			data:{
				actionerClass: 'Ajaxuser',
				action: 'updateSession',
			},
			cache: false,
			dataType: 'json',
			success: function(response) {}
		});
	}, (sessionLifeTime/2*1000));
}

// обработчик для блокировки кнопок соглашения о персональных данных
if (agreementClasses.length > 1) {
		
	var agreementArray = agreementClasses.split(",");

	$(agreementClasses).click(function (e) {
		var className = '';
		for (var i = 0; i < agreementArray.length; i++) {
			if ($(this).hasClass(agreementArray[i].slice(1))) {
				className = agreementArray[i].slice(1);
				break;	
			}
		}

		if ($('.agreement-data-checkbox-'+className).is(':checked')) {
			$('.agreement-data-checkbox-'+className).parent().find('span').removeClass('agreement-data-denied');
		}
		else{
			e.stopImmediatePropagation();
			$('.agreement-data-checkbox-'+className).parent().find('span').addClass('agreement-data-denied');
			return false;
		}
	});

	$('body').on('click', agreementClasses, function(e) {
		var className = '';
		for (var i = 0; i < agreementArray.length; i++) {
			if ($(this).hasClass(agreementArray[i].slice(1))) {
				className = agreementArray[i].slice(1);
				break;	
			}
		}

		if ($('.agreement-data-checkbox-'+className).is(':checked')) {
			$('.agreement-data-checkbox-'+className).parent().find('span').removeClass('agreement-data-denied');
		}
		else{		
			e.stopImmediatePropagation();
			$('.agreement-data-checkbox-'+className).parent().find('span').addClass('agreement-data-denied');
			return false;
		}
	});
}

function tryJsonParse(str) {
	try {
		var res = JSON.parse(str);
		return res;
	} catch (e) {
		return str;
	}
}