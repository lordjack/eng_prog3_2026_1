<?php
$curl = curl_init('http://localhost/eng_prog3_2026_1/prog3_API_teste/public/');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
$code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
echo "HTTP Code: $code\n";
echo "Response:\n$response\n";
