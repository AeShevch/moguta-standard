document.addEventListener("DOMContentLoaded", function() {
    var langSelect = document.getElementById('js-lang-select');

    var changeLang = function(event) {
        var select = event.target;

        window.location.href = select.options[select.selectedIndex].value;
    };

    langSelect.addEventListener('change', changeLang);
});