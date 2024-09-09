// Function to show loading indicator
function showLoading() {
    document.getElementById("loading").style.display = "block";
}

// Function to hide loading indicator
function hideLoading() {
    document.getElementById("loading").style.display = "none";
}

// Function to debounce the download button click event to avoid multiple rapid requests
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Function to make an AJAX request with retry logic
function makeRequest(inputUrl, retries = 3) {
    $.ajax({
        url: `https://vkrdownloader.vercel.app/server?vkr=${decodeURIComponent(inputUrl)}`,
        type: "GET",
        cache: false,
        crossDomain: true,
        dataType: 'json',
        jsonp: true,
        success: function (data) {
            handleSuccessResponse(data, inputUrl);
        },
        error: function(xhr, status, error) {
            if (retries > 0) {
                console.log(`Retrying... (${retries} attempts left)`);
                makeRequest(inputUrl, retries - 1);
            } else {
                console.error(`Error Details: Status - ${status}, Error - ${error}, XHR Status - ${xhr.status}`);
                alert("Failed after multiple attempts. Please try again later.");
                hideLoading();
            }
        },
        complete: function () {
            document.getElementById("downloadBtn").disabled = false; // Re-enable the button
        }
    });
}

// Event listener for the "Download" button with debouncing and request retry logic
document.getElementById("downloadBtn").addEventListener("click", debounce(function () {
    showLoading();
    document.getElementById("downloadBtn").disabled = true; // Disable the button

    const inputUrl = document.getElementById("inputUrl").value;
    makeRequest(inputUrl); // Make the AJAX request with retry logic
}, 300));  // Adjust the delay as needed

// Function to handle successful AJAX response
function handleSuccessResponse(data, inputUrl) {
    const container = document.getElementById("container");
    const thumb = document.getElementById("thumb");
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const uploader = document.getElementById("uploader");
    const duration = document.getElementById("duration");
    const downloadV = document.getElementById("download");

    hideLoading();
    container.style.display = "block";

    if (data && data.data) {
        const videoData = data.data;
        let thumbnailUrl = videoData.thumbnail;

        // Use CORS proxy for Instagram thumbnails
        if (inputUrl.includes("instagram.com")) {
            thumbnailUrl = `https://cors-tube.vercel.app/?url=${encodeURIComponent(thumbnailUrl)}`;
        }

        const videoUrl = getVideoUrl(videoData, inputUrl);

        
        updateElement(thumb, `
            <div style="position: relative; display: inline-block; overflow: hidden;">
                <video width="100" style="border-radius: 30px;" controls>
                    <source src="${decodeURIComponent(videoUrl)}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `);

        updateElement(title, videoData.title ? `<h1>${videoData.title.replace(/\+/g, ' ')}</h1>` : "");
        document.title = videoData.title ? `Download ${videoData.title.replace(/\+/g, ' ')} VKrDownloader` : "Download VKrDownloader";
        updateElement(description, videoData.description ? `<h3><details><summary>View Description</summary>${videoData.description}</details></h3>` : "");
        updateElement(uploader, videoData.url ? `<h5>${videoData.url}</h5>` : "");
        updateElement(duration, videoData.size ? `<h5>${videoData.size}</h5>` : "");

        generateDownloadButtons(videoData);
    } else {
        alert("Issue: Unable to get download link. Please check the URL and contact us on Social Media @TheOfficialVKr");
        hideLoading();
    }
}

// Function to determine the correct video URL based on the source
function getVideoUrl(videoData, inputUrl) {
    const source = videoData.source;
    if (source.includes("youtube.com") || source.includes("youtu.be")) {
        return `https://invidious.incogniweb.net/latest_version?id=${getYouTubeVideoId(source)}&itag=18&local=true`;
    } else {
        return videoData.downloads ? videoData.downloads[0].url : ""; // Adjust index as needed
    }
}

// Function to get YouTube Video ID from URL
function getYouTubeVideoId(url) {
    const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}

// Function to update HTML element content
function updateElement(element, content) {
    if (element) {
        element.innerHTML = content;
    } else {
        console.error(`Element not found: ${element}`);
    }
}

// Function to generate download buttons with dynamic colors and labels
function generateDownloadButtons(videoData) {
    const downloadV = document.getElementById("download");
    downloadV.innerHTML = "";

    if (videoData.data) {
        const videoDataD = videoData.data.downloads;
        const source = videoData.data.source;

        // Add YouTube specific button if applicable
        if (source.includes("youtube.com") || source.includes("youtu.be")) {
            downloadV.innerHTML += `<a href='https://invidious.incogniweb.net/latest_version?id=${getYouTubeVideoId(source)}&itag=18&local=true'><button class='dlbtns' style='background:blue'>Download Video</button></a>`;
        }

        // Generate download buttons for available formats
        videoDataD.forEach(download => {
            if (download && download.url) {
                const downloadUrl = download.url;
                const bgColor = getBackgroundColor(getParameterByName("itag", downloadUrl));
                const videoExt = download.extension;
                const videoSize = download.size;

                downloadV.innerHTML += `<a href='${downloadUrl}'><button class='dlbtns' style='background:${bgColor}'>${videoExt} ${videoSize}</button></a>`;
            }
        });

        // Add iframes for different download options
        ['mp3', '360', '720', '1080'].forEach(q => {
            downloadV.innerHTML += `<iframe style='border:0;outline:none;width:100%;max-height:45px;height:45px !important;' src='https://vkrdownloader.vercel.app/server/dlbtn.php?q=${q}&vkr=${source}'></iframe>`;
        });

        if (downloadV.innerHTML === "") {
            alert("Server Down due to Too Many Requests. Please contact us on Social Media @TheOfficialVKr");
            document.getElementById("container").style.display = "none";
            window.location.href = `https://vkrdownloader.vercel.app/download.php?vkr=${encodeURIComponent(inputUrl)}`;
        }
    } else {
        alert("No download links found or data structure is incorrect.");
        hideLoading();
    }
}

// Function to get the background color for download buttons
function getBackgroundColor(itag) {
    const greenFormats = ["17", "18", "22"];
    const blueFormats = ["139", "140", "141", "249", "250", "251", "599", "600"];

    if (greenFormats.includes(itag)) {
        return "green";
    } else if (blueFormats.includes(itag)) {
        return "#3800ff";
    } else {
        return "red";
    }
}

// Function to get a parameter value by name from a URL
function getParameterByName(name, url) {
    name = name.replace(/[]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    
    if (!results) return null;
    if (!results[2]) return null;
    
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
