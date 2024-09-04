// Function to handle the "Download" button click
function openbox() {
    document.getElementById("loading").style.display = "initial";
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
        url: `https://vkrdownloader.vercel.app/server?vkr=${encodeURIComponent(inputUrl)}&_=${new Date().getTime()}`,
        type: "GET",
        cache: false,
        async: true,
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
                document.getElementById("loading").style.display = "none";
            }
        },
        complete: function () {
            document.getElementById("downloadBtn").disabled = false; // Re-enable the button
        }
    });
}

// Event listener for the "Download" button with debouncing and request retry logic
document.getElementById("downloadBtn").addEventListener("click", debounce(function () {
    document.getElementById("loading").style.display = "initial";
    document.getElementById("downloadBtn").disabled = true; // Disable the button

    const inputUrl = document.getElementById("inputUrl").value;
    makeRequest(inputUrl); // Make the AJAX request with retry logic
}, 300));  // Adjust the delay as needed

// Function to handle successful AJAX response
function handleSuccessResponse(data, inputUrl) {
    document.getElementById("container").style.display = "block";
    document.getElementById("loading").style.display = "none";

    if (data.data) {
        const videoData = data.data;

        // Handle thumbnail with cache busting and HTTPS check
        const thumbnailUrl = videoData.thumbnail;
        updateElement("thumb", `<img src='${thumbnailUrl}' width='300px' loading='lazy' alt='Thumbnail'>`);

        updateElement("title", videoData.title ? `<h1>${videoData.title.replace(/\+/g, ' ')}</h1>` : "");
        document.title = videoData.title ? `Download ${videoData.title.replace(/\+/g, ' ')} VKrDownloader` : "Download VKrDownloader";
        updateElement("description", videoData.description ? `<h3><details><summary>View Description</summary>${videoData.description}</details></h3>` : "");
        updateElement("uploader", videoData.url ? `<h5>${videoData.url}</h5>` : "");
        updateElement("duration", videoData.size ? `<h5>${videoData.size}</h5>` : "");

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

        // Add iframes for additional download options
        downloadV.innerHTML += `
            <iframe style='border:0;outline:none;width:100%;max-height:45px;height:45px !important;' src='https://vkrdownloader.vercel.app/server/dlbtn.php?q=mp3&vkr=${source}'></iframe>
            <iframe style='border:0;outline:none;width:100%;max-height:45px;height:45px !important;' src='https://vkrdownloader.vercel.app/server/dlbtn.php?q=360&vkr=${source}'></iframe>
            <iframe style='border:0;outline:none;width:100%;max-height:45px;height:45px !important;' src='https://vkrdownloader.vercel.app/server/dlbtn.php?q=720&vkr=${source}'></iframe>
            <iframe style='border:0;outline:none;width:100%;max-height:45px;height:45px !important;' src='https://vkrdownloader.vercel.app/server/dlbtn.php?q=1080&vkr=${source}'></iframe>
        `;
    } else {
        alert("No download links found or data structure is incorrect.");
        document.getElementById("loading").style.display = "none";
    }

    if (downloadV.innerHTML === "") {
        alert("Server Down due to Too Many Requests. Please contact us on Social Media @TheOfficialVKr");
        document.getElementById("container").style.display = "none";
        location.href = `https://vkrdownloader.vercel.app/download.php?vkr=${encodeURIComponent(inputUrl)}`;
    }
}

// Function to get the background color for download buttons
function getBackgroundColor(downloadUrlItag) {
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
    name = name.replace(/[]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    
    if (!results) return '';
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
                                                                                                                                                                        }
