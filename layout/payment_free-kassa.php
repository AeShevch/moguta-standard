<?php

$merchant_id = $data['paramArray'][1]['value'];
$secret_word = $data['paramArray'][2]['value'];
$lang = $data['paramArray'][0]['value'];

$id = $data['id'];
$summ = $data['summ'];

$sign = md5(implode(':',[$merchant_id,$summ,$secret_word,$id]));


$url = '//free-kassa.ru/merchant/cash.php?lang='.$lang.'&o='.$id.'&oa='.$summ.'&m='.$merchant_id.'&s='.$sign;

?>
<style>
.free-kassa-payment .unlink {
   text-decoration: none; 
   color: white;
}
</style>

<div class="payment-form-block free-kassa-payment">

<a class="default-btn unlink" href="<?php echo $url ?>"><?php echo lang('paymentPay'); ?></a>
</div>