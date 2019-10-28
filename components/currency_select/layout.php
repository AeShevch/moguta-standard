<?php
addScript('components/currency_select/js/script.js');
addStyle('components/language_select/css/style.css');
if(MG::getSetting('printCurrencySelector') == 'true'){
    $currencyActive = MG::getSetting('currencyActive');
    $currencyShopIso = MG::get('dbCurrency');?>
    <label class="select__wrap">
        <svg class="select__icon icon icon--currency"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon--currency"></use></svg>

	    <select name="userCustomCurrency"
                class="select"
                id="js-currency-select"
                aria-label="Выбор валюты сайта">
            <?php foreach (MG::getSetting('currencyShort') as $k => $v){
                if(!in_array($k, $currencyActive) && $k != $currencyShopIso){continue;}?>
                <option value="<?php echo $k ?>" <?php if($k == $_SESSION['userCurrency']){echo 'selected';} ?>> <?php echo $v ?> </option>
            <?php } ?>
	    </select>
	</label>
<?php } ?>