<?php
    error_reporting(0);
     $vidUrl = $_SERVER['REQUEST_URI'];
     $videoVid = explode("vkr=", $vidUrl);
     $videoVid = $videoVid[1];
     $vidDe = urldecode($videoVid);
     $vidTitle = $_GET['title'];
     $url = $vidDe;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$data = curl_exec($ch);
$content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
curl_close($ch);
$extension = explode('/', $content_type)[1];
header("Content-Type: application/octet-stream");
header("Content-Disposition: attachment; filename=$vidTitle.$extension");
echo $data;
?>
