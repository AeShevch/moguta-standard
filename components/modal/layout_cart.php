<?php
addScript('/components/modal/js/script');
addStyle('/components/modal/css/style');
?>
<div class="c-modal c-modal--700 mg-fake-cart"
     id="js-modal__cart">
    <div class="c-modal__wrap">
        <div class="c-modal__content">
            <div class="c-modal__close">
                <svg class="icon icon--close">
                    <use xlink:href="#icon--close"></use>
                </svg>
            </div>

            <?php
            component('cart', array(), 'cart__popup');
            ?>

        </div>
    </div>
</div>
