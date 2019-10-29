<?php 
/**
 *  Файл представления Compare - выводит сгенерированную движком информацию на странице сайта с сравнением товаров, которые выбрал пользователь.
 *  В этом  файле доступны следующие данные:
 *   <code>
 *    $data['compareList'] => ID сравниваемых товаров,
 *    $data['catalogItems'] => Массив товаров,
 *    $data['arrCategoryTitle'] => Названия категорий, в которых присутствуют товары,
 *    $data['property'] => Сравниваемые значения характеристик,
 *    $data['meta_title'] => Значение meta тега для страницы,
 *    $data['meta_keywords'] => Значение meta_keywords тега для страницы,
 *    $data['meta_desc'] => Значение meta_desc тега для страницы
 *   </code>
 *
 *   Получить подробную информацию о каждом элементе массива $data, можно вставив следующую строку кода в верстку файла.
 *   <code>
 *    <?php viewData($data['catalogItems']); ?>
 *   </code>
 *
 *   Вывести содержание элементов массива $data, можно вставив следующую строку кода в верстку файла.
 *   <code>
 *    <?php echo $data['catalogItems'][0]['title']; ?>
 *   </code>
 *
 *   <b>Внимание!</b> Файл предназначен только для форматированного вывода данных на страницу магазина. Категорически не рекомендуется выполнять в нем запросы к БД сайта или реализовывать сложную программную логику логику.
 * @author Авдеев Марк <mark-avdeev@mail.ru>
 * @package moguta.cms
 * @subpackage Views
 */
mgSEO($data); $prodIds = array(); $propTable = array(); ?>
<div class="l-row">
    <div class="l-col min-0--12">
        <div class="c-title"><?php echo lang('compareProduct'); ?></div>
    </div>
    <div class="l-col min-0--12">
        <div class="c-alert c-alert--blue"><?php echo lang('compareProductEmpty'); ?></div>
    </div>
</div>

<?php
// Компонент страницы сравнения
component('compare', $data['catalogItems'], '__main/compare__main');
?>