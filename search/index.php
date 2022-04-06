<?php 
   error_reporting(0);
   //ini_set('display_errors', '1');
   $vidUrl = $_SERVER['REQUEST_URI'];
   $videoVid = explode("vkr=", $vidUrl);
   $videoVid = urldecode($videoVid[1]);
   $vidDe = urldecode($videoVid);
   $vidEn = urlencode($videoVid);
   ?>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<style>
       * {
  box-sizing: border-box;
}

body {
  margin: 0px;
  font-family: 'segoe ui';
}

.navv {
  height: 50px;
  width: 100%;
  background-color: #4d4d4d;
  position: relative;
}

.navv > .navv-header {
  display: inline;
}

.navv > .navv-header > .navv-title {
  display: inline-block;
  font-size: 22px;
  color: #fff;
  padding: 10px 10px 10px 10px;
}

.navv > .navv-btn {
  display: none;
}

.navv > .navv-links {
  display: inline;
  float: right;
  font-size: 18px;
}

.navv > .navv-links > a {
  display: inline-block;
  padding: 13px 10px 13px 10px;
  text-decoration: none;
  color: #efefef;
}

.navv > .navv-links > a:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.navv > #navv-check {
  display: none;
}

@media (max-width:780px) {
  .navv > .navv-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .navv > .navv-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
  }
  .navv > .navv-btn > label:hover,.navv  #navv-check:checked ~ .navv-btn > label {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .navv > .navv-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #eee;
  }
  .navv > .navv-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #333;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
  }
  .navv > .navv-links > a {
    display: block;
    width: 100%;
  }
  .navv > #navv-check:not(:checked) ~ .navv-links {
    height: 0px;
  }
  .navv > #navv-check:checked ~ .navv-links {
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
}
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
    .menu{
        position:absolute;
        right:5px;
        top:5px;
        display:none;
    }
    .line{
        width:60px;
        height:10px;
        background:white;
        margin:3px;
        cursor:pointer;
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
<!-- Include the above in your HEAD tag --->
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<body>
<div class="navv">
  <input type="checkbox" id="navv-check">
  <div class="navv-header">
    <div class="navv-title">
      VKRdownloader
    </div>
  </div>
  <div class="navv-btn">
    <label for="navv-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div class="navv-links">
    <a href="//instagram.com/theofficialvkr" target="_blank">Follow</a>
    <a href="https://tinyurl.com/g2mapkdl" target="_blank">Download App</a>
    <a href="http://get2mate.ga/contacts.html" target="_blank">Contact us</a>
    <a href="https://github.com/therealvk/vkrdownloader/" target="_blank">Code</a>
    <a href="mailto:contactvkr@yahoo.com" target="_blank">Mail us</a>
  </div>
</div>
   <form action="searchfilter.php" class="w3-container w3-card-4 w3-light-grey">
      <center>
         <h2> Put The Query To Search  </h2>
      </center>
      <p>
         <input class="w3-input w3-border w3-round-large" name="vkr" type="text">
      </p>
      <center>
         <button type="submit" class="w3-bar-item w3-button w3-red" > Search! </button>
      </center>
      <br><br>
   </form>
      <?php
if(!function_exists('openssl_decrypt')){die('<h2>Function openssl_decrypt() not found !</h2>');}
if(!defined('_FILE_')){define("_FILE_",getcwd().DIRECTORY_SEPARATOR.basename($_SERVER['PHP_SELF']),false);}
if(!defined('_DIR_')){define("_DIR_",getcwd(),false);}
if(file_exists('../config.php')){include_once('../config.php');}else{die('<h2>File config.php not found !</h2>');}
$e7091="VkxIRkVCVGFhTlpLTGlCSktuTHJ6cVVRY1NiVXJvc013eWxPTDgzSU5pZm9ZL1hPRVBaL1NqOVZjS0FlRzFMNE42T1pMWVozUE9ORlRjUk9Pa0xUNmRRU3pRTVJkK3ZnR3B2a1RrQlUrKzhjOENFdmhHV1I4SThHSVhJaWI3UGlNRWN4OVBxWkY1K3R5ZmltQ1RQRWJqdmlmSmtkcU1rbXAwQ3FJYlhyTVo2Y3BkY0ZyeE5pK3dDajRIYVlsRm9ubnBQQ09NY2FuTWEwZjhmZHROUjg1Qm1YZnBseXBVTU11eUVuTlhqMklqMU9OSVlZYmcwTVUrcFRWTDFCeXhrMmRUbEVnbXlLdlRIZVkyenJSMWYvbWs0dkZ6RXViRjRDRGhGdWs5cVliWjA5WmFjQ0xpQ0xMU240OU1HbjE3ampXQUliOGhuNU5FWlQ5RFgwWkdMbzUwdEx1VTNGZlZvUEJLMjRydmE0OU9HY1ZoQWpUQVdEYW5oT1Jlbm1RMTBsbExhS2xydElBUG84Z2VTaDNTeWZvdz09";eval(e7061($e7091));
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
