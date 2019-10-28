<?php
/**
 *  Файл представления Enter - выводит сгенерированную движком информацию на странице сайта авторизации пользователей.
 *  В этом файле доступны следующие данные:
 *   <code>
 *    $data['msgError'] => Сообщение об ошибке авторизации,
 *    $data['meta_title'] => 'Значение meta тега для страницы '
 *    $data['meta_keywords'] => 'Значение meta_keywords тега для страницы '
 *    $data['meta_desc'] => 'Значение meta_desc тега для страницы '
 *   </code>
 *
 *   Получить подробную информацию о каждом элементе массива $data, можно вставив следующую строку кода в верстку файла.
 *   <code>
 *    <?php viewData($data['msgError']); ?>
 *   </code>
 *
 *   Вывести содержание элементов массива $data, можно вставив следующую строку кода в верстку файла.
 *   <code>
 *    <?php echo $data['msgError']; ?>
 *   </code>
 *
 *   <b>Внимание!</b> Файл предназначен только для форматированного вывода данных на страницу магазина. Категорически не рекомендуется выполнять в нем запросы к БД сайта или реализовывать сложную программную логику логику.
 * @author Авдеев Марк <mark-avdeev@mail.ru>
 * @package moguta.cms
 * @subpackage Views
 */
// Установка значений в метатеги title, keywords, description.
mgSEO($data);
?>

<div class="l-row">

    <div class="l-col min-0--12">
        <div class="c-title"><?php echo lang('enterTitle'); ?></div>
    </div>

    <?php
    // Компонент формы авторизации
    component('authorization', array(), 'form');
    ?>

</div>