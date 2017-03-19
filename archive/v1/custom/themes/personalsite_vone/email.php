<?php
require_once('Mandrill.php');
$apiKey = 'n0GTUQkl5DsJqBW3EL93mA';
$mandrill = new Mandrill($apiKey);


$request = $mandrill->messages->send($_POST['data']['message'], false, 'Main Pool', '');

print_r(json_encode($request));
