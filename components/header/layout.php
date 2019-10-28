<?php addStyle('components/header/css/style.css'); ?>
<header class="l-header">
    <div class="l-header__top">
        <div class="l-container">
            <div class="l-row">
                <div class="l-col min-0--3 min-1025--8">
                    <div class="l-header__block">
                        <?php
                        // Компонент меню страниц – menu/pages
                        component('menu', $data['menuPages'], 'pages') ?>
                    </div>
                </div>
                <div class="lcg l-col min-0--9 min-1025--4">
                    <?php
                    // Компонент выбора языка сайта – language_select
                    component('language_select');
                    // Компонент выбора валюты сайта – currency_select
                    component('currency_select');
                    ?>
                    <div class="l-header__block group">
                        <?php
                        //  Компонент меню групп товаров - groups_menu
                        component('groups_menu');
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="l-header__middle">
        <div class="l-container">
            <div class="l-row min-0--align-center">
                <div class="l-col min-0--12 min-768--3">
                    <?php
                    // Компонент логотипа
                    component('logo');
                    ?>
                </div>
                <div class="l-col min-0--12 min-768--9">
                    <div class="min-0--flex min-0--justify-center min-768--justify-end">
                        <div class="l-header__block">
                            <?php
                            // Компонент контактов в шапке – contacts
                            component('contacts');
                            ?>
                        </div>

                        <?php if (MG::getSetting('printCompareButton') == 'true') { ?>
                            <div class="l-header__block max-767--hide">
                                <?php
                                // Компонент кнопки сравнения в шапке
                                component('compare', [], 'header_link');
                                ?>
                            </div>
                        <?php } ?>

                        <div class="l-header__block">
                            <?php
                            // Компонент кнопки перехода в лк/страницу авторизации
                            component('authorization', [], 'button');
                            ?>
                        </div>
                        <div class="l-header__block">
                            <?php
                            // Компонент всплывающей мини-корзины
                            component('cart', $data, 'small_cart');

                            // Если в настройках включена опция
                            // «Показывать покупателю сообщение о добавлении товара в корзину»,
                            // то выводим компонент модального окна с шаблоном «layout_cart»
                            if (MG::getSetting('popupCart') == 'true') {
                                component('modal', array(), 'layout_cart');
                            };
                            ?>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="l-header__bottom">
        <div class="l-container">
            <div class="l-row">
                <div class="l-col min-0--5 min-768--3">
                    <div class="l-header__block">
                        <?php
//                        viewData($data);
                        component('menu', $data['menuCategories'], 'categories'); ?> <!-- меню каталога -->
                    </div>
                </div>
                <div class="l-col min-0--7 min-768--9">
                    <div class="l-header__block">
                        <?php layout('search'); ?> <!-- поиск -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>