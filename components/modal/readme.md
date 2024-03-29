# Компонент «Модальное окно»

**Для корректной работы компонента необходимо подключение библиотеки JQuery, а также компонента «svg_icons».**

## Использование компонента
1. Для создания нового модального окна скопируйте файл `components/modal/layout_default.php`, вставьте его в этой же директории и назовите любым другим именем, например layout_my-modal.php;

2. В скопированном файле в строке 6:  
`id="js-modal__default"`  
 замените `default` на любое другое значение, например `js-modal__my-modal`.  
 **Префикс `js-modal__` не убирайте, он необходим для работы стандартного JS-скрипта.**
 
3. В этом же файле замените текст `**Контент слайда**` на тот, который вам необходим. Вместо текста вы также можете использовать другой компонент или layout;

4. Для вывода модального окна в шаблоне используйте код:  
`<?php component( 'modal', array(), 'layout_my-modal'); ?>`  
Где вместо `layout_my-modal` вставьте название, созданного на первом шаге файла (без расширения).  
 Если в модальное окно необходимо передать массив данных, то укажите его вторым параметром вместо `array()`;
 
 5. Кнопка, открывающая модальное окно, создаётся с помощью тега `a` со значением атрибута href, равным ID вашего модального окна, прописанного в пункте 2, например:  
 `<a href="#js-modal__my-modal">Открыть модальное окно</a>`.
