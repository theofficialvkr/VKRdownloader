// Function to handle the "Download" button click
function openbox() {
    // Display the loading section
    document.getElementById("loading").style.display = "initial";
}

// Event listener for the "Download" button
document.getElementById("downloadBtn").addEventListener("click", function () {
    // Display the loading section
    document.getElementById("loading").style.display = "initial";

    // Get the input URL value
    var inputUrl = document.getElementById("inputUrl").value;

    // AJAX request to retrieve video information
    $.ajax({
        url: "https://vkrdownloader.vercel.app/server?vkr=" + inputUrl,
        type: "GET",
        async: true,
        crossDomain: true,
        dataType: 'json',
        jsonp: true,
        cache: true,
        success: function (data) {
            // Handle successful response
            handleSuccessResponse(data, inputUrl);
        },
        error: function(xhr, status, error) {
            alert("Error: " + error + ". Please try again later.");
            document.getElementById("loading").style.display = "none";
        }
    });
});

// Function to handle successful AJAX response
function handleSuccessResponse(data, inputUrl) {
    // Display or hide elements based on the received data
    document.getElementById("container").style.display = "block";
    document.getElementById("loading").style.display = "none";

    // Check if the data is empty
    if (data.data) {
        // Extract video information from the data
        const videoData = data.data;
        // Update HTML elements with video information
        updateElement("thumb", videoData.thumbnail ? `<img src='${videoData.thumbnail}' width='300px'>` : "<img src='logo.png' width='300px'>");
        // Update HTML elements with video information
        updateElement("title", videoData.title ? `<h1>${videoData.title.replace(/\+/g, ' ')}</h1>` : "");
        document.title = videoData.title ? `Download ${videoData.title.replace(/\+/g, ' ')} VKrDownloader` : "Download VKrDownloader";
        updateElement("description", videoData.description ? `<h3><details> <summary>View Description</summary>${videoData.description}</details></h3>` : "");
        updateElement("uploader", videoData.url ? `<h5>${videoData.url}</h5>` : "");
        updateElement("duration", videoData.size ? `<h5>${videoData.size}</h5>` : "");

        // Generate and display download buttons
        generateDownloadButtons(data);
    } else {
        alert("Issue: Unable to get download link. Please check the URL and contact us on Social Media @TheOfficialVKr");
        document.getElementById("loading").style.display = "none";
    }
}

// Function to update HTML element content
function updateElement(elementId, content) {
    document.getElementById(elementId).innerHTML = content;
}

// Function to generate download buttons with dynamic colors and labels
function generateDownloadButtons(videoData) {
    function getYouTubeVideoId(url) {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return (match && match[1]) ? match[1] : null;
    }
    const downloadV = document.getElementById("download");

    downloadV.innerHTML = "";
    if (videoData.data) {
        const videoDataD = videoData.data.downloads;
        const source = videoData.data.source;
        
                // Check if the URL is from YouTube
                if (source.includes("youtube.com") || source.includes("youtu.be")) {
                    // Add the additional button
                    downloadV.innerHTML += `<a href='https://invidious.incogniweb.net/latest_version?id=`+getYouTubeVideoId(source)+`&itag=18&local=true'><button class='dlbtns' style='background:blue'>Download Video</button></a>`;
                }
        for (let i = 0; i < videoDataD.length; i++) { 
            if (videoDataD[i] && videoDataD[i].url) {
                const downloadUrl = videoDataD[i].url;
                const bgColor = getBackgroundColor(getParameterByName("itag", downloadUrl));
                const videoFrmt = videoDataD[i].format_id;
                const videoExt = videoDataD[i].extension;
                const videoSize = videoDataD[i].size;

                // Original button
                downloadV.innerHTML += `<a href='${downloadUrl}'><button class='dlbtns' style='background:${bgColor}'>${videoExt} ${videoSize}</button></a>`;

            }
        }  
    } else {
        alert("No download links found or data structure is incorrect.");
        document.getElementById("loading").style.display = "none";
    }
    // If no download links found
    if (downloadV.innerHTML === "") {
        alert("Server Down due to Too Many Requests. Please contact us on Social Media @TheOfficialVKr");
        document.getElementById("container").style.display = "none";
        location.href = "https://vkrdownloader.vercel.app/download.php?vkr=" + inputUrl;
    }
}

// Function to get the background color for download buttons
function getBackgroundColor(downloadUrlItag) {
    // Logic to determine button color based on video information
    const greenFormats = ["17", "18", "22"];
    const blueFormats = ["139", "140", "141", "249", "250", "251", "599", "600"];

    if (greenFormats.includes(downloadUrlItag)) {
        return "green";
    } else if (blueFormats.includes(downloadUrlItag)) {
        return "#3800ff";
    } else {
        return "red";
    }
}

// Function to get a parameter by name from a URL
function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);

    if (!results) return '.';
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
                }
            
