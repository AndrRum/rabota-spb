<?php

$domain = "spbrabota";
$v = "5.131";

$curl = curl_init();
$query = http_build_query([
    "domain" => $domain,
    "offset" => $_GET['offset'] ?? "",
    "count" => $_GET['count'] ?? "",
    "access_token" => $_GET['access_token'] ?? "",
    "v" => $v,
]);

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.vk.com/method/wall.get?' . $query,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_ENCODING => '',
  CURLOPT_TIMEOUT => 0
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;