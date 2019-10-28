<?php
addScript('/components/cart/js/cart__small');
addStyle('/components/cart/css/cart__small');
?>

<div class="c-cart mg-desktop-cart">
    <a class="c-cart__small cart" href="<?php echo SITE ?>/cart">
        <span class="small-cart-icon"></span>
        <div class="c-cart__small--icon">
            <svg class="icon icon--cart"><use xlink:href="#icon--cart"></use></svg>
        </div>
        <ul class="c-cart__small--list cart-list">
            <li class="c-cart__small--count">
                <div class="c-cart__small--text"><?php echo lang('cartCart'); ?> (<span class="countsht"><?php echo $data['cartCount'] ? $data['cartCount'] : 0 ?></span>)</div>
            </li>
            <li class="c-cart__small--price cart-qty">
                <span class="pricesht"><?php echo $data['cartPrice'] ? $data['cartPrice'] : 0 ?></span> <?php echo $data['currency']; ?>
            </li>
        </ul>
    </a>
    <div class="c-cart__dropdown small-cart">
        <div class="l-row">
            <div class="l-col min-0--12">
                <div class="c-title"><?php echo lang('cartTitle'); ?></div>
            </div>
            <div class="l-col min-0--12">
                <div class="c-table c-table--scroll">
                    <table class="small-cart-table">

                        <?php if (!empty($data['cartData']['dataCart'])) { ?>

                            <?php foreach ($data['cartData']['dataCart'] as $item): ?>
                                <tr>
                                    <td class="c-table__img small-cart-img">
                                        <a href="<?php echo SITE . "/" . (isset($item['category_url']) ? $item['category_url'] : 'catalog/') . $item['product_url'] ?>">
                                            <img src="<?php echo $item["image_url_new"] ?>" alt="<?php echo $item['title'] ?>"/>
                                        </a>
                                    </td>
                                    <td class="c-table__name small-cart-name">
                                        <ul class="small-cart-list">
                                            <li>
                                                <a class="c-table__link" href="<?php echo SITE . "/" . (isset($item['category_url']) ? $item['category_url'] : 'catalog/') . $item['product_url'] ?>"><?php echo $item['title'] ?></a>
                                                <span class="property"><?php echo $item['property_html'] ?> </span>
                                            </li>
                                            <li class="c-table__quantity qty">
                                                x<?php echo $item['countInCart'] ?>
                                                <span><?php echo $item['priceInCart'] ?></span>
                                            </li>
                                        </ul>
                                    </td>
                                    <td class="c-table__remove small-cart-remove">
                                        <a href="#" class="deleteItemFromCart" title="<?php echo lang('delete'); ?>"
                                           data-delete-item-id="<?php echo $item['id'] ?>"
                                           data-property="<?php echo $item['property'] ?>"
                                           data-variant="<?php echo $item['variantId'] ?>">
                                            <div class="icon__cart-remove">
                                                <svg class="icon icon--remove"><use xlink:href="#icon--remove"></use></svg>
                                            </div>
                                        </a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>

                        <?php } else { ?>

                        <?php } ?>
                    </table>
                </div>
                <ul class="c-table__footer total">
                    <li class="c-table__total total-sum"><?php echo lang('cartPay'); ?>
                        <span><?php echo $data['cartData']['cart_price_wc'] ?></span>
                    </li>
                    <li class="checkout-buttons">
                        <a href="<?php echo SITE ?>/cart" class="c-button c-button--link"><?php echo lang('cartLink'); ?></a>
                        <a href="<?php echo SITE ?>/order" class="c-button"><?php echo lang('cartCheckout'); ?></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>