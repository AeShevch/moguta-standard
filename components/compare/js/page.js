$(document).ready(function () {
    // Блокируем скролл body
    $('body').addClass('l-body_overflow_hidden');

    var compareMain = $('.js-compare-page'), // Главный контейнер
        compareItem = $('.js-compare-item'), // Блок товара в сравнении
        scrollContainer = $('.js-scroll-container'); // Блок, к которому будем добавлять двойную прокрутку

    // Если в сравнении нет ни одного товара, скрываем главный контейнер
    if (compareItem.length === 0) {
        compareMain.hide();
    }

    // Добавляем скролл-бар и сверху и снизу блока сравнения
    function DoubleScroll(element) {
        console.log(element);
        var scrollbar = document.createElement('div');
        scrollbar.setAttribute("class", "mg-top-scroll");
        scrollbar.appendChild(document.createElement('div'));
        scrollbar.style.overflow = 'auto';
        scrollbar.style.overflowY = 'hidden';
        scrollbar.firstChild.style.width = element.scrollWidth + 'px';
        scrollbar.firstChild.style.paddingTop = '1px';
        scrollbar.firstChild.appendChild(document.createTextNode('\xA0'));
        scrollbar.onscroll = function () {
            element.scrollLeft = scrollbar.scrollLeft;
        };
        element.onscroll = function () {
            scrollbar.scrollLeft = element.scrollLeft;
        };
        element.parentNode.insertBefore(scrollbar, element);
    }

    DoubleScroll(scrollContainer[0]);
});