          //VKrDownloader

         let myurl = document.getElementById("inputUrl");
         let downloadBtn = document.getElementById("downloadBtn");
         downloadBtn.addEventListener("click", () =>{
        
 //Loading 

         let container = document.getElementById("container");
         let loading = document.getElementById("loading");
         container.style = "display:block";
         loading.style = "display:block";
         
var myParam = myurl.value;

  function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return '.';
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
if(myParam){
$.ajax({
    url:"http://theofficialvkr.ml/server/api/trial.php?vkr="+myParam,
    type:"GET",
    async:false,
    crossDomain:true,
    dataType: 'json',
  success: function(data){   
         const obj = data;
         loading.style = "display:none";
        
 // Define 

        if (!$.trim(data)){ 
              alert("1 - Unable To Get Download Link Please Check URL and Contact us on Social Media @TheOfficialVKr");
         }else {
           
         let vidTitle = obj.title;
         let vidId = obj.id;
         let vidThumb = obj.thumbnail;
         let vidDescription = obj.description;
         let vidUploader = obj.uploader;
         let vidDuration = obj.duration;
         let vidExtractor = obj.extractor;
         let vidUrl = obj.url;
         let thumbV = document.getElementById("thumb");
         let titleV = document.getElementById("title");
         let descriptionV = document.getElementById("description");
         let uploaderV = document.getElementById("uploader");
         let durationV = document.getElementById("duration");
         let extractorV = document.getElementById("extractor");
         let urlV = document.getElementById("downloadURL");
         let downloadV = document.getElementById("download");
        
 // Checking That Object is Exist Or Not

         if(vidThumb)
         {
         thumbV.innerHTML = "<img src='"+vidThumb+"' width='300px'>";
         }else {
         thumbV.innerHTML = "<img src='logo.png' width='300px'>";
         }
         if(vidTitle)
         {
         titleV.innerHTML = "<h1>"+vidTitle+"</h1>";
         }
         if(vidDescription)
         {
         descriptionV.innerHTML = "<h3><details> <summary>View Description</summary>"+vidDescription+"</details></h3>";
         }
         if(vidUploader)
         {
         uploaderV.innerHTML = "<h5>"+vidUploader+"</h5>";
         }
         if(vidDuration)
         {
         durationV.innerHTML = "<h5>"+vidDuration+"</h5>";
         }
         if(vidExtractor)
         {
         extractorV.innerHTML = "<h5>"+vidExtractor+"</h5>";
         
         }
         
         if(vidUrl)
         {
        urlV.innerHTML = "";
         urlV.innerHTML = "<a href='"+vidUrl+"'><button class='dlbtn'>Video</button></a>";
         }  
         
         if(obj.entries)
         {
         urlV.innerHTML = ""; 
         urlV.innerHTML += "<a href='"+obj.entries[0].url+"'><button class='dlbtn'>Download Video</button></a>";
         }
         
         else if(obj.formats)
         {
        downloadV.innerHTML = ""; 
         for (var i = 0; i< obj.formats.length; i++) 
         {
let myParam = " - " +getParameterByName('itag',obj.formats[i].url);
let bgcol = '';
if (myParam == 17) { 
bgcol = "green";
} 
if (myParam == 18) { 
bgcol = "green";
}
if (myParam == 22) { 
bgcol = "green";
}    
if (myParam == 139) { 
bgcol = "aqua";
} 
if (myParam == 140) { 
bgcol = "aqua";
}
if (myParam == 141) { 
bgcol = "aqua";
}if (myParam == 249) { 
bgcol = "aqua";
} 
if (myParam == 250) { 
bgcol = "aqua";
}
if (myParam == 251) { 
bgcol = "aqua";
} 
if (myParam == 599) { 
bgcol = "aqua";
}
if (myParam == 600) { 
bgcol = "aqua";
}
downloadV.innerHTML += "<a href='"+obj.formats[i].url+"'><button style='background:"+bgcol+"' class='dlbtns'>"+obj.formats[i].quality + myParam+"</button></a>";
         
         }
         }      
         else if(obj.medias)
         {

        downloadV.innerHTML = ""; 
         for (var i = 0; i< obj.medias.length; i++) 
         {
let myParam = " - " + getParameterByName('itag',obj.medias[i].url);
let bgcol = '';
if (myParam == 17) { 
bgcol = "green";
} 
if (myParam == 18) { 
bgcol = "green";
}
if (myParam == 22) { 
bgcol = "green";
}    
if (myParam == 139) { 
bgcol = "aqua";
} 
if (myParam == 140) { 
bgcol = "aqua";
}
if (myParam == 141) { 
bgcol = "aqua";
}if (myParam == 249) { 
bgcol = "aqua";
} 
if (myParam == 250) { 
bgcol = "aqua";
}
if (myParam == 251) { 
bgcol = "aqua";
} 
if (myParam == 599) { 
bgcol = "aqua";
}
if (myParam == 600) { 
bgcol = "aqua";
}
downloadV.innerHTML += "<a href='"+obj.medias[i].url+"'><button style='background:"+bgcol+"' class='dlbtns'>"+obj.medias[i].quality + myParam+"</button></a>";
         
         }
         }
         else 
         { 
         alert("2 -Server Down due to Too Many Requests please Contact us on Social Media @TheOfficialVKr");
         container.style = "display:none";
         location.href="http://theofficialvkr.ml/download.php?vkr="+myParam;
         }
         
        
            
         }
         
     }})
}
});
