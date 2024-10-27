/*******************************
 * Configuration for Colors
 *******************************/
const formatColors = {
    greenFormats: ["17", "18", "22"],
    blueFormats: ["139", "140", "141", "249", "250", "251", "599", "600"],
    defaultColor: "#9e0cf2"
};

/*******************************
 * Utility Functions
 *******************************/

/**
 * Get the background color based on the format itag.
 * @param {string} downloadUrlItag - The itag parameter from the download URL.
 * @returns {string} - The corresponding background color.
 */
function getBackgroundColor(downloadUrlItag) {
    if (formatColors.greenFormats.includes(downloadUrlItag)) {
        return "green";
    } else if (formatColors.blueFormats.includes(downloadUrlItag)) {
        return "#3800ff";
    } else {
        return formatColors.defaultColor;
    }
}

/**
 * Debounce function to limit the rate at which a function can fire.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Extract YouTube video ID from a given URL.
 * @param {string} url - The YouTube URL.
 * @returns {string|null} - The video ID or null if not found.
 */
function getYouTubeVideoIds(url) {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:shorts\/|[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return (match && match[1]) ? match[1] : null;
}

/**
 * Sanitize HTML content using DOMPurify.
 * @param {string} content - The HTML content to sanitize.
 * @returns {string} - The sanitized HTML.
 */
function sanitizeContent(content) {
    return DOMPurify.sanitize(content);
}

/**
 * Update the inner HTML of a specified element with sanitized content.
 * @param {string} elementId - The ID of the HTML element.
 * @param {string} content - The content to inject.
 */
function updateElement(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = content;
    } else {
        console.warn(`Element with ID "${elementId}" not found.`);
    }
}

/**
 * Retrieve a query parameter value by name from a URL.
 * @param {string} name - The name of the parameter.
 * @param {string} url - The URL to extract the parameter from.
 * @returns {string} - The parameter value or an empty string if not found.
 */
function getParameterByName(name, url) {
    name = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    
    if (!results) return '';
    if (!results[2]) return '';
    
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/*******************************
 * Fetch Request with Retry Logic
 *******************************/

/**
 * Make a fetch GET request with retry capability.
 * @param {string} inputUrl - The input URL for the request.
 * @param {number} retries - Number of retry attempts remaining.
 */
function makeRequest(inputUrl, retries = 4) {
    const requestUrl = `https://vkrdownloader.xyz/server?api_key=vkrdownloader&vkr=${encodeURIComponent(inputUrl)}`;
    
    fetch(requestUrl, {
        method: "GET",
        mode: "no-cors",
        cache: "no-store"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        handleSuccessResponse(data, inputUrl);
    })
    .catch(error => {
        if (retries > 0) {
            console.log(`Retrying... (${retries} attempts left)`);
            setTimeout(() => makeRequest(inputUrl, retries - 1), 2000);
        } else {
            console.error(`Error Details: ${error.message}`);
            displayError("Unable to fetch the download link after several attempts. Please check the URL or try again later.");
            document.getElementById("loading").style.display = "none";
        }
    })
    .finally(() => {
        document.getElementById("downloadBtn").disabled = false;
    });
}

/*******************************
 * Event Handlers
 *******************************/

document.getElementById("downloadBtn").addEventListener("click", debounce(function () {
    document.getElementById("loading").style.display = "initial";
    document.getElementById("downloadBtn").disabled = true;

    const inputUrl = document.getElementById("inputUrl").value.trim();
    if (!inputUrl) {
        displayError("Please enter a valid YouTube URL.");
        document.getElementById("loading").style.display = "none";
        document.getElementById("downloadBtn").disabled = false;
        return;
    }

    makeRequest(inputUrl);
}, 300));

/**
 * Display an error message within the page.
 * @param {string} message - The error message to display.
 */
function displayError(message) {
    const errorContainer = document.getElementById("error");
    if (errorContainer) {
        errorContainer.innerHTML = sanitizeContent(message);
        errorContainer.style.display = "block";
    } else {
        alert(message);
    }
}

/*******************************
 * Response Handlers
 *******************************/

function handleSuccessResponse(data, inputUrl) {
    document.getElementById("container").style.display = "block";
    document.getElementById("loading").style.display = "none";

    if (data.data) {
        const videoData = data.data;
        const thumbnailUrl = videoData.thumbnail;
        const downloadUrls = videoData.downloads.map(download => download.url);
        const videoSource = videoData.source;
        const videoId = getYouTubeVideoIds(videoSource);

        const videoHtml = `
            <video style='background: black url(${thumbnailUrl}) center center/cover no-repeat; width:100%; height:500px; border-radius:20px;' 
                   poster='${thumbnailUrl}' autoplay controls playsinline>
                <source src='https://inv.nadeko.net/latest_version?id=${videoId}&itag=18&local=true' type='video/mp4'>
                <source src='https://cors-tube.vercel.app/?url=https://invidious.jing.rocks/latest_version?id=${videoId}&itag=18&local=true' type='video/mp4'>
                ${downloadUrls.map(url => `<source src='${url}' type='video/mp4'>`).join('')}
            </video>`;
        
        const titleHtml = videoData.title ? `<h3>${sanitizeContent(videoData.title)}</h3>` : "";
        const descriptionHtml = videoData.description ? `<h4><details><summary>View Description</summary>${sanitizeContent(videoData.description)}</details></h4>` : "";
        const durationHtml = videoData.size ? `<h5>${sanitizeContent(videoData.size)}</h5>` : "";

        updateElement("thumb", videoHtml);
        updateElement("title", titleHtml);
        updateElement("description", descriptionHtml);
        updateElement("duration", durationHtml);

        generateDownloadButtons(data, inputUrl);
    } else {
        displayError("Unable to retrieve the download link. Please check the URL.");
        document.getElementById("loading").style.display = "none";
    }
}

function generateDownloadButtons(videoData, inputUrl) {
    const downloadContainer = document.getElementById("download");
    downloadContainer.innerHTML = "";

    if (videoData.data) {
        const downloads = videoData.data.downloads;
        const videoSource = videoData.data.source;
        const videoId = getYouTubeVideoIds(videoSource);

        if (videoId) {
            downloadContainer.innerHTML += `
                <a href='https://inv.nadeko.net/latest_version?id=${videoId}&itag=18&local=true' target='_blank'>
                    <button class='dlbtns' style='background: green'>Download Video (YouTube)</button>
                </a>`;
        }

        downloads.forEach(download => {
            if (download && download.url) {
                const downloadUrl = download.url;
                const itag = getParameterByName("itag", downloadUrl);
                const bgColor = getBackgroundColor(itag);
                const videoExt = download.format_id;
                const videoSize = download.size;

                downloadContainer.innerHTML += `
                    <a href='${downloadUrl}' target='_blank'>
                        <button class='dlbtns' style='background:${bgColor}'>
                            ${sanitizeContent(videoExt)} - ${sanitizeContent(videoSize)}
                        </button>
                    </a>`;
            }
        });
    } else {
        displayError("No download links available.");
    }
}

/*******************************
 * Initialization and Cleanup
 *******************************/

// Clear previous error messages when the user starts typing a new URL
document.getElementById("inputUrl").addEventListener("input", () => {
    const errorContainer = document.getElementById("error");
    if (errorContainer) {
        errorContainer.innerHTML = "";
        errorContainer.style.display = "none";
    }
});

// Initialize and hide the loading and container elements by default
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("container").style.display = "none";
});
