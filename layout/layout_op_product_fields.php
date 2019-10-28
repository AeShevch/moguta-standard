<?php
if (EDITION == 'gipermarket') {
    $opFieldsM = new Models_OpFieldsProduct($data['id']);
    $fields = $opFieldsM->get();

    foreach ($fields as $key => $value) {
        if (($value['active'] == 0) || (empty($value['value']))) continue;
        if ($data['variant']) {
            echo '<div class="product-opfield">'
                . '<span class="product-opfield__name">'
                . $value['name'] . ': '
                . '</span>'
                . '<span class="product-opfield__value">'
                . $value['variant'][$data['variant']]['value']
                . '</span>'
                . '</div>';
        } else {
            echo '<div class="product-opfield">'
                . '<span class="product-opfield__name">'
                . $value['name'] . ': '
                . '</span>'
                . '<span class="product-opfield__value">'
                . $value['value']
                . '</span>'
                . '</div>';
        }
    }
}
?>