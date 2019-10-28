$(document).ready(function () {

    // add active link
    // ------------------------------------------------------------
    $('nav a').each(function () {
        var location = window.location.href;
        var link = this.href;
        if (location == link) {
            $(this).addClass('active');
        }
    });

        // c-switcher
    // ------------------------------------------------------------
    function rememberView() {
        var className = localStorage['class'];
        //localStorage.clear();
        $('.c-switcher__item[data-type="' + className + '"]').addClass('c-switcher__item--active').siblings().removeClass('c-switcher__item--active');
        $('.c-goods').addClass(className);
        $('.c-switcher__item').on('click', function () {
            var currentView = $(this).data('type');
            var product = $('.c-goods');

            product.removeClass('c-goods--grid c-goods--list');
            product.addClass(currentView);

            $('.c-switcher__item').removeClass('c-switcher__item--active');
            $(this).addClass('c-switcher__item--active');

            localStorage.setItem('class', $(this).data('type'));
            return false;
        });
    }
    rememberView();


    // с-carousel
    // ------------------------------------------------------------
    $('.c-carousel__content').owlCarousel({
        nav: true,
        margin: 16,
        dots: false,
        mouseDrag: false,
        responsive: {
            0: {
                items: 1,
                margin: 10,
            },
            360: {
                items: 2
            },
            768: {
                items: 3
            },
            990: {
                items: 4
            }
        },
        navText: [
            '<div class="c-carousel__arrow c-carousel__arrow--left"><svg class="icon icon--arrow-left"><use xlink:href="#icon--arrow-left"></use></svg></div>',
            '<div class="c-carousel__arrow c-carousel__arrow--right"><svg class="icon icon--arrow-right"><use xlink:href="#icon--arrow-right"></use></svg></div>'
        ]
    });

    if ($('.c-carousel__content').hasClass('owl-loaded')) {
        $('.c-carousel').addClass('c-carousel--active');
    }
    // С этим товаром покупают
    $('.c-carousel__content--related').owlCarousel({
        nav: true,
        margin: 16,
        dots: false,
        mouseDrag: false,
        responsive: {
            0: {
                items: 2,
                margin: 10
            },
            768: {
                items: 3
            },
            990: {
                items: 4
            }
        },
        navText: [
            '<div class="c-carousel__arrow c-carousel__arrow--left"><svg class="icon icon--arrow-left"><use xlink:href="#icon--arrow-left"></use></svg></div>',
            '<div class="c-carousel__arrow c-carousel__arrow--right"><svg class="icon icon--arrow-right"><use xlink:href="#icon--arrow-right"></use></svg></div>'
        ]
    });

    if ($('.c-carousel__content--related').hasClass('owl-loaded')) {
        $('.c-carousel').addClass('c-carousel--active');
    }

    $('.mg-brand-block').owlCarousel({
        loop: true,
        nav: true,
        responsive: {
            0: {
                items: 2,
                margin: 10
            },
            768: {
                items: 3
            },
            990: {
                items: 6
            }
        },
        navText: [
            '<div class="c-carousel__arrow c-carousel__arrow--left"><svg class="icon icon--arrow-left"><use xlink:href="#icon--arrow-left"></use></svg></div>',
            '<div class="c-carousel__arrow c-carousel__arrow--right"><svg class="icon icon--arrow-right"><use xlink:href="#icon--arrow-right"></use></svg></div>'
        ]
    });

    // c-filter
    // ------------------------------------------------------------
    $('body').on('click', 'a[href^="#c-filter"]', function (a) {
        a.preventDefault();
        var b = $(this).attr('href');
        $(b).addClass('c-filter--active');
        $('body').addClass('fixed__body');

    }), $('body').on('click', '.c-filter', function () {
        $('.c-filter').removeClass('c-filter--active');
        $('body').removeClass('fixed__body');

    }), $('body').on('click', '.c-filter__content', function (a) {
        a.stopPropagation()
    });

    // c-tab
    // ------------------------------------------------------------
    $('body').on('click', 'a[href^="#c-tab"]', function (a) {
        a.preventDefault();
        var b = $(this).attr('href');
        $(b).addClass('c-tab__content--active');
        $(b).siblings().removeClass('c-tab__content--active');

        $(this).addClass('c-tab__link--active');
        $(this).siblings().removeClass('c-tab__link--active');
    });



    // plugin "slider-action"
    // ------------------------------------------------------------
    $(document).ready(function () {
        $('.m-p-slider-wrapper').addClass('show');
    });


    // plugin "product-slider"
    // ------------------------------------------------------------
    $(document).ready(function () {
        $('.mg-advise').addClass('mg-advise--active');
    });


    // agreement
    // ------------------------------------------------------------
    $('.l-body').on('change', '.agreement-container [type="checkbox"]', function () {
        if ($(this).prop('checked')) {
            $(this).closest('label').removeClass('nonactive').addClass('active');
        }
        else {
            $(this).closest('label').removeClass('active').addClass('nonactive');
        }
    });

    // op-field-check
    // ------------------------------------------------------------
    $('.l-body').on('change', '.op-field-check [type="checkbox"]', function () {
        if ($(this).prop('checked')) {
           $(this).closest('label').removeClass('nonactive').addClass('active');
        }
        else{
            $(this).closest('label').removeClass('active').addClass('nonactive');
        }
    });

    $('.l-body').on('change', '.op-field-check [type="radio"]', function () {
        $('.op-field-check [name='+$(this).attr('name')+']').closest('label').removeClass('active').addClass('nonactive');
        if ($(this).prop('checked')) {
           $(this).closest('label').removeClass('nonactive').addClass('active');
        }
        else{
            $(this).closest('label').removeClass('active').addClass('nonactive');
        }
    });

    // order
    // ------------------------------------------------------------
    $('.c-order__checkbox label').on('click', function () {
        if ($(this).children('[type="checkbox"]').is(':checked')) {
            $(this).removeClass('nonactive').addClass('active');
        } else {
            $(this).removeClass('active').addClass('nonactive');
        }
    });
    $('.c-order__radiobutton label, .order-storage label').on('click', function () {
        if ($(this).children('[type="radio"]').is(':checked')) {
            $(this).removeClass('nonactive').addClass('active');
            $(this).siblings('label').removeClass('active');
        }
    });

}); // end ready

$('input, textarea').each(function () {
    var $elem = $(this);
    if ($elem.attr('placeholder') && !$elem[0].placeholder) {
        var $label = $('<label class="placeholder"></label>').text($elem.attr('placeholder'));
        $elem.before($label);
        $elem.blur();
        if ($elem.val() === '') {
            $label.addClass('visible');
        }
        $label.click(function () {
            $label.removeClass('visible');
            $elem.focus();
        });
        $elem.focus(function () {
            if ($elem.val() === '') {
                $label.removeClass('visible');
            }
        });
        $elem.blur(function () {
            if ($elem.val() === '') {
                $label.addClass('visible');
            }
        });
    }
});