<?php
if ((EDITION == 'gipermarket' || EDITION == 'market') && ($data['liteFormData']['printCompareButton']=='true')) { ?>
    <a href="<?php echo SITE . '/compare?inCompareProductId=' . $data["id"]; ?>"
       title="<?php echo lang('buttonCompare'); ?>"
       rel="nofollow"
       class="js-add-to-compare addToCompare"
       data-item-id="<?php echo $data["id"]; ?> ">
        <?php echo lang('buttonCompare'); ?>
    </a>
<?php } ?>