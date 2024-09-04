// Utility function for debouncing user actions
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Function to fetch video data with retries
async function fetchVideoData(url, retries = 3) {
    try {
        console.log(`Fetching data for URL: ${url}`); // Debugging: log the request URL

        const response = await $.ajax({
            url: `https://vkrdownloader.vercel.app/server?vkr=${encodeURIComponent(url)}&_=${new Date().getTime()}`,
            type: "GET",
            dataType: 'json',
            cache: false,
            async: true,
            crossDomain: true,
        });
        console.log('Data received:', response); // Debugging: log the received data
        return response;
    } catch (error) {
        console.error('AJAX request failed:', error); // Debugging: log the error
        if (retries > 0) {
            console.warn(`Retrying... (${retries} attempts left)`);
            return fetchVideoData(url, retries - 1);
        } else {
            console.error('Failed after multiple attempts:', error);
            throw error;
        }
    }
}

// Function to handle the "Download" button click
async function onDownloadClick() {
    try {
        const inputUrl = document.getElementById("inputUrl").value;
        document.getElementById("loading").style.display = "initial";
        document.getElementById("downloadBtn").disabled = true;

        const data = await fetchVideoData(inputUrl);
        handleSuccessResponse(data, inputUrl);
    } catch (error) {
        alert("Failed to retrieve video data. Please try again later.");
        console.error('Error in onDownloadClick:', error); // Debugging: log the error
    } finally {
        document.getElementById("loading").style.display = "none";
        document.getElementById("downloadBtn").disabled = false;
    }
}

// Event listener for the "Download" button
document.getElementById("downloadBtn").addEventListener("click", debounce(onDownloadClick, 300));

// Function to handle a successful response
function handleSuccessResponse(data, inputUrl) {
    if (!data?.data) {
        alert("Issue: Unable to get download link. Please check the URL and contact us on Social Media @TheOfficialVKr");
        return;
    }

    const videoData = data.data;

    updateElement("thumb", generateThumbnailHtml(videoData.thumbnail));
    updateElement("title", generateTitleHtml(videoData.title));
    document.title = generateDocumentTitle(videoData.title);
    updateElement("description", generateDescriptionHtml(videoData.description));
    updateElement("uploader", generateUploaderHtml(videoData.url));
    updateElement("duration", generateDurationHtml(videoData.size));

    generateDownloadButtons(videoData, inputUrl);
}

// Function to update HTML element content
function updateElement(elementId, content) {
    document.getElementById(elementId).innerHTML = content;
}

// Helper functions for generating HTML content
function generateThumbnailHtml(thumbnailUrl) {
    const url = thumbnailUrl ? `${thumbnailUrl.replace("http://", "https://")}?_=${new Date().getTime()}` : "logo.png";
    return `<img src="${url}" width="300px" loading="lazy" alt="Thumbnail">`;
}

function generateTitleHtml(title) {
    return title ? `<h1>${title.replace(/\+/g, ' ')}</h1>` : "";
}

function generateDocumentTitle(title) {
    return title ? `Download ${title.replace(/\+/g, ' ')} VKrDownloader` : "Download VKrDownloader";
}

function generateDescriptionHtml(description) {
    return description ? `<h3><details><summary>View Description</summary>${description}</details></h3>` : "";
}

function generateUploaderHtml(url) {
    return url ? `<h5>${url}</h5>` : "";
}

function generateDurationHtml(size) {
    return size ? `<h5>${size}</h5>` : "";
}

// Function to generate and display download buttons
function generateDownloadButtons(videoData, inputUrl) {
    const downloadContainer = document.getElementById("download");
    downloadContainer.innerHTML = "";

    const downloads = videoData.downloads;
    const source = videoData.source;

    if (isYouTubeUrl(source)) {
        downloadContainer.innerHTML += createYouTubeDownloadButton(getYouTubeVideoId(source));
    }

    downloads.forEach(download => {
        if (download.url) {
            const buttonHtml = createDownloadButtonHtml(download.url, download.extension, download.size);
            downloadContainer.innerHTML += buttonHtml;
        }
    });

    // Adding the iframes for additional download options
    downloadContainer.innerHTML += generateIframeHtml("mp3", source);
    downloadContainer.innerHTML += generateIframeHtml("360", source);
    downloadContainer.innerHTML += generateIframeHtml("720", source);
    downloadContainer.innerHTML += generateIframeHtml("1080", source);

    if (downloadContainer.innerHTML === "") {
        alert("No download links found or the server is down. Please try again later.");
        document.getElementById("container").style.display = "none";
        location.href = `https://vkrdownloader.vercel.app/download.php?vkr=${inputUrl}`;
    }
}

// Helper function to generate iframe HTML
function generateIframeHtml(format, source) {
    return `<iframe style="border:0;outline:none;width:100%;max-height:45px;height:45px !important;" src="https://vkrdownloader.vercel.app/server/dlbtn.php?q=${format}&vkr=${source}"></iframe>`;
}

// Helper function to determine YouTube URLs
function isYouTubeUrl(url) {
    return url.includes("youtube.com") || url.includes("youtu.be");
}

// Function to extract the YouTube video ID from a URL
function getYouTubeVideoId(url) {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}

// Function to create a download button for YouTube videos
function createYouTubeDownloadButton(videoId) {
    return `<a href="https://invidious.incogniweb.net/latest_version?id=${videoId}&itag=18&local=true"><button class="dlbtns" style="background:blue">Download Video</button></a>`;
}

// Function to create a generic download button
function createDownloadButtonHtml(url, extension, size) {
    const bgColor = getBackgroundColor(getParameterByName("itag", url));
    return `<a href="${url}"><button class="dlbtns" style="background:${bgColor}">${extension} ${size}</button></a>`;
}

// Function to get the background color for download buttons
function getBackgroundColor(itag) {
    const greenFormats = ["17", "18", "22"];
    const blueFormats = ["139", "140", "141", "249", "250", "251", "599", "600"];

    return greenFormats.includes(itag) ? "green" : blueFormats.includes(itag) ? "#3800ff" : "red";
}

// Function to get a query parameter from a URL
function getParameterByName(name, url) {
    name = name.replace(/[]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);

    return results ? decodeURIComponent(results[2].replace(/\+/g, ' ')) : null;
    }
