<?php 
error_reporting(0);
$urlx = $_SERVER['REQUEST_URI'];
$video_id = explode("?s=", $urlx);
$video_id = $video_id[1];
$lloc = urldecode($video_id);
$llocf = urlencode($video_id);
if(stripos($lloc,'//')==true)  {
   
    header("Location: /download/?sdl=$lloc");
exit();
  }  

   elseif(stripos($lloc,'://')===false) {
   
    header("Location: /search.php/?s=$video_id");
exit();
  }  
   else '';
?>
