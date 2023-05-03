<?php

$REACT_APP_VK_CLIENT_SECRET = "dHMxqgSKkTxQsZxzJLoU";
$REACT_APP_VK_CLIENT_ID = "51604244";

$redirect_uri = "https://rabotaspb.online";

$curl = curl_init();
$query = http_build_query([
    "client_secret" => $REACT_APP_VK_CLIENT_SECRET,
    "client_id" => $REACT_APP_VK_CLIENT_ID,
    "redirect_uri" => $redirect_uri,
    "code" => $_GET['code'] ?? ""
]);

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://oauth.vk.com/access_token?' . $query,
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