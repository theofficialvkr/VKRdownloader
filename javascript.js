// VKrDownloader - Video Downloader Script
// Handles the functionality of the video downloader

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

    // Fetch video information
    fetchVideoInformation(inputUrl);
});

// Function to fetch video information
function fetchVideoInformation(inputUrl) {
    // AJAX request to retrieve video information
    fetch("https://vkrfork.vercel.app/server/api/getJson.php?vkr=" + inputUrl)
        .then(response => response.json())
        .then(data => handleSuccessResponse(data))
        .catch(error => {
            console.error("Error fetching video information:", error);
            alert("Error fetching video information. Please try again.");
            document.getElementById("loading").style.display = "none";
        });
}

// Function to handle successful AJAX response
function handleSuccessResponse(data) {
    // Display or hide elements based on the received data
    document.getElementById("container").style.display = "block";
    document.getElementById("loading").style.display = "none";

    // Check if the data is empty or contains an error
    if (data.data && data.data.status === "00") {
        // Extract video information from the data
        const vidTitle = decodeURIComponent(data.data.title).replace(/[^\w\s]/gi, ' ');;
        const vidThumb = data.data.thumb;
        const vidDescription = data.data.description;
        const vidUploader = data.data.source;
        const vidDuration = data.data.duration;
        const vidExtractor = data.data.status;
        const vidUrl = inputUrl;

        // Update HTML elements with video information
        updateElement("thumb", vidThumb ? `<img src='${vidThumb}' width='300px'>` : "<img src='logo.png' width='300px'>");
        updateElement("title", vidTitle ? `<h1>${vidTitle}</h1>` : "");
        document.title = vidTitle ? `Download ${vidTitle} VKrDownloader` : "Download VKrDownloader";
        updateElement("description", vidDescription ? `<h3><details> <summary>View Description</summary>${vidDescription}</details></h3>` : "");
        updateElement("uploader", vidUploader ? `<h5>${vidUploader}</h5>` : "");
        updateElement("duration", vidDuration ? `<h5>${vidDuration}</h5>` : "");
        updateElement("extractor", vidExtractor ? `<h5>${vidExtractor}</h5>` : "");

        // Generate and display download buttons
        generateDownloadButtons(vidUrl, data);
    } else {
        alert("Issue: Unable to get download link. Please check the URL and contact us on Social Media @TheOfficialVKr");
        document.getElementById("loading").style.display = "none";
    }
}

// Function to generate download buttons
function generateDownloadButtons(vidUrl, data) {
    const downloadV = document.getElementById("download");
    downloadV.innerHTML = "";

    for (let i = 0; i < Object.keys(data).length; i++) {
        const key = "dl" + i;
        const dlItem = data[key];

        if (dlItem && dlItem.format) {
            const myParam = dlItem.format;
            const bgcol = getBackgroundColor(myParam);
console.log(dlItem.format);
            downloadV.innerHTML += `<a href='${dlItem.url}'><button style='background:${bgcol}' class='dlbtns'>Download ${dlItem.format + ' ' + dlItem.ext}</button></a>`;
        }
    }
}

// Function to update HTML element content
function updateElement(elementId, content) {
    document.getElementById(elementId).innerHTML = content;
}

// Function to get the background color for download buttons
function getBackgroundColor(myParam) {
    const greenFormats = ["17", "18", "22"];
    const blueFormats = ["139", "140", "141", "249", "250", "251", "599", "600"];

    if (greenFormats.includes(myParam)) {
        return "green";
    } else if (blueFormats.includes(myParam)) {
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
