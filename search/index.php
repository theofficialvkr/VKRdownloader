<?php 
   error_reporting(0);
   //ini_set('display_errors', '1');
   $vidUrl = $_SERVER['REQUEST_URI'];
   $videoVid = explode("vkr=", $vidUrl);
   $videoVid = $videoVid[1];
  $vidEn = urlencode($videoVid);  
$vidDe =urldecode($videoVid);  
  
   ?>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<title> VkrDownloader : Download <?php echo $vidDe; ?> in all available Quality and Format </title>
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
    <a href="https://get2mateapi.herokuapp.com/contacts.html" target="_blank">Contact us</a>
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
   
   
<center> <img width="150px" height="100px" src="https://i.giphy.com/media/KOQOSymP4AWPc6976Y/giphy.webp">
<br>
Please wait Geting Search Result </center>
<?php
 echo "<iframe style='width:100vw;height:900px; border:0px;' src='https://get2mateapp.000webhostapp.com/info.php/?vkr=$vidEn'></iframe>";
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
