<?php error_reporting(0); ?>
<title> VKR Downloader : Search And Download YouTube Videos </title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
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
   <center> <h2> Put The Query to Search</h2> </center>
   
  <p>
  <input required="" class="w3-input w3-border w3-round-large" name="s" type="text"></p>
  <center>
   <button type="submit" class="w3-bar-item w3-button w3-red" > Search! </button></center>
   <br><br>
</form>




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
