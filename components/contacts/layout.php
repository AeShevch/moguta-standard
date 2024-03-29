<?php addStyle('components/contacts/css/style.css'); ?>
<?php $workTime = explode(',', MG::getSetting('timeWork')); ?>
<div class="c-contact"
     itemscope
     itemtype="http://schema.org/Store">

    <meta itemprop="address"
          content="<?php echo MG::getSetting('shopAddress') ?>">
    <meta itemprop="priceRange"
          content="<?php echo MG::getSetting('currencyShopIso'); ?>">
    <link itemprop="logo"
          href="<?php echo SITE . MG::getSetting('shopLogo'); ?>">
    <link href="<?php echo SITE; ?>"
          itemprop="url">
    <img class="hidden"
         src="<?php echo SITE; ?>/favicon.ico"
         alt="<?php echo MG::getSetting('sitename') ?>"
         itemprop="image">

    <div class="c-contact__column">
        <svg class="icon icon--time">
            <use xlink:href="#icon--time"></use>
        </svg>
        <div class="c-contact__row">
            <span class="hidden"
                  itemprop="name">
                <?php echo MG::getSetting('sitename') ?>
            </span>
            <div class="c-contact__schedule">
                <span class="c-contact__span">
                    <?php echo lang('mon-fri'); ?>
                </span>
                <?php echo trim($workTime[0]); ?>
            </div>
        </div>
        <div class="c-contact__row">
            <div class="c-contact__schedule">
                <span class="c-contact__span">
                    <?php echo lang('sat-sun'); ?>
                </span>
                <?php echo trim($workTime[1]); ?>
            </div>
        </div>
    </div>
    <div class="c-contact__column">
        <svg class="icon icon--phone">
            <use xlink:href="#icon--phone"></use>
        </svg>
        <?php $phones = explode(', ', MG::getSetting('shopPhone'));
        foreach ($phones as $phone) { ?>
            <div class="c-contact__row">
                <a class="c-contact__number"
                   href="tel:<?php echo str_replace(' ', '', $phone); ?>">
                    <span itemprop="telephone">
                        <?php echo $phone; ?>
                    </span>
                </a>
            </div>
        <?php } ?>
        <?php if (class_exists('BackRing')): ?>
            <div class="c-contact__row">
                <div class="wrapper-back-ring">
                    <button type="submit"
                            class="back-ring-button default-btn">
                        <?php echo lang('backring'); ?>
                    </button>
                </div>
            </div>
        <?php endif; ?>
    </div>
</div>