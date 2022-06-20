
         const jsonData = new XMLHttpRequest();
         let myurl = document.getElementById("inputUrl");
         let downloadBtn = document.getElementById("downloadBtn");
         downloadBtn.addEventListener("click",()=>{
         var myParam = myurl.value;
         
         let container = document.getElementById("container");
         let loading = document.getElementById("loading");
         container.style = "display:block";
         loading.style = "display:block";
         
         if(myParam){
         jsonData.open("GET","http://theofficialvkr.ml/api/test.php?vkr="+myParam,true);
         
         //Response Check
         
         jsonData.onreadystatechange = function(){
         if(jsonData.readyState == 4 && jsonData.status == 200){
         loading.style = "display:none";
         // Define 
         const obj = JSON.parse(jsonData.responseText);
         if(obj==null){
              alert("Unable To Get Download Link Please Check URL and Contact us on Social Media @TheOfficialVKr");
         }else {
            
         }
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
         urlV.innerHTML = "<a href='"+vidUrl+"'><button class='dlbtn'>Video</button></a>";
         }	
         
         if(obj.entries)
         {
         urlV.innerHTML += "<a href='"+obj.entries[0].url+"'><button class='dlbtn'>Download Video</button></a>";
         }
         
         else if(obj.formats)
         {
         for (var i = 0; i< obj.formats.length; i++) 
         {
         
         
         downloadV.innerHTML += "<a href='"+obj.formats[i].url+"'><button class='dlbtns'>"+obj.formats[i].format + "</button></a>";
         
         }
         }
         else 
         { 
         alert("Unable To Get Download Link Please Check URL and Contact us on Social Media @TheOfficialVKr");
         }
         
         }};
         
         jsonData.send();
         }
         });
