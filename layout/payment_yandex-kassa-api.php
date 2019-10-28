<?php //viewdata($data['id']);

$postSend = '{
    "amount": {
        "value": "'.$data['summ'].'",
        "currency": "RUB"
    }, 
    "capture": true,
    "confirmation": {
        "type": "redirect",
        "return_url": "'.SITE.'"
    },
    "metadata": {
        "orderId": "'.$data['id'].'"
    }
}';

// "payment_method_data": {
//         "type": "bank_card"
//     },

$username = $data['paramArray'][0]['value'];
$password = $data['paramArray'][1]['value'];

$ch = curl_init('https://payment.yandex.net/api/v3/payments');
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Idempotence-Key: '.md5(time())
));
curl_setopt($ch, CURLOPT_USERPWD, $username . ":" . $password);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 15);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postSend);
$res = curl_exec($ch);
$info = curl_getinfo($ch);
curl_close($ch);

$res = json_decode($res, true);
// 
$toLog = "\n".'--------------------------------------'.
"\n".'Idempotence-Key: '.md5(time())."\n\n\n";
$toLog .= 'Auth:'."\n\n";
$toLog .= $username . ":" . $password."\n\n\n";
$toLog .= 'Post data:'."\n\n";
$toLog .= $postSend;

mg::loger($toLog, 'append', 'kassa-api-send');

header('location: '.$res['confirmation']['confirmation_url']);

viewdata($res);

?>