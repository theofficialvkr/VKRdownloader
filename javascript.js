// VKrDownloader

// Loading
function openBox() {
    let loading = document.getElementById("loading");
    console.log("click");
    loading.style.display = "initial";
}

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return '.';
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function processVideoData(data) {
    const obj = data;
    const thumbV = document.getElementById("thumb");
    const titleV = document.getElementById("title");
    const descriptionV = document.getElementById("description");
    const uploaderV = document.getElementById("uploader");
    const durationV = document.getElementById("duration");
    const extractorV = document.getElementById("extractor");
    const urlV = document.getElementById("downloadURL");
    const downloadV = document.getElementById("download");

    let VTHUMB;

    if (!data.trim()) {
        alert("issue:1 - Unable To Get Download Link. Please Check URL and Contact us on Social Media @TheOfficialVKr");
        document.getElementById("loading").style.display = "none";
    } else {
        document.getElementById("loading").style.display = "none";
        let vidTitle = obj.title;
        let vidId = obj.id;
        let vidThumb = obj.thumbnail;
        let vidDescription = obj.description;
        let vidUploader = obj.uploader;
        let vidDuration = obj.duration;
        let vidExtractor = obj.extractor;
        let vidUrl = obj.url;

        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = myParamV.match(regExp);
        if (match && match[2].length == 11) {
            VTHUMB = "https://i.ytimg.com/vi/" + match[2] + "/sddefault.jpg";
        } else {
            VTHUMB = vidThumb;
        }

        // Display video information
        thumbV.innerHTML = vidThumb ? `<img src='${VTHUMB}' width='300px'>` : "<img src='logo.png' width='300px'>";
        titleV.innerHTML = vidTitle ? `<h1>${vidTitle}</h1>` : "";
        document.title = vidTitle ? `Download ${vidTitle} VKrDownloader` : "";
        descriptionV.innerHTML = vidDescription ? `<h3><details><summary>View Description</summary>${vidDescription}</details></h3>` : "";
        uploaderV.innerHTML = vidUploader ? `<h5>${vidUploader}</h5>` : "";
        durationV.innerHTML = vidDuration ? `<h5>${vidDuration}</h5>` : "";
        extractorV.innerHTML = vidExtractor ? `<h5>${vidExtractor}</h5>` : "";

        // Display download buttons
        urlV.innerHTML = "";
        urlV.innerHTML += `<a href='${vidUrl}'><button class='dlbtn'>Video</button></a>`;
        if (vidThumb) {
            urlV.innerHTML += `<a href='${VTHUMB}'><button class='dlbtn'>Download Thumbnail</button></a>`;
        }
    }
}

function handleButtonClick() {
    // Loading
    document.getElementById("loading").style.display = "initial";

    var myParamV = myurl.value;
    if (myParamV) {
        $.ajax({
            url: "https://theofficialvkr.xyz/data/trial.php?vkr=" + myParamV,
            type: "GET",
            async: true,
            crossDomain: true,
            dataType: 'json',
            jsonp: true,
            cache: true,
            success: processVideoData,
            error: function (xhr, status, error) {
                console.error("AJAX Error:", status, error);
                // Handle the error gracefully
            }
        });
    }
}

// Use const for constants and let for variables
const myurl = document.getElementById("inputUrl");
const downloadBtn = document.getElementById("downloadBtn");

// Use addEventListener consistently
downloadBtn.addEventListener("click", handleButtonClick);
