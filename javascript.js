// Configuration for colors based on formats
const formatColors = {
    greenFormats: ["17", "18", "22"],
    blueFormats: ["139", "140", "141", "249", "250", "251", "599", "600"],
    defaultColor: "red"
};

// Function to get the background color for download buttons
function getBackgroundColor(downloadUrlItag) {
    if (formatColors.greenFormats.includes(downloadUrlItag)) {
        return "green";
    } else if (formatColors.blueFormats.includes(downloadUrlItag)) {
        return "#3800ff";
    } else {
        return formatColors.defaultColor;
    }
}

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

// Function to get YouTube video IDs from a URL
function getYouTubeVideoIds(url) {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return (match && match[1]) ? match[1] : null;
}

// Function to sanitize HTML content before injecting into the DOM
function sanitizeContent(content) {
    return DOMPurify.sanitize(content); // Use DOMPurify to sanitize HTML
}

// Function to update HTML element content with sanitized input
function updateElement(elementId, content) {
    document.getElementById(elementId).innerHTML = content;
}

// Function to make an AJAX request with retry logic
function makeRequest(inputUrl, retries = 4) {
    $.ajax({
        url: `https://vkrdownloader.vercel.app/server?vkr=${inputUrl}`,
        type: "GET",
        cache: true,
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
                alert("Unable to fetch the download link after several attempts. Please check the URL or try again later.");
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
        const downloadUrls = videoData.downloads.map(download => download.url);
        const videoSource = videoData.source;
        const videoId = getYouTubeVideoIds(videoSource);

        const videoHtml = `
            <video style='background: black url(${thumbnailUrl}) center center/cover no-repeat; width:100%; height:500px; border-radius:20px;' 
                   poster='${thumbnailUrl}' autoplay controls playsinline>
                <source src='https://invidious.jing.rocks/latest_version?id=${videoId}&itag=18&local=true' type='video/mp4'>
                <source src='https://cors-tube.vercel.app/?url=https://inv.nadeko.net/latest_version?id=${videoId}&itag=18&local=true' type='video/mp4'>
                ${downloadUrls.map(url => `<source src='${url}' type='video/mp4'>`).join('')}
            </video>`;
        const titleHtml = videoData.title ? `<h3>${sanitizeContent(videoData.title)}</h3>` : "";
        const descriptionHtml = videoData.description ? `<h4><details><summary>View Description</summary>${sanitizeContent(videoData.description)}</details></h4>` : "";
        const durationHtml = videoData.size ? `<h5>${sanitizeContent(videoData.size)}</h5>` : "";

        updateElement("thumb", videoHtml);
        updateElement("title", titleHtml);
        updateElement("description", descriptionHtml);
        updateElement("duration", durationHtml);

        generateDownloadButtons(data);
    } else {
        alert("Issue: Unable to retrieve the download link. Please check the URL and contact us on Social Media @TheOfficialVKr.");
        document.getElementById("loading").style.display = "none";
    }
}

// Function to generate download buttons with dynamic colors and labels
function generateDownloadButtons(videoData) {
    const downloadContainer = document.getElementById("download");
    downloadContainer.innerHTML = "";

    if (videoData.data) {
        const downloads = videoData.data.downloads;
        const videoSource = videoData.data.source;

        // Add YouTube specific button if applicable
        const videoId = getYouTubeVideoIds(videoSource);
        if (videoId) {
            downloadContainer.innerHTML += `
                <a href='https://invidious.jing.rocks/latest_version?id=${videoId}&itag=18&local=true'>
                    <button class='dlbtns' style='background:blue'>Download Video</button>
                </a>`;
        }

        // Generate download buttons for available formats
        downloads.forEach(download => {
            if (download && download.url) {
                const downloadUrl = download.url;
                const bgColor = getBackgroundColor(getParameterByName("itag", downloadUrl));
                const videoExt = download.extension;
                const videoSize = download.size;

                downloadContainer.innerHTML += `
                    <a href='${downloadUrl}'><button class='dlbtns' style='background:${bgColor}'>
                        ${sanitizeContent(videoExt)} ${sanitizeContent(videoSize)}
                    </button></a>`;
            }
        });

        // Add iframes for additional download options, only if YouTube video source
        if (videoId) {
            ["mp3", "360", "720", "1080"].forEach(quality => {
                downloadContainer.innerHTML += `
                    <iframe style='border:0;outline:none;width:100%;max-height:45px;height:45px !important;' 
                        src='https://vkrdownloader.vercel.app/server/dlbtn.php?q=${quality}&vkr=${videoSource}'></iframe>`;
            });
        }
    } else {
        alert("No download links found or data structure is incorrect.");
        document.getElementById("loading").style.display = "none";
    }

    if (downloadContainer.innerHTML === "") {
        alert("Server Down due to Too Many Requests. Please contact us on Social Media @TheOfficialVKr.");
        document.getElementById("container").style.display = "none";
        location.href = `https://vkrdownloader.vercel.app/download.php?vkr=${inputUrl}`;
    }
}

// Function to get a parameter by name from a URL
function getParameterByName(name, url) {
    name = name.replace(/[]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    
    if (!results) return '';
    if (!results[2]) return '';
    
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
                                   }
