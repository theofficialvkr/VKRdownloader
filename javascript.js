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

    // AJAX request to retrieve video information
    $.ajax({
        url: "https://vkrfork.vercel.app/server/serverVKR?vkr=" + inputUrl,
        type: "GET",
        async: true,
        crossDomain: true,
        dataType: 'json',
        jsonp: true,
        cache: true,
        success: function (data) {
            // Handle successful response
            handleSuccessResponse(data);
        }
    });
});

// Function to handle successful AJAX response
function handleSuccessResponse(data) {
    // Display or hide elements based on the received data
    document.getElementById("container").style.display = "block";
    document.getElementById("loading").style.display = "none";

    // Check if the data is empty
    if (!$.trim(data)) {
        alert("Issue: Unable to get download link. Please check the URL and contact us on Social Media @TheOfficialVKr");
        document.getElementById("loading").style.display = "none";
    } else {
        // Extract video information from the data
        const vidTitle = data.title;
        const vidThumb = data.thumbnail;
        const vidDescription = data.description;
        const vidUploader = data.uploader;
        const vidDuration = data.duration;
        const vidExtractor = data.extractor;
        const vidUrl = data.url;

        // Update HTML elements with video information
        updateElement("thumb", vidThumb ? `<img src='${getThumbnail(vidUrl, vidThumb)}' width='300px'>` : "<img src='logo.png' width='300px'>");
        updateElement("title", vidTitle ? `<h1>${vidTitle}</h1>` : "");
        document.title = vidTitle ? `Download ${vidTitle} VKrDownloader` : "Download VKrDownloader";
        updateElement("description", vidDescription ? `<h3><details> <summary>View Description</summary>${vidDescription}</details></h3>` : "");
        updateElement("uploader", vidUploader ? `<h5>${vidUploader}</h5>` : "");
        updateElement("duration", vidDuration ? `<h5>${vidDuration}</h5>` : "");
        updateElement("extractor", vidExtractor ? `<h5>${vidExtractor}</h5>` : "");

        // Generate and display download buttons
        generateDownloadButtons(vidUrl, vidThumb, data);
    }
}

// Function to update HTML element content
function updateElement(elementId, content) {
    document.getElementById(elementId).innerHTML = content;
}

// Function to generate download buttons
function generateDownloadButtons(vidUrl, vidThumb, data) {
    const downloadV = document.getElementById("download");
    downloadV.innerHTML = "";

    if (data.entries) {
        updateElement("downloadURL", `<a href='${data.entries[0].url}'><button class='dlbtn'>Download Video</button></a>`);
    } else if (data.formats || data.medias) {
        const formats = data.formats || data.medias;

        for (let i = 0; i < formats.length; i++) {
            const myParam = ` - ${getParameterByName('itag', formats[i].url)}`;
            const bgcol = getBackgroundColor(myParam);

            downloadV.innerHTML += `<a href='${formats[i].url}'><button style='background:${bgcol}' class='dlbtns'>${formats[i].ext + myParam}</button></a>`;
        }
    } else {
        alert("Server Down due to Too Many Requests. Please contact us on Social Media @TheOfficialVKr");
        document.getElementById("container").style.display = "none";
        location.href = "https://vkrfork.vercel.app/data/download.php?vkr=" + inputUrl;
    }
}

// Function to get the thumbnail URL based on the video source
function getThumbnail(vidUrl, vidThumb) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = vidUrl.match(regExp);

    return (match && match[2].length === 11) ? `https://i.ytimg.com/vi/${match[2]}/sddefault.jpg` : vidThumb;
}

// Function to get the background color for download buttons
function getBackgroundColor(myParam) {
    const greenFormats = [" - 17", " - 18", " - 22"];
    const blueFormats = [" - 139", " - 140", " - 141", " - 249", " - 250", " - 251", " - 599", " - 600"];

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
