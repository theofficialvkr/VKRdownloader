// VKrDownloader

// Loading function
function showLoading() {
    let loading = document.getElementById("loading");
    console.log("click");
    loading.style.display = "initial";
}

// Event listener for download button
let downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", () => {
    // Show loading
    showLoading();

    // Get input URL
    let myurl = document.getElementById("inputUrl").value;

    // Function to get parameter by name from URL
    function getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return '.';
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    if (myurl) {
        // Make AJAX request
        $.ajax({
            url: "https://theofficialvkr.xyz/data/trial.php?vkr=" + myurl,
            type: "GET",
            dataType: 'json',
            success: function (data) {
                // Check if data is not empty
                if (!$.trim(data)) {
                    alert("Issue: Unable To Get Download Link. Please Check URL and Contact us on Social Media @TheOfficialVKr");
                } else {
                    // Hide loading
                    document.getElementById("loading").style.display = "none";

                    // Extract data
                    const obj = data;
                    let vidTitle = obj.title;
                    let vidThumb = obj.thumbnail;
                    let vidDescription = obj.description;
                    let vidUploader = obj.uploader;
                    let vidDuration = obj.duration;
                    let vidExtractor = obj.extractor;
                    let vidUrl = obj.url;

                    // Display video information
                    let thumbV = document.getElementById("thumb");
                    let titleV = document.getElementById("title");
                    let descriptionV = document.getElementById("description");
                    let uploaderV = document.getElementById("uploader");
                    let durationV = document.getElementById("duration");
                    let extractorV = document.getElementById("extractor");
                    let urlV = document.getElementById("downloadURL");
                    let downloadV = document.getElementById("download");

                    // Display thumbnail
                    let VTHUMB = vidThumb ? "https://i.ytimg.com/vi/" + vidThumb + "/sddefault.jpg" : 'logo.png';
                    thumbV.innerHTML = `<img src='${VTHUMB}' width='300px'>`;

                    // Display title
                    if (vidTitle) {
                        titleV.innerHTML = `<h1>${vidTitle}</h1>`;
                        document.title = `Download ${vidTitle} VKrDownloader`;
                    }

                    // Display description
                    if (vidDescription) {
                        descriptionV.innerHTML = `<h3><details><summary>View Description</summary>${vidDescription}</details></h3>`;
                    }

                    // Display uploader, duration, extractor
                    uploaderV.innerHTML = `<h5>${vidUploader}</h5>`;
                    durationV.innerHTML = `<h5>${vidDuration}</h5>`;
                    extractorV.innerHTML = `<h5>${vidExtractor}</h5>`;

                    // Display download buttons
                    urlV.innerHTML = `<a href='${vidUrl}'><button class='dlbtn'>Video</button></a>`;
                    if (vidThumb) {
                        urlV.innerHTML += `<a href='${VTHUMB}'><button class='dlbtn'>Download Thumbnail </button></a>`;
                    }
                }
            },
            error: function () {
                alert("Server Down due to Too Many Requests. Please Contact us on Social Media @TheOfficialVKr");
                document.getElementById("container").style.display = "none";
                location.href = "https://vkrfork.vercel.app/data/download.php?vkr=" + myurl;
            }
        });
    }
});
