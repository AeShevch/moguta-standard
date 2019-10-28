<?php
addStyle('components/logo/css/style.css');
?>

<a class="c-logo"
   title="<?php echo MG::getSetting('sitename') ?>"
   href="<?php echo SITE ?>">
    <?php echo mgLogo(); ?>
</a>