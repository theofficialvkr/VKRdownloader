<?php 
error_reporting(0);
$urlx = $_SERVER['REQUEST_URI'];
$video_id = explode("vkr=", $urlx);
$video_id = $video_id[1];
$lloc = urldecode($video_id);
$llocf = urlencode($video_id);
include("../config.php");
if(stripos($lloc,'//')==true)  {
header("Location: $domain/download/?vkr=$lloc");
exit();
  }  
elseif(stripos($lloc,'://')===false) {
header("Location: $domain/search/?vkr=$llocf");
exit();
  }  
else '';
?>
