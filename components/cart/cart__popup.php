<?php

addStyle('/components/modal/css/cart__common.css');
?>
<div class="c-title"><?php echo lang('cartTitle'); ?></div>
<div class="c-table popup-body">
    <table class="small-cart-table">

        <?php if (!empty($data['cartData']['dataCart'])) { ?>

            <?php foreach ($data['cartData']['dataCart'] as $item): ?>
                <tr>
                    <td class="c-table__img     small-cart-img">
                        <a href="<?php echo SITE . "/" . (isset($item['category_url']) ? $item['category_url'] : 'catalog/') . $item['product_url'] ?>">
                            <img src="<?php echo $item["image_url_new"] ?>" alt="<?php echo $item['title'] ?>"/>
                        </a>
                    </td>
                    <td class="c-table__name     small-cart-name">
                        <ul class="small-cart-list">
                            <li>
                                <a href="<?php echo SITE . "/" . (isset($item['category_url']) ? $item['category_url'] : 'catalog/') . $item['product_url'] ?>"><?php echo $item['title'] ?></a>
                                <span class="property"><?php echo $item['property_html'] ?></span>
                            </li>
                            <li class="qty">
                                x<?php echo $item['countInCart'] ?>
                                <span><?php echo $item['priceInCart'] ?></span>
                            </li>
                        </ul>
                    </td>
                    <td class="c-table__remove     small-cart-remove">
                        <a href="#" class="deleteItemFromCart" title="<?php echo lang('delete'); ?>"
                           data-delete-item-id="<?php echo $item['id'] ?>"
                           data-property="<?php echo $item['property'] ?>"
                           data-variant="<?php echo isset($item['variantId']) ? $item['variantId'] : '' ?>">
                            <div class="icon__cart-remove">
                                <svg class="icon icon--close">
                                    <use xlink:href="#icon--close"></use>
                                </svg>
                            </div>
                        </a>
                    </td>
                </tr>
            <?php endforeach; ?>

        <?php } else { ?>

        <?php } ?>
    </table>
</div>
<div class="popup-footer">
    <ul class="c-table__footer total sum-list">
        <li class="c-table__total total-sum">
            <?php echo lang('toPayment') ?>:
            <span class="total-payment">
                                <?php echo $data['cartData']['cart_price_wc'] ?>
                            </span>
        </li>
        <li class="checkout-buttons">
            <a class="c-button c-button--link c-modal__cart"
               href="javascript:void(0)"><?php echo lang('cartContinue'); ?></a>
            <a class="c-button" href="<?php echo SITE ?>/order"><?php echo lang('cartCheckout'); ?></a>
        </li>
    </ul>
</div>